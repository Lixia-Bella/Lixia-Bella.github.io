/**
 * 博客文章列表 - 异步加载与动态渲染模块
 * 功能：从 blogs/ 目录异步加载文章数据、标签筛选、日期排序、动态生成卡片
 */

/* ========================================
   标签颜色映射（与马卡龙色系保持一致）
   ======================================== */
const TAG_COLORS = {
    'CSS': { bg: 'rgba(195, 177, 225, 0.15)', color: 'var(--lavender-dark)', border: 'rgba(195, 177, 225, 0.4)' },
    '动画': { bg: 'rgba(242, 166, 179, 0.15)', color: 'var(--primary-pink-dark)', border: 'rgba(242, 166, 179, 0.4)' },
    '响应式设计': { bg: 'rgba(167, 199, 231, 0.15)', color: 'var(--sky-blue-dark)', border: 'rgba(167, 199, 231, 0.4)' },
    'HTML': { bg: 'rgba(242, 166, 179, 0.15)', color: 'var(--primary-pink-dark)', border: 'rgba(242, 166, 179, 0.4)' },
    '语义化': { bg: 'rgba(168, 216, 200, 0.15)', color: 'var(--mint-green-dark)', border: 'rgba(168, 216, 200, 0.4)' },
    '页面结构': { bg: 'rgba(249, 228, 183, 0.2)', color: 'var(--cream-yellow-dark)', border: 'rgba(249, 228, 183, 0.5)' },
    '布局': { bg: 'rgba(195, 177, 225, 0.15)', color: 'var(--lavender-dark)', border: 'rgba(195, 177, 225, 0.4)' },
    'Flexbox': { bg: 'rgba(168, 216, 200, 0.15)', color: 'var(--mint-green-dark)', border: 'rgba(168, 216, 200, 0.4)' },
    'Grid': { bg: 'rgba(167, 199, 231, 0.15)', color: 'var(--sky-blue-dark)', border: 'rgba(167, 199, 231, 0.4)' },
    'JavaScript': { bg: 'rgba(249, 228, 183, 0.2)', color: 'var(--cream-yellow-dark)', border: 'rgba(249, 228, 183, 0.5)' },
    'ES6': { bg: 'rgba(249, 228, 183, 0.2)', color: 'var(--cream-yellow-dark)', border: 'rgba(249, 228, 183, 0.5)' },
    '前端基础': { bg: 'rgba(168, 216, 200, 0.15)', color: 'var(--mint-green-dark)', border: 'rgba(168, 216, 200, 0.4)' },
    '工具链': { bg: 'rgba(195, 177, 225, 0.15)', color: 'var(--lavender-dark)', border: 'rgba(195, 177, 225, 0.4)' },
    '开发环境': { bg: 'rgba(167, 199, 231, 0.15)', color: 'var(--sky-blue-dark)', border: 'rgba(167, 199, 231, 0.4)' },
    'Git': { bg: 'rgba(242, 166, 179, 0.15)', color: 'var(--primary-pink-dark)', border: 'rgba(242, 166, 179, 0.4)' },
    '数组方法': { bg: 'rgba(168, 216, 200, 0.15)', color: 'var(--mint-green-dark)', border: 'rgba(168, 216, 200, 0.4)' },
};

const DEFAULT_TAG_COLOR = { bg: 'rgba(195, 177, 225, 0.12)', color: 'var(--lavender-dark)', border: 'rgba(195, 177, 225, 0.3)' };

/* ========================================
   博客列表状态
   ======================================== */
let blogPosts = [];
let currentTag = '全部';
let currentSort = 'newest';
let isLoaded = false;

/* ========================================
   异步数据加载
   ======================================== */

/**
 * 从 blogs/index.json 加载文章索引
 */
const fetchPostIndex = async () => {
    const response = await fetch('blogs/index.json');
    if (!response.ok) {
        throw new Error(`索引加载失败：HTTP ${response.status}`);
    }
    return response.json();
};

