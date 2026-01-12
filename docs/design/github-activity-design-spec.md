# GitHub动态展示模块 - 设计规范文档

## 一、设计系统扩展

### 1.1 颜色系统扩展

#### 1.1.1 GitHub活动类型颜色
在现有颜色系统基础上，新增GitHub活动相关的颜色变量：

```css
/* GitHub活动类型颜色 */
:root {
  /* 活动类型 */
  --gh-commit: #34C759;           /* 代码提交 - 绿色 */
  --gh-issue: #007AFF;            /* Issue - 蓝色 */
  --gh-pr: #5856D6;               /* Pull Request - 紫色 */
  --gh-star: #FF9500;             /* Star - 黄色 */
  --gh-fork: #FF9500;             /* Fork - 橙色 */
  --gh-watch: #86868B;            /* Watch - 灰色 */
  --gh-release: #32D74B;          /* Release - 深绿色 */
  --gh-create: #5AC8FA;           /* 创建仓库 - 浅蓝色 */

  /* 语言标签颜色 */
  --lang-javascript: #F7DF1E;
  --lang-typescript: #3178C6;
  --lang-python: #3776AB;
  --lang-java: #007396;
  --lang-go: #00ADD8;
  --lang-rust: #DEA584;
  --lang-cpp: #F34B7D;
  --lang-css: #563D7C;
  --lang-html: #E34F26;
  --lang-shell: #89E051;
  --lang-other: #86868B;

  /* 活跃度热力图颜色 */
  --heatmap-0: #EDEDED;
  --heatmap-1: #9BE9A8;
  --heatmap-2: #40C463;
  --heatmap-3: #30A14E;
  --heatmap-4: #216E39;
}

[data-theme="dark"] {
  /* 活跃度热力图 - 深色模式 */
  --heatmap-0: #161B22;
  --heatmap-1: #0E4429;
  --heatmap-2: #006D32;
  --heatmap-3: #26A641;
  --heatmap-4: #39D353;
}
```

#### 1.1.2 语义化颜色使用规范

**活动类型颜色应用场景：**
- 活动图标背景色：使用对应类型颜色
- 活动标签背景色：使用10%透明度
- 活动时间线节点：使用对应类型颜色
- 悬停状态：使用对应类型的hover色

**语言标签颜色应用场景：**
- 语言标签背景色：使用20%透明度
- 语言标签文字：使用原色
- 语言标签边框：使用原色50%透明度

**活跃度热力图颜色应用场景：**
- 0次提交：--heatmap-0
- 1-3次提交：--heatmap-1
- 4-6次提交：--heatmap-2
- 7-9次提交：--heatmap-3
- 10+次提交：--heatmap-4

### 1.2 字体系统扩展

#### 1.2.1 字体层级

```css
/* GitHub模块专用字体大小 */
:root {
  /* 统计数字 */
  --gh-stats-number: 3.2rem;
  --gh-stats-label: 1.3rem;
  --gh-stats-trend: 1.4rem;

  /* 活动卡片 */
  --gh-card-title: 1.7rem;
  --gh-card-description: 1.5rem;
  --gh-card-time: 1.3rem;
  --gh-card-meta: 1.2rem;

  /* 筛选器 */
  --gh-filter-label: 1.4rem;
  --gh-filter-text: 1.3rem;

  /* 图表标签 */
  --gh-chart-label: 1.3rem;
  --gh-chart-value: 1.4rem;
}
```

#### 1.2.2 字体粗细

```css
:root {
  /* 字体粗细层级 */
  --gh-weight-display: 700;      /* 数字、重要标题 */
  --gh-weight-heading: 600;      /* 卡片标题 */
  --gh-weight-body: 400;         /* 正文内容 */
  --gh-weight-meta: 400;         /* 元数据 */
}
```

### 1.3 间距系统

```css
/* GitHub模块专用间距 */
:root {
  /* 卡片内边距 */
  --gh-card-padding: 24px;
  --gh-card-padding-compact: 16px;

  /* 卡片间距 */
  --gh-card-gap: 16px;
  --gh-card-gap-compact: 12px;

  /* 时间线间距 */
  --gh-timeline-gap: 32px;
  --gh-timeline-node-size: 12px;

  /* 统计卡片间距 */
  --gh-stats-gap: 24px;

  /* 筛选器间距 */
  --gh-filter-gap: 12px;

  /* 图表间距 */
  --gh-chart-gap: 16px;
}
```

### 1.4 圆角系统

```css
/* GitHub模块专用圆角 */
:root {
  --gh-card-radius: 16px;
  --gh-tag-radius: 8px;
  --gh-badge-radius: 12px;
  --gh-btn-radius: 10px;
  --gh-avatar-radius: 50%;
}
```

---

## 二、UI组件详细规范

### 2.1 整体布局结构

