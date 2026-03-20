/**
 * 博客文章详情页入口模块
 * 初始化通用功能 + Markdown 渲染
 */

import { restoreTheme, initCommon, scrollToTop } from './utils.js';

restoreTheme();
window.scrollToTop = scrollToTop;

/**
 * 加载并渲染 Markdown 文章
 * 依赖外部 CDN：marked.js + highlight.js（在 HTML 中通过普通 <script> 引入）
 */
const initBlogArticle = () => {
    const container = document.getElementById('blogContent');
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const file = params.get('file');

    const showError = (msg) => {
        container.className = 'blog-error';
        container.innerHTML =
            `<i class="fas fa-exclamation-circle"></i>` +
            `<p>${msg}</p>` +
            `<a href="index.html" class="btn-read-more">` +
            `<i class="fas fa-home"></i> 返回首页</a>`;
    };

    if (!file) {
        showError('未指定文章路径');
        return;
    }

    if (!/^[\w\-]+$/.test(file)) {
        showError('无效的文章名称');
        return;
    }

    // 等待 marked 和 hljs 加载完成后再配置
    const waitForLibs = () => {
        return new Promise((resolve) => {
            const check = () => {
                if (typeof marked !== 'undefined' && typeof hljs !== 'undefined') {
                    resolve();
                } else {
                    setTimeout(check, 50);
                }
            };
            check();
        });
    };

    waitForLibs().then(() => {
        marked.setOptions({
            highlight(code, lang) {
                if (lang && hljs.getLanguage(lang)) {
                    return hljs.highlight(code, { language: lang }).value;
                }
                return hljs.highlightAuto(code).value;
            },
            breaks: false,
            gfm: true,
        });

        const scriptEl = document.createElement('script');
        scriptEl.src = `blogs/${file}.js`;
        scriptEl.onload = () => {
            const md = window.__BLOG_MD__;
            if (!md) {
                showError('文章数据为空');
                return;
            }
            const html = marked.parse(md);
            container.className = 'blog-article';
            container.innerHTML = html;

            const h1 = container.querySelector('h1');
            if (h1) {
                document.title = `${h1.textContent} - 阳光小站`;
            }
            delete window.__BLOG_MD__;
        };
        scriptEl.onerror = () => {
            showError('文章加载失败，请检查文件是否存在');
        };
        document.body.appendChild(scriptEl);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    initCommon();
    initBlogArticle();
});
