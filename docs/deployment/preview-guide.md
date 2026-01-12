# 本地预览指南

## 前置条件

1. 已安装 Node.js（推荐 v18 或更高版本）
2. 已安装 npm 或 pnpm
3. 项目代码已下载到本地

## 快速开始

### 方法一：使用 npm

```bash
# 1. 进入项目目录
cd packages/website

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev
```

开发服务器将在 http://localhost:4321 启动

### 方法二：使用 pnpm

```bash
# 1. 进入项目目录
cd packages/website

# 2. 安装依赖
pnpm install

# 3. 启动开发服务器
pnpm run dev
```

开发服务器将在 http://localhost:4321 启动

## 预览生产版本

### 构建项目

```bash
# 1. 构建生产版本
npm run build

# 2. 预览构建结果
npm run preview
```

预览服务器将在 http://localhost:4321 启动

## 项目结构预览

### 访问的页面

- **首页**: http://localhost:4321/
- **GitHub API**: http://localhost:4321/api/github-stats.json

### 主要区块

1. **英雄区（Hero）** - 顶部视频背景区域
2. **项目展示区（Projects）** - 精选项目卡片
3. **技术足迹（GitHub）** - GitHub 统计数据
4. **关于我（About）** - 个人介绍
5. **联系我（Contact）** - 联系表单

## 功能预览清单

### ✅ 主题切换
- 点击导航栏的主题切换按钮
- 观察深色/浅色主题切换
- 刷新页面，检查主题是否保持

### ✅ 平滑滚动
- 点击导航栏的链接
- 观察页面平滑滚动到对应区块

### ✅ 动画效果
- 滚动页面，观察元素渐入动画
- 悬停在卡片上，观察悬停效果
- 检查按钮的交互效果

### ✅ 响应式设计
- 调整浏览器窗口大小
- 观察布局在不同屏幕尺寸下的表现
- 测试移动端视图（使用浏览器开发者工具）

### ✅ GitHub API 数据
- 查看技术足迹区块
- 检查是否显示实时数据
- 如果 API 失败，应显示静态数据

## 浏览器开发者工具

### 检查元素
1. 打开开发者工具（F12 或 Cmd+Option+I）
2. 检查元素结构和样式
3. 验证主题类（`data-theme="light"` 或 `data-theme="dark"`）

### 检查网络请求
1. 打开 Network 标签
2. 刷新页面
3. 查看资源加载情况
4. 检查 GitHub API 请求状态

### 检查控制台
1. 打开 Console 标签
2. 查看是否有错误或警告
3. 检查脚本是否正常加载

### 性能分析
1. 打开 Lighthouse 标签
2. 运行性能测试
3. 查看性能分数和优化建议

## 常见问题

### 问题 1：端口被占用

**错误信息**：
```
Error: Port 4321 is already in use
```

**解决方案**：
```bash
# 查找占用端口的进程
lsof -i :4321  # macOS/Linux
netstat -ano | findstr :4321  # Windows

# 终止进程或更换端口
# 在 package.json 中修改启动命令，例如：
# "dev": "astro dev --port 3000"
```

### 问题 2：依赖安装失败

**错误信息**：
```
npm ERR! code ENOENT
```

**解决方案**：
```bash
# 清除缓存
npm cache clean --force

# 删除 node_modules 和 package-lock.json
rm -rf node_modules package-lock.json

# 重新安装
npm install
```

### 问题 3：构建失败

**错误信息**：
```
Error: Build failed
```

**解决方案**：
```bash
# 检查 Node.js 版本
node --version  # 应该是 v18 或更高

# 检查依赖
npm install

# 检查 TypeScript 错误
npm run build -- --verbose
```

### 问题 4：主题切换不工作

**检查项**：
1. 检查浏览器是否允许 localStorage
2. 检查控制台是否有错误
3. 检查 `theme-toggle.ts` 是否正确加载

### 问题 5：GitHub API 返回错误

**检查项**：
1. 检查网络请求状态
2. 检查是否配置了 GITHUB_TOKEN
3. 查看降级处理是否正常工作

## 移动端预览

### 使用浏览器开发者工具
1. 打开开发者工具（F12）
2. 点击设备工具栏图标（或按 Cmd+Shift+M）
3. 选择设备类型（iPhone、iPad 等）
4. 调整屏幕尺寸测试响应式布局

### 真实设备测试
1. 确保设备和电脑在同一网络
2. 获取电脑的 IP 地址（使用 `ifconfig` 或 `ipconfig`）
3. 在移动设备浏览器访问 `http://<IP>:4321`

### 注意事项
- 确保防火墙允许端口 4321
- 某些网络可能阻止本地服务器访问

## 性能测试

### Lighthouse 测试
1. 打开 Chrome DevTools
2. 切换到 Lighthouse 标签
3. 选择 "Performance" 和 "Best Practices"
4. 点击 "Analyze page load"
5. 查看分数和建议

### 预期性能指标
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 90+
- **SEO**: 100

## 调试技巧

### 启用详细日志
```bash
# Astro 开发模式
npm run dev -- --verbose

# 构建模式
npm run build -- --verbose
```

### 热模块替换（HMR）
开发服务器支持 HMR，修改文件后会自动刷新：
- 修改 `.astro` 文件会自动刷新
- 修改 CSS 样式会自动更新
- 修改 TypeScript 脚本会自动重新加载

### 断点调试
1. 打开开发者工具 > Sources 标签
2. 找到 `.astro` 或 `.ts` 文件
3. 设置断点
4. 刷新页面触发断点

## 快捷键

### 开发服务器
- `Ctrl+C` 或 `Cmd+C` - 停止服务器
- `R` - 重新加载（某些终端）

### 浏览器开发者工具
- `F12` - 打开/关闭开发者工具
- `Cmd+Option+I` (Mac) - 打开开发者工具
- `Cmd+Shift+C` - 检查元素
- `Cmd+Shift+M` - 切换设备工具栏
- `Cmd+R` - 刷新页面

## 下一步

预览满意后，可以：
1. 将代码推送到 GitHub
2. 配置 GitHub Pages
3. 启用自动部署
4. 访问在线版本

详细的部署步骤请参考 [deployment-guide.md](./deployment-guide.md)