/**
 * 加载单篇文章的 Markdown 内容并提取摘要
 * 使用动态 <script> 标签方式（兼容 file:// 协议）
 */
const fetchPostSummary = (file) => {
    return new Promise((resolve, reject) => {
        const scriptEl = document.createElement('script');
        scriptEl.src = `blogs/${file}.js`;

        scriptEl.onload = () => {
            const md = window.__BLOG_MD__;
            if (md) {
                const lines = md.split('\n').filter((line) =>
                    line.trim() && !line.startsWith('#') && !line.startsWith('>')
                );
                const summary = lines.slice(0, 3).join(' ').slice(0, 200);
                delete window.__BLOG_MD__;
                resolve(summary || '暂无摘要');
            } else {
                resolve('暂无摘要');
            }
        };

        scriptEl.onerror = () => {
            resolve('暂无摘要');
        };

        document.head.appendChild(scriptEl);
    });
};

/**
 * 使用 fetch 加载文章摘要（适用于 HTTP 服务器环境）
 */
const fetchPostSummaryViaFetch = async (file) => {
    try {
        const response = await fetch(`blogs/${file}.md`);
        if (!response.ok) return '暂无摘要';
        const md = await response.text();
        const lines = md.split('\n').filter((line) =>
            line.trim() && !line.startsWith('#') && !line.startsWith('>')
        );
        return lines.slice(0, 3).join(' ').slice(0, 200) || '暂无摘要';
    } catch {
        return '暂无摘要';
    }
};

/**
 * 检测当前是否为 file:// 协议
 */
const isFileProtocol = () => window.location.protocol === 'file:';

/**
 * 主加载函数：加载索引 + 并行加载所有文章摘要
 */
const loadBlogData = async () => {
    // 第一步：加载文章索引
    const posts = await fetchPostIndex();

    // 第二步：使用 Promise.all() 并行加载所有文章摘要
    const loadSummary = isFileProtocol() ? fetchPostSummary : fetchPostSummaryViaFetch;
    const summaries = await Promise.all(
        posts.map(({ file }) => loadSummary(file))
    );

    // 第三步：将摘要合并到文章数据中
    return posts.map((post, index) => ({
        ...post,
        summary: summaries[index]
    }));
};

/* ========================================
   UI 状态渲染（loading / error / 内容）
   ======================================== */

/**
 * 显示 loading 状态
 */
const showLoading = (container) => {
    container.innerHTML = `
        <div class="blog-loading">
            <div class="blog-loading-spinner">
                <div class="spinner-ring"></div>
                <div class="spinner-ring"></div>
                <div class="spinner-ring"></div>
            </div>
            <p class="blog-loading-text">正在加载文章数据</p>
            <div class="blog-loading-dots">
                <span></span><span></span><span></span>
            </div>
        </div>`;
};

/**
 * 显示错误状态
 */
const showError = (container, message) => {
    container.innerHTML = `
        <div class="blog-error-state">
            <div class="blog-error-icon">
                <i class="fas fa-exclamation-triangle"></i>
            </div>
            <h3 class="blog-error-title">加载失败</h3>
            <p class="blog-error-msg">${message}</p>
            <button class="blog-retry-btn" onclick="retryLoadBlog()">
                <i class="fas fa-redo"></i> 重新加载
            </button>
        </div>`;
};

/* ========================================
   核心渲染函数
   ======================================== */

/**
 * 从所有文章中提取去重后的标签列表
 */
const getAllTags = () => {
    const tagSet = new Set();
    blogPosts.forEach(({ tags }) => {
        tags.forEach((tag) => tagSet.add(tag));
    });
    return ['全部', ...Array.from(tagSet).sort()];
};

/**
 * 按当前筛选条件和排序方式处理文章列表
 */
const getFilteredPosts = () => {
    const filtered = currentTag === '全部'
        ? [...blogPosts]
        : blogPosts.filter(({ tags }) => tags.includes(currentTag));

    return filtered.sort((a, b) => {
        if (currentSort === 'newest') {
            return new Date(b.date) - new Date(a.date);
        }
        return new Date(a.date) - new Date(b.date);
    });
};

