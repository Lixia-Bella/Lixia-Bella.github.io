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
blogs/                         # 通常即 Git 仓库根目录
├── .github/
│   └── workflows/
│       └── deploy-blogs-github-pages.yml  # GitHub Pages 自动部署
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

#### 用户主页仓库：`<用户名>.github.io`

若你的 GitHub 仓库名**就是** `<用户名>.github.io`（例如 `lixia-bella/lixia-bella.github.io`），且**仓库根目录**就是本博客项目（与当前 `blogs` 目录结构一致），则属于上表中的 **用户站**：

| 项目 | 说明 |
|------|------|
| 访问地址 | `https://<用户名>.github.io/`（**没有** `/<仓库名>/` 这一层路径） |
| 构建时 `base` | 必须为 **`/`** |
| 本仓库工作流 | **Set VITE_BASE_PATH** 一步会检测仓库名是否以 `.github.io` 结尾，自动写入 **`/`**，一般**不用改** workflow |
| 切忌 | 不要手动设成 `/<用户名>.github.io/`——用户主页站点不在该子路径下，会导致白屏或静态资源 404 |

本地或 CI 构建：`npm run build` 即可（勿设置 `VITE_BASE_PATH=/某仓库名/`）。

#### 方式一：GitHub Actions（推荐）

默认假设 **Git 仓库根目录就是本博客项目**（根目录有 `package.json`、`src/`、`public/`）。此时工作流路径为：

**`.github/workflows/deploy-blogs-github-pages.yml`**（在本机即 `blogs/.github/workflows/` 下）。

1. 打开 GitHub 仓库 **Settings → Pages**。
2. **Build and deployment** 里将 **Source** 选为 **GitHub Actions**（不要再用 branch 指向 `dist` 的旧方式，除非你自行维护 `gh-pages` 分支）。
3. 确认默认分支为 `main` 或 `master`（与 workflow 里 `on.push.branches` 一致）。
4. **推送代码后，到「Actions」里看是否成功（俗称「跑绿」）**  
   - **「跑绿」**：指仓库顶部 **Actions** 标签页里，对应工作流（如 `Deploy blogs to GitHub Pages`）最新一次运行左侧是 **绿色对勾**，表示构建与发布成功。  
   - **Settings → Pages** 里通常**不会**出现进度条；那里只是配置来源。可点击页面上的 **「View workflow runs」** 跳到 Actions。  
   - 若 **Actions 里没有任何运行记录**：请确认远端仓库**根目录**下存在 `.github/workflows/deploy-blogs-github-pages.yml`；若你只在学习仓库里改了文件、但从未把 `blogs` 当作独立仓库推送，GitHub 上就不会有该文件。
5. **工作流已根据仓库名自动设置 `VITE_BASE_PATH`**：仓库名以 `.github.io` 结尾（用户主页）时用 `/`，否则为项目站 `/<仓库名>/`。一般无需再改 workflow。
6. 若 **Actions 里仍没有运行记录**：请确认推送到 GitHub 的内容里，**仓库根目录**下存在 `.github/workflows/deploy-blogs-github-pages.yml`（即本项目的 `blogs` 文件夹应作为远端根，不要把 workflow 留在更外层的、未推送的目录里）。

首次部署成功后，在 **Settings → Pages** 可看到站点 URL；每次部署的详细日志在 **Actions** 里点开某次运行查看。

#### 常见问题：空白页，控制台报 `main.jsx` / MIME type `text/jsx`

说明浏览器加载的是**仓库里的源码** `index.html`（里面有 `<script type="module" src="/src/main.jsx">`），而不是 **`npm run build` 生成的 `dist/index.html`**（应引用 `/assets/index-xxxx.js`）。GitHub Pages **不能直接托管未打包的 Vite 源码**。

请按下面排查：

1. **Settings → Pages → Build and deployment → Source** 必须是 **GitHub Actions**，不能仍是 **Deploy from a branch** 且指向 `main` 仓库根目录（那样会发布整份源码，就会出现本错误）。
2. 改成 Actions 后，在 **Actions** 里再跑一次 **Deploy blogs to GitHub Pages**（或任意 push 触发），等 **deploy** 任务完成后再打开站点；必要时 **强制刷新**（Ctrl+F5 / Cmd+Shift+R）或换无痕窗口，避免缓存旧 HTML。
3. 在浏览器里 **查看网页源代码**：若仍能看到 `main.jsx`，说明当前线上仍不是 `dist` 产物；若能看到 `/assets/index-....js` 则说明已是构建结果（此时若仍白屏，再查控制台其它报错或 `base` 路径）。
4. 本仓库工作流在 **Build** 之后带有 **Verify dist index** 步骤：若 `dist` 异常会在 CI 里直接失败，可在该次运行的日志中查看校验输出。

#### 方式二：本地构建后手动上传

1. 在**本目录**（仓库根）按上表设置 `VITE_BASE_PATH` 后执行 `npm run build`。
2. 将 **`dist/`** 内全部文件上传到 Pages 所使用的分支/目录（例如 `gh-pages` 根目录）。

#### 若 Git 根目录是「学习仓库」且含 `blogs/` 子目录

若你 push 的是整个 `AI_Learning_2026`（根目录有 `AI_Coding/`、`blogs/` 等），则 GitHub 上的**仓库根不是本博客**，当前 `blogs/.github/` **不会**被当成根目录下的 `.github`。可以任选其一：

- **推荐**：单独建一个 GitHub 仓库，只把 **`blogs` 目录里的内容**作为该仓库的根目录推送（这样与本 README 默认一致）。
- 或在**父仓库根**自建 workflow：`checkout` 后使用 `working-directory: blogs` 执行 `npm ci`、`npm run build`，`upload-pages-artifact` 的 `path` 填 **`blogs/dist`**，并自行设置 `VITE_BASE_PATH`（项目站为 `/<父仓库名>/`）。

## 维护建议

- 所有文本文件使用 **UTF-8** 编码。
- 新增文章时保持 `index.json` 的 `file` 与磁盘上的 `文件名`（不含后缀）一致。
- 大段题库与高亮库会增大主包体积；若需优化，可考虑对文章页做路由级 `import()` 按需加载（后续迭代）。
