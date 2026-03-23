import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section className="page-content">
      <div className="empty-state">
        <h1 className="not-found-code">404</h1>
        <h2>页面未找到</h2>
        <p>抱歉，你访问的页面不存在，可以返回首页继续学习。</p>
        <Link className="primary-button" to="/">
          返回首页
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
