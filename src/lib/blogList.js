/**
 * 博客列表数据与摘要加载（由原 blog.js 迁移）
 */
import { assetUrl } from './paths.js';

export const TAG_COLORS = {
    CSS: { bg: 'rgba(195, 177, 225, 0.15)', color: 'var(--lavender-dark)', border: 'rgba(195, 177, 225, 0.4)' },
    动画: { bg: 'rgba(242, 166, 179, 0.15)', color: 'var(--primary-pink-dark)', border: 'rgba(242, 166, 179, 0.4)' },
    响应式设计: { bg: 'rgba(167, 199, 231, 0.15)', color: 'var(--sky-blue-dark)', border: 'rgba(167, 199, 231, 0.4)' },
    HTML: { bg: 'rgba(242, 166, 179, 0.15)', color: 'var(--primary-pink-dark)', border: 'rgba(242, 166, 179, 0.4)' },
    语义化: { bg: 'rgba(168, 216, 200, 0.15)', color: 'var(--mint-green-dark)', border: 'rgba(168, 216, 200, 0.4)' },
    页面结构: { bg: 'rgba(249, 228, 183, 0.2)', color: 'var(--cream-yellow-dark)', border: 'rgba(249, 228, 183, 0.5)' },
    布局: { bg: 'rgba(195, 177, 225, 0.15)', color: 'var(--lavender-dark)', border: 'rgba(195, 177, 225, 0.4)' },
    Flexbox: { bg: 'rgba(168, 216, 200, 0.15)', color: 'var(--mint-green-dark)', border: 'rgba(168, 216, 200, 0.4)' },
    Grid: { bg: 'rgba(167, 199, 231, 0.15)', color: 'var(--sky-blue-dark)', border: 'rgba(167, 199, 231, 0.4)' },
    JavaScript: { bg: 'rgba(249, 228, 183, 0.2)', color: 'var(--cream-yellow-dark)', border: 'rgba(249, 228, 183, 0.5)' },
    ES6: { bg: 'rgba(249, 228, 183, 0.2)', color: 'var(--cream-yellow-dark)', border: 'rgba(249, 228, 183, 0.5)' },
    前端基础: { bg: 'rgba(168, 216, 200, 0.15)', color: 'var(--mint-green-dark)', border: 'rgba(168, 216, 200, 0.4)' },
    工具链: { bg: 'rgba(195, 177, 225, 0.15)', color: 'var(--lavender-dark)', border: 'rgba(195, 177, 225, 0.4)' },
    开发环境: { bg: 'rgba(167, 199, 231, 0.15)', color: 'var(--sky-blue-dark)', border: 'rgba(167, 199, 231, 0.4)' },
    Git: { bg: 'rgba(242, 166, 179, 0.15)', color: 'var(--primary-pink-dark)', border: 'rgba(242, 166, 179, 0.4)' },
    数组方法: { bg: 'rgba(168, 216, 200, 0.15)', color: 'var(--mint-green-dark)', border: 'rgba(168, 216, 200, 0.4)' },
};

export const DEFAULT_TAG_COLOR = {
    bg: 'rgba(195, 177, 225, 0.12)',
    color: 'var(--lavender-dark)',
    border: 'rgba(195, 177, 225, 0.3)',
};

const fetchPostIndex = async () => {
    const response = await fetch(assetUrl('blogs/index.json'));
    if (!response.ok) {
        throw new Error(`索引加载失败：HTTP ${response.status}`);
    }
    return response.json();
};

const summarizeFromMd = (md) => {
    const lines = md
        .split('\n')
        .filter((line) => line.trim() && !line.startsWith('#') && !line.startsWith('>'));
    return lines.slice(0, 3).join(' ').slice(0, 200) || '暂无摘要';
};

const fetchPostSummaryViaFetch = async (file) => {
    try {
        const response = await fetch(assetUrl(`blogs/${file}.md`));
        if (!response.ok) return '暂无摘要';
        const md = await response.text();
        return summarizeFromMd(md);
    } catch {
        return '暂无摘要';
    }
};

export const loadBlogData = async () => {
    const posts = await fetchPostIndex();
    const summaries = await Promise.all(posts.map(({ file }) => fetchPostSummaryViaFetch(file)));
    return posts.map((post, index) => ({
        ...post,
        summary: summaries[index],
    }));
};

export const getFallbackPosts = () => [
    {
        title: 'CSS 动画与响应式优化实战总结',
        date: '2026-03-19',
        author: 'Bella',
        summary:
            '记录了阳光小站在 CSS 动画、响应式设计和暗色模式方面的优化实践，涵盖导航栏交互动画、页面入场动画、断点适配以及主题切换四个核心模块。',
        tags: ['CSS', '动画', '响应式设计'],
        file: '20260319',
        icon: 'fa-paint-brush',
    },
    {
        title: 'HTML5 语义化标签与页面结构设计',
        date: '2026-03-17',
        author: 'Bella',
        summary:
            '深入学习 HTML5 语义化标签的正确使用方式，包括 header、nav、main、article、section、aside、footer 等标签的语义与最佳实践。',
        tags: ['HTML', '语义化', '页面结构'],
        file: '20260317',
        icon: 'fa-code',
    },
    {
        title: 'Flexbox 与 Grid 布局完全指南',
        date: '2026-03-18',
        author: 'Bella',
        summary: '系统梳理 CSS Flexbox 和 Grid 两大布局方案的核心概念与常用属性，通过实际案例对比两者的适用场景。',
        tags: ['CSS', '布局', 'Flexbox', 'Grid'],
        file: '20260318',
        icon: 'fa-th-large',
    },
    {
        title: 'JavaScript ES6+ 核心语法速览',
        date: '2026-03-20',
        author: 'Bella',
        summary:
            '全面梳理 ES6+ 核心语法：let/const、箭头函数、模板字符串、解构赋值、展开运算符、Promise、async/await、模块化等。',
        tags: ['JavaScript', 'ES6', '前端基础'],
        file: '20260320',
        icon: 'fa-js-square',
    },
    {
        title: 'Web 开发环境搭建与工具链配置',
        date: '2026-03-16',
        author: 'Bella',
        summary: '从零搭建前端开发环境，包括 VS Code 配置、Git 版本控制、EditorConfig 统一编码风格、Prettier 代码格式化等。',
        tags: ['工具链', '开发环境', 'Git'],
        file: '20260316',
        icon: 'fa-tools',
    },
    {
        title: '数组高阶方法实战：map、filter、reduce',
        date: '2026-03-20',
        author: 'Bella',
        summary:
            '通过商品列表、用户数据等实际场景，深入理解 map、filter、reduce、find、some、every 等数组高阶方法的用法与链式调用技巧。',
        tags: ['JavaScript', 'ES6', '数组方法'],
        file: '20260320b',
        icon: 'fa-list-ol',
    },
];

export const getAllTags = (blogPosts) => {
    const tagSet = new Set();
    blogPosts.forEach(({ tags }) => {
        tags.forEach((tag) => tagSet.add(tag));
    });
    return ['全部', ...Array.from(tagSet).sort()];
};

export const getFilteredPosts = (blogPosts, currentTag, currentSort) => {
    const filtered =
        currentTag === '全部' ? [...blogPosts] : blogPosts.filter(({ tags }) => tags.includes(currentTag));

    return filtered.sort((a, b) => {
        if (currentSort === 'newest') {
            return new Date(b.date) - new Date(a.date);
        }
        return new Date(a.date) - new Date(b.date);
    });
};
