# GitHub Pages 部署指南

## 前置条件

1. GitHub 仓库已创建
2. 仓库代码已推送到 main 分支
3. GitHub Pages 已启用

## 自动部署配置

项目已配置 GitHub Actions 自动部署工作流，位于 `.github/workflows/deploy.yml`。

### 部署触发条件

- 推送代码到 `main` 分支时自动触发
- 或手动触发（workflow_dispatch）

### 部署流程

1. **构建阶段**
   - 检出代码
   - 安装 Node.js 20
   - 安装依赖
   - 构建项目
   - 上传构建产物

2. **部署阶段**
   - 将构建产物部署到 GitHub Pages

## GitHub Pages 设置

### 1. 启用 GitHub Pages

1. 进入仓库设置页面
2. 点击 "Pages" 选项
3. 在 "Build and deployment" 下：
   - Source: 选择 "GitHub Actions"
   - 保存设置

### 2. 配置 Secrets（可选）

如果需要使用 GitHub API 获取实时数据：

1. 进入仓库设置
2. 点击 "Secrets and variables" > "Actions"
3. 点击 "New repository secret"
4. 添加 `GITHUB_TOKEN`：
   - Name: `GITHUB_TOKEN`
   - Value: 你的 GitHub Personal Access Token
   - 权限需要包含：`read:user`, `read:org`, `read:public_key`

### 3. 创建 GitHub Token

1. 访问 https://github.com/settings/tokens
2. 点击 "Generate new token" > "Generate new token (classic)"
3. 配置权限：
   - `repo` (所有仓库权限)
   - `user` (用户信息)
4. 生成并复制 token
5. 将 token 添加到仓库 Secrets

## 本地构建测试

### 安装依赖

```bash
cd packages/website
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:4321

### 构建生产版本

```bash
npm run build
```

构建产物将生成在 `dist/` 目录。

### 预览构建结果

```bash
npm run preview
```

## 自定义域名（可选）

### 1. 添加 CNAME 文件

在 `packages/website/public/` 目录下创建 `CNAME` 文件：

```
your-custom-domain.com
```

### 2. 配置 DNS

在你的域名提供商处添加 CNAME 记录：

```
Type: CNAME
Name: www
Value: firerlAGI.github.io
```

### 3. 在 GitHub 配置自定义域名

1. 进入仓库设置 > Pages
2. 在 Custom domain 填入你的域名
3. 等待 DNS 生效

## 环境变量配置

### GitHub Actions 环境变量

在 `.github/workflows/deploy.yml` 中已配置：

```yaml
env:
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### 本地开发环境变量

创建 `.env` 文件（不要提交到 Git）：

```
GITHUB_TOKEN=your_github_token_here
```

## 故障排查

### 部署失败

1. 检查 GitHub Actions 日志
2. 确认 Node.js 版本是否正确
3. 检查依赖安装是否成功
4. 验证构建命令是否正常

### 构建错误

1. 本地运行 `npm run build` 测试
2. 检查 TypeScript 类型错误
3. 确认所有依赖已正确安装

### GitHub API 限流

- GitHub API 有速率限制（60次/小时，未认证）
- 使用 Personal Access Token 可提升到 5000次/小时
- 已在代码中实现降级处理，API 失败时使用静态数据

## 性能优化建议

### 图片优化

1. 使用 Astro Image 组件
2. 选择合适的图片格式（WebP、AVIF）
3. 实现图片懒加载

### 代码分割

已配置：
- CSS 代码分离
- 手动代码分割（vendor chunk）

### 缓存策略

- GitHub API 数据缓存 5-10 分钟
- 静态资源使用 CDN 缓存

## 监控和维护

### 检查部署状态

访问 GitHub Actions 页面查看工作流运行状态。

### 更新依赖

定期更新依赖以获得性能改进和安全修复：

```bash
npm update
```

### 监控性能

使用以下工具监控网站性能：
- Lighthouse
- WebPageTest
- GitHub Analytics（如已配置）

## 下一步

- 配置自定义域名
- 添加分析工具（Google Analytics、Vercel Analytics）
- 设置错误监控（Sentry）
- 配置自动化测试
