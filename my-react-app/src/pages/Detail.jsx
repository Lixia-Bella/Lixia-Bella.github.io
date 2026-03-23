import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Detail() {
  // 使用 useParams 获取 URL 中的动态参数 id
  const { id } = useParams();
  
  // 使用 useNavigate 获取导航函数
  const navigate = useNavigate();

  const handleBack = () => {
    // 编程式导航返回列表页
    navigate('/list');
    // 或者使用 navigate(-1) 返回上一页
  };

  return (
    <div>
      <h2>详情页</h2>
      <p>这里是商品详情信息。</p>
      <p style={{ fontSize: '18px', color: '#007bff' }}>
        当前商品 ID：<strong>{id}</strong>
      </p>
      
      <button 
        onClick={handleBack}
        style={{ marginTop: '20px', padding: '8px 16px', cursor: 'pointer' }}
      >
        返回列表
      </button>
    </div>
  );
}

export default Detail;
