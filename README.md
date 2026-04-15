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

### 通用静态托管

在 `blogs` 目录执行 `npm run build`，将生成的 **`dist/`** 整目录上传到 Nginx、OSS、任意静态空间即可。

**若站点不在域名根路径**（例如 `https://example.com/myapp/`），构建前设置环境变量 **`VITE_BASE_PATH`**（以 `/` 开头、以 `/` 结尾），再执行构建：

```bash
VITE_BASE_PATH=/myapp/ npm run build
```

`vite.config.js` 会读取该变量作为 `base`；`src/main.jsx` 中 `BrowserRouter` 的 `basename` 与 `import.meta.env.BASE_URL` 一致，保证路由与 `fetch(assetUrl(...))` 资源路径正确。

### GitHub Pages

GitHub Pages 分两种常见形态，**必须先选对 `VITE_BASE_PATH`**，否则会出现白屏或资源 404。

| 形态 | 访问地址示例 | 构建时 `VITE_BASE_PATH` |
|------|----------------|-------------------------|
| **项目站**（仓库名任意，如 `AI_Learning_2026`） | `https://<用户>.github.io/AI_Learning_2026/` | `/AI_Learning_2026/`（**须与仓库名一致**） |
| **用户站**（仓库名必须为 `<用户>.github.io`） | `https://<用户>.github.io/` | `/` |

本地开发不要设置该变量（默认 `/` 即可）。

#### 方式一：GitHub Actions（推荐）

本仓库已在 **仓库根目录** 提供工作流：`.github/workflows/deploy-blogs-github-pages.yml`（从子目录 `blogs/` 构建并发布）。

1. 打开 GitHub 仓库 **Settings → Pages**。
2. **Build and deployment** 里将 **Source** 选为 **GitHub Actions**（不要再用 branch 指向 `dist` 的旧方式，除非你自行维护 `gh-pages` 分支）。
3. 确认默认分支为 `main` 或 `master`（与 workflow 里 `on.push.branches` 一致）。
4. 将代码推送到 GitHub；若 `blogs` 有变更，会自动执行构建与部署。
5. **项目站**：工作流里默认 `VITE_BASE_PATH: /<仓库名>/`，一般无需修改。
6. **用户站**（`<用户>.github.io` 仓库）：请编辑该 workflow 中 Build 步骤的 `env`，改为 `VITE_BASE_PATH: /`，否则会把资源指到错误子路径。

首次部署后，在 **Settings → Pages** 可看到站点 URL；构建日志在 **Actions** 标签页查看。

#### 方式二：本地构建后手动上传

1. 按上表设置 `VITE_BASE_PATH` 后执行 `npm run build`。
2. 将 **`blogs/dist/`** 内全部文件上传到 Pages 所使用的分支/目录（例如 `gh-pages` 根目录，或配合你自建的静态托管）。

#### 仓库根目录就是 `blogs` 时

若 Git 仓库克隆下来根目录就是本站（没有外层的 `AI_Learning_2026`）：

- 把 `.github/workflows/deploy-blogs-github-pages.yml` 挪到该仓库根目录的 `.github/workflows/`。
- 删除 workflow 里的 `defaults.run.working-directory: blogs` 以及各 step 的 `working-directory: blogs`。
- 将 `actions/setup-node` 的 `cache-dependency-path` 改为 `package-lock.json`。
- 将 `upload-pages-artifact` 的 `path` 改为 `dist`。

## 维护建议

- 所有文本文件使用 **UTF-8** 编码。
- 新增文章时保持 `index.json` 的 `file` 与磁盘上的 `文件名`（不含后缀）一致。
- 大段题库与高亮库会增大主包体积；若需优化，可考虑对文章页做路由级 `import()` 按需加载（后续迭代）。