/**
 * 生成单个标签的 HTML
 */
const renderTag = (tag) => {
    const { bg, color, border } = TAG_COLORS[tag] || DEFAULT_TAG_COLOR;
    return `<span class="blog-tag" style="background:${bg};color:${color};border-color:${border}">${tag}</span>`;
};

/**
 * 生成单个文章卡片的 HTML（使用 map 调用）
 */
const renderPostCard = ({ title, date, author, summary, tags, file, icon }) =>
    `<article class="blog-post-card">
        <div class="blog-post-icon">
            <i class="fas ${icon}"></i>
        </div>
        <div class="blog-post-body">
            <div class="blog-post-meta">
                <span><i class="fas fa-calendar-alt"></i> ${date}</span>
                <span><i class="fas fa-user"></i> ${author}</span>
            </div>
            <h3 class="blog-post-title">
                <a href="blog.html?file=${file}">${title}</a>
            </h3>
            <p class="blog-post-summary">${summary}</p>
            <div class="blog-post-footer">
                <div class="blog-post-tags">
                    ${tags.map((tag) => renderTag(tag)).join('')}
                </div>
                <a href="blog.html?file=${file}" class="blog-post-read">
                    阅读全文 <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </div>
    </article>`;

/**
 * 渲染标签筛选栏
 */
const renderTagFilter = (container) => {
    const allTags = getAllTags();
    const filterHtml = allTags.map((tag) => {
        const isActive = tag === currentTag;
        if (tag === '全部') {
            return `<button class="blog-filter-btn${isActive ? ' active' : ''}" data-tag="${tag}">
                <i class="fas fa-th-list"></i> 全部
            </button>`;
        }
        const { bg, color, border } = TAG_COLORS[tag] || DEFAULT_TAG_COLOR;
        return `<button class="blog-filter-btn${isActive ? ' active' : ''}" data-tag="${tag}"
            style="${isActive ? `background:${bg};color:${color};border-color:${border}` : ''}">
            ${tag}
        </button>`;
    }).join('');

    container.innerHTML = filterHtml;

    container.querySelectorAll('.blog-filter-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            currentTag = btn.dataset.tag;
            renderBlogList();
        });
    });
};

/**
 * 渲染排序控件
 */
const renderSortControl = (container) => {
    container.innerHTML = `
        <button class="blog-sort-btn${currentSort === 'newest' ? ' active' : ''}" data-sort="newest">
            <i class="fas fa-sort-amount-down"></i> 最新优先
        </button>
        <button class="blog-sort-btn${currentSort === 'oldest' ? ' active' : ''}" data-sort="oldest">
            <i class="fas fa-sort-amount-up"></i> 最早优先
        </button>
    `;

    container.querySelectorAll('.blog-sort-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            currentSort = btn.dataset.sort;
            renderBlogList();
        });
    });
};

/**
 * 渲染完整博客列表（数据已加载后调用）
 */
const renderBlogList = () => {
    const section = document.getElementById('blogListSection');
    if (!section) return;

    const headerEl = section.querySelector('.blog-list-header');
    const filterContainer = section.querySelector('.blog-filter-bar');
    const sortContainer = section.querySelector('.blog-sort-bar');
    const listContainer = section.querySelector('.blog-post-list');
    const countEl = section.querySelector('.blog-post-count');

    if (headerEl) headerEl.style.display = '';
    if (filterContainer) {
        filterContainer.style.display = '';
        renderTagFilter(filterContainer);
    }
    if (sortContainer) renderSortControl(sortContainer);

    const posts = getFilteredPosts();

    if (countEl) {
        countEl.textContent = `共 ${posts.length} 篇文章`;
    }

    if (!listContainer) return;

    if (posts.length === 0) {
        listContainer.innerHTML = `
            <div class="blog-empty">
                <i class="fas fa-search"></i>
                <p>暂无「${currentTag}」相关文章</p>
            </div>`;
        return;
    }

    listContainer.innerHTML = posts.map(renderPostCard).join('');
};