```
#github-section
├── .section-title (标题)
│   └── "技术足迹"
│
├── .github-dashboard (仪表盘容器)
│   │
│   ├── .github-stats-grid (统计概览网格)
│   │   ├── .stat-card (统计卡片) × 4
│   │   │   ├── .stat-icon (图标)
│   │   │   ├── .stat-number (数字)
│   │   │   ├── .stat-label (标签)
│   │   │   └── .stat-trend (趋势)
│   │   │
│   │   ├── .stat-card (总仓库数)
│   │   ├── .stat-card (总Star数)
│   │   ├── .stat-card (总Fork数)
│   │   └── .stat-card (本月贡献)
│   │
│   ├── .github-filters (筛选器栏)
│   │   ├── .filter-group (筛选组)
│   │   │   ├── .filter-label (标签)
│   │   │   └── .filter-options (选项)
│   │   │       ├── .filter-option (选项) × N
│   │   │
│   │   ├── .filter-search (搜索框)
│   │   └── .filter-refresh (刷新按钮)
│   │
│   └── .github-activity (活动内容区)
│       │
│       ├── .activity-heatmap (活跃度热力图)
│       │   ├── .heatmap-label (标签)
│       │   └── .heatmap-grid (热力图网格)
│       │       ├── .heatmap-cell (单元格) × N
│       │
│       ├── .activity-timeline (活动时间线)
│       │   ├── .timeline-date-group (日期分组) × N
│       │   │   ├── .timeline-date-label (日期标签)
│       │   │   └── .timeline-activities (活动列表)
│       │   │       ├── .activity-card (活动卡片) × N
│       │   │
│       ├── .load-more-button (加载更多)
│       └── .activity-empty (空状态)
│
└── .github-footer (底部操作区)
    ├── .github-profile-link (访问GitHub按钮)
    └── .github-rss-link (RSS订阅)
```

### 2.2 统计卡片组件

#### 2.2.1 视觉规范

**尺寸：**
- 卡片宽度：响应式，桌面端4列，平板2列，移动端1列
- 卡片高度：自适应内容，最小高度120px
- 图标尺寸：48px × 48px
- 数字字号：3.2rem（桌面端）/ 2.4rem（移动端）

**间距：**
- 卡片内边距：24px
- 图标与内容间距：16px
- 数字与标签间距：8px
- 标签与趋势间距：4px

**颜色：**
- 卡片背景：var(--card-bg)
- 图标背景：对应类型颜色的10%透明度
- 图标颜色：对应类型颜色
- 数字颜色：var(--text-primary)
- 标签颜色：var(--text-secondary)
- 趋势上升：var(--success)
- 趋势下降：var(--error)

**圆角：**
- 卡片圆角：16px
- 图标圆角：12px

#### 2.2.2 状态设计

**默认状态：**
```css
.stat-card {
  background: var(--card-bg);
  border-radius: var(--gh-card-radius);
  padding: var(--gh-card-padding);
  display: flex;
  align-items: flex-start;
  gap: 16px;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-color);
  transition: all var(--duration-medium) var(--ease-spring);
}
```

**悬停状态：**
```css
.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.stat-card:hover .stat-icon {
  transform: scale(1.1);
}
```

**加载状态：**
```css
.stat-card.loading {
  opacity: 0.6;
  pointer-events: none;
}

.stat-card.loading .stat-icon {
  animation: pulse 1.5s infinite;
}
```

#### 2.2.3 统计卡片类型

**类型1：总仓库数**
- 图标：仓库图标
- 颜色：var(--gh-create)
- 数字：仓库总数
- 标签："总仓库数"
- 趋势：环比增长/下降

**类型2：总Star数**
- 图标：Star图标
- 颜色：var(--gh-star)
- 数字：Star总数
- 标签："总Star数"
- 趋势：本月新增

**类型3：总Fork数**
- 图标：Fork图标
- 颜色：var(--gh-fork)
- 数字：Fork总数
- 标签："总Fork数"
- 趋势：本月新增

**类型4：本月贡献**
- 图标：贡献图标
- 颜色：var(--gh-commit)
- 数字：本月提交数
- 标签："本月贡献"
- 趋势：连续贡献天数

### 2.3 筛选器组件

#### 2.3.1 视觉规范

**尺寸：**
- 筛选器栏高度：56px
- 筛选按钮高度：40px
- 搜索框高度：40px
- 搜索框宽度：280px（桌面端）/ 200px（平板）/ 100%（移动端）

**间距：**
- 筛选器栏内边距：0 24px
- 筛选组间距：24px
- 筛选按钮间距：8px
- 图标与文字间距：8px

**颜色：**
- 筛选器背景：var(--bg-secondary)
- 激活按钮背景：var(--primary)
- 激活按钮文字：white
- 未激活按钮背景：transparent
- 未激活按钮文字：var(--text-secondary)
- 悬停背景：var(--bg-tertiary)

**圆角：**
- 筛选按钮圆角：8px
- 搜索框圆角：8px

#### 2.3.2 筛选器类型

**时间范围筛选：**
- 选项：全部 / 今天 / 本周 / 本月 / 最近30天
- 默认：全部
- 排列方式：水平排列

