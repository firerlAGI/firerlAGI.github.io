# 网站改造任务分配与执行批次计划

基于 [网页设计学习技术规划文档](./网页设计学习技术规划文档%20-%20erpanomer.nurverse.com.md)，将当前纯 HTML/CSS/JS 网站升级为现代 Astro + Tailwind CSS 架构。

## 当前项目状态分析

| 维度 | 现状 | 目标 |
|-----|------|------|
| 框架 | 纯 HTML + CSS + JS | Astro |
| CSS 方案 | 原生 CSS (1432 行) | Tailwind CSS |
| 构建工具 | 无构建流程 | Vite (Astro 内置) |
| 部署 | GitHub Pages | Vercel / Cloudflare Pages |
| 包管理 | pnpm workspace | pnpm workspace (保持) |
| 主题系统 | CSS 变量手动切换 | Tailwind dark mode |
| 图片优化 | 原生图片标签 | Astro Image 组件 |
| 组件化 | 无 | Astro 组件系统 |

---

## 执行批次概览

| 批次 | 阶段名称 | 预计时间 | 核心目标 | 任务数 |
|-----|---------|---------|---------|-------|
| P0 | 基础架构搭建 | 3-5 天 | Astro 项目初始化与配置 | 6 |
| P1 | 核心组件迁移 | 5-7 天 | 导航栏、布局、按钮等基础组件 | 8 |
| P2 | 页面内容迁移 | 5-7 天 | Hero、项目、关于、联系等页面 | 10 |
| P3 | 功能模块迁移 | 3-4 天 | GitHub 活动模块、主题切换 | 5 |
| P4 | 优化与部署 | 2-3 天 | 性能优化、SEO、部署配置 | 5 |

**总计：34 个任务，预计 18-26 天完成**

---

## P0 批次：基础架构搭建

**目标**：建立 Astro 项目基础，配置 Tailwind CSS，准备开发环境

| ID | 任务名称 | 优先级 | 负责人 | 预计工时 | 依赖项 | 验收标准 |
|----|---------|-------|--------|---------|--------|---------|
| P0-1 | 初始化 Astro 项目 | P0 | 开发者 | 2h | 无 | `pnpm create astro@latest` 成功，项目可启动 |
| P0-2 | 配置 Tailwind CSS | P0 | 开发者 | 2h | P0-1 | `npx astro add tailwind` 完成，样式生效 |
| P0-3 | 迁移 CSS 变量到 Tailwind 配置 | P0 | 开发者 | 4h | P0-2 | `tailwind.config.js` 包含所有设计令牌 |
| P0-4 | 配置 TypeScript | P1 | 开发者 | 1h | P0-1 | TypeScript 类型检查正常 |
| P0-5 | 设置项目目录结构 | P1 | 开发者 | 1h | P0-1 | 创建 `src/components`、`src/layouts`、`src/pages` |
| P0-6 | 配置主题切换基础 | P1 | 开发者 | 2h | P0-2 | Tailwind `darkMode: 'class'` 配置完成 |

### P0 详细任务说明

#### P0-1: 初始化 Astro 项目

**执行步骤**：
1. 在 `packages/website` 目录下运行 `pnpm create astro@latest . --template minimal`
2. 安装依赖 `pnpm install`
3. 运行开发服务器 `pnpm dev` 确认项目可启动
4. 更新根目录 `package.json` 中的 `dev` 和 `build` 脚本

**注意事项**：
- 选择 `minimal` 模板，避免不必要的默认代码
- 保持 monorepo 结构，不要修改根目录配置

---

#### P0-2: 配置 Tailwind CSS

**执行步骤**：
1. 运行 `npx astro add tailwind`
2. 选择以下配置：
   - 安装 Tailwind CSS
   - 更新 `astro.config.mjs`
   - 创建 `src/styles/global.css`
3. 验证：在任意组件中添加 `bg-blue-500` 类名，确认样式生效

**注意事项**：
- Astro 会自动安装和配置 Tailwind
- 确认 `tailwind.config.mjs` 生成正确

---

#### P0-3: 迁移 CSS 变量到 Tailwind 配置

**执行步骤**：
1. 提取现有 `style.css` 中的所有 CSS 变量
2. 转换为 Tailwind 配置格式
3. 配置 `theme.extend` 部分：

