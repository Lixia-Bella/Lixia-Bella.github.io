import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { initNavigation } from '../lib/siteUtils.js';
import { assetUrl } from '../lib/paths.js';
import { useTheme } from '../context/ThemeContext.jsx';

const navClass = ({ isActive }) => `nav-link${isActive ? ' active' : ''}`;

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        initNavigation();
    }, []);

    return (
        <nav className="navbar">
            <NavLink to="/profile" className="nav-brand-avatar" title="点击查看个人详情">
                <img src={assetUrl('images/image1.svg')} alt="我的头像" className="nav-avatar" />
                <div className="nav-avatar-glow" />
            </NavLink>
            <div className="nav-brand-info">
                <span className="nav-brand-title">阳光小站</span>
                <span className="nav-brand-desc">用代码创造美好，用文字记录生活</span>
            </div>

            <button
                className="theme-toggle"
                id="themeToggle"
                type="button"
                aria-label={theme === 'dark' ? '切换到亮色模式' : '切换到暗色模式'}
                onClick={toggleTheme}
            >
                <i className="fas fa-sun icon-sun" />
                <i className="fas fa-moon icon-moon" />
            </button>

            <button className="nav-toggle" id="navToggle" type="button" aria-label="切换导航菜单">
                <span className="hamburger" />
            </button>

            <ul className="nav-menu" id="navMenu">
                <li>
                    <NavLink to="/" end className={navClass}>
                        <i className="fas fa-home" /> 首页
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/quiz" className={navClass}>
                        <i className="fas fa-gamepad" /> 知识问答
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/rewards" className={navClass}>
                        <i className="fas fa-gift" /> 奖励池
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/profile" className={navClass}>
                        <i className="fas fa-user" /> 个人简介
                    </NavLink>
                </li>
                <li>
                    <a href="https://Lixia-Bella.github.io/" target="_blank" rel="noreferrer" className="nav-link">
                        <i className="fas fa-blog" /> 我的博客
                    </a>
                </li>
            </ul>
        </nav>
    );
}