**活动类型筛选：**
- 选项：全部 / 提交 / Issue / PR / Star / Fork
- 默认：全部
- 排列方式：水平排列
- 使用图标 + 文字

**项目筛选：**
- 选项：全部 / [项目列表]
- 默认：全部
- 排列方式：下拉选择
- 最多显示前10个活跃项目

**搜索框：**
- 占位符："搜索活动..."
- 搜索范围：活动标题、描述、仓库名称
- 实时搜索：输入300ms后触发搜索
- 清除按钮：输入内容后显示

#### 2.3.3 状态设计

**默认状态：**
```css
.filter-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 56px;
  background: var(--bg-secondary);
  border-radius: var(--gh-card-radius);
  margin-bottom: 24px;
  gap: 24px;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.filter-label {
  font-size: var(--gh-filter-label);
  color: var(--text-secondary);
  font-weight: 500;
}

.filter-option {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  font-size: var(--gh-filter-text);
  color: var(--text-secondary);
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-minimal);
}

.filter-option:hover {
  background: var(--bg-tertiary);
}

.filter-option.active {
  background: var(--primary);
  color: white;
}
```

**移动端状态：**
```css
@media (max-width: 768px) {
  .filter-bar {
    flex-direction: column;
    align-items: stretch;
    height: auto;
    padding: 16px;
  }

  .filter-group {
    overflow-x: auto;
    padding-bottom: 8px;
  }

  .filter-search {
    width: 100%;
  }
}
```

### 2.4 活跃度热力图组件

#### 2.4.1 视觉规范

**尺寸：**
- 热力图宽度：100%
- 热力图高度：128px
- 单元格尺寸：12px × 12px
- 单元格间距：4px

**间距：**
- 热力图内边距：16px
- 单元格间距：4px
- 标签与热力图间距：12px

**颜色：**
- 单元格颜色：根据活跃度使用热力图色阶
- 标签颜色：var(--text-secondary)
- 边框颜色：var(--border-color)

**圆角：**
- 单元格圆角：2px
- 热力图容器圆角：12px

#### 2.4.2 布局结构

```
.activity-heatmap
├── .heatmap-header (头部)
│   ├── .heatmap-title (标题："活跃度")
│   └── .heatmap-legend (图例)
│       ├── .heatmap-legend-item (图例项) × 5
│
└── .heatmap-content (内容区)
    ├── .heatmap-months (月份标签)
    └── .heatmap-grid (网格)
        ├── .heatmap-row (行) × 7
        │   ├── .heatmap-cell (单元格) × N
```

#### 2.4.3 交互设计

**悬停交互：**
```css
.heatmap-cell:hover {
  transform: scale(1.2);
  z-index: 1;
  box-shadow: var(--shadow-sm);
}

.heatmap-cell:hover::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 12px;
  background: var(--bg-tertiary);
  color: var(--text-primary);
  font-size: 1.2rem;
  border-radius: 6px;
  white-space: nowrap;
  pointer-events: none;
}
```

**点击交互：**
- 点击单元格：筛选当天的所有活动
- 再次点击：取消筛选，显示全部活动

#### 2.4.4 响应式设计

**桌面端（> 1024px）：**
- 显示完整90天的热力图
- 显示月份标签
- 显示完整图例

**平板端（768px - 1024px）：**
- 显示最近60天的热力图
- 简化月份标签（仅显示首尾）
- 显示简化的图例

**移动端（< 768px）：**
- 显示最近30天的热力图
- 隐藏月份标签
- 隐藏图例
- 单元格尺寸缩小到10px

### 2.5 活动时间线组件

#### 2.5.1 视觉规范

**尺寸：**
- 时间线宽度：100%
- 日期标签宽度：100px
- 时间线节点尺寸：12px × 12px
- 活动卡片宽度：100%

**间距：**
- 日期分组间距：32px
- 活动卡片间距：16px
- 时间线与内容间距：24px

**颜色：**
- 时间线颜色：var(--divider-color)
- 日期标签颜色：var(--text-secondary)
- 节点颜色：根据活动类型
- 节点背景：var(--bg-primary)

**圆角：**
- 活动卡片圆角：12px
- 时间线节点圆角：50%

#### 2.5.2 布局结构

```
.activity-timeline
├── .timeline-date-group (日期分组)
│   ├── .timeline-date-label (日期："今天" / "2025-01-09")
│   └── .timeline-content (内容区)
│       ├── .timeline-line (时间线)
│       └── .timeline-activities (活动列表)
│           ├── .activity-card (活动卡片) × N
```

#### 2.5.3 活动卡片设计