```javascript
// tailwind.config.mjs
export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary)',
          hover: 'var(--primary-hover)',
          active: 'var(--primary-active)',
        },
        // ... 其他颜色
      },
      fontFamily: {
        sans: ['var(--font-family)', 'sans-serif'],
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
      },
      transitionDuration: {
        instant: 'var(--duration-instant)',
        fast: 'var(--duration-fast)',
        medium: 'var(--duration-medium)',
        slow: 'var(--duration-slow)',
        slower: 'var(--duration-slower)',
      },
    },
  },
}
```

4. 创建 `src/styles/variables.css` 保留 CSS 变量定义

**注意事项**：
- 保持 CSS 变量作为底层实现
- Tailwind 类名映射到 CSS 变量，确保主题切换正常工作

---

#### P0-4: 配置 TypeScript

**执行步骤**：
1. 确认 `astro.config.mjs` 中 `typescript` 配置
2. 安装类型定义（如果需要）：
   ```bash
   pnpm add -D @types/node
   ```
3. 运行 `pnpm astro check` 确认无类型错误

---

#### P0-5: 设置项目目录结构

**执行步骤**：
创建以下目录结构：
```
src/
├── components/
│   ├── ui/          # UI 基础组件
│   ├── layout/      # 布局组件
│   └── sections/    # 页面区块组件
├── layouts/
│   └── MainLayout.astro
├── pages/
│   └── index.astro
├── styles/
│   ├── global.css
│   └── variables.css
└── lib/             # 工具函数
```

---

#### P0-6: 配置主题切换基础

**执行步骤**：
1. 更新 `tailwind.config.mjs`：
   ```javascript
   darkMode: 'class',  // 使用 class 策略
   ```
2. 创建 `src/lib/theme.ts` 主题管理工具：
   ```typescript
   export function getTheme(): 'light' | 'dark' {
     if (typeof localStorage !== 'undefined') {
       return localStorage.getItem('theme') as 'light' | 'dark' || 'light';
     }
     return 'light';
   }
   ```
3. 在 `src/layouts/MainLayout.astro` 中添加初始脚本

---

## P1 批次：核心组件迁移

**目标**：将现有 UI 转换为可复用的 Astro 组件

| ID | 任务名称 | 优先级 | 负责人 | 预计工时 | 依赖项 | 验收标准 |
|----|---------|-------|--------|---------|--------|---------|
| P1-1 | 创建 MainLayout 布局组件 | P0 | 开发者 | 3h | P0-5 | 包含 navbar、footer、主题切换脚本 |
| P1-2 | 迁移 Navbar 导航栏组件 | P0 | 开发者 | 3h | P0-6 | 响应式导航、汉堡菜单、主题切换 |
| P1-3 | 迁移 Footer 底部组件 | P1 | 开发者 | 1h | P1-1 | 版权信息、链接正常 |
| P1-4 | 创建 Button 按钮组件 | P1 | 开发者 | 2h | P0-3 | Primary/Secondary 变体、悬停效果 |
| P1-5 | 创建 Card 卡片组件 | P1 | 开发者 | 3h | P0-3 | 大/小尺寸、悬停动画、技术标签 |
| P1-6 | 创建 Section 区块组件 | P2 | 开发者 | 1h | P1-1 | 响应式内边距、标题样式 |
| P1-7 | 创建 Container 容器组件 | P2 | 开发者 | 0.5h | P0-3 | 最大宽度、居中对齐 |
| P1-8 | 创建 Badge 标签组件 | P2 | 开发者 | 1h | P0-3 | 技术标签样式、悬停效果 |

### P1 详细任务说明

#### P1-1: 创建 MainLayout 布局组件

**文件路径**：`src/layouts/MainLayout.astro`

**功能要求**：
- 引入全局 CSS (`src/styles/global.css`)
- 包含 Navbar 组件
- 包含 Footer 组件
- 提供插槽 (`<slot />`) 用于页面内容
- 添加主题初始化脚本（服务端渲染时设置 data-theme）
- 添加 SEO meta 标签

