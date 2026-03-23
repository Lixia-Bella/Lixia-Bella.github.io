import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      {/* 全局导航栏 */}
      <nav style={{ padding: '10px', borderBottom: '1px solid #eee', marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '20px' }}>首页</Link>
        <Link to="/list">列表页</Link>
      </nav>
      
      <h2>首页</h2>
      <p>欢迎来到首页！</p>
    </div>
  );
}

export default Home;
