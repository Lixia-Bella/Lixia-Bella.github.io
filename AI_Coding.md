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
  - [周三学习计划](#周三学习计划)
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


---

#### 周三学习计划

##### 学习目标

- 掌握 JavaScript ES6+ 核心语法（let/const、箭头函数、模板字符串、解构赋值）
- 理解 ES6 模块化（import/export）的使用方式
- 掌握数组高阶方法（map、filter、reduce、forEach）
- 理解 Promise 与 async/await 异步编程基础
- 通过实战练习将 JS 应用到现有项目中

##### 学习内容与步骤

###### 第一步：ES6+ 变量声明与基础语法（约 20 分钟）

**var vs let vs const：**


| 关键字     | 作用域  | 可重新赋值 | 可重复声明 | 提升行为           | 推荐场景     |
| ------- | ---- | ----- | ----- | -------------- | -------- |
| `var`   | 函数作用域 | ✅     | ✅     | 变量提升（值为 undefined） | ❌ 不推荐使用 |
| `let`   | 块级作用域 | ✅     | ❌     | 暂时性死区（TDZ）     | 需要重新赋值时  |
| `const` | 块级作用域 | ❌     | ❌     | 暂时性死区（TDZ）     | 默认首选     |


**最佳实践：** 默认使用 `const`，只在需要重新赋值时使用 `let`，永远不用 `var`。

```javascript
// const - 常量声明（推荐默认使用）
const API_URL = 'https://api.example.com';
const user = { name: '小明', age: 25 };
user.age = 26; // ✅ 可以修改对象属性
// user = {};  // ❌ 不能重新赋值

// let - 需要重新赋值时使用
let count = 0;
count += 1; // ✅

// 块级作用域
if (true) {
  let x = 10;
  const y = 20;
}
// console.log(x); // ❌ ReferenceError
```

**模板字符串（Template Literals）：**

```javascript
const name = '小明';
const age = 25;

// ES5 字符串拼接
const msg1 = '你好，我是' + name + '，今年' + age + '岁。';

// ES6 模板字符串（推荐）
const msg2 = `你好，我是${name}，今年${age}岁。`;

// 支持多行文本
const html = `
  <div class="card">
    <h2>${name}</h2>
    <p>年龄：${age}</p>
  </div>
`;

// 支持表达式
const price = 99.5;
const quantity = 3;
const total = `总价：¥${(price * quantity).toFixed(2)}`;
```

**推荐阅读：**

- [MDN - let](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let)
- [MDN - const](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/const)
- [MDN - 模板字符串](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Template_literals)

###### 第二步：箭头函数与解构赋值（约 25 分钟）

**箭头函数（Arrow Functions）：**

```javascript
// 传统函数
function add(a, b) {
  return a + b;
}

// 箭头函数
const add = (a, b) => a + b;

// 单参数可省略括号
const double = x => x * 2;

// 多行需要大括号和 return
const greet = (name) => {
  const message = `你好，${name}！`;
  return message;
};

// 返回对象需要用括号包裹
const createUser = (name, age) => ({ name, age });
```

**箭头函数 vs 普通函数的关键区别：**


| 特性          | 普通函数                | 箭头函数           |
| ----------- | ------------------- | -------------- |
| `this` 绑定   | 动态绑定（调用时决定）         | 词法绑定（定义时决定）    |
| `arguments` | 有                   | 无（使用剩余参数 `...`） |
| 作为构造函数      | 可以（`new`）           | 不可以            |
| 适用场景        | 对象方法、构造函数           | 回调函数、数组方法      |


**解构赋值（Destructuring）：**

```javascript
// 数组解构
const [first, second, ...rest] = [1, 2, 3, 4, 5];
// first = 1, second = 2, rest = [3, 4, 5]

// 跳过元素
const [, , third] = [1, 2, 3];
// third = 3

// 默认值
const [a = 0, b = 0] = [1];
// a = 1, b = 0

// 对象解构
const { name, age, city = '北京' } = { name: '小明', age: 25 };
// name = '小明', age = 25, city = '北京'

// 重命名
const { name: userName, age: userAge } = { name: '小明', age: 25 };
// userName = '小明', userAge = 25

// 嵌套解构
const { address: { province, city } } = {
  address: { province: '广东', city: '深圳' }
};

// 函数参数解构（非常实用）
const printUser = ({ name, age, role = '用户' }) => {
  console.log(`${name}，${age}岁，角色：${role}`);
};
printUser({ name: '小明', age: 25 });
```

**展开运算符（Spread Operator）：**

```javascript
// 数组展开
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]

// 对象展开（浅拷贝）
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // { a: 1, b: 2, c: 3 }

// 合并对象（后面的属性覆盖前面的）
const defaults = { theme: 'light', lang: 'zh' };
const userSettings = { theme: 'dark' };
const settings = { ...defaults, ...userSettings };
// { theme: 'dark', lang: 'zh' }
```

**推荐阅读：**

- [MDN - 箭头函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
- [MDN - 解构赋值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- [MDN - 展开语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

###### 第三步：数组高阶方法（约 25 分钟）

**核心概念：** 高阶方法是接收函数作为参数的方法，它们不会修改原数组，而是返回新数组或新值。

**常用数组方法对比：**


| 方法          | 作用         | 返回值    | 是否改变原数组 |
| ----------- | ---------- | ------ | ------- |
| `forEach()` | 遍历数组       | `undefined` | 否       |
| `map()`     | 映射/转换每个元素  | 新数组    | 否       |
| `filter()`  | 过滤符合条件的元素  | 新数组    | 否       |
| `reduce()`  | 将数组归约为单个值  | 累积值    | 否       |
| `find()`    | 查找第一个符合条件的 | 元素或 undefined | 否       |
| `some()`    | 是否有元素满足条件  | 布尔值    | 否       |
| `every()`   | 是否所有元素满足条件 | 布尔值    | 否       |


```javascript
const products = [
  { name: '键盘', price: 299, category: '外设' },
  { name: '鼠标', price: 149, category: '外设' },
  { name: '显示器', price: 2499, category: '显示' },
  { name: '耳机', price: 599, category: '音频' },
  { name: '摄像头', price: 399, category: '外设' },
];

// map - 提取所有商品名称
const names = products.map(p => p.name);
// ['键盘', '鼠标', '显示器', '耳机', '摄像头']

// filter - 筛选价格低于 500 的商品
const affordable = products.filter(p => p.price < 500);

// reduce - 计算总价
const totalPrice = products.reduce((sum, p) => sum + p.price, 0);
// 3945

// find - 查找第一个外设类商品
const firstPeripheral = products.find(p => p.category === '外设');
// { name: '键盘', price: 299, category: '外设' }

// some - 是否有超过 2000 的商品
const hasExpensive = products.some(p => p.price > 2000);
// true

// 链式调用（非常常见）
const result = products
  .filter(p => p.category === '外设')
  .map(p => `${p.name}：¥${p.price}`)
  .join('、');
// '键盘：¥299、鼠标：¥149、摄像头：¥399'
```

**reduce 进阶用法：**

```javascript
// 按类别分组
const grouped = products.reduce((acc, p) => {
  if (!acc[p.category]) {
    acc[p.category] = [];
  }
  acc[p.category].push(p);
  return acc;
}, {});
// { 外设: [...], 显示: [...], 音频: [...] }

// 统计各类别数量
const counts = products.reduce((acc, p) => {
  acc[p.category] = (acc[p.category] || 0) + 1;
  return acc;
}, {});
// { 外设: 3, 显示: 1, 音频: 1 }
```

**推荐阅读：**

- [MDN - Array.prototype.map()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [MDN - Array.prototype.filter()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [MDN - Array.prototype.reduce()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)

###### 第四步：Promise 与 async/await（约 25 分钟）

**回调地狱问题：**

```javascript
// ❌ 回调地狱 - 难以阅读和维护
getData(function(a) {
  getMoreData(a, function(b) {
    getEvenMoreData(b, function(c) {
      console.log(c);
    });
  });
});
```

**Promise 基础：**

```javascript
// Promise 有三种状态：pending（等待）、fulfilled（成功）、rejected（失败）
const fetchData = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        resolve({ data: '请求成功', url });
      } else {
        reject(new Error('URL 不能为空'));
      }
    }, 1000);
  });
};

// 使用 Promise
fetchData('https://api.example.com')
  .then(result => {
    console.log(result.data);
    return fetchData('https://api.example.com/next');
  })
  .then(result => {
    console.log(result.data);
  })
  .catch(error => {
    console.error('请求失败：', error.message);
  })
  .finally(() => {
    console.log('请求完成（无论成功或失败）');
  });
```

**Promise 静态方法：**


| 方法                 | 说明                | 适用场景      |
| ------------------ | ----------------- | --------- |
| `Promise.all()`    | 所有 Promise 都成功才成功 | 并行请求，全部需要 |
| `Promise.allSettled()` | 等待所有完成（不管成败）  | 批量操作，需要所有结果 |
| `Promise.race()`   | 第一个完成的结果（成功或失败）   | 超时控制      |
| `Promise.any()`    | 第一个成功的结果          | 多源竞速      |


```javascript
// Promise.all - 并行请求
const [users, posts, comments] = await Promise.all([
  fetch('/api/users').then(r => r.json()),
  fetch('/api/posts').then(r => r.json()),
  fetch('/api/comments').then(r => r.json()),
]);
```

**async/await（推荐方式）：**

```javascript
// async 函数始终返回 Promise
const loadUserData = async (userId) => {
  try {
    const response = await fetch(`/api/users/${userId}`);

    if (!response.ok) {
      throw new Error(`HTTP 错误：${response.status}`);
    }

    const user = await response.json();
    const posts = await fetch(`/api/users/${userId}/posts`).then(r => r.json());

    return { user, posts };
  } catch (error) {
    console.error('加载用户数据失败：', error.message);
    throw error;
  }
};

// 调用
loadUserData(1)
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

**推荐阅读：**

- [MDN - Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [MDN - async function](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function)
- [MDN - await](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await)

###### 第五步：ES6 模块化（约 15 分钟）

**核心概念：** ES6 模块化通过 `import` 和 `export` 实现代码的拆分和复用，每个文件就是一个模块。

```javascript
// utils.js - 导出
// 命名导出（Named Export）
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('zh-CN');
};

export const formatPrice = (price) => {
  return `¥${price.toFixed(2)}`;
};

// 默认导出（Default Export）- 每个模块只能有一个
const utils = { formatDate, formatPrice };
export default utils;
```

```javascript
// app.js - 导入
// 导入命名导出
import { formatDate, formatPrice } from './utils.js';

// 导入默认导出
import utils from './utils.js';

// 导入全部命名导出
import * as Utils from './utils.js';

// 重命名导入
import { formatDate as fmtDate } from './utils.js';
```

**在 HTML 中使用模块：**

```html
<!-- type="module" 启用 ES6 模块 -->
<script type="module" src="app.js"></script>

<!-- 内联模块 -->
<script type="module">
  import { formatDate } from './utils.js';
  console.log(formatDate(Date.now()));
</script>
```

**推荐阅读：**

- [MDN - JavaScript 模块](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Modules)
- [MDN - import](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import)
- [MDN - export](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/export)

###### 第六步：动手实践 - 为现有项目添加 JS 交互（约 40 分钟）

基于周一、周二已完成的项目，完成以下实战任务：

**任务一：使用 ES6 重构现有 JS 代码**

要求：

1. 将现有项目中的 `var` 全部替换为 `const` / `let`
2. 将普通函数改写为箭头函数（注意 `this` 绑定场景）
3. 使用模板字符串替换字符串拼接
4. 使用解构赋值简化代码

**任务二：实现博客文章列表的动态渲染**

要求：

1. 创建一个博客文章数据数组（包含标题、日期、摘要、标签等字段）
2. 使用 `map()` 方法动态生成文章卡片的 HTML
3. 使用 `filter()` 实现按标签筛选文章
4. 使用 `sort()` 实现按日期排序

**任务三：实现异步数据加载**

要求：

1. 使用 `fetch` + `async/await` 从 `blogs/` 目录加载文章数据
2. 加载过程中显示 loading 动画（使用周二学的 CSS 动画）
3. 加载失败时显示友好的错误提示
4. 使用 `Promise.all()` 并行加载多个资源

**任务四：使用 ES6 模块化组织代码**

要求：

1. 将工具函数抽取到 `js/utils.js` 模块
2. 将博客相关逻辑抽取到 `js/blog.js` 模块
3. 在 HTML 中使用 `<script type="module">` 引入
4. 确保模块间的依赖关系清晰

##### 今日作业

- 阅读 MDN ES6+ 相关文档（let/const、箭头函数、解构赋值）
- 完成任务一：使用 ES6 语法重构现有代码
- 完成任务二：动态渲染博客文章列表
- 完成任务三：实现异步数据加载
- （可选）完成任务四：ES6 模块化组织代码
- 在浏览器控制台中练习数组高阶方法
- 记录学习笔记，整理 ES6+ 常用语法速查表

##### 学习资源汇总


| 资源                    | 链接                                                                                                                                                                                                         |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| MDN - let             | [https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let)                                     |
| MDN - const           | [https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/const](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/const)                                 |
| MDN - 箭头函数            | [https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)                 |
| MDN - 解构赋值            | [https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) |
| MDN - Promise         | [https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)                       |
| MDN - async/await     | [https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function)                 |
| MDN - Array 方法        | [https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)                           |
| MDN - JavaScript 模块   | [https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Modules](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Modules)                                                           |
| ES6 入门教程（阮一峰）        | [https://es6.ruanyifeng.com/](https://es6.ruanyifeng.com/)                                                                                                                                                 |



#### 周四学习计划

##### 学习目标
- 理解 React 的核心概念：组件化思想与 JSX 语法。
- 掌握使用 Vite 快速搭建现代 React 项目。
- 掌握 React 组件的两种核心数据流：Props（属性传递）和 State（内部状态）。
- 能够独立编写基础的 React 组件（如按钮、卡片）。

##### 学习内容与步骤

###### 第一步：使用 Vite 搭建 React 项目（约 15 分钟）

**核心概念：** 过去常用 Create React App (CRA) 搭建项目，现在前端社区推荐使用更轻量、速度更快的 Vite。

**操作步骤：**
1. 打开终端，运行以下命令创建项目：
   ```bash
   npm create vite@latest my-react-app -- --template react
   ```
2. 进入项目目录并安装依赖：
   ```bash
   cd my-react-app
   npm install
   ```
3. 启动开发服务器：
   ```bash
   npm run dev
   ```
4. 在浏览器中打开提示的本地地址（通常是 `http://localhost:5173`），你将看到 React 的欢迎页面。

**项目结构解析：**
- `index.html`：项目入口 HTML 文件。
- `src/main.jsx`：React 应用的入口文件，负责将根组件渲染到 DOM 中。
- `src/App.jsx`：根组件，我们主要在这里编写代码。

###### 第二步：认识 JSX 与组件（约 25 分钟）

**核心概念：** 
- **组件（Component）**：React 应用的构建块。可以将 UI 拆分成独立、可复用的部分。在现代 React 中，推荐使用函数组件。
- **JSX**：JavaScript 的语法扩展，允许我们在 JS 中写类似 HTML 的标签。

**JSX 语法规则：**
1. 只能有一个根元素（可以使用 `<></>` Fragment 包裹）。
2. 标签必须闭合（如 `<img />`）。
3. 属性名使用小驼峰命名法（如 `class` 变成 `className`，`onclick` 变成 `onClick`）。
4. 在 JSX 中插入 JS 表达式需要使用大括号 `{}`。

**代码示例：**
```jsx
// src/components/Welcome.jsx
function Welcome() {
  const name = "前端开发者";
  
  return (
    <div className="welcome-box">
      <h1>你好，{name}！</h1>
      <p>欢迎来到 React 的世界。</p>
    </div>
  );
}

export default Welcome;
```

###### 第三步：掌握 Props（组件传参）（约 25 分钟）

**核心概念：** Props（Properties）是组件的只读属性，用于从父组件向子组件传递数据。

**代码示例：**
```jsx
// 子组件：UserCard.jsx
function UserCard(props) {
  return (
    <div className="card">
      <img src={props.avatar} alt="头像" />
      <h3>{props.name}</h3>
      <p>职业：{props.role}</p>
    </div>
  );
}

// 也可以使用 ES6 解构赋值使代码更简洁
function UserCard({ avatar, name, role }) {
  // ...
}

export default UserCard;

// 父组件：App.jsx
import UserCard from './components/UserCard';

function App() {
  return (
    <div>
      <h2>用户列表</h2>
      <UserCard 
        name="张三" 
        role="前端工程师" 
        avatar="https://via.placeholder.com/50" 
      />
      <UserCard 
        name="李四" 
        role="UI 设计师" 
        avatar="https://via.placeholder.com/50" 
      />
    </div>
  );
}
```

###### 第四步：掌握 State（组件状态）（约 25 分钟）

**核心概念：** State 是组件内部管理的数据，当 State 发生改变时，React 会自动重新渲染该组件以更新 UI。在函数组件中，我们使用 `useState` Hook 来管理状态。

**代码示例：**
```jsx
import { useState } from 'react';

function Counter() {
  // 声明一个叫 "count" 的 state 变量，初始值为 0
  // setCount 是用于更新 count 的函数
  const [count, setCount] = useState(0);

  return (
    <div className="counter">
      <p>当前点击次数：{count}</p>
      {/* 点击按钮时调用 setCount 更新状态 */}
      <button onClick={() => setCount(count + 1)}>
        点击 +1
      </button>
      <button onClick={() => setCount(0)}>
        重置
      </button>
    </div>
  );
}

export default Counter;
```

###### 第五步：动手实践 - 编写基础组件（约 30 分钟）

结合今天所学的 Vite、JSX、Props 和 State，完成以下实战任务。

**任务一：搭建项目**
使用 Vite 创建一个新的 React 项目，清理掉默认的模板代码，准备一个干净的 `App.jsx`。

**任务二：封装一个复用的 Button 组件**
要求：
1. 接收 `text` (按钮文字)、`type` (按钮类型，如 primary/danger)、`onClick` (点击事件) 作为 Props。
2. 根据传入的 `type` 渲染不同的 CSS 类名，实现不同的样式。

**任务三：封装一个带状态的 Card 组件**
要求：
1. 接收 `title` 和 `content` 作为 Props。
2. 组件内部维护一个 `isExpanded` 状态（布尔值）。
3. 点击卡片时，切换 `isExpanded` 的值。
4. 当 `isExpanded` 为 true 时显示 `content`，为 false 时隐藏 `content` 或只显示摘要。

##### 今日作业

- 独立使用 Vite 搭建一个 React 项目并成功运行。
- 完成任务二：封装 `Button` 组件并在 `App.jsx` 中测试不同类型的按钮。
- 完成任务三：封装带展开/收起状态的 `Card` 组件。
- （可选）尝试结合数组的 `map` 方法，在 `App.jsx` 中循环渲染多个 `Card` 组件。
- 记录学习笔记，总结 Props 和 State 的区别。

##### 学习资源汇总

| 资源 | 链接 |
| --- | --- |
| Vite 官方中文文档 | [https://cn.vitejs.dev/guide/](https://cn.vitejs.dev/guide/) |
| React 官方文档（快速入门） | [https://zh-hans.react.dev/learn](https://zh-hans.react.dev/learn) |
| React 官方文档（编写 UI） | [https://zh-hans.react.dev/learn/describing-the-ui](https://zh-hans.react.dev/learn/describing-the-ui) |
| React 官方文档（添加交互） | [https://zh-hans.react.dev/learn/adding-interactivity](https://zh-hans.react.dev/learn/adding-interactivity) |

#### 周五学习计划

##### 学习目标
- 深入理解 React Hooks 的核心概念。
- 熟练掌握 `useState` 进行复杂状态管理。
- 掌握 `useEffect` 处理副作用（如数据获取、订阅、手动修改 DOM 等）。
- 能够结合 `localStorage` 实现数据的持久化存储。

##### 学习内容与步骤

###### 第一步：深入理解 useState（约 20 分钟）

**核心概念：** `useState` 是最常用的 Hook，允许我们在函数组件中添加状态。除了基本类型，它也可以存储对象和数组。

**代码示例：**
```jsx
import { useState } from 'react';

function UserProfile() {
  const [user, setUser] = useState({ name: '张三', age: 25 });

  const updateAge = () => {
    // 更新对象状态时，需要使用展开运算符保留原有属性
    setUser({ ...user, age: user.age + 1 });
  };

  return (
    <div>
      <p>姓名：{user.name}</p>
      <p>年龄：{user.age}</p>
      <button onClick={updateAge}>增加年龄</button>
    </div>
  );
}
```

###### 第二步：掌握 useEffect 处理副作用（约 30 分钟）

**核心概念：** `useEffect` 用于在函数组件中执行副作用操作（例如：数据获取、设置订阅、手动更改 DOM 等）。它可以看作是 `componentDidMount`，`componentDidUpdate` 和 `componentWillUnmount` 这三个生命周期函数的组合。

**语法规则：**
```javascript
useEffect(() => {
  // 这里的代码会在组件渲染后执行（副作用逻辑）
  
  return () => {
    // 可选的清理函数，会在组件卸载前或下一次副作用执行前运行
  };
}, [依赖项数组]); // 依赖项数组决定了副作用何时重新执行
```

**依赖项数组的含义：**
- `[]` (空数组)：副作用只在组件初次渲染后执行一次（类似 `componentDidMount`）。
- `[state1, state2]`：当 `state1` 或 `state2` 发生变化时，副作用重新执行。
- 不传依赖项数组：每次组件重新渲染后都会执行（不推荐，容易造成死循环）。

**代码示例：**
```jsx
import { useState, useEffect } from 'react';

function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // 开启定时器
    const timerId = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);

    // 清理函数：组件卸载时清除定时器，防止内存泄漏
    return () => clearInterval(timerId);
  }, []); // 空数组表示只在挂载时执行一次

  return <p>计时器：{count} 秒</p>;
}
```

###### 第三步：结合 localStorage 实现数据持久化（约 20 分钟）

**核心概念：** `localStorage` 是浏览器提供的 Web Storage API，可以将数据以键值对的形式保存在本地，页面刷新或关闭后数据不会丢失。

**基本用法：**
- 存数据：`localStorage.setItem('key', 'value')` （注意：value 必须是字符串，如果是对象需要用 `JSON.stringify` 转换）
- 取数据：`localStorage.getItem('key')` （如果是 JSON 字符串，需要用 `JSON.parse` 转换回对象）
- 删数据：`localStorage.removeItem('key')`

###### 第四步：动手实践 - 计数器与数据持久化（约 50 分钟）

结合 `useState`、`useEffect` 和 `localStorage`，完成以下实战任务。

**任务一：实现一个功能完善的计数器**
要求：
1. 包含增加、减少、重置按钮。
2. 增加步长设置功能（例如可以设置每次增加/减少 5）。

**任务二：为计数器添加数据持久化功能**
要求：
1. 使用 `useEffect` 监听 `count` 的变化，当 `count` 改变时，将其保存到 `localStorage` 中。
2. 在组件初始化时，从 `localStorage` 中读取保存的 `count` 值作为初始状态。如果 `localStorage` 中没有值，则默认初始为 0。

**代码骨架提示：**
```jsx
import { useState, useEffect } from 'react';

function PersistentCounter() {
  // 1. 初始化状态：优先从 localStorage 读取
  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem('myCount');
    return savedCount ? parseInt(savedCount, 10) : 0;
  });

  // 2. 监听 count 变化并保存到 localStorage
  useEffect(() => {
    localStorage.setItem('myCount', count.toString());
  }, [count]);

  return (
    // ... 渲染 UI
  );
}
```

##### 今日作业

- 完成任务一：实现带步长设置的计数器。
- 完成任务二：将计数器的值持久化到 `localStorage`，验证刷新页面后数据不丢失。
- （可选）尝试将之前封装的 `Card` 组件的展开/收起状态也保存到 `localStorage` 中。
- 记录学习笔记，总结 `useEffect` 依赖项数组的不同用法和注意事项。

##### 学习资源汇总

| 资源 | 链接 |
| --- | --- |
| React 官方文档 - State (useState) | [https://zh-hans.react.dev/reference/react/useState](https://zh-hans.react.dev/reference/react/useState) |
| React 官方文档 - Effect (useEffect) | [https://zh-hans.react.dev/reference/react/useEffect](https://zh-hans.react.dev/reference/react/useEffect) |
| MDN - Window.localStorage | [https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage) |

#### 周六学习计划

##### 学习目标
- 掌握 React Router 6 的核心概念和基本用法。
- 能够配置前端路由，实现页面间的无刷新跳转。
- 理解动态路由的概念并能够进行实际应用。
- 掌握如何通过路由传递参数（如 URL 参数）。

##### 学习内容与步骤

###### 第一步：认识 React Router 6 与安装（约 20 分钟）

**核心概念：** React Router 是 React 官方推荐的路由库，用于在单页应用（SPA）中实现不同视图（页面）的切换，而无需重新加载整个页面。

**安装：**
在项目根目录下运行以下命令安装 React Router 6：
```bash
npm install react-router-dom
```

**基础配置：** 在 `main.jsx` 中使用 `BrowserRouter` 包裹整个应用，为路由提供基础环境。

###### 第二步：配置基础路由与页面跳转（约 30 分钟）

**核心概念：** 使用 `Routes` 和 `Route` 组件定义路由规则，使用 `Link` 组件实现页面跳转。

**代码示例：**
```jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function Home() { return <h2>首页</h2>; }
function About() { return <h2>关于我们</h2>; }

function App() {
  return (
    <BrowserRouter>
      <nav>
        {/* 使用 Link 组件进行跳转，类似于 <a> 标签，但不会刷新页面 */}
        <Link to="/">首页</Link> | <Link to="/about">关于</Link>
      </nav>
      
      {/* Routes 内部定义具体的路由规则 */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

###### 第三步：掌握路由传参（动态路由）（约 20 分钟）

**核心概念：** 在实际开发中，经常需要根据不同的 ID 获取不同的详情数据（如商品详情、文章详情），这就需要用到动态路由传参。

**代码示例：**
```jsx
import { useParams } from 'react-router-dom';

// 在路由配置中定义动态参数：<Route path="/detail/:id" element={<Detail />} />

function Detail() {
  // 使用 useParams 钩子获取 URL 中的动态参数 id
  const { id } = useParams();
  return <h2>商品详情页，当前商品 ID：{id}</h2>;
}
```

###### 第四步：动手实践 - 搭建多页面应用（约 50 分钟）

结合今天所学的 React Router 6，完成以下实战任务。

**任务一：创建页面组件**
要求：
1. 在 `src` 目录下新建 `pages` 文件夹，用于存放页面级别的组件。
2. 创建三个页面组件文件：`Home.jsx` (首页)、`List.jsx` (列表页)、`Detail.jsx` (详情页)。

**任务二：配置全局路由**
要求：
1. 在 `App.jsx` 中引入并配置路由组件。
2. 使用 `Routes` 和 `Route` 将三个页面组件与对应的 URL 路径关联起来：
   - `/` 对应 `Home` 组件
   - `/list` 对应 `List` 组件
   - `/detail/:id` 对应 `Detail` 组件

**任务三：实现页面间的跳转与传参**
要求：
1. 在 `Home` 页面添加一个全局导航栏，包含跳转到首页和列表页的链接（使用 `Link`）。
2. 在 `List` 页面模拟渲染一个商品列表（如：商品A、商品B），点击商品时跳转到 `Detail` 页面，并在 URL 中携带对应的商品 ID（如 `/detail/1`）。
3. 在 `Detail` 页面接收并显示传递过来的商品 ID，并提供一个“返回列表”的按钮（提示：可以使用 `useNavigate` 钩子实现编程式导航返回）。

##### 今日作业

- 完成任务一、二、三：成功搭建包含首页、列表页、详情页的 React 路由应用。
- 体验单页应用（SPA）的无刷新跳转效果，观察浏览器地址栏的变化。
- （可选）尝试配置一个“404 Not Found”页面，当用户访问不存在的路径时显示（提示：使用 `<Route path="*" element={<NotFound />} />`）。
- 记录学习笔记，总结 `Link` 和传统 `<a>` 标签的区别。

##### 学习资源汇总

| 资源 | 链接 |
| --- | --- |
| React Router 6 官方文档 | [https://reactrouter.com/en/main](https://reactrouter.com/en/main) |
| React Router 6 快速入门教程 | [https://reactrouter.com/en/main/start/tutorial](https://reactrouter.com/en/main/start/tutorial) |
