import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 style={{ fontSize: '72px', color: '#ff4d4f', margin: '0' }}>404</h1>
      <h2>页面未找到 (Not Found)</h2>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        抱歉，您访问的页面不存在。
      </p>
      <Link 
        to="/" 
        style={{ 
          padding: '10px 20px', 
          backgroundColor: '#007bff', 
          color: 'white', 
          textDecoration: 'none',
          borderRadius: '5px'
        }}
      >
        返回首页
      </Link>
    </div>
  );
}

export default NotFound;
