## GitHub Pages 部署计划

### 当前状态分析

* 项目位于本地 monorepo 结构

* 网站文件在 `packages/website/public/` 目录

* 未配置 GitHub 远程仓库

* 未设置 GitHub Actions CI/CD

### 部署步骤

#### 步骤 1: 创建 GitHub 仓库

* 在 GitHub 上创建新仓库（仓库名建议：`githubhome`）

* 初始化为 Public 仓库（GitHub Pages 需要）

#### 步骤 2: 配置 Git 远程仓库

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/<your-username>/githubhome.git
git branch -M main
git push -u origin main
```

#### 步骤 3: 创建 GitHub Actions Workflow

创建 `.github/workflows/deploy.yml` 文件，配置：

* 触发条件：push 到 main 分支

* 自动部署 `packages/website/public/` 到 GitHub Pages

* 使用 GitHub 官方 Pages action

#### 步骤 4: 推送代码触发部署

* 将 workflow 文件提交并推送到 GitHub

* 自动触发部署流程

* 访问 `https://<your-username>.github.io/githubhome/` 查看网站

### 配置文件内容概要

**`.github/workflows/deploy.yml`**:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./packages/website/public
      - uses: actions/deploy-pages@v4
```

### 最终访问地址

```
https://<your-username>.github.io/githubhome/
```

### 注意事项

1. 首次部署需要在 GitHub 仓库设置中启用 Pages 功能
2. 确保仓库设置为 Public（GitHub Pages 对私有仓库有限制）
3. 部署通常需要 1-3 分钟完成

