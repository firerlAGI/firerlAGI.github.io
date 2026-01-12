# GitHub Pages 配置详细指南

## 方法一：通过仓库主页访问

### 步骤 1：打开仓库
访问：https://github.com/firerlAGI/firerlAGI.github.io

### 步骤 2：进入设置页面

**方式 A：通过顶部菜单**
1. 点击仓库顶部导航栏的 **Settings**（设置）标签
2. 如果是中文界面，显示为"设置"

**方式 B：通过侧边栏**
1. 在仓库主页左侧，点击 **Settings**
2. 在左侧边栏中找到 "Pages" 选项

**方式 C：通过 GitHub URL**
直接访问：https://github.com/firerlAGI/firerlAGI.github.io/settings/pages

### 步骤 3：配置 GitHub Pages

在 Pages 设置页面中：

1. 找到 **Build and deployment**（构建和部署）部分
2. 在 **Source**（源）下拉菜单中：
   - 选择 **GitHub Actions**
   - 如果是中文界面，选择"GitHub Actions"
3. 点击 **Save**（保存）按钮

如果看到以下选项，说明找对位置了：
- Source: [下拉菜单]
- Branch: [默认会显示]
- 或者：Build and deployment -> Source

## 方法二：直接访问 URL

最简单的方式是直接访问以下链接：
- **英文界面**：https://github.com/firerlAGI/firerlAGI.github.io/settings/pages
- **中文界面**：https://github.com/firerlAGI/firerlAGI.github.io/settings/pages

如果链接无法打开，说明：
1. 您可能没有登录 GitHub
2. 仓库名称可能不正确
3. 您没有该仓库的访问权限

## 方法三：通过 Actions 标签（如果 Pages 选项不可见）

如果在设置中找不到 Pages 选项：

1. 访问仓库：https://github.com/firerlAGI/firerlAGI.github.io
2. 点击 **Actions** 标签
3. 查看是否有工作流正在运行
4. 如果有工作流，点击进入查看详情

## 常见问题

### 问题 1：找不到 Pages 选项

**可能原因**：
- 仓库是私有的（需要公开仓库）
- 您没有管理员权限
- GitHub 界面版本不同

**解决方案**：
1. 确认仓库是公开的（Public）
   - 访问 Settings -> General
   - 检查 "Danger Zone" -> "Change repository visibility"
   - 确保选择 Public

2. 确认您有管理员权限
   - 访问 Settings -> Collaborators
   - 查看您的权限级别

### 问题 2：Source 下拉菜单中没有 GitHub Actions 选项

**可能原因**：
- GitHub 账户未启用 Actions
- 仓库中没有 `.github/workflows/` 目录

**解决方案**：
1. 确认工作流文件存在
   - 访问：https://github.com/firerlAGI/firerlAGI.github.io/tree/main/.github/workflows
   - 应该看到 `deploy.yml` 文件

2. 如果工作流文件不存在，需要重新推送
   ```bash
   cd /Users/fire/Projects/githubhome
   git add .
   git commit -m "Add workflow files"
   git push
   ```

### 问题 3：使用旧版 GitHub Pages 设置

如果界面显示不同的选项：

**旧版界面**：
- Source: Deploy from a branch
- Branch: main / (root)
- 点击 Save

**新版界面**：
- Source: GitHub Actions
- 点击 Save

## 配置成功后的标志

配置成功后，您应该看到：

1. **工作流自动运行**
   - 访问 Actions 标签
   - 看到 "Deploy to GitHub Pages" 工作流开始运行
   - 状态从 "Queued" -> "In progress" -> "Completed"

2. **部署完成提示**
   - Actions 显示绿色对勾 ✓
   - 点击工作流详情可以看到部署链接

3. **网站可以访问**
   - 访问：https://firerlAGI.github.io
   - 看到您的网站

## 如果仍然找不到

### 检查仓库状态

1. 访问：https://github.com/firerlAGI/firerlAGI.github.io
2. 检查仓库是否是公开的
3. 检查是否有 README.md 文件
4. 检查是否有 `.github/workflows/deploy.yml` 文件

### 使用替代方案

如果 GitHub Pages 配置有问题，可以使用以下替代方案：

#### 方案 A：手动构建和部署
1. 在本地安装 Node.js 和依赖
2. 运行 `npm run build`
3. 将 `dist/` 目录的内容推送到 `gh-pages` 分支

#### 方案 B：使用 Vercel 或 Netlify
1. 导入 GitHub 仓库
2. 配置自动部署
3. 获得免费域名

#### 方案 C：使用 GitHub Codespaces
1. 在 GitHub 上创建 Codespace
2. 在线预览和部署

## 截图参考

### 仓库设置页面
```
[firerlAGI/firerlAGI.github.io]
[ Code ] [ Issues ] [ Pull requests ] [ Actions ] [ Projects ] [ Wiki ]
[ Settings ]
```

### Pages 选项位置
```
Settings -> General
  -> Code and automation
    -> [ Pages ]  <- 点击这里
```

### Pages 配置
```
GitHub Pages
┌─────────────────────────────────────┐
│ Build and deployment                │
│ Source: [GitHub Actions ▼]          │
│                                   │
│ [ Save ]                           │
└─────────────────────────────────────┘
```

## 获取帮助

如果仍然有问题：

1. **查看 GitHub 官方文档**
   - https://docs.github.com/en/pages

2. **搜索 GitHub 社区**
   - https://github.community/

3. **联系 GitHub 支持**
   - https://support.github.com/

## 快速检查清单

在继续之前，请确认：

- [ ] 仓库是公开的（Public）
- [ ] 仓库名称是 `firerlAGI.github.io`
- [ ] 有 `.github/workflows/deploy.yml` 文件
- [ ] 您有仓库的管理员权限
- [ ] 已登录 GitHub 账户

## 下一步

配置成功后：

1. 访问 **Actions** 标签查看部署进度
2. 等待 2-3 分钟完成部署
3. 访问 https://firerlAGI.github.io 查看网站
4. 如果需要修改代码，推送到 main 分支会自动触发重新部署
