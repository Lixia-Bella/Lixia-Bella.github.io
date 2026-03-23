import { Link } from 'react-router-dom';

function Home({ tasks, completedTasks }) {
  const pendingTasks = tasks.length - completedTasks;

  return (
    <section className="page-content">
      <div className="hero-card">
        <div>
          <p className="section-eyebrow">综合实战项目</p>
          <h2 className="page-title">把第一周学到的知识串成一个完整小项目</h2>
          <p className="page-description">
            这个项目会把组件化、Props、State、`useEffect`、React Router 和
            `localStorage`
            串起来，帮助你从零完成一个可以演示、可以继续扩展的学习任务面板。
          </p>
        </div>

        <div className="hero-actions">
          <Link className="primary-button" to="/tasks">
            开始实战
          </Link>
          <a
            className="ghost-button"
            href="https://zh-hans.react.dev/learn"
            target="_blank"
            rel="noreferrer"
          >
            查看 React 文档
          </a>
        </div>
      </div>

      <div className="stats-grid">
        <article className="stat-card">
          <span>总任务数</span>
          <strong>{tasks.length}</strong>
        </article>
        <article className="stat-card">
          <span>已完成</span>
          <strong>{completedTasks}</strong>
        </article>
        <article className="stat-card">
          <span>未完成</span>
          <strong>{pendingTasks}</strong>
        </article>
      </div>

      <section className="content-section">
        <div className="section-header">
          <div>
            <p className="section-eyebrow">本周重点</p>
            <h3>你会在这个项目里练到什么</h3>
          </div>
        </div>

        <div className="feature-grid">
          <article className="feature-card">
            <h4>组件化拆分</h4>
            <p>把页面拆成布局、任务卡片、状态徽章和筛选器等小模块。</p>
          </article>
          <article className="feature-card">
            <h4>状态联动</h4>
            <p>在顶层统一管理任务数据，再把状态和方法传递给子页面。</p>
          </article>
          <article className="feature-card">
            <h4>路由跳转</h4>
            <p>使用动态路由进入详情页，完成列表页与详情页之间的联动。</p>
          </article>
          <article className="feature-card">
            <h4>本地持久化</h4>
            <p>刷新页面后保留学习进度，体验真实项目中的状态保存流程。</p>
          </article>
        </div>
      </section>
    </section>
  );
}

export default Home;
