/**
 * 阳光小站 - 个人介绍页面交互脚本
 * 功能：导航栏切换、页面交互效果
 */

// 页面加载前立即恢复主题，避免闪烁
(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
})();

// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initNavigation();
    initScrollEffects();
    initAnimations();
});

/**
 * 初始化暗色模式切换
 * 读取 localStorage 偏好，绑定按钮点击事件，
 * 通过 data-theme 属性切换亮/暗主题
 */
const initThemeToggle = () => {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    btn.setAttribute('aria-label', isDark ? '切换到亮色模式' : '切换到暗色模式');

    btn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';

        if (next === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }

        localStorage.setItem('theme', next);
        btn.setAttribute('aria-label', next === 'dark' ? '切换到亮色模式' : '切换到暗色模式');
    });
};

/**
 * 初始化导航栏功能
 * 处理移动端汉堡菜单的展开/收起
 */
const initNavigation = () => {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        // 点击汉堡按钮切换菜单
        navToggle.addEventListener('click', (e) => {
            e.preventDefault();
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // 点击导航链接后关闭菜单（移动端）
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach((link) => {
            link.addEventListener('click', () => {
                if (!link.getAttribute('target')) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        });

        // 点击页面其他区域关闭菜单
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });

        // 窗口大小改变时重置菜单状态
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
};

/**
 * 初始化滚动效果
 * 导航栏滚动时的样式变化
 */
const initScrollEffects = () => {
    const navbar = document.querySelector('.navbar');

    if (navbar) {
        let lastScrollTop = 0;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > 10) {
                navbar.style.boxShadow = '0 4px 30px rgba(195, 177, 225, 0.3)';
            } else {
                navbar.style.boxShadow = '0 2px 20px rgba(242, 166, 179, 0.2)';
            }

            lastScrollTop = scrollTop;
        });
    }
};

/**
 * 初始化页面入场动画
 * 使用 @keyframes slideUpFadeIn + Intersection Observer，
 * 元素进入视口时才播放动画，通过 CSS 变量 --delay 实现错落效果
 */
const initAnimations = () => {
    const animationGroups = [
        { selector: '.article-section', baseDelay: 0 },
        { selector: '.blog-list-section', baseDelay: 0 },
        { selector: '.hobbies-section', baseDelay: 0 },
        { selector: '.hobby-card', baseDelay: 0, step: 0.08 },
        { selector: '.quiz-entry-section', baseDelay: 0 },
        { selector: '.links-section', baseDelay: 0 },
        { selector: '.profile-card', baseDelay: 0 },
        { selector: '.detail-card', baseDelay: 0, step: 0.1 },
        { selector: '.contact-section', baseDelay: 0 },
        { selector: '.contact-card', baseDelay: 0, step: 0.1 },
        { selector: '.quiz-status-bar', baseDelay: 0 },
        { selector: '.level-card', baseDelay: 0, step: 0.08 },
        { selector: '.rewards-rules-section', baseDelay: 0 },
        { selector: '.rule-card', baseDelay: 0, step: 0.08 },
        { selector: '.rewards-list-section', baseDelay: 0 },
        { selector: '.reward-card', baseDelay: 0, step: 0.08 },
        { selector: '.exchange-history-section', baseDelay: 0 },
    ];

    animationGroups.forEach(({ selector, baseDelay, step }) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, i) => {
            el.classList.add('animate-on-scroll');
            const delay = baseDelay + (step ? step * i : 0);
            el.style.setProperty('--delay', `${delay}s`);
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        observer.observe(el);
    });
};

/**
 * 头像点击效果
 * 添加点击反馈动画
 */
document.addEventListener('DOMContentLoaded', () => {
    const avatar = document.querySelector('.avatar');
    const avatarLink = document.querySelector('.avatar-link');

    if (avatar && avatarLink) {
        avatarLink.addEventListener('click', () => {
            avatar.style.transform = 'scale(0.95)';
            setTimeout(() => {
                avatar.style.transform = '';
            }, 150);
        });
    }
});

/**
 * 平滑滚动到页面顶部
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/**
 * 技能标签点击效果
 */
document.addEventListener('DOMContentLoaded', () => {
    const skillTags = document.querySelectorAll('.skill-tag');

    skillTags.forEach((tag) => {
        tag.addEventListener('click', () => {
            tag.style.transform = 'scale(1.1)';
            setTimeout(() => {
                tag.style.transform = '';
            }, 200);
        });
    });
});

/**
 * 页面加载完成后的初始化
 */
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    console.log('%c欢迎来到阳光小站！',
        'color: #C3B1E1; font-size: 20px; font-weight: bold;');
    console.log('%c愿你每天都充满阳光！',
        'color: #F2A6B3; font-size: 14px;');
});
