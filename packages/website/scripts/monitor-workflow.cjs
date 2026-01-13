#!/usr/bin/env node

/**
 * 工作流监控脚本
 * 自动检查 GitHub Actions 工作流状态，直到成功运行为止
 */

const https = require('https');

const REPO_OWNER = 'firerlAGI';
const REPO_NAME = 'firerlAGI.github.io';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

function fetch(url) {
  return new Promise((resolve, reject) => {
    const headers = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'workflow-monitor',
    };

    if (GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
    }

    https.get(url, { headers }, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    }).on('error', reject);
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function monitorWorkflow() {
  console.log('🔍 开始监控工作流状态...\n');

  let lastRunNumber = 0;
  let attemptCount = 0;
  const maxAttempts = 20; // 最多检查20次

  while (attemptCount < maxAttempts) {
    attemptCount++;
    console.log(`\n📊 第 ${attemptCount} 次检查 (${new Date().toLocaleTimeString()})`);

    try {
      // 获取最新的工作流运行
      const workflowData = await fetch(
        `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/actions/runs?per_page=5`
      );

      const runs = workflowData.workflow_runs || [];
      if (runs.length === 0) {
        console.log('❌ 未找到工作流运行记录');
        await sleep(10000);
        continue;
      }

      const latestRun = runs[0];
      
      // 每次都更新最新运行号（即使相同）
      console.log(`\n📌 当前工作流 #${latestRun.run_number}`);
      console.log(`   状态: ${latestRun.status}`);
      console.log(`   结论: ${latestRun.conclusion || '运行中'}`);
      console.log(`   时间: ${latestRun.created_at}`);
      console.log(`   URL: ${latestRun.html_url}`);
      
      lastRunNumber = latestRun.run_number;

      const status = latestRun.status;
      const conclusion = latestRun.conclusion;

      if (status === 'completed') {
        if (conclusion === 'success') {
          console.log('\n✅ 工作流运行成功！');
          console.log(`   工作流 #${latestRun.run_number} 已成功完成`);
          console.log(`   部署URL: https://${REPO_OWNER}.github.io/${REPO_NAME}`);
          return true;
        } else {
          console.log(`\n❌ 工作流运行失败: ${conclusion}`);
          console.log(`   工作流 #${latestRun.run_number}`);
          console.log(`   请查看日志: ${latestRun.html_url}`);
          
          // 尝试获取错误日志
          try {
            const jobsUrl = latestRun.jobs_url;
            const jobsData = await fetch(jobsUrl);
            const jobs = jobsData.jobs || [];
            
            if (jobs.length > 0) {
              const job = jobs[0];
              console.log(`\n   作业: ${job.name}`);
              console.log(`   状态: ${job.conclusion}`);
              console.log(`   日志URL: ${job.html_url}`);
            }
          } catch (err) {
            console.log(`   无法获取作业详情: ${err.message}`);
          }
          
          return false;
        }
      } else if (status === 'in_progress' || status === 'queued') {
        console.log(`   ⏳ 工作流正在${status === 'queued' ? '排队' : '运行'}中...`);
      }

      // 等待后再次检查
      console.log(`   ⏱️  等待15秒后再次检查...`);
      await sleep(15000);

    } catch (error) {
      console.error(`   ❌ 检查失败: ${error.message}`);
      await sleep(10000);
    }
  }

  console.log(`\n⚠️  已达到最大检查次数 (${maxAttempts} 次)`);
  console.log('   请手动检查工作流状态:');
  console.log(`   https://github.com/${REPO_OWNER}/${REPO_NAME}/actions`);
  return false;
}

// 运行监控
monitorWorkflow()
  .then(success => {
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('监控失败:', error);
    process.exit(1);
  });
