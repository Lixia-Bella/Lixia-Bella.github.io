/**
 * 首页入口模块
 * 初始化通用功能 + 博客列表
 */

import { restoreTheme, initCommon, scrollToTop } from './utils.js';
import { initBlogList } from './blog.js';

// 立即恢复主题（避免闪烁）
restoreTheme();

// 将 scrollToTop 挂载到全局（供 HTML onclick 调用）
window.scrollToTop = scrollToTop;

document.addEventListener('DOMContentLoaded', () => {
    initCommon();
    initBlogList();
});
