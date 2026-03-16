# AI_Coding_Blog_Learning 项目配置指南

本文档记录了项目的开发环境配置，包括 Git 忽略规则、编辑器配置、扩展推荐等内容。

## 目录

- [项目概述](#项目概述)
- [Git 配置](#git-配置)
  - [.gitignore](#gitignore)
  - [.gitattributes](#gitattributes)
- [编辑器配置](#编辑器配置)
  - [.editorconfig](#editorconfig)
  - [VS Code 配置](#vs-code-配置)
- [配置说明](#配置说明)

---

## 项目概述

本项目是一个 AI 编程学习博客项目，主要包含以下目录结构：

```
AI_Coding_Blog_Learning/
├── blog/          # 博客内容目录
├── docs/          # 文档和学习资料
├── .gitignore     # Git 忽略规则
├── .gitattributes # Git 换行符配置
├── .editorconfig  # 跨编辑器配置
└── .vscode/       # VS Code 配置
    ├── settings.json    # 编辑器设置
    ├── extensions.json  # 推荐扩展
    └── launch.json      # 调试配置
```

---

## Git 配置

### .gitignore

`.gitignore` 文件用于指定 Git 应该忽略的文件和目录，避免将不必要的文件提交到仓库。

```gitignore
# macOS 系统文件
.DS_Store
.AppleDouble
.LSOverride
._*

# Windows 系统文件
Thumbs.db
ehthumbs.db
Desktop.ini

# IDE 配置文件
.idea/
*.swp
*.swo
*~

# Node.js
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
package-lock.json
yarn.lock

# 环境变量文件
.env
.env.local
.env.*.local

# 日志文件
logs/
*.log

# 临时文件
tmp/
temp/
*.tmp

# 构建输出
dist/
build/
out/

# 依赖目录
vendor/

# 测试覆盖率
coverage/

# Cursor 相关
.cursor/
```

**说明：**

| 分类 | 忽略内容 |
|------|----------|
| macOS 系统文件 | `.DS_Store` 等系统自动生成的隐藏文件 |
| Windows 系统文件 | `Thumbs.db` 等缩略图缓存文件 |
| IDE 配置文件 | `.idea/` (JetBrains IDE)、`.vscode/` 已移除以便团队共享配置 |
| Node.js | `node_modules/` 依赖目录、各种日志文件 |
| 环境变量文件 | `.env` 系列文件，包含敏感信息，不应提交 |
| 构建输出 | `dist/`、`build/` 等编译产物 |

> 注意：`.vscode/` 目录未被忽略，以便团队成员共享编辑器配置。

### .gitattributes

`.gitattributes` 文件用于统一处理不同操作系统的换行符问题，确保团队协作时的一致性。

```gitattributes
# 自动检测文本文件并规范化换行符为 LF
* text=auto eol=lf

# 明确指定文本文件
*.txt text
*.md text
*.json text
*.js text
*.ts text
*.jsx text
*.tsx text
*.html text
*.css text
*.scss text
*.less text
*.xml text
*.yml text
*.yaml text
*.sh text

# 保持这些文件的原有换行符（不转换）
*.png binary
*.jpg binary
*.jpeg binary
*.gif binary
*.ico binary
*.pdf binary
*.zip binary
*.xlsx binary
*.docx binary
```

**换行符说明：**

| 操作系统 | 换行符 | 说明 |
|----------|--------|------|
| macOS/Linux | `lf` (`\n`) | Line Feed，推荐使用 |
| Windows | `crlf` (`\r\n`) | Carriage Return + Line Feed |

通过 `.gitattributes` 配置，Git 会在提交时自动将所有文本文件的换行符统一为 `lf`，检出时根据操作系统自动转换。这样即使有 Windows 用户参与开发，也能保证仓库中换行符的一致性。

---

## 编辑器配置

### .editorconfig

`.editorconfig` 用于在不同编辑器和 IDE 之间保持一致的编码风格。

```editorconfig
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false
```

**配置项说明：**

| 配置项 | 值 | 说明 |
|--------|-----|------|
| `charset` | `utf-8` | 文件编码统一为 UTF-8 |
| `indent_style` | `space` | 使用空格缩进（而非 Tab） |
| `indent_size` | `2` | 缩进大小为 2 个空格 |
| `end_of_line` | `lf` | 换行符使用 LF（Unix 风格） |
| `insert_final_newline` | `true` | 文件末尾自动插入空行 |
| `trim_trailing_whitespace` | `true` | 自动删除行尾空白字符 |

> 特殊说明：Markdown 文件（`*.md`）保留行尾空格，因为 Markdown 语法中行尾两个空格表示换行。

### VS Code 配置

#### settings.json

VS Code 工作区设置，优先级高于用户全局设置。

```json
{
  "editor.fontSize": 14,
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "editor.minimap.enabled": false,
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000,
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,
  "search.exclude": {
    "**/node_modules": true,
    "**/bower_components": true,
    "**/.git": true,
    "**/.DS_Store": true
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[markdown]": {
    "editor.wordWrap": "on"
  }
}
```

**关键设置说明：**

| 设置项 | 值 | 说明 |
|--------|-----|------|
| `editor.fontSize` | `14` | 编辑器字体大小 |
| `editor.tabSize` | `2` | Tab 缩进大小 |
| `editor.formatOnSave` | `true` | 保存时自动格式化 |
| `files.autoSave` | `"afterDelay"` | 延迟自动保存 |
| `files.autoSaveDelay` | `1000` | 自动保存延迟 1 秒 |
| `editor.minimap.enabled` | `false` | 关闭右侧代码缩略图 |

#### extensions.json

推荐安装的 VS Code 扩展列表。

```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "editorconfig.editorconfig",
    "streetsidesoftware.code-spell-checker"
  ]
}
```

**扩展说明：**

| 扩展 ID | 名称 | 功能 |
|---------|------|------|
| `esbenp.prettier-vscode` | Prettier | 代码格式化工具 |
| `dbaeumer.vscode-eslint` | ESLint | JavaScript/TypeScript 代码检查 |
| `editorconfig.editorconfig` | EditorConfig | 读取 .editorconfig 配置 |
| `streetsidesoftware.code-spell-checker` | Code Spell Checker | 拼写检查 |

#### launch.json

调试配置文件模板，目前为空配置，可根据项目需要添加调试配置。

```json
{
  "version": "0.2.0",
  "configurations": []
}
```

---

## 配置说明

### 为什么需要这些配置？

1. **统一团队开发环境**：不同开发者使用不同的操作系统和编辑器，通过统一的配置文件确保代码风格一致。

2. **减少代码审查成本**：格式化、换行符等问题不再出现在代码审查中。

3. **提高开发效率**：自动化格式化、自动保存等功能减少手动操作。

4. **保护敏感信息**：`.gitignore` 确保环境变量、日志等敏感或临时文件不被提交。

### 配置文件的优先级

VS Code 中配置的优先级从高到低：

1. 工作区设置 (`.vscode/settings.json`)
2. 用户设置
3. 默认设置

`.editorconfig` 的优先级从高到低：

1. 当前目录的 `.editorconfig`
2. 父级目录的 `.editorconfig`
3. 直到 `root = true` 的目录为止

### 快速开始

1. 克隆项目后，VS Code 会自动提示安装推荐的扩展
2. 安装 EditorConfig 扩展以确保 `.editorconfig` 生效
3. 开始编码，保存时会自动格式化

---

*文档创建时间：2026年3月16日*