**代码框架**：
```astro
---
import Navbar from '../components/layout/Navbar.astro'
import Footer from '../components/layout/Footer.astro'
import { getTheme } from '../lib/theme'

const theme = getTheme()
---

<!DOCTYPE html>
<html lang="zh-CN" data-theme={theme}>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>firerlAGI - 计算为了无法计算的价值</title>
  </head>
  <body>
    <Navbar />
    <main class="flex-1">
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

---

#### P1-2: 迁移 Navbar 导航栏组件

**文件路径**：`src/components/layout/Navbar.astro`

**功能要求**：
- 固定顶部导航 (`fixed top-0`)
- Logo 链接
- 导航链接（桌面端显示）
- 语言切换按钮
- 主题切换按钮（太阳/月亮图标）
- 汉堡菜单按钮（移动端）
- 移动端菜单抽屉
- 滚动时添加阴影效果

**Tailwind 类名映射**：
```astro
<nav class="fixed top-0 left-0 right-0 h-[52px] bg-[var(--nav-bg)] backdrop-blur-[20px] border-b border-[var(--border-color)] flex items-center justify-between px-[max(48px,5vw)] z-[1000] transition-all duration-300">
```

---

#### P1-3: 迁移 Footer 底部组件

**文件路径**：`src/components/layout/Footer.astro`

**功能要求**：
- 版权信息
- 响应式布局
- 与主题一致的背景色

---

#### P1-4: 创建 Button 按钮组件

**文件路径**：`src/components/ui/Button.astro`

**Props 接口**：
```typescript
interface Props {
  variant?: 'primary' | 'secondary'
  href?: string
  type?: 'button' | 'submit' | 'reset'
  class?: string
}
const { variant = 'primary', href, type = 'button', class: className = '' } = Astro.props
```

**样式映射**：
- Primary: `bg-[var(--primary)] text-white shadow-[var(--shadow-sm)]`
- Secondary: `bg-white/90 text-[var(--text-primary)] border border-[var(--border-color)]`

---

#### P1-5: 创建 Card 卡片组件

**文件路径**：`src/components/ui/Card.astro`

**Props 接口**：
```typescript
interface Props {
  size?: 'large' | 'small'
  icon?: string
  title?: string
  description?: string
  image?: boolean
  techBadges?: string[]
  cta?: string
  class?: string
}
```

**样式要求**：
- 大小变体：large (全宽)、small (4列网格)
- 悬停效果：`translate-y-[-4px] scale-[1.01]`
- 图标悬停：`scale-110 rotate-3`

---

## P2 批次：页面内容迁移

**目标**：将现有页面区块转换为 Astro 页面组件

| ID | 任务名称 | 优先级 | 负责人 | 预计工时 | 依赖项 | 验收标准 |
|----|---------|-------|--------|---------|--------|---------|
| P2-1 | 创建首页页面结构 | P0 | 开发者 | 2h | P1-1 | 使用 MainLayout，路由正常 |
| P2-2 | 迁移 Hero 英雄区块 | P0 | 开发者 | 3h | P0-3 | 视频背景、标题动画、滚动指示器 |
| P2-3 | 迁移 Projects 项目区块 | P1 | 开发者 | 4h | P1-5 | 网格布局、卡片组件集成 |
| P2-4 | 迁移 GitHub 活动区块 | P1 | 开发者 | 4h | P1-5 | 统计卡片、热力图、活动列表 |
| P2-5 | 迁移 About 关于区块 | P1 | 开发者 | 2h | P1-5 | 头像、个人信息、焦点列表 |
| P2-6 | 迁移 Contact 联系区块 | P1 | 开发者 | 2h | P1-5 | 联系方式链接、表单 |
| P2-7 | 创建数据源配置 | P2 | 开发者 | 2h | P2-4 | 项目数据、GitHub API 配置 |
| P2-8 | 迁移主题切换脚本 | P1 | 开发者 | 2h | P0-6 | JavaScript 逻辑转换 |
| P2-9 | 迁移语言切换功能 | P2 | 开发者 | 3h | P1-2 | i18n 基础实现 |
| P2-10 | 平滑滚动与锚点 | P2 | 开发者 | 1h | P2-1 | 导航链接跳转正常 |

### P2 详细任务说明

#### P2-1: 创建首页页面结构

**文件路径**：`src/pages/index.astro`

**功能要求**：
- 使用 MainLayout
- 包含所有页面区块
- 按照原 HTML 结构组织内容

**代码框架**：
```astro
---
import MainLayout from '../layouts/MainLayout.astro'
import HeroSection from '../components/sections/HeroSection.astro'
import ProjectsSection from '../components/sections/ProjectsSection.astro'
import GithubSection from '../components/sections/GithubSection.astro'
import AboutSection from '../components/sections/AboutSection.astro'
import ContactSection from '../components/sections/ContactSection.astro'
---

<MainLayout>
  <HeroSection />
  <ProjectsSection />
  <GithubSection />
  <AboutSection />
  <ContactSection />
