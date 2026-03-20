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
  - [周一学习计划](#周一学习计划)
  - [周二学习计划](#周二学习计划)
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
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
5. 1 个响应式导航栏（PC + 移动端适配）

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

#### 周二学习计划

##### 学习目标

- 掌握 CSS3 动画与过渡（transition、animation、@keyframes）
- 理解响应式设计原理与媒体查询断点
- 学会使用 CSS3 实现常见交互效果
- 通过实战练习巩固 CSS3 进阶知识

##### 学习内容与步骤

###### 第一步：CSS3 过渡（Transition）深入理解（约 25 分钟）

**核心概念：**

CSS `transition` 用于在属性值变化时添加平滑的过渡效果，而不是瞬间切换。

**transition 四大属性：**


| 属性                           | 说明          | 示例                                  |
| ---------------------------- | ----------- | ----------------------------------- |
| `transition-property`        | 要过渡的 CSS 属性 | `all`、`transform`、`opacity`         |
| `transition-duration`        | 过渡持续时间      | `0.3s`、`500ms`                      |
| `transition-timing-function` | 过渡速度曲线      | `ease`、`linear`、`cubic-bezier(...)` |
| `transition-delay`           | 过渡延迟时间      | `0s`、`0.1s`                         |


**简写语法：**

```css
/* transition: property duration timing-function delay; */
.element {
	transition: all 0.3s ease 0s;
}

/* 多属性分别设置不同过渡 */
.element {
	transition:
		transform 0.3s ease,
		opacity 0.5s ease 0.1s,
		background-color 0.2s linear;
}
```

**常用速度曲线对比：**


| 曲线名称                           | 效果说明                 | 适用场景     |
| ------------------------------ | -------------------- | -------- |
| `ease`                         | 先快后慢（默认值）            | 通用场景     |
| `ease-in`                      | 先慢后快                 | 元素退出     |
| `ease-out`                     | 先快后慢                 | 元素进入     |
| `ease-in-out`                  | 两头慢中间快               | 来回动画     |
| `linear`                       | 匀速                   | 进度条、旋转   |
| `cubic-bezier(0.4, 0, 0.2, 1)` | Material Design 标准曲线 | 现代 UI 交互 |


**实践示例 - 按钮悬停效果：**

```css
.btn {
	padding: 12px 24px;
	background: #f2a6b3;
	color: white;
	border: none;
	border-radius: 16px;
	cursor: pointer;
	/* 过渡：变换、阴影、背景色分别设置 */
	transition:
		transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
		box-shadow 0.3s ease,
		background-color 0.2s ease;
}

.btn:hover {
	transform: translateY(-3px) scale(1.02);
	box-shadow: 0 8px 24px rgba(242, 166, 179, 0.35);
	background: #e8899a;
}

.btn:active {
	transform: translateY(-1px) scale(0.98);
	box-shadow: 0 4px 12px rgba(242, 166, 179, 0.25);
}
```

**推荐阅读：**

- [MDN - CSS transition](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_transitions/Using_CSS_transitions)
- [cubic-bezier 可视化工具](https://cubic-bezier.com/)

###### 第二步：CSS3 动画（Animation + @keyframes）（约 30 分钟）

**核心概念：**

与 `transition` 只能在两个状态间过渡不同，`animation` + `@keyframes` 可以定义多个关键帧，实现更复杂的动画效果。

**@keyframes 定义动画：**

```css
/* 方式一：from/to（等同于 0%/100%） */
@keyframes fadeIn {
	from {
		opacity: 0;
		transform: translateY(20px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

/* 方式二：百分比（多个关键帧） */
@keyframes bounce {
	0% {
		transform: translateY(0);
	}
	30% {
		transform: translateY(-30px);
	}
	50% {
		transform: translateY(0);
	}
	70% {
		transform: translateY(-15px);
	}
	100% {
		transform: translateY(0);
	}
}

/* 方式三：复杂动画 - 颜色渐变呼吸灯 */
@keyframes breathe {
	0% {
		box-shadow: 0 0 10px rgba(242, 166, 179, 0.3);
	}
	50% {
		box-shadow: 0 0 25px rgba(195, 177, 225, 0.5);
	}
	100% {
		box-shadow: 0 0 10px rgba(242, 166, 179, 0.3);
	}
}
```

**animation 八大属性：**


| 属性                          | 说明       | 常用值                                  |
| --------------------------- | -------- | ------------------------------------ |
| `animation-name`            | 动画名称     | 对应 @keyframes 名称                     |
| `animation-duration`        | 动画持续时间   | `0.5s`、`1s`、`2s`                     |
| `animation-timing-function` | 速度曲线     | `ease`、`linear`、`cubic-bezier(...)`  |
| `animation-delay`           | 延迟时间     | `0s`、`0.2s`                          |
| `animation-iteration-count` | 播放次数     | `1`、`3`、`infinite`                   |
| `animation-direction`       | 播放方向     | `normal`、`reverse`、`alternate`       |
| `animation-fill-mode`       | 动画结束后的状态 | `none`、`forwards`、`backwards`、`both` |
| `animation-play-state`      | 播放/暂停    | `running`、`paused`                   |


**简写语法：**

```css
/* animation: name duration timing-function delay iteration-count direction fill-mode; */
.element {
	animation: fadeIn 0.5s ease 0s 1 normal forwards;
}

/* 常用简写 */
.card {
	animation: slideUp 0.6s ease forwards;
}

/* 无限循环动画 */
.spinner {
	animation: rotate 1s linear infinite;
}
```

**fill-mode 详解（重要）：**


| 值           | 动画前  | 动画后  | 说明                        |
| ----------- | ---- | ---- | ------------------------- |
| `none`      | 初始状态 | 初始状态 | 动画结束回到原始状态                |
| `forwards`  | 初始状态 | 最后帧  | 动画结束保持最后一帧的状态             |
| `backwards` | 第一帧  | 初始状态 | 延迟期间显示第一帧                 |
| `both`      | 第一帧  | 最后帧  | 同时应用 forwards 和 backwards |


**推荐阅读：**

- [MDN - CSS animation](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_animations/Using_CSS_animations)
- [MDN - @keyframes](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@keyframes)
- [Animista - CSS 动画生成器](https://animista.net/)

###### 第三步：响应式设计与媒体查询（约 20 分钟）

**核心概念：**

响应式设计让网页在不同设备（手机、平板、桌面）上都能良好显示。核心工具是 CSS 媒体查询（Media Queries）。

**常用断点（Breakpoints）：**


| 断点         | 目标设备      | 媒体查询                         |
| ---------- | --------- | ---------------------------- |
| `< 320px`  | 小屏手机      | `@media (max-width: 320px)`  |
| `< 480px`  | 手机竖屏      | `@media (max-width: 480px)`  |
| `< 768px`  | 平板竖屏      | `@media (max-width: 768px)`  |
| `< 1024px` | 平板横屏/小笔记本 | `@media (max-width: 1024px)` |
| `< 1200px` | 笔记本       | `@media (max-width: 1200px)` |
| `≥ 1200px` | 桌面显示器     | 默认样式（桌面优先）                   |


**移动优先 vs 桌面优先：**

```css
/* 桌面优先（Desktop First）- 使用 max-width */
.container {
	width: 1200px;
}
@media (max-width: 768px) {
	.container {
		width: 100%;
	}
}

/* 移动优先（Mobile First）- 使用 min-width（推荐） */
.container {
	width: 100%;
}
@media (min-width: 768px) {
	.container {
		width: 750px;
	}
}
@media (min-width: 1200px) {
	.container {
		width: 1170px;
	}
}
```

**响应式单位对比：**


| 单位        | 说明              | 适用场景        |
| --------- | --------------- | ----------- |
| `px`      | 固定像素            | 边框、小间距      |
| `%`       | 相对父元素           | 宽度、布局       |
| `em`      | 相对当前元素字体大小      | 内边距、外边距     |
| `rem`     | 相对根元素（html）字体大小 | 字体大小、间距（推荐） |
| `vw`      | 视口宽度的 1%        | 全屏布局、响应式字体  |
| `vh`      | 视口高度的 1%        | 全屏高度        |
| `clamp()` | 限制范围的响应式值       | 响应式字体大小     |


**clamp() 函数（现代响应式利器）：**

```css
/* clamp(最小值, 首选值, 最大值) */
h1 {
	/* 字体大小在 1.5rem 到 2.5rem 之间，随视口宽度变化 */
	font-size: clamp(1.5rem, 4vw, 2.5rem);
}

.container {
	/* 宽度在 300px 到 1200px 之间 */
	width: clamp(300px, 90vw, 1200px);
}
```

**推荐阅读：**

- [MDN - 响应式设计](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [MDN - 媒体查询](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_media_queries/Using_media_queries)

###### 第四步：动手实践 - 增强现有项目（约 45 分钟）

基于周一已完成的项目，完成以下实战任务：

**任务一：为导航栏链接添加高级 hover 动画**

要求：

1. 导航链接悬停时添加下划线滑入动画（使用 `::after` 伪元素）
2. 当前激活页面的导航链接有持续的高亮指示
3. 移动端汉堡菜单展开时，每个菜单项依次滑入（使用 `animation-delay` 实现错落效果）

**任务二：为页面卡片添加入场动画**

要求：

1. 页面加载时，各区块（头像、标题、介绍、爱好等）依次从下方淡入
2. 使用 `@keyframes` 定义 `slideUp` 动画
3. 通过 `animation-delay` 实现错落入场效果
4. 使用 `Intersection Observer` 实现滚动触发动画（仅在元素进入视口时播放）

**任务三：实现响应式断点优化**

要求：

1. 检查并优化现有页面在 320px、480px、768px 三个断点下的显示效果
2. 导航栏在移动端展开时添加平滑的高度过渡动画
3. 爱好卡片在不同屏幕尺寸下的列数自适应（手机 1 列、平板 2 列、桌面 3 列）
4. 字体大小使用 `clamp()` 实现平滑缩放

**任务四（加分项）：添加暗色模式切换**

要求：

1. 在导航栏添加一个日/月亮图标按钮
2. 点击切换亮色/暗色主题
3. 使用 CSS 变量（已有）+ `data-theme` 属性实现主题切换
4. 主题偏好保存到 `localStorage`
5. 切换时添加平滑过渡动画

**任务五（首页添加）**  
@docs/多列布局.png 根据这个多列布局的设计图，在首页添加每日最新的一篇文章内容（文章内容从 blogs 目录下获取, 以目录名称倒序排序，获取第一篇文档即可），内容高度适中即可，多余的内容在末尾添加 more 按钮查看完整文章。帮我把以上的任务总结整理到 blogs/20260319.md 文档中，并将这篇文章显示在首页。 

##### 今日作业

- 阅读 MDN CSS transition 和 animation 文档
- 完成任务一：导航栏 hover 动画增强
- 完成任务二：页面卡片入场动画
- 完成任务三：响应式断点优化
- （可选）完成任务四：暗色模式切换
- 在浏览器开发者工具中测试不同屏幕尺寸下的效果
- 记录学习笔记，整理 CSS3 动画常用代码片段

##### 学习资源汇总


| 资源                 | 链接                                                                                                                                                                               |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| MDN CSS transition | [https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_transitions/Using_CSS_transitions](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_transitions/Using_CSS_transitions) |
| MDN CSS animation  | [https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_animations/Using_CSS_animations](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_animations/Using_CSS_animations)     |
| MDN 响应式设计          | [https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Responsive_Design](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Responsive_Design)               |
| MDN 媒体查询           | [https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_media_queries/Using_media_queries](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_media_queries/Using_media_queries) |
| cubic-bezier 可视化   | [https://cubic-bezier.com/](https://cubic-bezier.com/)                                                                                                                           |
| Animista 动画生成器     | [https://animista.net/](https://animista.net/)                                                                                                                                   |
| CSS Tricks - 动画指南  | [https://css-tricks.com/almanac/properties/a/animation/](https://css-tricks.com/almanac/properties/a/animation/)                                                                 |


