import React, { useState, useEffect } from 'react';
import './Card.css';

function Card({ title, content }) {
  // 1. 声明一个名为 isExpanded 的 state，初始值优先从 localStorage 中读取
  const [isExpanded, setIsExpanded] = useState(() => {
    const savedState = localStorage.getItem(`card_expanded_${title}`);
    // 如果有保存的值，则将其转换为布尔值；否则默认为 false（收起状态）
    return savedState !== null ? savedState === 'true' : false;
  });

  // 2. 监听 isExpanded 的变化并保存到 localStorage
  useEffect(() => {
    localStorage.setItem(`card_expanded_${title}`, isExpanded.toString());
  }, [isExpanded, title]);

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
