/**
 * 答题挑战页入口模块
 * 初始化通用功能 + 答题游戏
 */

import { restoreTheme, initCommon, scrollToTop } from './utils.js';
import { initQuizPage } from './quiz.js';

restoreTheme();
window.scrollToTop = scrollToTop;

document.addEventListener('DOMContentLoaded', () => {
    initCommon();
    initQuizPage();
});
