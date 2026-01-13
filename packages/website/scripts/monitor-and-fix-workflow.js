#!/usr/bin/env node

/**
 * GitHub Actions 工作流监控和自动修复脚本
 * 
 * 功能：
 * 1. 监控 GitHub Actions 工作流运行状态
 * 2. 获取失败的工作流日志
 * 3. 分析常见错误模式
 * 4. 生成修复建议
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 配置
const CONFIG = {
  owner: 'firerlAGI',
  repo: 'firerlAGI.github.io',
  workflow: 'deploy.yml',
  branch: 'main',
  pollInterval: 30000, // 30秒轮询一次
  maxWaitTime: 600000, // 最多等待10分钟
};

// GitHub API 配置
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

if (!GITHUB_TOKEN) {
  console.error('❌ 错误: 未设置 GITHUB_TOKEN 环境变量');
  console.log('\n请先创建 GitHub Personal Access Token:');
  console.log('1. 访问 https://github.com/settings/tokens');
  console.log('2. 创建新的 Token，勾选 "repo" 权限');
  console.log('3. 运行: export GITHUB_TOKEN=your_token_here');
  process.exit(1);
}

/**
 * 使用 GitHub API 发送请求
 */
async function githubApi(endpoint, options = {}) {
  const url = `https://api.github.com/repos/${CONFIG.owner}/${CONFIG.repo}${endpoint}`;
  
  const requestOptions = {
    ...options,
    headers: {
      'Authorization': `Bearer ${GITHUB_TOKEN}`,
      'User-Agent': 'monitor-workflow-script',
      'Accept': 'application/vnd.github.v3+json',
      ...options.headers,
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(url, requestOptions, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            resolve(data);
          }
        } else {
          reject(new Error(`GitHub API 请求失败: ${res.statusCode} - ${data}`));
        }
      });
    });

    req.on('error', reject);
    
    if (options.body) {
      req.write(options.body);
    }
    
    req.end();
  });
}

/**
 * 获取最新的工作流运行
 */
async function getLatestWorkflowRun() {
  console.log('📊 获取最新的工作流运行...');
  
  const runs = await githubApi('/actions/workflows/deploy.yml/runs', {
    method: 'GET',
  });

  if (!runs.workflow_runs || runs.workflow_runs.length === 0) {
    throw new Error('未找到工作流运行记录');
  }

  return runs.workflow_runs[0];
}

/**
 * 获取工作流运行日志
 */
async function getWorkflowLogs(runId) {
  console.log(`📝 获取工作流 #${runId} 的日志...`);
  
  const logs = await githubApi(`/actions/runs/${runId}/logs`);
  
  if (!logs || !logs.logs || logs.logs.length === 0) {
    throw new Error('无法获取工作流日志');
  }

  // 获取最后一个作业的日志（通常是构建失败的地方）
  const lastJob = logs.logs[logs.logs.length - 1];
  
  return {
    runId,
    jobName: lastJob.name,
    logsUrl: lastJob.url,
  };
}

/**
 * 监控工作流运行直到完成
 */
async function monitorWorkflow(run) {
  const startTime = Date.now();
  const runId = run.id;
  
  console.log(`\n🔄 监控工作流 #${runId}`);
  console.log(`   状态: ${run.status} | 结论: ${run.conclusion || '运行中'}`);
  console.log(`   链接: ${run.html_url}`);
  console.log('');

  while (true) {
    const elapsed = Date.now() - startTime;
    
    if (elapsed > CONFIG.maxWaitTime) {
      throw new Error(`工作流运行超时（已等待 ${elapsed / 1000} 秒）`);
    }

    // 等待一段时间
    await new Promise(resolve => setTimeout(resolve, CONFIG.pollInterval));

    // 检查最新状态
    const currentRun = await githubApi(`/actions/runs/${runId}`);

    if (currentRun.status === 'completed') {
      console.log(`\n✅ 工作流完成！`);
      console.log(`   最终状态: ${currentRun.conclusion}`);
      
      if (currentRun.conclusion === 'failure') {
        console.log(`\n❌ 工作流失败！`);
        return {
          success: false,
          run: currentRun,
        };
      } else {
        console.log(`\n🎉 工作流成功！`);
        return {
          success: true,
          run: currentRun,
        };
      }
    }

    console.log(`⏳ [${Math.floor(elapsed / 1000)}s] 状态: ${currentRun.status}...`);
  }
}

/**
 * 分析错误并生成修复建议
 */
