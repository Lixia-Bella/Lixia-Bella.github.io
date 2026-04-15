/**
 * 奖励兑换页入口模块
 * 初始化通用功能 + 奖励系统
 */

import { restoreTheme, initCommon, scrollToTop } from './utils.js';
import { initRewardsPage } from './quiz.js';

restoreTheme();
window.scrollToTop = scrollToTop;

document.addEventListener('DOMContentLoaded', () => {
    initCommon();
    initRewardsPage();
});
