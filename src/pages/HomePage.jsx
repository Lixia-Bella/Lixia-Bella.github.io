import { Fragment, useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CommonList from '@/components/CommonList.jsx';
import {
    TAG_COLORS,
    DEFAULT_TAG_COLOR,
    loadBlogData,
    getFallbackPosts,
    getAllTags,
    getFilteredPosts,
} from '@/lib/blogList.js';

const renderTagStyle = (tag) => {
    const { bg, color, border } = TAG_COLORS[tag] || DEFAULT_TAG_COLOR;
    return { background: bg, color, borderColor: border };
};

export default function HomePage() {
    const [blogPosts, setBlogPosts] = useState([]);
    const [currentTag, setCurrentTag] = useState('全部');
    const [currentSort, setCurrentSort] = useState('newest');
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);

    const load = useCallback(async () => {
        setLoading(true);
        setLoadError(null);
        try {
            const data = await loadBlogData();
            setBlogPosts(data);
        } catch (e) {
            console.warn('博客数据加载失败，使用内置数据：', e.message);
            setBlogPosts(getFallbackPosts());
            setLoadError(e.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        document.title = '个人介绍 - 阳光小站';
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    const tags = getAllTags(blogPosts);
    const posts = blogPosts.length ? getFilteredPosts(blogPosts, currentTag, currentSort) : [];

    return (
        <main className="main-content">
            <section className="blog-list-section" id="blogListSection">
                <div className="blog-list-header" style={loading ? { display: 'none' } : undefined}>
                    <h2>
                        <i className="fas fa-newspaper" /> 文章列表
                    </h2>
                    <div className="blog-list-controls">
                        <span className="blog-post-count">共 {posts.length} 篇文章</span>
                        <div className="blog-sort-bar">
                            <button
                                type="button"
                                className={`blog-sort-btn${currentSort === 'newest' ? ' active' : ''}`}
                                onClick={() => setCurrentSort('newest')}
                            >
                                <i className="fas fa-sort-amount-down" /> 最新优先
                            </button>
                            <button
                                type="button"
                                className={`blog-sort-btn${currentSort === 'oldest' ? ' active' : ''}`}
                                onClick={() => setCurrentSort('oldest')}
                            >
                                <i className="fas fa-sort-amount-up" /> 最早优先
                            </button>
                        </div>
                    </div>
                </div>

                <div className="blog-filter-bar" style={loading ? { display: 'none' } : undefined}>
                    <CommonList
                        as={Fragment}
                        items={tags}
                        emptyState="暂无标签"
                        itemKey={(tag) => tag}
                        renderItem={(tag) => {
                            const isActive = tag === currentTag;
                            if (tag === '全部') {
                                return (
                                    <button
                                        type="button"
                                        className={`blog-filter-btn${isActive ? ' active' : ''}`}
                                        onClick={() => setCurrentTag(tag)}
                                    >
                                        <i className="fas fa-th-list" /> 全部
                                    </button>
                                );
                            }

                            const st = TAG_COLORS[tag] || DEFAULT_TAG_COLOR;
                            return (
                                <button
                                    type="button"
                                    className={`blog-filter-btn${isActive ? ' active' : ''}`}
                                    style={
                                        isActive
                                            ? {
                                                  background: st.bg,
                                                  color: st.color,
                                                  borderColor: st.border,
                                              }
                                            : undefined
                                    }
                                    onClick={() => setCurrentTag(tag)}
                                >
                                    {tag}
                                </button>
                            );
                        }}
                    />
                </div>

                <div className="blog-post-list">
                    {loading && (
                        <div className="blog-loading">
                            <div className="blog-loading-spinner">
                                <div className="spinner-ring" />
                                <div className="spinner-ring" />
                                <div className="spinner-ring" />
                            </div>
                            <p className="blog-loading-text">正在加载文章数据</p>
                            <div className="blog-loading-dots">
                                <span />
                                <span />
                                <span />
                            </div>
                        </div>
                    )}

                    {!loading && loadError && (
                        <p
                            className="blog-error-msg"
                            style={{ textAlign: 'center', color: 'var(--text-secondary)' }}
                        >
                            索引加载异常（{loadError}），已使用本地备用列表。
                        </p>
                    )}

                    {!loading && (
                        <CommonList
                            as={Fragment}
                            items={posts}
                            itemKey="file"
                            emptyState={
                                <div className="blog-empty">
                                    <i className="fas fa-search" />
                                    <p>暂无「{currentTag}」相关文章</p>
                                </div>
                            }
                            renderItem={({ title, date, author, summary, tags, file, icon }) => (
                                <article className="blog-post-card">
                                    <div className="blog-post-icon">
                                        <i className={`fas ${icon}`} />
                                    </div>
                                    <div className="blog-post-body">
                                        <div className="blog-post-meta">
                                            <span>
                                                <i className="fas fa-calendar-alt" /> {date}
                                            </span>
                                            <span>
                                                <i className="fas fa-user" /> {author}
                                            </span>
                                        </div>
                                        <h3 className="blog-post-title">
                                            <Link to={`/blog/${file}`}>{title}</Link>
                                        </h3>
                                        <p className="blog-post-summary">{summary}</p>
                                        <div className="blog-post-footer">
                                            <div className="blog-post-tags">
                                                {tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="blog-tag"
                                                        style={renderTagStyle(tag)}
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <Link to={`/blog/${file}`} className="blog-post-read">
                                                阅读全文 <i className="fas fa-arrow-right" />
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            )}
                        />
                    )}
                </div>
            </section>

            <section className="hobbies-section">
                <h2>
                    <i className="fas fa-star" /> 我的爱好
                </h2>
                <div className="hobbies-grid">
                    <div className="hobby-card">
                        <i className="fas fa-code" />
                        <h3>编程开发</h3>
                        <p>热爱编程，享受解决问题带来的成就感</p>
                    </div>
                    <div className="hobby-card">
                        <i className="fas fa-book" />
                        <h3>阅读学习</h3>
                        <p>喜欢阅读各类书籍，不断充实自己</p>
                    </div>
                    <div className="hobby-card">
                        <i className="fas fa-camera" />
                        <h3>摄影记录</h3>
                        <p>用镜头捕捉生活中的美好瞬间</p>
                    </div>
                    <div className="hobby-card">
                        <i className="fas fa-music" />
                        <h3>音乐欣赏</h3>
                        <p>享受音乐带来的轻松与愉悦</p>
                    </div>
                    <div className="hobby-card">
                        <i className="fas fa-hiking" />
                        <h3>户外运动</h3>
                        <p>喜欢户外活动，拥抱大自然</p>
                    </div>
                    <div className="hobby-card">
                        <i className="fas fa-gamepad" />
                        <h3>游戏娱乐</h3>
                        <p>偶尔放松一下，享受游戏乐趣</p>
                    </div>
                </div>
            </section>

            <section className="quiz-entry-section">
                <h2>
                    <i className="fas fa-brain" /> 知识问答挑战
                </h2>
                <div className="quiz-entry-card">
                    <div className="quiz-entry-info">
                        <div className="quiz-entry-icon">
                            <i className="fas fa-trophy" />
                        </div>
                        <h3>边玩边学，挑战编程知识！</h3>
                        <p>
                            涵盖 Node.js、HTML/CSS、Web 开发、后端服务、大模型、算法、C/C++
                            等多领域知识。 通关赢积分，积分兑好礼！
                        </p>
                        <div className="quiz-entry-stats">
                            <div className="stat-item">
                                <i className="fas fa-layer-group" />
                                <span>10 大关卡</span>
                            </div>
                            <div className="stat-item">
                                <i className="fas fa-question-circle" />
                                <span>海量题库</span>
                            </div>
                            <div className="stat-item">
                                <i className="fas fa-gift" />
                                <span>丰厚奖品</span>
                            </div>
                        </div>
                    </div>
                    <div className="quiz-entry-actions">
                        <Link to="/quiz" className="btn-quiz-start">
                            <i className="fas fa-play-circle" /> 开始挑战
                        </Link>
                        <Link to="/rewards" className="btn-quiz-rewards">
                            <i className="fas fa-gift" /> 查看奖励池
                        </Link>
                    </div>
                </div>
            </section>

            <section className="links-section">
                <h2>
                    <i className="fas fa-link" /> 更多精彩
                </h2>
                <div
                    className="links-grid"
                    style={{
                        display: 'flex',
                        gap: '20px',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                    }}
                >
                    <div className="link-card">
                        <a
                            href="https://Lixia-Bella.github.io/"
                            target="_blank"
                            rel="noreferrer"
                            className="external-link"
                        >
                            <i className="fas fa-external-link-alt" />
                            <span>访问我的博客</span>
                            <small>Lixia-Bella.github.io</small>
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