</MainLayout>
```

---

#### P2-2: 迁移 Hero 英雄区块

**文件路径**：`src/components/sections/HeroSection.astro`

**功能要求**：
- 视频背景（使用 `<video>` 标签）
- 标题和副标题
- 按钮组
- 滚动指示器
- 进入动画（淡入上浮）

**关键样式**：
```astro
<section class="min-h-[90vh] relative flex items-center justify-center overflow-hidden">
  <video class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full object-cover" autoplay muted loop playsinline>
    <source src="/hero-bg.mp4" type="video/mp4">
  </video>
</section>
```

---

#### P2-3: 迁移 Projects 项目区块

**文件路径**：`src/components/sections/ProjectsSection.astro`

**功能要求**：
- 使用 Card 组件
- 网格布局（大卡片 12 列，小卡片 4 列）
- 从数据源读取项目信息
- 响应式适配

**数据源示例**（`src/data/projects.ts`）：
```typescript
export const projects = [
  {
    id: 'second-brain',
    icon: '🧠',
    title: '第二大脑',
    description: 'AI 驱动的个人知识管理系统...',
    techBadges: ['AI', '知识图谱', 'NLP', '机器学习'],
    size: 'large',
    image: true,
  },
  // ... 其他项目
]
```

---

#### P2-4: 迁移 GitHub 活动区块

**文件路径**：`src/components/sections/GithubSection.astro`

**功能要求**：
- 统计卡片（提交、仓库、星标）
- 贡献热力图
- 活动列表
- 事件过滤器

**客户端脚本**：
- 创建 `src/components/sections/GithubSection.ts` 或使用 Client 指令
- 集成现有的 `github-activity.js` 逻辑

---

#### P2-7: 创建数据源配置

**文件结构**：
```
src/data/
├── projects.ts      # 项目数据
├── github.ts        # GitHub API 配置
├── i18n.ts          # 国际化配置
└── theme.ts         # 主题配置
```

**projects.ts 示例**：
```typescript
export interface Project {
  id: string
  icon: string
  title: {
    zh: string
    en: string
  }
  description: {
    zh: string
    en: string
  }
  techBadges: string[]
  size: 'large' | 'small'
  image?: boolean
  cta?: string
}

