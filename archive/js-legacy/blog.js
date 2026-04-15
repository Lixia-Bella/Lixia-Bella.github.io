/**
 * 博客文章列表 - 异步加载与动态渲染模块
 * 功能：从 blogs/ 目录异步加载文章数据、标签筛选、日期排序、动态生成卡片
 */

/* ========================================
   标签颜色映射
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

/* ========================================
   异步数据加载
   ======================================== */

const fetchPostIndex = async () => {
    const response = await fetch('blogs/index.json');
    if (!response.ok) {
        throw new Error(`索引加载失败：HTTP ${response.status}`);
    }
    return response.json();
};

const fetchPostSummary = (file) => {
    return new Promise((resolve) => {
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
        scriptEl.onerror = () => { resolve('暂无摘要'); };
        document.head.appendChild(scriptEl);
    });
};

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

const isFileProtocol = () => window.location.protocol === 'file:';

const loadBlogData = async () => {
    const posts = await fetchPostIndex();
    const loadSummary = isFileProtocol() ? fetchPostSummary : fetchPostSummaryViaFetch;
    const summaries = await Promise.all(
        posts.map(({ file }) => loadSummary(file))
    );
    return posts.map((post, index) => ({
        ...post,
        summary: summaries[index]
    }));
};

/* ========================================
   降级数据
   ======================================== */

const getFallbackPosts = () => [
    {
        title: 'CSS 动画与响应式优化实战总结',
        date: '2026-03-19', author: 'Bella',
        summary: '记录了阳光小站在 CSS 动画、响应式设计和暗色模式方面的优化实践，涵盖导航栏交互动画、页面入场动画、断点适配以及主题切换四个核心模块。',
        tags: ['CSS', '动画', '响应式设计'], file: '20260319', icon: 'fa-paint-brush'
    },
    {
        title: 'HTML5 语义化标签与页面结构设计',
        date: '2026-03-17', author: 'Bella',
        summary: '深入学习 HTML5 语义化标签的正确使用方式，包括 header、nav、main、article、section、aside、footer 等标签的语义与最佳实践。',
        tags: ['HTML', '语义化', '页面结构'], file: '20260317', icon: 'fa-code'
    },
    {
        title: 'Flexbox 与 Grid 布局完全指南',
        date: '2026-03-18', author: 'Bella',
        summary: '系统梳理 CSS Flexbox 和 Grid 两大布局方案的核心概念与常用属性，通过实际案例对比两者的适用场景。',
        tags: ['CSS', '布局', 'Flexbox', 'Grid'], file: '20260318', icon: 'fa-th-large'
    },
    {
        title: 'JavaScript ES6+ 核心语法速览',
        date: '2026-03-20', author: 'Bella',
        summary: '全面梳理 ES6+ 核心语法：let/const、箭头函数、模板字符串、解构赋值、展开运算符、Promise、async/await、模块化等。',
        tags: ['JavaScript', 'ES6', '前端基础'], file: '20260320', icon: 'fa-js-square'
    },
    {
        title: 'Web 开发环境搭建与工具链配置',
        date: '2026-03-16', author: 'Bella',
        summary: '从零搭建前端开发环境，包括 VS Code 配置、Git 版本控制、EditorConfig 统一编码风格、Prettier 代码格式化等。',
        tags: ['工具链', '开发环境', 'Git'], file: '20260316', icon: 'fa-tools'
    },
    {
        title: '数组高阶方法实战：map、filter、reduce',
        date: '2026-03-20', author: 'Bella',
        summary: '通过商品列表、用户数据等实际场景，深入理解 map、filter、reduce、find、some、every 等数组高阶方法的用法与链式调用技巧。',
        tags: ['JavaScript', 'ES6', '数组方法'], file: '20260320b', icon: 'fa-list-ol'
    }
];

/* ========================================
   UI 状态渲染
   ======================================== */

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

const showError = (container, message) => {
    container.innerHTML = `
        <div class="blog-error-state">
            <div class="blog-error-icon">
                <i class="fas fa-exclamation-triangle"></i>
            </div>
            <h3 class="blog-error-title">加载失败</h3>
            <p class="blog-error-msg">${message}</p>
            <button class="blog-retry-btn" id="blogRetryBtn">
                <i class="fas fa-redo"></i> 重新加载
            </button>
        </div>`;
    const retryBtn = container.querySelector('#blogRetryBtn');
    if (retryBtn) {
        retryBtn.addEventListener('click', () => { initBlogList(); });
    }
};

/* ========================================
   核心渲染函数
   ======================================== */

const getAllTags = () => {
    const tagSet = new Set();
    blogPosts.forEach(({ tags }) => {
        tags.forEach((tag) => tagSet.add(tag));
    });
    return ['全部', ...Array.from(tagSet).sort()];
};

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

const renderTag = (tag) => {
    const { bg, color, border } = TAG_COLORS[tag] || DEFAULT_TAG_COLOR;
    return `<span class="blog-tag" style="background:${bg};color:${color};border-color:${border}">${tag}</span>`;
};

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

const renderTagFilter = (container) => {
    const allTags = getAllTags();
    container.innerHTML = allTags.map((tag) => {
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

    container.querySelectorAll('.blog-filter-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            currentTag = btn.dataset.tag;
            renderBlogList();
        });
    });
};

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
    if (countEl) countEl.textContent = `共 ${posts.length} 篇文章`;
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
   初始化入口（导出）
   ======================================== */

/**
 * 初始化博客列表：loading → 异步加载 → 渲染 / 降级
 */
export const initBlogList = async () => {
    const section = document.getElementById('blogListSection');
    if (!section) return;

    const headerEl = section.querySelector('.blog-list-header');
    const filterBar = section.querySelector('.blog-filter-bar');
    const listContainer = section.querySelector('.blog-post-list');

    if (headerEl) headerEl.style.display = 'none';
    if (filterBar) filterBar.style.display = 'none';
    if (listContainer) showLoading(listContainer);

    try {
        blogPosts = await loadBlogData();
        renderBlogList();
    } catch (error) {
        console.warn('博客数据加载失败，使用内置数据：', error.message);
        blogPosts = getFallbackPosts();
        renderBlogList();
    }
};