**卡片结构：**
```html
<div class="activity-card" data-type="commit">
  <div class="activity-card-header">
    <div class="activity-icon">
      <svg>图标</svg>
    </div>
    <div class="activity-type">提交代码</div>
    <div class="activity-time">2小时前</div>
  </div>
  <div class="activity-card-body">
    <h4 class="activity-title">
      <span class="repo-name">firerlAGI/firerlAGI-preview</span>
      <span class="action-text">提交了</span>
      <span class="commit-message">feat: 添加GitHub动态展示功能</span>
    </h4>
    <p class="activity-description">
      新增了GitHub API集成，实现了基本的统计和活动展示功能
    </p>
  </div>
  <div class="activity-card-footer">
    <div class="activity-meta">
      <span class="meta-tag">JavaScript</span>
      <span class="meta-tag">+312</span>
      <span class="meta-tag">-28</span>
    </div>
    <a href="#" class="activity-link">查看详情 →</a>
  </div>
</div>
```

**视觉规范：**

**尺寸：**
- 卡片宽度：100%
- 卡片内边距：16px
- 图标尺寸：32px × 32px
- 标题字号：1.7rem
- 描述字号：1.5rem
- 时间字号：1.3rem

**间距：**
- 卡片内边距：16px
- 头部元素间距：12px
- 标题与描述间距：8px
- 元数据间距：8px

**颜色：**
- 卡片背景：var(--card-bg)
- 图标背景：活动类型颜色的10%
- 图标颜色：活动类型颜色
- 标题颜色：var(--text-primary)
- 仓库名称：var(--primary)
- 描述颜色：var(--text-secondary)
- 时间颜色：var(--text-tertiary)
- 链接颜色：var(--primary)
- 标签背景：var(--bg-tertiary)
- 标签文字：var(--text-secondary)

**圆角：**
- 卡片圆角：12px
- 图标圆角：8px
- 标签圆角：6px

#### 2.5.4 活动类型样式

**提交代码：**
- 图标：提交图标
- 颜色：var(--gh-commit)
- 标签："提交代码"
- 特殊信息：增删行数、分支信息

**创建Issue：**
- 图标：Issue图标
- 颜色：var(--gh-issue)
- 标签："提出问题"
- 特殊信息：Issue编号、状态

**关闭Issue：**
- 图标：Issue关闭图标
- 颜色：var(--success)
- 标签："关闭问题"
- 特殊信息：Issue编号、关闭原因

**创建PR：**
- 图标：PR图标
- 颜色：var(--gh-pr)
- 标签："发起合并"
- 特殊信息：PR编号、目标分支

**合并PR：**
- 图标：PR合并图标
- 颜色：var(--gh-pr)
- 标签："合并代码"
- 特殊信息：PR编号、合并信息

**Star仓库：**
- 图标：Star图标
- 颜色：var(--gh-star)
- 标签："收藏项目"
- 特殊信息：仓库信息

**Fork仓库：**
- 图标：Fork图标
- 颜色：var(--gh-fork)
- 标签："复制项目"
- 特殊信息：源仓库、目标仓库

**创建仓库：**
- 图标：仓库图标
- 颜色：var(--gh-create)
- 标签："创建仓库"
- 特殊信息：仓库描述、语言

**发布版本：**
- 图标：Release图标
- 颜色：var(--gh-release)
- 标签："发布版本"
- 特殊信息：版本号、发布说明

#### 2.5.5 状态设计

**默认状态：**
```css
.activity-card {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 16px;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-color);
  transition: all var(--duration-medium) var(--ease-spring);
  cursor: pointer;
}

.activity-card:hover {
  transform: translateX(4px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary);
}
```

**激活状态：**
```css
.activity-card.active {
  background: rgba(0, 122, 255, 0.05);
  border-color: var(--primary);
}
```

**加载状态：**
```css
.activity-card.loading {
  opacity: 0.6;
  pointer-events: none;
}

.activity-card.loading .activity-icon {
  animation: pulse 1.5s infinite;
}
```

### 2.6 底部操作区组件

#### 2.6.1 视觉规范

**尺寸：**
- 按钮高度：48px
- 按钮内边距：0 32px
- 图标尺寸：20px × 20px

**间距：**
- 按钮间距：16px
- 图标与文字间距：8px

**颜色：**
- 主要按钮背景：var(--primary)
- 主要按钮文字：white
- 次要按钮背景：var(--bg-tertiary)
- 次要按钮文字：var(--text-primary)

**圆角：**
- 按钮圆角：10px

#### 2.6.2 按钮类型

**访问GitHub按钮：**
- 类型：主要按钮
- 图标：GitHub图标
- 文字："访问我的GitHub"
- 行为：在新标签页打开GitHub主页
- 悬停：背景变深，轻微上移

**RSS订阅按钮：**
- 类型：次要按钮
- 图标：RSS图标
- 文字："订阅动态"
- 行为：打开RSS订阅页面或复制RSS链接
- 悬停：背景变深，轻微上移

**刷新按钮：**
- 类型：图标按钮
- 图标：刷新图标
- 行为：刷新数据
- 悬停：图标旋转360度

---

## 三、动画效果规范

### 3.1 入场动画

