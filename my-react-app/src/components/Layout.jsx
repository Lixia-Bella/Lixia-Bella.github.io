import { NavLink, Outlet } from 'react-router-dom';

function Layout({ totalTasks, completedTasks }) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="topbar-eyebrow">第一周综合实战</p>
          <h1 className="topbar-title">AI Coding 学习任务面板</h1>
        </div>

        <div className="topbar-progress">
          <span>学习进度</span>
          <strong>
            {completedTasks} / {totalTasks}
          </strong>
        </div>
      </header>

      <nav className="main-nav">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'nav-link nav-link-active' : 'nav-link'
          }
        >
          首页
        </NavLink>
        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            isActive ? 'nav-link nav-link-active' : 'nav-link'
          }
        >
          任务列表
        </NavLink>
      </nav>

      <main className="page-container">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
