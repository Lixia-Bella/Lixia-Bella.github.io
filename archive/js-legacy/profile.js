/**
 * 个人介绍页入口模块
 * 初始化通用功能
 */

import { restoreTheme, initCommon, scrollToTop } from './utils.js';

restoreTheme();
window.scrollToTop = scrollToTop;

document.addEventListener('DOMContentLoaded', () => {
    initCommon();
});