#### 3.1.1 统计卡片入场
```css
.stat-card {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s var(--ease-enter) forwards;
}

.stat-card:nth-child(1) { animation-delay: 0ms; }
.stat-card:nth-child(2) { animation-delay: 100ms; }
.stat-card:nth-child(3) { animation-delay: 200ms; }
.stat-card:nth-child(4) { animation-delay: 300ms; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

#### 3.1.2 热力图入场
```css
.heatmap-cell {
  opacity: 0;
  transform: scale(0.8);
  animation: scaleIn 0.3s var(--ease-spring) forwards;
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

#### 3.1.3 活动卡片入场
```css
.activity-card {
  opacity: 0;
  transform: translateX(-20px);
  animation: slideIn 0.5s var(--ease-enter) forwards;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

### 3.2 交互动画

#### 3.2.1 卡片悬停
```css
.stat-card:hover,
.activity-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  transition: transform var(--duration-medium) var(--ease-spring),
              box-shadow var(--duration-medium) var(--ease-standard);
}
```

#### 3.2.2 按钮点击
```css
.btn:active {
  transform: translateY(0) scale(0.98);
  transition: transform var(--duration-instant) var(--ease-standard);
}
```

#### 3.2.3 图标动画
```css
/* 刷新按钮旋转 */
.refresh-btn:hover svg {
  animation: rotate 1s linear;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 加载图标脉动 */
.loading-icon {
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

### 3.3 数字增长动画

```css
.stat-number {
  animation: countUp 1s var(--ease-enter) forwards;
}

@keyframes countUp {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

**JavaScript实现：**
```javascript
function animateNumber(element, target, duration = 1000) {
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
    const current = Math.floor(start + (target - start) * easeProgress);
    element.textContent = current.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}
```

### 3.4 加载状态动画

#### 3.4.1 骨架屏
```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--bg-tertiary) 25%,
    var(--bg-secondary) 50%,
    var(--bg-tertiary) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

#### 3.4.2 加载指示器
```css
.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--bg-tertiary);
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### 3.5 错误状态动画

```css
.error-state {
  animation: shake 0.5s var(--ease-standard);
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}
```

### 3.6 动画性能优化

#### 3.6.1 使用transform和opacity
```css
/* 推荐使用 */
.card:hover {
  transform: translateY(-4px);
  opacity: 0.9;
}

/* 避免使用 */
.card:hover {
  margin-top: -4px; /* 会触发重排 */
  filter: blur(2px); /* 性能开销大 */
}
```

#### 3.6.2 使用will-change
```css
.card {
  will-change: transform;
}

.card:hover {
  transform: translateY(-4px);
}
```

#### 3.6.3 减少动画时长
```css
/* 快速交互：150-250ms */
.btn:hover {
  transition: background-color 0.2s var(--ease-minimal);
}

/* 中等动画：350-500ms */
.card:hover {
  transition: transform 0.35s var(--ease-spring);
}

/* 慢速动画：750ms以上 */
.hero-enter {
  transition: opacity 0.75s var(--ease-enter);
}
```

#### 3.6.4 使用硬件加速
```css
.card {
  transform: translateZ(0);
  backface-visibility: hidden;
}
```

---

## 四、响应式设计规范

### 4.1 断点定义

```css
/* 断点系统 */
:root {
  --breakpoint-xs: 480px;
  --breakpoint-sm: 768px;
  --breakpoint-md: 1024px;
  --breakpoint-lg: 1280px;
  --breakpoint-xl: 1440px;
}
```

### 4.2 桌面端（≥ 1024px）

#### 4.2.1 统计卡片布局
```css
.github-stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 32px;
}
```

#### 4.2.2 筛选器布局
```css
.github-filters {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 32px;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 12px;
}
```

#### 4.2.3 活动时间线布局
```css
.activity-timeline {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.timeline-date-group {
  display: flex;
  gap: 24px;
}

.timeline-date-label {
  width: 100px;
  flex-shrink: 0;
  text-align: right;
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.timeline-content {
  flex: 1;
  display: flex;
  gap: 24px;
}

.timeline-line {
  width: 2px;
  background: var(--divider-color);
  position: relative;
}

.timeline-line::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 12px;
  height: 12px;
  background: var(--bg-primary);
  border: 2px solid var(--divider-color);
  border-radius: 50%;
}

.timeline-activities {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
```

#### 4.2.4 热力图布局
```css
.activity-heatmap {
  padding: 24px;
  margin-bottom: 32px;
}

.heatmap-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}
```

### 4.3 平板端（768px - 1023px）

#### 4.3.1 统计卡片布局
```css
@media (max-width: 1023px) {
  .github-stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
}
```

#### 4.3.2 筛选器布局
```css
@media (max-width: 1023px) {
  .github-filters {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-group {
    overflow-x: auto;
    padding-bottom: 8px;
  }

  .filter-search {
    width: 100%;
  }
}
```

#### 4.3.3 活动时间线布局
```css
@media (max-width: 1023px) {
  .timeline-date-group {
    flex-direction: column;
    gap: 16px;
  }

  .timeline-date-label {
    width: 100%;
    text-align: left;
  }

  .timeline-content {
    gap: 16px;
  }

  .timeline-line {
    display: none;
  }
}
```

#### 4.3.4 热力图布局
```css
@media (max-width: 1023px) {
  .heatmap-months {
    display: none;
  }

  .heatmap-legend {
    justify-content: center;
  }
}
```

### 4.4 移动端（< 768px）

#### 4.4.1 统计卡片布局
```css
@media (max-width: 767px) {
  .github-stats-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .stat-card {
    padding: 16px;
  }

  .stat-number {
    font-size: 2.4rem;
  }
}
```

#### 4.4.2 筛选器布局
```css
@media (max-width: 767px) {
  .filter-bar {
    flex-direction: column;
    padding: 12px;
  }

  .filter-group {
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .filter-option {
    padding: 8px 12px;
    font-size: 1.2rem;
    white-space: nowrap;
  }

  .filter-search {
    width: 100%;
  }
}
```

#### 4.4.3 活动时间线布局
```css
@media (max-width: 767px) {
  .activity-timeline {
    gap: 24px;
  }

  .timeline-date-group {
    gap: 12px;
  }

  .activity-card {
    padding: 12px;
  }

  .activity-card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .activity-title {
    font-size: 1.5rem;
  }

  .activity-description {
    font-size: 1.3rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
```

#### 4.4.4 热力图布局
```css
@media (max-width: 767px) {
  .activity-heatmap {
    padding: 16px;
  }

  .heatmap-header {
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }

  .heatmap-legend {
    display: none;
  }

  .heatmap-cell {
    width: 10px;
    height: 10px;
  }
}
```

### 4.5 触摸优化

#### 4.5.1 触摸目标尺寸
```css
/* 最小触摸目标：44px × 44px */
.btn,
.filter-option,
.activity-card {
  min-height: 44px;
}

/* 图标按钮 */
.icon-btn {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

#### 4.5.2 触摸反馈
```css
@media (hover: none) and (pointer: coarse) {
  .btn:active {
    opacity: 0.7;
    transform: scale(0.98);
  }

  .activity-card:active {
    opacity: 0.8;
    transform: scale(0.99);
  }
}
```

#### 4.5.3 滚动优化
```css
.filter-group {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
}

.filter-option {
  scroll-snap-align: start;
}
```

---

## 五、无障碍设计规范

### 5.1 语义化HTML

#### 5.1.1 结构语义
```html
<section id="github" class="section">
  <h2 class="section-title">技术足迹</h2>

  <div class="github-dashboard" role="region" aria-label="GitHub活动展示">
    <!-- 统计概览 -->
    <div class="github-stats-grid" role="group" aria-label="统计概览">
      <article class="stat-card" role="article">
        <h3 class="stat-label sr-only">总仓库数</h3>
        <div class="stat-number" aria-live="polite">42</div>
        <div class="stat-trend">本月新增 +3</div>
      </article>
    </div>

    <!-- 筛选器 -->
    <div class="github-filters" role="toolbar" aria-label="活动筛选">
      <div class="filter-group" role="group" aria-label="时间范围">
        <button class="filter-option active" aria-pressed="true">全部</button>
        <button class="filter-option" aria-pressed="false">本周</button>
      </div>
    </div>

    <!-- 活动时间线 -->
    <div class="activity-timeline" role="list" aria-label="活动时间线">
      <article class="activity-card" role="listitem">
        <h4 class="activity-title">提交代码到 firerlAGI/firerlAGI-preview</h4>
        <p class="activity-description">feat: 添加GitHub动态展示功能</p>
        <time class="activity-time" datetime="2025-01-10T10:30:00Z">2小时前</time>
      </article>
    </div>
  </div>
</section>
```

#### 5.1.2 屏幕阅读器支持
```html
<!-- 隐藏内容，但屏幕阅读器可读 -->
<span class="sr-only">总仓库数</span>

<!-- 状态变化通知 -->
<div class="loading-state" aria-live="polite" aria-busy="true">
  正在加载...
</div>

<!-- 错误通知 -->
<div class="error-state" role="alert" aria-live="assertive">
  加载失败，请重试
</div>
```

### 5.2 键盘导航

#### 5.2.1 焦点管理
```css
/* 清晰的焦点指示器 */
.btn:focus-visible,
.filter-option:focus-visible,
.activity-card:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

/* 焦点样式 */
.activity-card:focus {
  box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.2);
  border-color: var(--primary);
}
```

#### 5.2.2 键盘快捷键
```javascript
// 支持 Enter/Space 激活
document.querySelectorAll('.activity-card').forEach(card => {
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.click();
    }
  });
  card.setAttribute('tabindex', '0');
});

// 支持方向键导航
document.querySelectorAll('.filter-option').forEach((option, index, options) => {
  option.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const next = options[index + 1] || options[0];
      next.focus();
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = options[index - 1] || options[options.length - 1];
      prev.focus();
    }
  });
});
```

### 5.3 颜色对比度

#### 5.3.1 WCAG AA标准
- 正常文字（≥ 14pt）：对比度 ≥ 4.5:1
- 大号文字（≥ 18pt 或 ≥ 14pt 粗体）：对比度 ≥ 3:1
- UI组件：对比度 ≥ 3:1

#### 5.3.2 对比度检查
```css
/* 确保文本颜色对比度 */
:root {
  /* 主文本 - 对比度 > 4.5:1 */
  --text-primary: #1D1D1F; /* 对白色背景对比度: 16.5:1 */

  /* 次要文本 - 对比度 > 4.5:1 */
  --text-secondary: #86868B; /* 对白色背景对比度: 5.2:1 */

  /* 链接颜色 - 对比度 > 4.5:1 */
  --primary: #007AFF; /* 对白色背景对比度: 4.6:1 */
}

/* 深色模式对比度 */
[data-theme="dark"] {
  /* 主文本 - 对比度 > 4.5:1 */
  --text-primary: #F5F5F7; /* 对黑色背景对比度: 15.3:1 */

  /* 次要文本 - 对比度 > 4.5:1 */
  --text-secondary: #86868B; /* 对黑色背景对比度: 5.7:1 */

  /* 链接颜色 - 对比度 > 4.5:1 */
  --primary: #0A84FF; /* 对黑色背景对比度: 5.8:1 */
}
```

### 5.4 减少动画偏好

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  .stat-card,
  .activity-card,
  .heatmap-cell {
    animation: none;
  }
}
```

### 5.5 屏幕阅读器隐藏

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

---

## 六、性能优化规范

### 6.1 图片优化

#### 6.1.1 头像优化
```html
<!-- 使用CDN -->
<img
  src="https://github.com/firerlAGI.png?size=80"
  alt="firerlAGI的头像"
  loading="lazy"
  width="80"
  height="80"
>

<!-- 响应式图片 -->
<picture>
  <source
    media="(min-width: 768px)"
    srcset="https://github.com/firerlAGI.png?size=80 1x,
            https://github.com/firerlAGI.png?size=160 2x">
  <source
    media="(max-width: 767px)"
    srcset="https://github.com/firerlAGI.png?size=48 1x,
            https://github.com/firerlAGI.png?size=96 2x">
  <img
    src="https://github.com/firerlAGI.png?size=80"
    alt="firerlAGI的头像"
    loading="lazy">
</picture>
```

#### 6.1.2 SVG图标
```html
<!-- 内联SVG（小图标） -->
<svg class="icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
  <path d="..."/>
</svg>

<!-- 使用use引用（重复使用的图标） -->
<svg class="icon-github">
  <use href="#icon-github"></use>
</svg>
```

### 6.2 字体优化

#### 6.2.1 字体加载
```html
<!-- 预加载字体 -->
<link
  rel="preload"
  href="/fonts/system-font.woff2"
  as="font"
  type="font/woff2"
  crossorigin
>

<!-- 使用系统字体栈 -->
body {
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'PingFang SC', 'Hiragino Sans GB', sans-serif;
}
```

#### 6.2.2 字体显示策略
```css
body {
  font-display: swap;
}
```

### 6.3 CSS优化

#### 6.3.1 减少重排重绘
```css
/* 使用transform代替top/left */
.card {
  transform: translateY(-4px); /* 好 */
  /* top: -4px; 避免 */
}

/* 使用opacity代替visibility */
.loading {
  opacity: 0.5; /* 好 */
  /* visibility: hidden; 避免频繁切换 */
}
```

#### 6.3.2 GPU加速
```css
.card {
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
}
```

#### 6.3.3 CSS压缩
```css
/* 使用CSS变量减少重复 */
.card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: var(--gh-card-radius);
  padding: var(--gh-card-padding);
}
```

### 6.4 JavaScript优化

#### 6.4.1 事件委托
```javascript
// 不推荐：每个卡片单独绑定
document.querySelectorAll('.activity-card').forEach(card => {
  card.addEventListener('click', handleClick);
});

// 推荐：使用事件委托
document.querySelector('.timeline-activities').addEventListener('click', (e) => {
  const card = e.target.closest('.activity-card');
  if (card) {
    handleClick(card);
  }
});
```

#### 6.4.2 防抖节流
```javascript
// 防抖：延迟执行
function debounce(fn, delay = 300) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// 节流：限制执行频率
function throttle(fn, delay = 300) {
  let lastTime = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastTime >= delay) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
}

// 使用示例
const handleSearch = debounce((query) => {
  searchActivities(query);
}, 300);

searchInput.addEventListener('input', (e) => {
  handleSearch(e.target.value);
});
```

#### 6.4.3 懒加载
```javascript
// Intersection Observer懒加载
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadMoreActivities();
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

observer.observe(document.querySelector('.load-more-trigger'));
```

### 6.5 缓存策略

#### 6.5.1 LocalStorage缓存
```javascript
// 缓存配置
const CACHE_KEY = 'github_activities';
const CACHE_DURATION = 5 * 60 * 1000; // 5分钟

// 获取缓存
function getCachedData() {
  const cached = localStorage.getItem(CACHE_KEY);
  if (!cached) return null;

  const { data, timestamp } = JSON.parse(cached);
  const isExpired = Date.now() - timestamp > CACHE_DURATION;

  return isExpired ? null : data;
}

// 设置缓存
function setCachedData(data) {
  localStorage.setItem(CACHE_KEY, JSON.stringify({
    data,
    timestamp: Date.now()
  }));
}

// 使用缓存
async function fetchActivities() {
  const cached = getCachedData();
  if (cached) {
    renderActivities(cached);
  }

  const fresh = await fetchFromGitHub();
  setCachedData(fresh);
  renderActivities(fresh);
}
```

#### 6.5.2 Service Worker缓存
```javascript
// 注册Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

// sw.js
const CACHE_NAME = 'github-activities-v1';
const ASSETS = [
  '/css/style.css',
  '/js/main.js',
  '/images/hero-bg.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request)
      .then(response => response || fetch(e.request))
  );
});
```

---

## 七、深色模式规范

### 7.1 颜色系统

```css
/* 浅色模式（默认） */
:root {
  --gh-card-bg: rgba(255, 255, 255, 0.8);
  --gh-card-hover-bg: rgba(255, 255, 255, 0.95);
  --gh-border-color: rgba(0, 0, 0, 0.1);
  --gh-divider-color: rgba(0, 0, 0, 0.08);
}

/* 深色模式 */
[data-theme="dark"] {
  --gh-card-bg: rgba(28, 28, 30, 0.8);
  --gh-card-hover-bg: rgba(28, 28, 30, 0.95);
  --gh-border-color: rgba(255, 255, 255, 0.1);
  --gh-divider-color: rgba(255, 255, 255, 0.08);
}
```

### 7.2 主题切换动画

```css
body,
.card,
.stat-card,
.activity-card {
  transition: background-color var(--duration-medium) var(--ease-standard),
              color var(--duration-medium) var(--ease-standard),
              border-color var(--duration-medium) var(--ease-standard);
}
```

### 7.3 图标适配

```css
/* 深色模式下调整图标颜色 */
[data-theme="dark"] .activity-icon {
  background: rgba(255, 255, 255, 0.1);
}

[data-theme="dark"] .stat-icon {
  background: rgba(255, 255, 255, 0.1);
}
```

---

## 八、设计检查清单

### 8.1 视觉设计检查
- [ ] 所有卡片使用统一的设计语言
- [ ] 颜色对比度符合WCAG AA标准
- [ ] 间距系统保持一致
- [ ] 圆角系统保持一致
- [ ] 字体层级清晰可读
- [ ] 图标风格统一

### 8.2 交互设计检查
- [ ] 所有交互元素有明确的悬停状态
- [ ] 按钮点击有明确的反馈
- [ ] 加载状态清晰可见
- [ ] 错误状态友好提示
- [ ] 动画流畅自然
- [ ] 过渡效果平滑

### 8.3 响应式设计检查
- [ ] 桌面端布局合理
- [ ] 平板端布局适配
- [ ] 移动端体验良好
- [ ] 触摸目标尺寸合适
- [ ] 横屏布局适配
- [ ] 字体大小可读

### 8.4 性能检查
- [ ] 首屏加载时间 < 2秒
- [ ] 动画使用transform和opacity
- [ ] 图片使用懒加载
- [ ] JavaScript代码优化
- [ ] CSS代码压缩
- [ ] 缓存策略完善

### 8.5 无障碍检查
- [ ] 语义化HTML结构
- [ ] 键盘导航支持
- [ ] 屏幕阅读器支持
- [ ] 焦点状态清晰
- [ ] ARIA属性完整
- [ ] 减少动画偏好支持

---

## 九、设计交付物

### 9.1 设计文件
- Figma设计稿（包含所有组件和状态）
- 组件库文档
- 设计规范文档（本文档）

### 9.2 开发资源
- SVG图标文件
- 字体文件
- 颜色变量文件
- 动画示例代码

### 9.3 测试用例
- 视觉回归测试用例
- 交互测试用例
- 性能测试用例
- 无障碍测试用例

---

## 十、总结

本设计规范文档为GitHub动态展示模块提供了全面的UI/UX设计方案，包括：

1. **设计系统扩展** - 完善的颜色、字体、间距、圆角系统
2. **UI组件规范** - 详细的组件设计和状态管理
3. **动画效果规范** - 流畅的动画和交互效果
4. **响应式设计** - 完整的多设备适配方案
5. **无障碍设计** - 符合WCAG标准的无障碍支持
6. **性能优化** - 全方位的性能优化策略
7. **深色模式** - 完善的深色模式支持

遵循本设计规范，可以确保GitHub动态展示模块与现有网站风格一致，同时提供优秀的用户体验和性能表现。

---

**文档版本：** v1.0
**创建日期：** 2025-01-10
**作者：** firerlAGI
**状态：** 设计阶段
