# GitHub Actions 工作流监控和自动修复指南

## 概述

这个工具可以自动监控 GitHub Actions 工作流的运行状态，并在失败时分析错误日志，提供修复建议。

## 功能特性

✅ **自动监控**: 实时监控工作流运行状态  
✅ **错误分析**: 自动识别常见错误模式  
✅ **修复建议**: 针对每种错误提供具体的修复步骤  
✅ **报告生成**: 自动生成 Markdown 格式的错误报告  
✅ **API 集成**: 使用 GitHub API 获取工作流信息

## 安装和配置

### 1. 创建 GitHub Personal Access Token

1. 访问 https://github.com/settings/tokens
2. 点击 "Generate new token" → "Generate new token (classic)"
3. 配置 Token:
   - **Note**: Workflow Monitor
   - **Expiration**: 选择过期时间（建议 30 天或更长时间）
   - **Select scopes**: 勾选 `repo` 权限
4. 点击 "Generate token" 并复制生成的 token

### 2. 设置环境变量

在项目根目录创建 `.env` 文件：

```bash
# .env
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

或者在运行时设置：

```bash
export GITHUB_TOKEN=your_token_here
```

### 3. 配置脚本

编辑 `packages/website/scripts/monitor-and-fix-workflow.js` 中的配置：

```javascript
const CONFIG = {
  owner: 'your-username',        // GitHub 用户名
  repo: 'your-repo',            // 仓库名
  workflow: 'deploy.yml',       // 工作流文件名
  branch: 'main',               // 监控的分支
  pollInterval: 30000,          // 轮询间隔（毫秒）
  maxWaitTime: 600000,          // 最大等待时间（毫秒）
};
```

## 使用方法

### 方法 1: 使用 npm 脚本（推荐）

1. 更新 `packages/website/package.json`，添加脚本命令：

```json
{
  "scripts": {
    "workflow:monitor": "node scripts/monitor-and-fix-workflow.js",
    "workflow:check": "node scripts/monitor-and-fix-workflow.js"
  }
}
```

2. 运行监控：

```bash
# 进入 website 目录
cd packages/website

# 运行监控脚本
npm run workflow:monitor
```

### 方法 2: 直接运行

```bash
# 设置环境变量
export GITHUB_TOKEN=your_token_here

# 运行脚本
node packages/website/scripts/monitor-and-fix-workflow.js
```

## 工作流程

### 1. 自动监控工作流

脚本会自动执行以下步骤：

```
1. 获取最新的工作流运行
   ↓
2. 如果工作流正在运行，开始监控
   ↓
3. 等待工作流完成
   ↓
4. 如果失败，获取错误日志
   ↓
5. 分析错误模式
   ↓
6. 生成修复建议和报告
```

### 2. 输出示例

```
🚀 GitHub Actions 工作流监控工具

仓库: firerlAGI/firerlAGI.github.io
工作流: deploy.yml
分支: main

📊 获取最新的工作流运行...
   运行 ID: 1234567890
   触发时间: 2026/1/13 11:00:00
   状态: in_progress
   结论: 运行中

⏱️  工作流正在运行，开始监控...

⏳ [30s] 状态: in_progress...
⏳ [60s] 状态: in_progress...
⏳ [90s] 状态: completed...

✅ 工作流完成！
   最终状态: failure

❌ 工作流失败！

📝 获取工作流 #1234567890 的日志...
📥 获取详细日志...

🔍 分析错误...

📋 识别到的错误:

1. ESBUILD 错误
   esbuild 解析错误，通常是模板字符串或动态属性问题
   
   修复建议:
   1. 检查 Astro 组件中是否使用了复杂的模板字符串
   2. 检查是否使用了动态 HTML 标签属性（如 as="h2"）
   3. 改用 Astro 的 class: 指令进行条件类绑定
   4. 使用条件渲染替代动态标签

============================================================
📊 错误分析报告
============================================================

工作流 URL: https://github.com/firerlAGI/firerlAGI.github.io/actions/runs/1234567890
运行 ID: 1234567890

✅ 错误报告已保存到: /Users/fire/Projects/githubhome/workflow-error-report.md

============================================================
💡 提示: 你可以运行以下命令查看详细日志:
   gh run view 1234567890 --log-failed
