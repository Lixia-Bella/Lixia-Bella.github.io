import React, { useState } from 'react';
import './Card.css';

function Card({ title, content }) {
  // 声明一个名为 isExpanded 的 state，初始值为 false（收起状态）
  const [isExpanded, setIsExpanded] = useState(false);

  // 点击卡片时切换状态
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  // 如果内容较长且处于收起状态，则只显示前 50 个字符作为摘要
  const showSummary = !isExpanded && content.length > 50;
  const displayContent = showSummary ? `${content.slice(0, 50)}...` : content;

  return (
    <div className="card" onClick={handleToggle}>
      <h3 className="card-title">{title}</h3>
      <div className="card-content">
        {displayContent}
      </div>
      <div className="card-hint">
        {isExpanded ? '点击收起 向上' : '点击展开 向下'}
      </div>
    </div>
  );
}

export default Card;
