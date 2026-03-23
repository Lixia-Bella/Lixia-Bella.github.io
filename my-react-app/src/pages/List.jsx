import React from 'react';
import { Link } from 'react-router-dom';

function List() {
  // 模拟商品数据
  const products = [
    { id: 1, name: '商品 A' },
    { id: 2, name: '商品 B' },
    { id: 3, name: '商品 C' }
  ];

  return (
    <div>
      {/* 为了方便导航，这里也保留一个返回首页的链接 */}
      <nav style={{ padding: '10px', borderBottom: '1px solid #eee', marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '20px' }}>首页</Link>
        <Link to="/list">列表页</Link>
      </nav>

      <h2>列表页</h2>
      <p>这里是商品列表：</p>
      <ul>
        {products.map(product => (
          <li key={product.id} style={{ margin: '10px 0' }}>
            {/* 点击跳转到详情页，并在 URL 中携带对应的商品 ID */}
            <Link to={`/detail/${product.id}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;
