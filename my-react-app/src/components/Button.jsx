import React from 'react';
import './Button.css';

function Button({ text, type = 'default', onClick }) {
  // 根据传入的 type 动态生成类名
  const className = `btn btn-${type}`;

  return (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
