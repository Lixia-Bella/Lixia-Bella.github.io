/**
 * 阳光小站 - 通用工具模块
 * 提供主题切换、导航栏、滚动效果、入场动画、Toast 等公共功能
 */

/* ========================================
   主题切换
   ======================================== */

/**
 * 页面加载前立即恢复主题（需在模块外 IIFE 调用或 HTML 内联调用）
 */
export const restoreTheme = () => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
};

/**
 * 初始化暗色模式切换按钮
 */
export const initThemeToggle = () => {
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

/* ========================================
   导航栏
   ======================================== */

/**
 * 初始化移动端汉堡菜单的展开/收起
 */
export const initNavigation = () => {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', (e) => {
            e.preventDefault();
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navMenu.querySelectorAll('.nav-link').forEach((link) => {
            link.addEventListener('click', () => {
                if (!link.getAttribute('target')) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        });

        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
};

/* ========================================
   滚动效果
   ======================================== */

/**
 * 导航栏滚动时的阴影变化
 */
export const initScrollEffects = () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        navbar.style.boxShadow = scrollTop > 10
            ? '0 4px 30px rgba(195, 177, 225, 0.3)'
            : '0 2px 20px rgba(242, 166, 179, 0.2)';
        lastScrollTop = scrollTop;
    });
};

/**
 * 平滑滚动到页面顶部
 */
export const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

/* ========================================
   入场动画
   ======================================== */

/**
 * 初始化页面入场动画（Intersection Observer + CSS 变量 --delay）
 */
export const initAnimations = () => {
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

/* ========================================
   页面交互效果
   ======================================== */

/**
 * 头像点击缩放效果
 */
export const initAvatarEffect = () => {
    const avatar = document.querySelector('.avatar');
    const avatarLink = document.querySelector('.avatar-link');
    if (avatar && avatarLink) {
        avatarLink.addEventListener('click', () => {
            avatar.style.transform = 'scale(0.95)';
            setTimeout(() => { avatar.style.transform = ''; }, 150);
        });
    }
};

/**
 * 技能标签点击涟漪效果
 */
export const initSkillTagEffect = () => {
    document.querySelectorAll('.skill-tag').forEach((tag) => {
        tag.addEventListener('click', () => {
            tag.style.transform = 'scale(1.1)';
            setTimeout(() => { tag.style.transform = ''; }, 200);
        });
    });
};

/**
 * 页面加载完成后的初始化
 */
export const initLoadedState = () => {
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        console.log('%c欢迎来到阳光小站！',
            'color: #C3B1E1; font-size: 20px; font-weight: bold;');
        console.log('%c愿你每天都充满阳光！',
            'color: #F2A6B3; font-size: 14px;');
    });
};

/* ========================================
   Toast 提示
   ======================================== */

/**
 * 显示 Toast 提示消息
 */
export const showToast = (message) => {
    const existing = document.querySelector('.toast-message');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => { toast.classList.add('show'); });

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => { toast.remove(); }, 300);
    }, 2500);
};

/* ========================================
   公共初始化（所有页面共用）
   ======================================== */

/**
 * 初始化所有页面通用功能
 */
export const initCommon = () => {
    initThemeToggle();
    initNavigation();
    initScrollEffects();
    initAnimations();
    initAvatarEffect();
    initSkillTagEffect();
    initLoadedState();
};
