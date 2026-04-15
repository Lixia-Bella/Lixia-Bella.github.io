# 阳光小站（blogs）

基于 **React + Vite** 的个人站点，包含：

- 首页文章列表（标签筛选、排序、摘要加载与失败降级）
- 文章详情页（Markdown 渲染、代码高亮）
- 知识问答挑战（积分、关卡、本地存储）
- 奖励池与个人简介
- 明暗主题切换、响应式导航与页面动效

## 项目特点

- **Vite 开发与构建**：热更新、生产打包至 `dist/`。
- **React Router**：单页路由，无需多份 HTML 入口。
- **文章可扩展**：通过 `public/blogs/index.json` 管理索引；正文支持 `public/blogs/*.md` 或 `*.js`（`window.__BLOG_MD__`）。
- **逻辑分层**：列表与摘要见 `src/lib/blogList.js`，答题核心见 `src/lib/quizCore.js`，通用 UI 行为见 `src/lib/siteUtils.js`。
- **旧版静态站备份**：多页 HTML 与原 `js/`、`scripts/` 在 `archive/` 目录，仅供对照，不参与构建。

## 环境要求

- Node.js 18+（建议与当前 LTS 一致）
- npm 10+

## 快速开始

在 `blogs` 目录下：

```bash
npm install
npm run dev
```

浏览器访问终端提示的地址（一般为 `http://localhost:5173/`）。

常用脚本：

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 生产构建，输出到 `dist/` |
| `npm run preview` | 本地预览构建结果 |
| `npm run lint` | ESLint 检查 |

## 路由说明

| 路径 | 页面 |
|------|------|
| `/` | 首页（文章列表、爱好、问答入口等） |
| `/blog/:slug` | 文章详情，`slug` 与 `index.json` 中 `file` 字段一致（如 `20260319`） |
| `/quiz` | 知识问答挑战 |
| `/rewards` | 奖励池 |
| `/profile` | 个人简介 |

## 目录结构

```text
blogs/
├── index.html                 # Vite HTML 入口（主题防闪烁内联脚本 + 外链字体/图标）
├── vite.config.js
├── package.json
├── eslint.config.js
├── public/                    # 构建时原样复制到 dist 根目录
│   ├── blogs/                 # 文章索引与正文
│   │   ├── index.json
│   │   ├── *.md / *.js
│   └── images/                # 静态图片（如 image1.png，需自行放置）
├── src/
│   ├── main.jsx
│   ├── App.jsx                # 路由定义
│   ├── components/            # Layout、Navbar 等
│   ├── pages/                 # 各路由页面组件
│   ├── lib/                   # blogList、quizCore、siteUtils、toast、paths 等
│   └── styles/
│       ├── style.css          # 全站样式
│       └── blogArticle.css    # 文章页排版
└── archive/                   # 历史静态多页站点备份（不参与 Vite 构建）
```

## 如何新增一篇文章

1. 在 **`public/blogs/index.json`** 中新增一条记录：
   - `title`：文章标题
   - `date`：日期（建议 `YYYY-MM-DD`）
   - `author`：作者名
   - `tags`：标签数组
   - `file`：文章标识（不带后缀），与路由 `/blog/:slug` 一致
   - `icon`：Font Awesome 图标类名（如 `fa-code`）
2. 在 **`public/blogs/`** 下放置正文，任选其一或同时存在（列表摘要以 `.md` 优先）：
   - `xxx.md`：Markdown 文件
   - `xxx.js`：内容为 `window.__BLOG_MD__ = "...";`（与旧版生成方式一致）
3. 执行 `npm run dev`，在首页确认卡片与「阅读全文」跳转 `/blog/xxx` 是否正常。

## 静态资源与头像

- 导航栏与简介页头像路径：`public/images/image1.png`（若缺失则图片显示为裂图，请将资源放入该目录）。

## 当前文章数据说明

- `public/blogs/index.json` 中为示例索引。
- 仓库中若仅包含部分正文文件（例如仅有 `20260319.md` / `20260319.js`），其余条目需按上文步骤补全文件，否则详情页会加载失败。

## 技术栈

- **React 19**、**react-router-dom 7**
- **Vite 8**
- **marked**、**highlight.js**（npm 依赖，文章页使用）
- **CSS3**（响应式、主题变量、动画；样式集中在 `src/styles/`）
- 外链：**Noto Sans SC**、**Font Awesome 6**（见 `index.html`）

## 部署说明

执行 `npm run build` 后，将 **`dist/`** 整目录部署到任意静态资源服务器（Nginx、GitHub Pages、OSS 等）。若站点不在域名根路径，需在 `vite.config.js` 中配置 `base`（例如 `base: '/blogs/'`），并重新构建。

## 维护建议

- 所有文本文件使用 **UTF-8** 编码。
- 新增文章时保持 `index.json` 的 `file` 与磁盘上的 `文件名`（不含后缀）一致。
- 大段题库与高亮库会增大主包体积；若需优化，可考虑对文章页做路由级 `import()` 按需加载（后续迭代）。
