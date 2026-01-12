# GitHub Home Monorepo

firerlAGI 个人项目 monorepo，包含多个应用和共享代码库。

## 项目结构

```
githubhome/
├── packages/                  # 应用和包目录
│   ├── website/              # 个人作品集网站
│   └── shared/               # 共享代码库
├── docs/                     # 文档目录
└── package.json             # 根 package.json
```

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
# 启动网站开发服务器
pnpm dev

# 启动特定包的开发模式
pnpm --filter website dev
```

### 构建

```bash
# 构建所有包
pnpm build

# 构建特定包
pnpm --filter website build
```

### 其他命令

```bash
# 清理所有 node_modules 和构建输出
pnpm clean

# 代码格式化
pnpm format

# 检查代码格式
pnpm format:check

# 代码检查
pnpm lint
```

## 包说明

### website

个人作品集网站，展示项目和联系方式。

- 技术栈：HTML, CSS, JavaScript
- 特性：响应式设计、深色模式、多语言支持

### shared

共享代码库，包含通用的工具函数、样式等。

## 开发规范

### 代码风格

使用 Prettier 进行代码格式化：

```bash
pnpm format
```

### 提交规范

建议使用 Conventional Commits 规范：

- `feat:` 新功能
- `fix:` 修复 bug
- `docs:` 文档更新
- `style:` 代码格式调整
- `refactor:` 重构
- `perf:` 性能优化
- `test:` 测试相关
- `chore:` 构建/工具链相关

## License

MIT
