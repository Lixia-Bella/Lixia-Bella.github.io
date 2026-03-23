import React, { useState, useEffect } from 'react';
import './Counter.css';

function Counter() {
  // 1. 初始化状态：优先从 localStorage 读取
  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem('myCount');
    return savedCount ? parseInt(savedCount, 10) : 0;
  });
  const [step, setStep] = useState(1);

  // 2. 监听 count 变化并保存到 localStorage
  useEffect(() => {
    localStorage.setItem('myCount', count.toString());
  }, [count]);

  const handleIncrement = () => {
    setCount(prevCount => prevCount + (step || 0));
  };

  const handleDecrement = () => {
    setCount(prevCount => prevCount - (step || 0));
  };

  const handleReset = () => {
    setCount(0);
    setStep(1);
  };

  const handleStepChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setStep(value);
    } else if (e.target.value === '') {
      setStep(''); // 允许暂时清空输入框
    }
  };

  const handleStepBlur = () => {
    if (step === '' || step < 1) {
      setStep(1);
    }
  };

  return (
    <div className="counter-container">
      <h2>功能完善的计数器</h2>
      <div className="count-display">当前计数：{count}</div>
      
      <div className="step-control">
        <label htmlFor="step-input">设置步长：</label>
        <input
          id="step-input"
          type="number"
          value={step}
          onChange={handleStepChange}
          onBlur={handleStepBlur}
          min="1"
        />
      </div>

      <div className="button-group">
        <button className="btn decrement" onClick={handleDecrement}>
          减少 (-{step || 0})
        </button>
        <button className="btn reset" onClick={handleReset}>
          重置
        </button>
        <button className="btn increment" onClick={handleIncrement}>
          增加 (+{step || 0})
        </button>
      </div>
    </div>
  );
}

export default Counter;
