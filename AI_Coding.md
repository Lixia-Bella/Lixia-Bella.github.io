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
- [学习资源](#学习资源)
  - [MDN 文档](#mdn-文档)
- [学习计划](#学习计划)
  - [第一周：前端核心（HTML/CSS/ES6+）+ AI 工具入门](#第一周前端核心htmlcsses6-ai-工具入门)
  - [Safe Web Fonts（安全网页字体）](#safe-web-fonts安全网页字体)
  - [CSS 选择器](#css-选择器)

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


| 分类           | 忽略内容                                            |
| ------------ | ----------------------------------------------- |
| macOS 系统文件   | `.DS_Store` 等系统自动生成的隐藏文件                        |
| Windows 系统文件 | `Thumbs.db` 等缩略图缓存文件                            |
| IDE 配置文件     | `.idea/` (JetBrains IDE)、`.vscode/` 已移除以便团队共享配置 |
| Node.js      | `node_modules/` 依赖目录、各种日志文件                     |
| 环境变量文件       | `.env` 系列文件，包含敏感信息，不应提交                         |
| 构建输出         | `dist/`、`build/` 等编译产物                          |


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


| 操作系统        | 换行符             | 说明                          |
| ----------- | --------------- | --------------------------- |
| macOS/Linux | `lf` (`\n`)     | Line Feed，推荐使用              |
| Windows     | `crlf` (`\r\n`) | Carriage Return + Line Feed |


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


| 配置项                        | 值       | 说明                |
| -------------------------- | ------- | ----------------- |
| `charset`                  | `utf-8` | 文件编码统一为 UTF-8     |
| `indent_style`             | `space` | 使用空格缩进（而非 Tab）    |
| `indent_size`              | `2`     | 缩进大小为 2 个空格       |
| `end_of_line`              | `lf`    | 换行符使用 LF（Unix 风格） |
| `insert_final_newline`     | `true`  | 文件末尾自动插入空行        |
| `trim_trailing_whitespace` | `true`  | 自动删除行尾空白字符        |


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


| 设置项                      | 值              | 说明         |
| ------------------------ | -------------- | ---------- |
| `editor.fontSize`        | `14`           | 编辑器字体大小    |
| `editor.tabSize`         | `2`            | Tab 缩进大小   |
| `editor.formatOnSave`    | `true`         | 保存时自动格式化   |
| `files.autoSave`         | `"afterDelay"` | 延迟自动保存     |
| `files.autoSaveDelay`    | `1000`         | 自动保存延迟 1 秒 |
| `editor.minimap.enabled` | `false`        | 关闭右侧代码缩略图  |


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


| 扩展 ID                                   | 名称                 | 功能                         |
| --------------------------------------- | ------------------ | -------------------------- |
| `esbenp.prettier-vscode`                | Prettier           | 代码格式化工具                    |
| `dbaeumer.vscode-eslint`                | ESLint             | JavaScript/TypeScript 代码检查 |
| `editorconfig.editorconfig`             | EditorConfig       | 读取 .editorconfig 配置        |
| `streetsidesoftware.code-spell-checker` | Code Spell Checker | 拼写检查                       |


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

---

## 学习资源

### MDN 文档

**MDN** 全称是 **Mozilla Developer Network**（Mozilla 开发者网络），是由 Mozilla 基金会维护的 Web 开发技术文档网站。它是 Web 开发者最权威、最常用的参考文档之一。

#### 访问地址

- 英文版：[https://developer.mozilla.org/](https://developer.mozilla.org/)
- 中文版：[https://developer.mozilla.org/zh-CN/](https://developer.mozilla.org/zh-CN/)

#### MDN 涵盖的内容


| 分类             | 主要内容                          |
| -------------- | ----------------------------- |
| **HTML**       | 标签参考、属性、语义化、表单等               |
| **CSS**        | 选择器、属性、布局、动画、响应式设计等           |
| **JavaScript** | 语法、API、DOM 操作、异步编程等           |
| **Web API**    | Fetch、Storage、WebRTC、Canvas 等 |
| **HTTP**       | 请求方法、状态码、Header、缓存等           |
| **Web 性能**     | 优化策略、性能监控、最佳实践等               |
| **Web 安全**     | HTTPS、CORS、CSP、XSS 防护等        |


#### MDN 的特点

1. **权威性强** - 由 Mozilla 维护，内容经过严格审核
2. **兼容性好** - 详细标注各浏览器支持情况
3. **示例丰富** - 每个知识点都有代码示例
4. **多语言支持** - 提供中文、英文等多种语言版本
5. **社区驱动** - 开源项目，开发者可以贡献内容

#### 使用建议

学习本项目第 1 周「前端核心 + AI 工具入门」时，MDN 是最重要的参考文档，建议将其作为日常开发的案头手册。

---

## 学习计划

### 第一周：前端核心（HTML/CSS/ES6+）+ AI 工具入门

#### 周一学习计划

##### 学习目标

- 理解 Web 开发的基本概念
- 掌握 HTML 基础语法和常用标签
- 搭建开发环境
- 初步使用 AI 编程工具

##### 学习内容与步骤

###### 第一步：了解 Web 开发基础（约 15 分钟）

**核心概念：**


| 概念             | 说明            |
| -------------- | ------------- |
| **HTML**       | 网页的骨架，定义内容和结构 |
| **CSS**        | 网页的皮肤，负责样式和布局 |
| **JavaScript** | 网页的行为，实现交互功能  |


**浏览器工作原理：**

```
用户输入 URL → 浏览器请求服务器 → 服务器返回 HTML → 浏览器解析渲染 → 用户看到页面
```

**推荐阅读：**

- [MDN - Web 入门](https://developer.mozilla.org/zh-CN/docs/Learn/Getting_started_with_the_web)
- Playground [https://developer.mozilla.org/en-US/play?uuid=86051115683d99888fde3f7c58fde47b432d19c9&state=q1bKKMnNUbJSsimwe7Jr1%2FMp85%2FPannW0%2F58ya73e2bZ6BfYxeTF5NmU5tjF5Cko2ORk2j2d0Pxy6Vob%2FZxMuNDzuQtfLO9EEXrZ3vt0SS9UyEYfrF9JRym5uFjJSklJRykLSpdkpOamKlkp5WSmZ5Qo1QIA&srcPrefix=%2Fzh-CN%2Fdocs%2FLearn_web_development%2FGetting_started%2FYour_first_website%2FCreating_the_content%2F](https://developer.mozilla.org/en-US/play?uuid=86051115683d99888fde3f7c58fde47b432d19c9&state=q1bKKMnNUbJSsimwe7Jr1%2FMp85%2FPannW0%2F58ya73e2bZ6BfYxeTF5NmU5tjF5Cko2ORk2j2d0Pxy6Vob%2FZxMuNDzuQtfLO9EEXrZ3vt0SS9UyEYfrF9JRym5uFjJSklJRykLSpdkpOamKlkp5WSmZ5Qo1QIA&srcPrefix=%2Fzh-CN%2Fdocs%2FLearn_web_development%2FGetting_started%2FYour_first_website%2FCreating_the_content%2F)

###### 第二步：HTML 基础语法（约 40 分钟）

**1. HTML 文档结构**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>我的第一个网页</title>
</head>
<body>
  <!-- 页面内容写在这里 -->
  <h1>你好，世界！</h1>
  <p>这是我的第一个网页。</p>
</body>
</html>
```

**2. 常用 HTML 标签**


| 标签              | 作用             | 示例                          |
| --------------- | -------------- | --------------------------- |
| `<h1>` ~ `<h6>` | 标题，h1 最大，h6 最小 | `<h1>一级标题</h1>`             |
| `<p>`           | 段落             | `<p>这是一段文字</p>`             |
| `<a>`           | 超链接            | `<a href="url">链接文字</a>`    |
| `<img>`         | 图片             | `<img src="图片地址" alt="描述">` |
| `<ul>` / `<ol>` | 无序/有序列表        | 配合 `<li>` 使用                |
| `<div>`         | 块级容器           | 用于布局分组                      |
| `<span>`        | 行内容器           | 用于文本样式                      |


**3. 语义化标签（HTML5 新增）**

```html
<header>头部区域</header>
<nav>导航区域</nav>
<main>主要内容</main>
<article>文章内容</article>
<section>区块内容</section>
<aside>侧边栏</aside>
<footer>底部区域</footer>
```

**推荐阅读：**

- [MDN - HTML 入门](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML)
- [MDN - HTML 元素参考](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element)

###### 第三步：动手实践（约 30 分钟）

在 `blog` 目录下创建你的第一个 HTML 页面。

**任务：创建一个简单的个人介绍页面**

要求包含：

1. 页面标题和作者信息
2. 一段自我介绍
3. 一个爱好列表
4. 一个外部链接（如 GitHub 或博客）

###### 第四步：AI 编程工具入门（约 15 分钟）

**Cursor 编辑器基础使用：**


| 功能    | 快捷键                                | 说明             |
| ----- | ---------------------------------- | -------------- |
| AI 对话 | `Cmd + L` (Mac) / `Ctrl + L` (Win) | 打开 AI 对话面板     |
| 代码生成  | -                                  | 描述需求，让 AI 生成代码 |
| 代码解释  | -                                  | 选中代码，让 AI 解释功能 |
| 代码优化  | -                                  | 让 AI 帮你优化或重构代码 |


**实践技巧：**

- 提问要具体，说明上下文
- 让 AI 解释生成的代码，加深理解
- 不懂的地方直接问 AI

##### 今日作业

- 阅读 MDN Web 入门文档
- 创建一个简单的 HTML 页面
- 尝试用 AI 生成一段 HTML 代码并理解它

##### 学习资源汇总


| 资源          | 链接                                                                                                                                                         |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| MDN Web 入门  | [https://developer.mozilla.org/zh-CN/docs/Learn/Getting_started_with_the_web](https://developer.mozilla.org/zh-CN/docs/Learn/Getting_started_with_the_web) |
| MDN HTML 入门 | [https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML)       |
| HTML 元素参考   | [https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element)                                     |


---

### Safe Web Fonts（安全网页字体）

#### 什么是 Safe Web Fonts？

**Safe Web Fonts**（安全网页字体）是指在绝大多数操作系统和浏览器中都预装的字体。使用这些字体可以确保网页在不同设备上都能正常显示，不会因为用户没有安装特定字体而出现显示问题。

#### 为什么需要安全网页字体？

当你在 CSS 中指定字体时，如果用户的设备没有安装该字体，浏览器会使用默认字体替代，这可能导致：

- 页面显示效果与设计不符
- 布局错乱
- 用户体验下降

#### 常见的安全网页字体

##### 衬线字体（Serif）


| 字体名称            | 适用系统                | CSS 使用示例                                 |
| --------------- | ------------------- | ---------------------------------------- |
| Georgia         | Windows、macOS、Linux | `font-family: Georgia, serif;`           |
| Times New Roman | Windows、macOS       | `font-family: "Times New Roman", serif;` |


##### 无衬线字体（Sans-serif）


| 字体名称         | 适用系统                | CSS 使用示例                                     |
| ------------ | ------------------- | -------------------------------------------- |
| Arial        | Windows、macOS、Linux | `font-family: Arial, sans-serif;`            |
| Helvetica    | macOS、iOS           | `font-family: Helvetica, Arial, sans-serif;` |
| Verdana      | Windows、macOS、Linux | `font-family: Verdana, sans-serif;`          |
| Tahoma       | Windows、macOS       | `font-family: Tahoma, sans-serif;`           |
| Trebuchet MS | Windows、macOS       | `font-family: "Trebuchet MS", sans-serif;`   |


##### 等宽字体（Monospace）


| 字体名称        | 适用系统                | CSS 使用示例                                 |
| ----------- | ------------------- | ---------------------------------------- |
| Courier New | Windows、macOS、Linux | `font-family: "Courier New", monospace;` |
| Consolas    | Windows             | `font-family: Consolas, monospace;`      |
| Monaco      | macOS               | `font-family: Monaco, monospace;`        |


#### 最佳实践

##### 1. 使用字体栈（Font Stack）

始终提供备选字体，以 `serif`、`sans-serif`、`monospace` 结尾：

```css
/* 无衬线字体栈 */
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

/* 衬线字体栈 */
h1 {
  font-family: Georgia, "Times New Roman", Times, serif;
}

/* 等宽字体栈 */
code {
  font-family: Consolas, Monaco, "Courier New", monospace;
}
```

##### 2. 系统字体栈

使用系统原生字体可以获得最佳性能和原生体验：

```css
/* macOS / iOS 系统字体 */
font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display";

/* Windows 系统字体 */
font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;

/* 跨平台系统字体栈 */
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
```

##### 3. Web Fonts 替代方案

如果需要使用非安全字体，可以使用 Web Fonts 服务：

- **Google Fonts**：[https://fonts.google.com/](https://fonts.google.com/)
- **Adobe Fonts**：[https://fonts.adobe.com/](https://fonts.adobe.com/)

```html
<!-- 引入 Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
```

```css
body {
  font-family: "Roboto", Arial, sans-serif;
}
```

---

### CSS 选择器

CSS 选择器用于选中 HTML 元素并应用样式。以下是 CSS 选择器的完整分类。

#### 基本选择器

##### 通配符选择器

选中所有元素。

```css
* {
  margin: 0;
  padding: 0;
}
```

##### 元素选择器（标签选择器）

选中所有指定标签的元素。

```css
p {
  color: #333;
}

h1 {
  font-size: 24px;
}
```

##### 类选择器

选中所有指定类名的元素，使用 `.` 开头。

```css
.container {
  width: 100%;
  max-width: 1200px;
}

.text-center {
  text-align: center;
}
```

```html
<div class="container">
  <p class="text-center">居中的文本</p>
</div>
```

##### ID 选择器

选中指定 ID 的元素，使用 `#` 开头。ID 在页面中应唯一。

```css
#header {
  background-color: #fff;
  position: fixed;
}

#main-content {
  padding: 20px;
}
```

```html
<header id="header">页面头部</header>
<main id="main-content">主要内容</main>
```

##### 基本选择器对比

| 选择器 | 语法 | 特点 | 使用场景 |
|--------|------|------|----------|
| 通配符 | `*` | 选中所有元素 | 重置样式 |
| 元素 | `tag` | 选中所有同名标签 | 基础样式 |
| 类 | `.class` | 可复用，可多个 | 最常用 |
| ID | `#id` | 唯一性，权重高 | 页面唯一元素 |

#### 关系选择器

##### 后代选择器（空格）

选中某元素内部的所有指定后代元素（包括子元素、孙元素等）。

```css
/* 选中 article 内部的所有 p 元素 */
article p {
  line-height: 1.6;
}

/* 选中 nav 内部的所有 a 元素 */
nav a {
  text-decoration: none;
}
```

##### 子代选择器（`>`）

只选中某元素的直接子元素。

```css
/* 只选中 ul 的直接子元素 li，不包括嵌套的 li */
ul > li {
  list-style: none;
}

/* 只选中 nav 的直接子元素 a */
nav > a {
  padding: 10px;
}
```

##### 相邻兄弟选择器（`+`）

选中紧接在某元素之后的第一个兄弟元素。

```css
/* 选中紧跟在 h1 后面的第一个 p 元素 */
h1 + p {
  font-size: 18px;
  color: #666;
}
```

##### 通用兄弟选择器（`~`）

选中某元素之后的所有指定兄弟元素。

```css
/* 选中 h2 后面的所有 p 兄弟元素 */
h2 ~ p {
  margin-top: 10px;
}
```

##### 关系选择器对比

| 选择器 | 语法 | 选中范围 |
|--------|------|----------|
| 后代 | `A B` | A 内部所有 B（包括嵌套） |
| 子代 | `A > B` | A 的直接子元素 B |
| 相邻兄弟 | `A + B` | A 之后紧邻的第一个 B |
| 通用兄弟 | `A ~ B` | A 之后的所有兄弟 B |

#### 属性选择器

根据元素的属性及属性值来选中元素。

```css
/* 选中所有有 title 属性的元素 */
[title] {
  cursor: help;
}

/* 选中 type="text" 的 input */
input[type="text"] {
  border: 1px solid #ccc;
}

/* 选中 href 以 "https" 开头的 a 元素 */
a[href^="https"] {
  color: green;
}

/* 选中 href 以 ".pdf" 结尾的 a 元素 */
a[href$=".pdf"] {
  background: url('pdf-icon.png') no-repeat;
}

/* 选中 class 包含 "btn" 的元素 */
[class*="btn"] {
  padding: 10px 20px;
}

/* 选中 lang 属性以 "zh" 开头的元素（完整单词或连字符） */
[lang|="zh"] {
  quotes: "「" "」";
}
```

##### 属性选择器语法汇总

| 语法 | 说明 |
|------|------|
| `[attr]` | 有 attr 属性 |
| `[attr="value"]` | attr 属性值等于 value |
| `[attr^="value"]` | attr 属性值以 value 开头 |
| `[attr$="value"]` | attr 属性值以 value 结尾 |
| `[attr*="value"]` | attr 属性值包含 value |
| `[attr~="value"]` | attr 属性值包含 value（完整单词） |
| `[attr|="value"]` | attr 属性值等于 value 或以 value- 开头 |

#### 伪类选择器

伪类用于选中元素的特定状态。

##### 状态伪类

```css
/* 未访问的链接 */
a:link {
  color: blue;
}

/* 已访问的链接 */
a:visited {
  color: purple;
}

/* 鼠标悬停 */
a:hover {
  color: red;
}

/* 激活状态（鼠标按下） */
a:active {
  color: orange;
}

/* 获得焦点 */
input:focus {
  border-color: blue;
  outline: none;
}

/* 禁用状态 */
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 选中状态（复选框、单选框） */
input:checked {
  accent-color: blue;
}
```

> **链接伪类顺序**：`link` → `visited` → `hover` → `active`（LVHA 顺序）

##### 结构伪类

```css
/* 第一个子元素 */
li:first-child {
  font-weight: bold;
}

/* 最后一个子元素 */
li:last-child {
  border-bottom: none;
}

/* 第 n 个子元素 */
tr:nth-child(odd) {
  background: #f5f5f5;  /* 奇数行 */
}

tr:nth-child(even) {
  background: #fff;     /* 偶数行 */
}

li:nth-child(3) {
  color: red;           /* 第 3 个 */
}

/* 倒数第 n 个子元素 */
li:nth-last-child(2) {
  color: blue;
}

/* 唯一的子元素 */
p:only-child {
  margin: 0;
}

/* 第一个同类型元素 */
p:first-of-type {
  margin-top: 0;
}

/* 最后一个同类型元素 */
p:last-of-type {
  margin-bottom: 0;
}

/* 第 n 个同类型元素 */
p:nth-of-type(2) {
  text-indent: 2em;
}

/* 空元素 */
div:empty {
  display: none;
}
```

##### 否定伪类

```css
/* 选中不是 .active 的 li */
li:not(.active) {
  opacity: 0.5;
}

/* 选中没有被禁用的 input */
input:not(:disabled) {
  background: white;
}
```

#### 伪元素选择器

伪元素用于选中元素的特定部分，或创建虚拟元素。

```css
/* 首行 */
p::first-line {
  font-weight: bold;
}

/* 首字母 */
p::first-letter {
  font-size: 2em;
  float: left;
}

/* 在元素内容之前插入内容 */
.required::before {
  content: "*";
  color: red;
}

/* 在元素内容之后插入内容 */
.link::after {
  content: " →";
}

/* 选中文本样式 */
::selection {
  background: #ffeb3b;
  color: #000;
}

/* 占位符文本样式 */
input::placeholder {
  color: #999;
  font-style: italic;
}
```

#### 选择器权重（优先级）

当多个选择器选中同一元素时，权重高的生效。

| 选择器 | 权重 | 示例 |
|--------|------|------|
| `!important` | 最高（不建议使用） | `color: red !important;` |
| 行内样式 | 1000 | `style="color: red;"` |
| ID 选择器 | 100 | `#header` |
| 类、伪类、属性选择器 | 10 | `.active`、`:hover`、`[type="text"]` |
| 元素、伪元素选择器 | 1 | `div`、`::before` |
| 通配符 | 0 | `*` |

**权重计算示例：**

```css
/* 权重: 1 */
p {
  color: black;
}

/* 权重: 10 */
.text {
  color: blue;
}

/* 权重: 100 */
#intro {
  color: green;
}

/* 权重: 1 + 10 = 11 */
p.text {
  color: red;
}

/* 权重: 100 + 10 = 110 */
#intro.text {
  color: orange;
}
```

> **提示**：尽量使用低权重选择器，避免使用 `!important`，保持样式可维护性。

