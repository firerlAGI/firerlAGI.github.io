# 国际化 (i18n) 实现指南

## 概述

项目已从硬编码的翻译方式迁移到基于 JSON 文件的国际化方案，使用 `astro-i18next` 插件实现更灵活的多语言支持。

## 架构说明

### 核心组件

1. **LanguageContext** (`src/contexts/LanguageContext.tsx`)
   - 管理当前语言状态
   - 提供 `t()` 函数用于翻译
   - 自动持久化语言选择到 localStorage

2. **翻译文件** (`src/i18n/`)
   - `en.json` - 英文翻译
   - `zh.json` - 中文翻译
   - `config.ts` - i18n 配置

3. **LanguageWrapper** (`src/components/react/LanguageWrapper.tsx`)
   - 为 React 组件提供语言上下文
   - 用于包装需要翻译的组件

## 使用方法

### 在 React 组件中使用

```tsx
import { useLanguage } from '../../contexts/LanguageContext';

const MyComponent: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  
  return (
    <div>
      <h1>{t('nav.about')}</h1>
      <p>{t('hero.subtitle')}</p>
      <button onClick={() => setLanguage('zh')}>切换到中文</button>
    </div>
  );
};
```

### 在 Astro 组件中使用

对于需要国际化的 Astro 组件，建议创建对应的 React 组件，然后用 `LanguageWrapper` 包装：

```astro
---
import LanguageWrapper from '../react/LanguageWrapper'
import MyContent from './MyContent'
---

<section>
  <LanguageWrapper>
    <MyContent client:load />
  </LanguageWrapper>
</section>
```

## 翻译文件结构

```json
{
  "nav": {
    "about": "/ABOUT",
    "skills": "/ACTIVITY"
  },
  "hero": {
    "title": "FIRERLAGI",
    "subtitle": "Full Stack Engineer"
  }
}
```

### 嵌套键访问

使用点号 `.` 访问嵌套的翻译键：

```tsx
t('nav.about')        // "/ABOUT"
t('hero.subtitle')    // "Full Stack Engineer"
t('about.skills.ai')  // "AI_INTEGRATION"
```

## 添加新的翻译

### 1. 在翻译文件中添加键

在 `src/i18n/en.json` 和 `src/i18n/zh.json` 中添加相同的键结构：

**en.json:**
```json
{
  "newSection": {
    "title": "New Section",
    "description": "This is a new section"
  }
}
```

**zh.json:**
```json
{
  "newSection": {
    "title": "新章节",
    "description": "这是一个新章节"
  }
}
```

### 2. 在组件中使用

```tsx
const MyComponent: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div>
      <h2>{t('newSection.title')}</h2>
      <p>{t('newSection.description')}</p>
    </div>
  );
};
```

## 优势对比

### 旧方案（硬编码）
```tsx
// translations.ts
export const translations = {
  en: { nav: { about: '/ABOUT' } },
  zh: { nav: { about: '/关于' } }
};

// 组件中使用
const { t } = useLanguage();
t.nav.about  // 类型安全，但灵活性差
```

### 新方案（JSON + 函数）
```tsx
// en.json / zh.json
{ "nav": { "about": "/ABOUT" } }

// 组件中使用
const { t } = useLanguage();
t('nav.about')  // 更灵活，支持动态键
```

### 新方案的优势

1. **分离关注点**：翻译内容与代码逻辑完全分离
2. **易于维护**：JSON 格式易于编辑和版本控制
3. **动态加载**：支持按需加载翻译文件
4. **扩展性强**：轻松添加新语言
5. **标准化**：符合 i18n 最佳实践
6. **工具友好**：可以被翻译工具和 IDE 插件识别

## 支持的语言

当前支持：
- **en** - English (默认)
- **zh** - 中文

添加新语言：
1. 在 `src/i18n/` 创建新的 JSON 文件（如 `ja.json`）
2. 在 `src/i18n/config.ts` 添加语言配置
3. 复制并翻译所有键值对

## 注意事项

### SSR 兼容性

LanguageContext 已经处理了 SSR 场景，在服务端渲染时会返回默认值：

```tsx
const { t } = useLanguage();
t('hero.title')  // SSR 时返回键名 'hero.title'
```

### 性能优化

- 翻译文件按需加载
- 语言状态使用 localStorage 持久化
- 避免不必要的重渲染

## 未来改进

1. 添加翻译缺失键的警告
2. 支持复数形式和变量插值
3. 集成翻译管理工具
4. 自动检测浏览器语言
5. 添加语言切换动画效果

## 迁移检查清单

- [x] 安装 astro-i18next 插件
- [x] 配置 Astro 集成
- [x] 创建翻译 JSON 文件
- [x] 更新 LanguageContext
- [x] 更新 React 组件使用新的 `t()` 函数
- [x] 创建 HeroContent React 组件
- [x] 更新 Navbar 组件
- [x] 更新 AiAssistant 组件
- [x] 更新其他 Astro 组件（SkillsSection, AboutSection, ProjectsSection, BlogSection, ContactSection, GithubSection）
- [x] 测试所有页面的语言切换
- [x] 移除旧的 translations.ts 文件

### 已完成迁移的组件

#### React 组件（已完成）
1. **Navbar.tsx** - 使用 `useLanguage` hook 和 `t()` 函数
2. **HeroContent.tsx** - 使用 `useLanguage` hook 和 `t()` 函数
3. **AiAssistant.tsx** - 使用 `useLanguage` hook 和 `t()` 函数

#### 已迁移的 Astro 组件
1. **AboutSection** - 创建 AboutContent.tsx React 组件，使用 LanguageWrapper 包装
2. **BlogSection** - 创建 BlogContent.tsx React 组件，使用 LanguageWrapper 包装
3. **ContactSection** - 创建 ContactContent.tsx 和 ContactHeader.tsx React 组件，使用 LanguageWrapper 包装
4. **ProjectsSection** - 创建 ProjectsContent.tsx React 组件，使用 LanguageWrapper 包装
5. **SkillsSection** - 创建 SkillsContent.tsx React 组件，使用 LanguageWrapper 包装
6. **GithubSection** - 创建 GithubContent.tsx React 组件，使用 LanguageWrapper 包装

### 迁移方法

对于每个 Astro 组件，采用了以下模式：

1. 创建对应的 React 内容组件（如 `AboutContent.tsx`）
2. 在 React 组件中使用 `useLanguage` hook 和 `t()` 函数进行翻译
3. 在 Astro 组件中引入 `LanguageWrapper` 和新的 React 组件
4. 使用 `<LanguageWrapper>` 包装 React 组件
5. 添加 `client:load` 指令以启用客户端渲染

## 相关文件

- `packages/website/astro.config.mjs` - Astro 配置
- `packages/website/src/i18n/` - 翻译文件目录
- `packages/website/src/contexts/LanguageContext.tsx` - 语言上下文
- `packages/website/src/components/react/LanguageWrapper.tsx` - 语言包装器
- `packages/website/src/components/react/LanguageSwitcher.tsx` - 语言切换器
