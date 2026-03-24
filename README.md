# 阳光小站（blogs）

一个基于原生 HTML/CSS/JavaScript 的个人站点示例，包含：

- 文章列表与文章详情页（Markdown 渲染）
- 知识问答挑战页（积分与关卡）
- 奖励池与个人简介页
- 明暗主题切换、响应式导航与页面动效

## 项目特点

- **零构建工具依赖**：无需 npm、无需打包器，直接静态运行即可。
- **模块化组织**：主逻辑在 `js/` 中，旧版兼容脚本在 `scripts/` 中。
- **文章可扩展**：通过 `blogs/index.json` 管理文章索引，支持 `blogs/*.md` 与 `blogs/*.js` 数据加载。
- **优雅降级**：当动态加载失败时，首页文章列表可回退到内置示例数据。

## 快速开始

> 建议使用本地静态服务器运行，避免浏览器对 `fetch` 的 `file://` 限制。

在 `blogs` 目录下执行：

```bash
python3 -m http.server 8080
或者使用 npx http-server
```

然后访问：

- 首页：`http://localhost:8080/index.html`
- 文章页示例：`http://localhost:8080/blog.html?file=20260319`
- 问答页：`http://localhost:8080/quiz.html`
- 奖励页：`http://localhost:8080/rewards.html`
- 个人页：`http://localhost:8080/profile.html`

## 目录结构

```text
blogs/
├── index.html              # 首页
├── blog.html               # 文章详情页
├── quiz.html               # 知识问答页
├── rewards.html            # 奖励池页面
├── profile.html            # 个人简介页
├── styles/
│   └── style.css           # 全站样式
├── js/                     # ES Module 版本脚本（现代浏览器）
│   ├── index.js
│   ├── blog.js
│   ├── blog-page.js
│   ├── quiz-page.js
│   ├── rewards.js
│   ├── profile.js
│   ├── quiz.js
│   └── utils.js
├── scripts/                # nomodule 降级脚本
│   ├── main.js
│   ├── blog.js
│   └── quiz.js
└── blogs/                  # 文章数据目录
    ├── index.json          # 文章索引
    ├── 20260319.md         # Markdown 原文（可选）
    └── 20260319.js         # JS 形式文章数据（window.__BLOG_MD__）
```

## 如何新增一篇文章

1. 在 `blogs/index.json` 新增一条记录：
   - `title`：文章标题
   - `date`：日期（建议 `YYYY-MM-DD`）
   - `author`：作者名
   - `tags`：标签数组
   - `file`：文章文件名（不带后缀）
   - `icon`：Font Awesome 图标类名（如 `fa-code`）
2. 在 `blogs/blogs/` 新增文章文件，推荐两种方式：
   - `xxx.md`：Markdown 文件
   - `xxx.js`：写入 `window.__BLOG_MD__ = \`...\`;`
3. 本地启动静态服务器后，打开首页确认文章是否正常显示并可跳转详情。

## 当前文章数据说明

- `blogs/index.json` 中已有多条示例索引。
- 当前仓库内实际可见的文章文件为 `20260319.md` 与 `20260319.js`。
- 其余索引可按“新增文章”步骤补齐对应文件。

## 技术栈

- HTML5
- CSS3（响应式布局、主题变量、动画）
- Vanilla JavaScript（ES Modules）
- 第三方 CDN：
  - [Font Awesome](https://cdnjs.com/libraries/font-awesome)
  - [marked](https://cdnjs.com/libraries/marked)
  - [highlight.js](https://cdnjs.com/libraries/highlight.js)

## 维护建议

- 统一使用 UTF-8 编码保存文本文件。
- 新增文章时，保持 `index.json` 与文章文件名一致。
- 若后续引入构建工具，可优先保留 `js/` 目录结构，降低迁移成本。
