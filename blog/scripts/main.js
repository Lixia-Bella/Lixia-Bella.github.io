/**
 * 阳光小站 - 个人介绍页面交互脚本
 * 功能：导航栏切换、页面交互效果
 */

// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initNavigation();
    initScrollEffects();
    initAnimations();
});

/**
 * 初始化导航栏功能
 * 处理移动端汉堡菜单的展开/收起
 */
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        // 点击汉堡按钮切换菜单
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // 点击导航链接后关闭菜单（移动端）
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                // 如果是内部链接，关闭菜单
                if (!link.getAttribute('target')) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        });
        
        // 点击页面其他区域关闭菜单
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
        
        // 窗口大小改变时重置菜单状态
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

/**
 * 初始化滚动效果
 * 导航栏滚动时的样式变化
 */
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 10) {
                navbar.style.boxShadow = '0 4px 30px rgba(195, 177, 225, 0.3)';
            } else {
                navbar.style.boxShadow = '0 2px 20px rgba(242, 166, 179, 0.2)';
            }
            
            lastScrollTop = scrollTop;
        });
    }
}

/**
 * 初始化页面动画效果
 * 为卡片添加入场动画
 */
function initAnimations() {
    // 创建 Intersection Observer 用于滚动动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // 观察所有需要动画的元素
    const animatedElements = document.querySelectorAll(
        '.intro-section, .hobbies-section, .links-section, .hobby-card, ' +
        '.detail-card, .contact-card, .profile-card, ' +
        '.quiz-entry-section, .level-card, .reward-card, ' +
        '.rewards-rules-section, .rewards-list-section, .exchange-history-section'
    );
    
    animatedElements.forEach(function(element, index) {
        // 设置初始状态
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease ' + (index * 0.1) + 's, transform 0.5s ease ' + (index * 0.1) + 's';
        observer.observe(element);
    });
}

/**
 * 头像点击效果
 * 添加点击反馈动画
 */
document.addEventListener('DOMContentLoaded', function() {
    const avatar = document.querySelector('.avatar');
    const avatarLink = document.querySelector('.avatar-link');
    
    if (avatar && avatarLink) {
        avatarLink.addEventListener('click', function(e) {
            // 添加点击动画
            avatar.style.transform = 'scale(0.95)';
            setTimeout(function() {
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
document.addEventListener('DOMContentLoaded', function() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(function(tag) {
        tag.addEventListener('click', function() {
            // 添加点击涟漪效果
            tag.style.transform = 'scale(1.1)';
            setTimeout(function() {
                tag.style.transform = '';
            }, 200);
        });
    });
});

/**
 * 页面加载完成后的初始化
 */
window.addEventListener('load', function() {
    // 移除加载状态（如果有的话）
    document.body.classList.add('loaded');
    
    // 控制台欢迎信息
    console.log('%c欢迎来到阳光小站！', 
        'color: #C3B1E1; font-size: 20px; font-weight: bold;');
    console.log('%c愿你每天都充满阳光！', 
        'color: #F2A6B3; font-size: 14px;');
});