export const projects: Project[] = [
  {
    id: 'second-brain',
    icon: '🧠',
    title: {
      zh: '第二大脑',
      en: 'Second Brain',
    },
    description: {
      zh: 'AI 驱动的个人知识管理系统，帮助你构建高效的知识网络，提升学习与创造效率。',
      en: 'AI-powered personal knowledge management system...',
    },
    techBadges: ['AI', '知识图谱', 'NLP', '机器学习'],
    size: 'large',
    image: true,
  },
  // ... 其他项目
]
```

---

## P3 批次：功能模块迁移

**目标**：迁移 JavaScript 功能模块

| ID | 任务名称 | 优先级 | 负责人 | 预计工时 | 依赖项 | 验收标准 |
|----|---------|-------|--------|---------|--------|---------|
| P3-1 | 迁移主题切换逻辑 | P0 | 开发者 | 2h | P0-6 | localStorage 存取、class 切换 |
| P3-2 | 迁移语言切换逻辑 | P1 | 开发者 | 3h | P2-9 | 中英文切换、localStorage 持久化 |
| P3-3 | 迁移 GitHub 活动加载 | P1 | 开发者 | 3h | P2-4 | API 调用、数据渲染、错误处理 |
| P3-4 | 迁移滚动动画效果 | P2 | 开发者 | 2h | P2-1 | Intersection Observer API |
| P3-5 | 迁移导航交互效果 | P2 | 开发者 | 1h | P1-2 | 滚动阴影、平滑滚动 |

### P3 详细任务说明

#### P3-1: 迁移主题切换逻辑

**文件路径**：`src/components/layout/Navbar.astro` (内联脚本)

**功能要求**：
```typescript
<script>
  function toggleTheme() {
    const html = document.documentElement
    const currentTheme = html.getAttribute('data-theme')
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
    html.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

  document.getElementById('themeToggle')?.addEventListener('click', toggleTheme)
</script>
```

---

#### P3-2: 迁移语言切换逻辑

**文件路径**：`src/lib/i18n.ts`

**功能要求**：
- 支持中英文切换
- localStorage 持久化
- 更新页面文本内容

**i18n 配置**：
```typescript
export const i18n = {
  zh: {
    nav: {
      projects: '个人项目',
      about: '关于我',
      contact: '联系我',
    },
    projects: {
      title: '精选项目',
      // ... 其他翻译
    },
  },
  en: {
    nav: {
      projects: 'Projects',
      about: 'About',
      contact: 'Contact',
    },
    projects: {
      title: 'Featured Projects',
      // ... other translations
    },
  },
}
```

---

## P4 批次：优化与部署

**目标**：性能优化、SEO 配置、生产部署

| ID | 任务名称 | 优先级 | 负责人 | 预计工时 | 依赖项 | 验收标准 |
|----|---------|-------|--------|---------|--------|---------|
| P4-1 | 图片优化配置 | P1 | 开发者 | 2h | P2-2 | 使用 Astro Image 组件 |
| P4-2 | SEO 元数据配置 | P1 | 开发者 | 2h | P1-1 | Open Graph、Twitter Card |
| P4-3 | 性能优化检查 | P2 | 开发者 | 2h | P4-1 | Lighthouse 评分 90+ |
| P4-4 | Vercel 部署配置 | P0 | 开发者 | 1h | P0-1 | 成功部署到 Vercel |
| P4-5 | 域名与 HTTPS | P2 | 开发者 | 2h | P4-4 | 自定义域名、SSL 证书 |

### P4 详细任务说明

#### P4-1: 图片优化配置

**执行步骤**：
1. 安装图片优化服务（可选）：
   ```bash
   pnpm add @astrojs/image
   npx astro add image
   ```
2. 将图片标签转换为 Astro Image 组件：
   ```astro
   ---
   import { Image } from 'astro:assets'
   import heroBg from '/hero-bg.png'
   ---
   <Image src={heroBg} alt="Hero Background" width={1920} height={1080} />
   ```
3. 配置图片优化选项

**注意事项**：
- Astro 4+ 内置图片优化，无需额外安装
- 确保 `public/` 目录中的图片正确引用

---

#### P4-2: SEO 元数据配置

**文件路径**：`src/layouts/MainLayout.astro`

**元数据**：
```astro
---
interface Props {
  title?: string
  description?: string
  image?: string
}

const {
  title = 'firerlAGI - 计算为了无法计算的价值',
  description = '探索 AI、知识管理与创造力边界的个人作品集',
  image = 'https://github.com/firerlAGI/firerlAGI-preview/raw/main/images/hero-bg.png',
} = Astro.props
---

<meta name="description" content={description} />
<meta property="og:type" content="website" />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={image} />
<meta property="og:url" content="https://firerlAGI.github.io" />
<meta property="og:site_name" content="firerlAGI" />
<meta property="og:locale" content="zh_CN" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={image} />

<meta name="theme-color" content="#007AFF" />
```

---

#### P4-4: Vercel 部署配置

**执行步骤**：
1. 创建 `vercel.json` 配置文件：
   ```json
   {
     "buildCommand": "pnpm build",
     "outputDirectory": "packages/website/dist",
     "installCommand": "pnpm install"
   }
   ```
2. 连接 Vercel 账号
3. 导入 GitHub 仓库
4. 配置构建命令和输出目录
5. 部署预览环境
6. 配置生产环境域名

**注意事项**：
- 确保 `packages/website/package.json` 中有 `build` 脚本
- Astro 默认输出到 `dist/` 目录
- Vercel 会自动检测 Astro 项目

---

## 任务依赖关系图

```
P0-1 (Astro 初始化)
  ├─> P0-2 (Tailwind 配置)
  │     ├─> P0-3 (CSS 变量迁移)
  │     │     ├─> P1-4 (Button 组件)
  │     │     ├─> P1-5 (Card 组件)
  │     │     ├─> P1-7 (Container 组件)
  │     │     └─> P2-2 (Hero 区块)
  │     ├─> P0-6 (主题切换基础)
  │     │     ├─> P1-2 (Navbar 组件)
  │     │     │     ├─> P3-1 (主题切换逻辑)
  │     │     │     ├─> P3-2 (语言切换逻辑)
  │     │     │     └─> P3-5 (导航交互)
  │     │     └─> P2-1 (首页结构)
  │     │           ├─> P2-3 (Projects 区块)
  │     │           ├─> P2-4 (GitHub 区块)
  │     │           │     └─> P3-3 (GitHub 加载)
  │     │           ├─> P2-5 (About 区块)
  │     │           ├─> P2-6 (Contact 区块)
  │     │           ├─> P2-7 (数据源配置)
  │     │           ├─> P2-8 (主题脚本)
  │     │           ├─> P2-9 (语言切换)
  │     │           └─> P2-10 (平滑滚动)
  │     │                 └─> P3-4 (滚动动画)
  ├─> P0-4 (TypeScript 配置)
  ├─> P0-5 (目录结构)
  │     └─> P1-1 (MainLayout)
  │           ├─> P1-3 (Footer)
  │           └─> P2-1 (首页结构)
  └─> P1-6 (Section 组件)
        └─> P2-3~P2-6 (各区块)

P4 (优化与部署)
  ├─> P4-1 (图片优化) 依赖 P2-2
  ├─> P4-2 (SEO 配置) 依赖 P1-1
  ├─> P4-3 (性能检查) 依赖 P4-1
  ├─> P4-4 (Vercel 部署) 依赖 P0-1
  └─> P4-5 (域名配置) 依赖 P4-4
```

---

## 执行时间线

| 周次 | 批次 | 主要任务 | 里程碑 |
|-----|------|---------|-------|
| 第1周 | P0 | Astro 初始化、Tailwind 配置、CSS 变量迁移 | 项目可启动，样式系统就绪 |
| 第2周 | P1 | 布局组件、UI 基础组件 | 组件库完成 |
| 第3周 | P2 | 页面区块迁移、数据源配置 | 首页内容完成 |
| 第4周 | P3 | JavaScript 功能迁移 | 交互功能完成 |
| 第5周 | P4 | 性能优化、SEO、部署 | 项目上线 |

---

## 验收标准总览

### P0 批次验收
- [ ] Astro 开发服务器正常启动
- [ ] Tailwind CSS 类名生效
- [ ] CSS 变量正确映射到 Tailwind 配置
- [ ] TypeScript 类型检查通过
- [ ] 项目目录结构符合规范
- [ ] 主题切换基础配置完成

### P1 批次验收
- [ ] MainLayout 布局组件正常工作
- [ ] Navbar 导航栏响应式适配
- [ ] Footer 底部显示正确
- [ ] Button 组件变体正常
- [ ] Card 组件尺寸变体正常
- [ ] 所有组件支持暗色模式

### P2 批次验收
- [ ] 首页所有区块显示正常
- [ ] Hero 视频背景加载正常
- [ ] 项目卡片网格布局正确
- [ ] GitHub 活动区块结构完整
- [ ] 数据源配置正确
- [ ] 多语言文本显示正常

### P3 批次验收
- [ ] 主题切换功能正常
- [ ] 语言切换功能正常
- [ ] GitHub 活动数据加载正常
- [ ] 滚动动画效果正常
- [ ] 所有交互响应流畅

### P4 批次验收
- [ ] 图片优化生效
- [ ] Lighthouse 性能评分 ≥ 90
- [ ] SEO 元数据完整
- [ ] Vercel 部署成功
- [ ] 自定义域名正常访问

---

## 风险与应对

| 风险 | 影响 | 概率 | 应对措施 |
|-----|------|------|---------|
| Tailwind 配置迁移复杂 | 中 | 中 | 保留 CSS 变量，仅映射类名 |
| 交互脚本兼容性问题 | 中 | 低 | 使用 Astro Client 指令 |
| GitHub API 限制 | 低 | 中 | 实现缓存机制，减少请求 |
| Vercel 部署配置问题 | 低 | 低 | 参考官方文档，使用预设配置 |
| 主题切换闪烁问题 | 中 | 低 | 服务端渲染初始主题 |

---

## 技术栈总结

| 层级 | 技术 | 版本要求 |
|-----|------|---------|
| 框架 | Astro | ≥ 4.0 |
| CSS | Tailwind CSS | ≥ 3.4 |
| 运行时 | Node.js | ≥ 18.0 |
| 包管理 | pnpm | ≥ 8.0 |
| 部署 | Vercel | - |
| 类型检查 | TypeScript | ≥ 5.0 |

---

## 后续优化方向

1. **国际化增强**：集成 Astro i18n 路由
2. **博客系统**：添加 Markdown 博客功能
3. **搜索功能**：添加全文搜索
4. **PWA 支持**：添加离线访问
5. **分析工具**：集成 Google Analytics、Vercel Analytics
6. **表单功能**：添加联系表单提交
7. **动画优化**：使用 Framer Motion 或类似库
8. **组件文档**：Storybook 或类似工具
