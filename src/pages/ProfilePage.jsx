import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { assetUrl } from '../lib/paths.js';

export default function ProfilePage() {
    useEffect(() => {
        document.title = '个人简介 - 阳光小站';
    }, []);

    return (
        <main className="main-content profile-page">
            <header className="page-header">
                <h1>
                    <i className="fas fa-user-circle" /> 个人简介
                </h1>
            </header>

            <section className="profile-section">
                <div className="profile-card">
                    <div className="profile-avatar">
                        <img src={assetUrl('images/image1.svg')} alt="头像" className="avatar-large" />
                    </div>
                    <div className="profile-info">
                        <h2>Bella</h2>
                        <p className="profile-title">
                            <i className="fas fa-code" /> 全栈开发工程师
                        </p>
                        <p className="profile-location">
                            <i className="fas fa-map-marker-alt" /> 中国
                        </p>
                    </div>
                </div>
            </section>

            <section className="details-section">
                <div className="detail-card">
                    <h3>
                        <i className="fas fa-briefcase" /> 技能专长
                    </h3>
                    <div className="skills-list">
                        <span className="skill-tag">JavaScript</span>
                        <span className="skill-tag">TypeScript</span>
                        <span className="skill-tag">Vue.js</span>
                        <span className="skill-tag">React</span>
                        <span className="skill-tag">Node.js</span>
                        <span className="skill-tag">Python</span>
                        <span className="skill-tag">HTML/CSS</span>
                        <span className="skill-tag">MongoDB</span>
                    </div>
                </div>

                <div className="detail-card">
                    <h3>
                        <i className="fas fa-graduation-cap" /> 教育背景
                    </h3>
                    <p>计算机科学专业，热爱学习新技术和编程语言。</p>
                </div>

                <div className="detail-card">
                    <h3>
                        <i className="fas fa-bullseye" /> 目标愿景
                    </h3>
                    <p>成为一名优秀的技术专家，用代码创造价值，用技术改变生活。</p>
                    <p>希望能够在开源社区贡献自己的力量，帮助更多学习者成长。</p>
                </div>

                <div className="detail-card">
                    <h3>
                        <i className="fas fa-quote-left" /> 座右铭
                    </h3>
                    <blockquote className="motto">「保持阳光心态，拥抱每一天的挑战！」</blockquote>
                </div>
            </section>

            <section className="contact-section">
                <h2>
                    <i className="fas fa-envelope" /> 联系我
                </h2>
                <div className="contact-grid">
                    <a href="https://Lixia-Bella.github.io/" target="_blank" rel="noreferrer" className="contact-card">
                        <i className="fas fa-blog" />
                        <span>个人博客</span>
                    </a>
                    <a href="https://github.com/" target="_blank" rel="noreferrer" className="contact-card">
                        <i className="fab fa-github" />
                        <span>GitHub</span>
                    </a>
                </div>
            </section>

            <div className="back-link">
                <Link to="/" className="btn-back">
                    <i className="fas fa-arrow-left" /> 返回首页
                </Link>
            </div>
        </main>
    );
}