============================================================
```

## 支持的错误类型

脚本可以识别以下常见错误：

### 1. esbuild 错误
**错误模式**: `Expected ";" but found "id"`

**修复建议**:
- 检查 Astro 组件中是否使用了复杂的模板字符串
- 检查是否使用了动态 HTML 标签属性（如 `as="h2"`）
- 改用 Astro 的 `class:` 指令进行条件类绑定
- 使用条件渲染替代动态标签

### 2. SSR 兼容性错误
**错误模式**: `useLanguageContext`

**修复建议**:
- 移除 Astro 组件中的 `useLanguageContext` 调用
- 改用直接导入 `translations` 并使用固定语言
- 只在客户端 React 组件中使用 Context API

### 3. ES 模块错误
**错误模式**: `require is not defined`

**修复建议**:
- 将 `.js` 文件重命名为 `.cjs`
- 或改用 `import/export` 语法
- 更新 `package.json` 中的文件引用

### 4. 文件路径错误
**错误模式**: `ENOENT: no such file or directory`

**修复建议**:
- 使用 `process.cwd()` 替代 `__dirname`
- 确保路径相对于工作目录
- 检查文件是否存在于正确的位置

## 错误报告

脚本会自动生成 Markdown 格式的错误报告，保存在项目根目录：

```markdown
# 工作流错误报告

**时间:** 2026/1/13 11:30:00
**工作流:** deploy.yml
**运行 ID:** 1234567890
**状态:** completed
**结论:** failure
**URL:** https://github.com/firerlAGI/firerlAGI.github.io/actions/runs/1234567890

## 识别到的错误

### 1. ESBUILD 错误

**描述:** esbuild 解析错误，通常是模板字符串或动态属性问题

**修复建议:**
- 检查 Astro 组件中是否使用了复杂的模板字符串
- 检查是否使用了动态 HTML 标签属性（如 as="h2"）
- 改用 Astro 的 class: 指令进行条件类绑定
- 使用条件渲染替代动态标签

## 日志片段

```
[ERROR] Expected ";" but found "id"
...
```

---

建议:
1. 根据上述修复建议逐一修复
2. 修复后提交代码并推送
3. 再次运行此脚本验证修复
```

## 高级用法

### 自定义错误模式

编辑 `scripts/monitor-and-fix-workflow.js` 中的 `commonErrors` 对象：

```javascript
const commonErrors = {
  'your error pattern': {
    type: 'ERROR_TYPE',
    description: 'Error description',
    fix: [
      'Fix step 1',
      'Fix step 2',
    ],
  },
};
```

### 集成到 CI/CD 流程

在 `.github/workflows/deploy.yml` 中添加：

```yaml
jobs:
  build:
    steps:
      # ... 其他步骤
      
      - name: Monitor workflow
        if: failure()
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          cd packages/website
          npm run workflow:monitor || true
```

### 定时检查

使用 cron 定期检查工作流状态：

```bash
# 每小时检查一次
0 * * * * cd /path/to/project && export GITHUB_TOKEN=xxx && npm run workflow:monitor
```

## 故障排除

### 问题：无法获取工作流信息

**解决方案**:
1. 检查 `GITHUB_TOKEN` 是否正确设置
2. 确认 Token 有 `repo` 权限
3. 检查仓库配置是否正确

### 问题：API 速率限制

**解决方案**:
1. GitHub API 有速率限制（未认证：60次/小时，已认证：5000次/小时）
2. 使用认证的 Token 可以大大提高限制
3. 减少轮询频率，增加 `pollInterval`

### 问题：无法识别错误

**解决方案**:
1. 查看 GitHub Actions 网页上的完整日志
2. 手动分析错误信息
3. 考虑在 `commonErrors` 中添加新的错误模式

## 最佳实践

1. **定期检查**: 每次推送代码后运行监控脚本
2. **保存报告**: 保留错误报告作为历史记录
3. **持续改进**: 根据新的错误类型更新错误模式库
4. **团队协作**: 分享错误报告给团队成员
5. **自动化**: 考虑集成到 CI/CD 流程中

## 相关资源

- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [GitHub API 文档](https://docs.github.com/en/rest)
- [esbuild 文档](https://esbuild.github.io/)
- [Astro 文档](https://docs.astro.build/)

## 许可证

MIT License
