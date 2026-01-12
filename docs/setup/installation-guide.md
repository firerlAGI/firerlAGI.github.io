# 安装指南

## 系统要求

- **Node.js**: v18 或更高版本
- **npm**: v9 或更高版本（推荐）
- **pnpm**: v8 或更高版本（推荐）

## 安装 Node.js

### macOS

#### 方法一：使用 Homebrew（推荐）
```bash
# 安装 Homebrew（如果未安装）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 安装 Node.js
brew install node

# 验证安装
node --version
npm --version
```

#### 方法二：使用 Node Version Manager（nvm）
```bash
# 安装 nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 重新加载 shell 配置
source ~/.zshrc

# 安装最新 LTS 版本的 Node.js
nvm install --lts

# 设置为默认版本
nvm use --lts

# 验证安装
node --version
npm --version
```

#### 方法三：官方安装包
1. 访问 https://nodejs.org/
2. 下载 macOS 安装包（.pkg）
3. 运行安装程序
4. 打开终端验证：`node --version`

### Windows

#### 方法一：使用 Chocolatey（推荐）
```powershell
# 以管理员身份运行 PowerShell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# 安装 Node.js
choco install nodejs

# 验证安装
node --version
npm --version
```

#### 方法二：官方安装包
1. 访问 https://nodejs.org/
2. 下载 Windows 安装包（.msi）
3. 运行安装程序
4. 打开命令提示符验证：`node --version`

#### 方法三：使用 scoop
```powershell
# 安装 scoop
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression

# 安装 Node.js
scoop install nodejs

# 验证安装
node --version
npm --version
```

### Linux (Ubuntu/Debian)

#### 方法一：使用包管理器
```bash
# 更新包列表
sudo apt update

# 安装 Node.js 和 npm
sudo apt install -y nodejs npm

# 验证安装
node --version
npm --version
```

#### 方法二：使用 NodeSource 仓库（推荐新版本）
```bash
# 添加 NodeSource 仓库（以 Node.js 20.x 为例）
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# 安装 Node.js
sudo apt-get install -y nodejs

# 验证安装
node --version
npm --version
```

#### 方法三：使用 nvm
```bash
# 安装 nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 重新加载 shell 配置
source ~/.bashrc

# 安装最新 LTS 版本的 Node.js
nvm install --lts

# 设置为默认版本
nvm use --lts

# 验证安装
node --version
npm --version
```

## 安装 pnpm

### 使用 npm
```bash
npm install -g pnpm

# 验证安装
pnpm --version
```

### 使用 Homebrew（macOS）
```bash
brew install pnpm

# 验证安装
pnpm --version
```

### 使用 npm 的替代方法（如果全局安装失败）
```bash
# 使用 Corepack（Node.js 16.9.0+ 内置）
corepack enable
corepack prepare pnpm@latest --activate

# 验证安装
pnpm --version
```

### 使用独立安装脚本
```bash
# POSIX 系统（macOS/Linux）
curl -fsSL https://get.pnpm.io/install.sh | sh -

# Windows（PowerShell）
iwr https://get.pnpm.io/install.ps1 -useb | iex

# 验证安装
pnpm --version
```

## 验证安装

### 检查 Node.js
```bash
node --version
# 输出应该类似：v20.10.0
```

### 检查 npm
```bash
npm --version
# 输出应该类似：10.2.3
```

### 检查 pnpm
```bash
pnpm --version
# 输出应该类似：8.15.0
```

## 项目设置

### 使用 npm

```bash
# 1. 进入项目目录
cd packages/website

# 2. 安装依赖
npm install

# 3. 安装缺失的依赖
npm install @astrojs/sitemap --save-dev

# 4. 启动开发服务器
npm run dev
```

### 使用 pnpm

```bash
# 1. 进入项目目录
cd packages/website

# 2. 安装依赖
pnpm install

# 3. 安装缺失的依赖
pnpm add @astrojs/sitemap -D

# 4. 启动开发服务器
pnpm run dev
```

## 常见问题

### 问题 1：权限错误

**错误信息**：
```
Error: EACCES: permission denied
```

**解决方案**：
```bash
# 方法一：修复 npm 权限
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.zshrc
source ~/.zshrc

# 方法二：使用 sudo（不推荐）
sudo npm install -g pnpm

# 方法三：使用 nvm（推荐）
# nvm 会自动处理权限问题
```

### 问题 2：版本过旧

**错误信息**：
```
Node.js version is too old
```

**解决方案**：
```bash
# 使用 nvm 安装最新版本
nvm install --lts
nvm use --lts
```

### 问题 3：网络问题

**错误信息**：
```
npm ERR! network request failed
```

**解决方案**：
```bash
# 使用淘宝镜像（中国用户）
npm config set registry https://registry.npmmirror.com

# 或使用 pnpm
pnpm config set registry https://registry.npmmirror.com

# 恢复官方镜像
npm config set registry https://registry.npmjs.org
```

### 问题 4：找不到命令

**错误信息**：
```
command not found: node
command not found: npm
command not found: pnpm
```

**解决方案**：
```bash
# 检查 PATH 环境变量
echo $PATH

# 如果路径不在 PATH 中，添加到 shell 配置
# 对于 zsh（macOS 默认）
echo 'export PATH="/usr/local/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# 对于 bash
echo 'export PATH="/usr/local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

## 卸载

### 卸载 Node.js 和 npm

#### macOS
```bash
# 使用 Homebrew 安装的
brew uninstall node

# 使用 nvm 安装的
nvm uninstall <version>

# 手动删除（不推荐）
sudo rm -rf /usr/local/{lib/node{,/.npm,_modules},bin,share/man}/{npm*,node*,man1/node*}
sudo rm -rf ~/.npm
```

#### Windows
```bash
# 使用 Chocolatey 安装的
choco uninstall nodejs

# 使用 scoop 安装的
scoop uninstall nodejs

# 使用控制面板
1. 打开"应用和功能"
2. 搜索 "Node.js"
3. 点击卸载
```

### 卸载 pnpm

```bash
# 全局卸载
npm uninstall -g pnpm

# 或
pnpm remove -g pnpm
```

## 下一步

安装完成后，请参考：
- [本地预览指南](./deployment/preview-guide.md)
- [部署指南](./deployment/deployment-guide.md)

## 获取帮助

如果遇到问题：
1. 检查 Node.js 官方文档：https://nodejs.org/docs/
2. 查看 npm 文档：https://docs.npmjs.com/
3. 查看 pnpm 文档：https://pnpm.io/
4. 搜索 Stack Overflow：https://stackoverflow.com/