function analyzeError(errorLogs) {
  console.log('\n🔍 分析错误...');
  
  const commonErrors = {
    'Expected ";" but found "id"': {
      type: 'esbuild',
      description: 'esbuild 解析错误，通常是模板字符串或动态属性问题',
      fix: [
        '检查 Astro 组件中是否使用了复杂的模板字符串',
        '检查是否使用了动态 HTML 标签属性（如 as="h2"）',
        '改用 Astro 的 class: 指令进行条件类绑定',
        '使用条件渲染替代动态标签',
      ],
    },
    'useLanguageContext': {
      type: 'ssr',
      description: 'Astro 组件中使用了 React Context API',
      fix: [
        '移除 Astro 组件中的 useLanguageContext 调用',
        '改用直接导入 translations 并使用固定语言',
        '只在客户端 React 组件中使用 Context API',
      ],
    },
    'require is not defined': {
      type: 'module',
      description: '在 ES 模块中使用了 CommonJS 语法',
      fix: [
        '将 .js 文件重命名为 .cjs',
        '或改用 import/export 语法',
        '更新 package.json 中的文件引用',
      ],
    },
    'ENOENT: no such file or directory': {
      type: 'path',
      description: '文件路径错误',
      fix: [
        '使用 process.cwd() 替代 __dirname',
        '确保路径相对于工作目录',
        '检查文件是否存在于正确的位置',
      ],
    },
  };

  const foundErrors = [];

  for (const [pattern, error] of Object.entries(commonErrors)) {
    if (errorLogs.includes(pattern)) {
      foundErrors.push(error);
    }
  }

  if (foundErrors.length === 0) {
    console.log('\n⚠️  未识别到常见错误模式');
    console.log('   建议手动检查工作流日志');
    return null;
  }

  console.log('\n📋 识别到的错误:');
  foundErrors.forEach((error, index) => {
    console.log(`\n${index + 1}. ${error.type.toUpperCase()} 错误`);
    console.log(`   ${error.description}`);
    console.log('\n   修复建议:');
    error.fix.forEach((fix, i) => {
      console.log(`   ${i + 1}. ${fix}`);
    });
  });

  return foundErrors;
}

/**
 * 获取工作流运行的实际日志内容
 */
async function getActualLogs(runId) {
  console.log('\n📥 获取详细日志...');
  
  try {
    const logs = await githubApi(`/actions/runs/${runId}/logs`);
    
    if (logs.logs && logs.logs.length > 0) {
      const lastJob = logs.logs[logs.logs.length - 1];
      const logsUrl = lastJob.url;
      
      // 下载日志
      const logContent = await new Promise((resolve, reject) => {
        https.get(logsUrl, {
          headers: {
            'Authorization': `Bearer ${GITHUB_TOKEN}`,
            'User-Agent': 'monitor-workflow-script',
            'Accept': 'application/vnd.github.v3+json',
          },
        }, (res) => {
          let data = '';
          res.on('data', chunk => data += chunk);
          res.on('end', () => resolve(data));
          res.on('error', reject);
        });
      });
      
      return logContent;
    }
  } catch (error) {
    console.log(`⚠️  无法获取详细日志: ${error.message}`);
    return '';
  }
}

/**
 * 主函数
 */
async function main() {
  console.log('🚀 GitHub Actions 工作流监控工具\n');
  console.log(`仓库: ${CONFIG.owner}/${CONFIG.repo}`);
  console.log(`工作流: ${CONFIG.workflow}`);
  console.log(`分支: ${CONFIG.branch}\n`);

  try {
    // 1. 获取最新的工作流运行
    const run = await getLatestWorkflowRun();
    console.log(`   运行 ID: ${run.id}`);
    console.log(`   触发时间: ${new Date(run.created_at).toLocaleString('zh-CN')}`);
    console.log(`   状态: ${run.status}`);
    console.log(`   结论: ${run.conclusion || '运行中'}`);

    // 如果工作流还在运行，监控它
    if (run.status !== 'completed') {
      console.log('\n⏱️  工作流正在运行，开始监控...');
      const result = await monitorWorkflow(run);
      
      if (result.success) {
        console.log('\n✅ 工作流运行成功！无需修复。');
        return;
      }
    } else if (run.conclusion === 'failure') {
      console.log('\n❌ 工作流已失败，开始分析...');
    } else {
      console.log('\n✅ 工作流运行成功！无需修复。');
      return;
    }

    // 2. 获取工作流日志
    await getWorkflowLogs(run.id);

    // 3. 获取详细的错误日志
    const logContent = await getActualLogs(run.id);

    // 4. 分析错误
    const errors = analyzeError(logContent);

    // 5. 生成报告
    if (errors) {
      console.log('\n' + '='.repeat(60));
      console.log('📊 错误分析报告');
      console.log('='.repeat(60));
      console.log(`\n工作流 URL: ${run.html_url}`);
      console.log(`运行 ID: ${run.id}\n`);

      // 保存报告
      const reportPath = path.join(process.cwd(), 'workflow-error-report.md');
      const reportContent = `# 工作流错误报告

**时间:** ${new Date().toLocaleString('zh-CN')}
**工作流:** ${CONFIG.workflow}
**运行 ID:** ${run.id}
**状态:** ${run.status}
**结论:** ${run.conclusion}
**URL:** ${run.html_url}

## 识别到的错误

${errors.map((error, i) => `
### ${i + 1}. ${error.type.toUpperCase()} 错误

**描述:** ${error.description}

**修复建议:**
${error.fix.map((f, j) => `- ${f}`).join('\n')}
`).join('\n')}

## 日志片段

\`\`\`
${logContent.slice(0, 500)}...
\`\`\`

---

建议:
1. 根据上述修复建议逐一修复
2. 修复后提交代码并推送
3. 再次运行此脚本验证修复
`;

      fs.writeFileSync(reportPath, reportContent, 'utf-8');
      console.log(`\n✅ 错误报告已保存到: ${reportPath}`);
    }

    console.log('\n' + '='.repeat(60));
    console.log('💡 提示: 你可以运行以下命令查看详细日志:');
    console.log(`   gh run view ${run.id} --log-failed`);
    console.log('='.repeat(60));

  } catch (error) {
    console.error('\n❌ 错误:', error.message);
    console.error('\n堆栈:', error.stack);
    process.exit(1);
  }
}

// 运行主函数
if (require.main === module) {
  main().catch(error => {
    console.error('\n💥 致命错误:', error);
    process.exit(1);
  });
}

module.exports = { main, monitorWorkflow, analyzeError };