/* ========================================
   初始化入口：异步加载 → 渲染
   ======================================== */

/**
 * 初始化博客列表：显示 loading → 异步加载数据 → 渲染列表 / 显示错误
 */
const initBlogList = async () => {
    const section = document.getElementById('blogListSection');
    if (!section) return;

    const headerEl = section.querySelector('.blog-list-header');
    const filterBar = section.querySelector('.blog-filter-bar');
    const listContainer = section.querySelector('.blog-post-list');

    // 隐藏头部和筛选栏，显示 loading
    if (headerEl) headerEl.style.display = 'none';
    if (filterBar) filterBar.style.display = 'none';
    if (listContainer) showLoading(listContainer);

    try {
        blogPosts = await loadBlogData();
        isLoaded = true;
        renderBlogList();
    } catch (error) {
        console.warn('博客数据加载失败，使用内置数据：', error.message);
        // 降级方案：使用内置静态数据
        blogPosts = getFallbackPosts();
        isLoaded = true;
        renderBlogList();
    }
};

/**
 * 重新加载（供错误状态的重试按钮调用）
 */
function retryLoadBlog() {
    isLoaded = false;
    blogPosts = [];
    currentTag = '全部';
    initBlogList();
}

/**
 * 内置降级数据（当 fetch 不可用时，如 file:// 协议下无 index.json）
 */
const getFallbackPosts = () => [
    {
        title: 'CSS 动画与响应式优化实战总结',
        date: '2026-03-19',
        author: 'Bella',
        summary: '记录了阳光小站在 CSS 动画、响应式设计和暗色模式方面的优化实践，涵盖导航栏交互动画、页面入场动画、断点适配以及主题切换四个核心模块。',
        tags: ['CSS', '动画', '响应式设计'],
        file: '20260319',
        icon: 'fa-paint-brush'
    },
    {
        title: 'HTML5 语义化标签与页面结构设计',
        date: '2026-03-17',
        author: 'Bella',
        summary: '深入学习 HTML5 语义化标签的正确使用方式，包括 header、nav、main、article、section、aside、footer 等标签的语义与最佳实践。',
        tags: ['HTML', '语义化', '页面结构'],
        file: '20260317',
        icon: 'fa-code'
    },
    {
        title: 'Flexbox 与 Grid 布局完全指南',
        date: '2026-03-18',
        author: 'Bella',
        summary: '系统梳理 CSS Flexbox 和 Grid 两大布局方案的核心概念与常用属性，通过实际案例对比两者的适用场景。',
        tags: ['CSS', '布局', 'Flexbox', 'Grid'],
        file: '20260318',
        icon: 'fa-th-large'
    },
    {
        title: 'JavaScript ES6+ 核心语法速览',
        date: '2026-03-20',
        author: 'Bella',
        summary: '全面梳理 ES6+ 核心语法：let/const、箭头函数、模板字符串、解构赋值、展开运算符、Promise、async/await、模块化等。',
        tags: ['JavaScript', 'ES6', '前端基础'],
        file: '20260320',
        icon: 'fa-js-square'
    },
    {
        title: 'Web 开发环境搭建与工具链配置',
        date: '2026-03-16',
        author: 'Bella',
        summary: '从零搭建前端开发环境，包括 VS Code 配置、Git 版本控制、EditorConfig 统一编码风格、Prettier 代码格式化等。',
        tags: ['工具链', '开发环境', 'Git'],
        file: '20260316',
        icon: 'fa-tools'
    },
    {
        title: '数组高阶方法实战：map、filter、reduce',
        date: '2026-03-20',
        author: 'Bella',
        summary: '通过商品列表、用户数据等实际场景，深入理解 map、filter、reduce、find、some、every 等数组高阶方法的用法与链式调用技巧。',
        tags: ['JavaScript', 'ES6', '数组方法'],
        file: '20260320b',
        icon: 'fa-list-ol'
    }
];

/* ========================================
   页面初始化
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
    initBlogList();
});
