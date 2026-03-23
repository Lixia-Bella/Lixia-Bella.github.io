import React from 'react';
import './App.css';
import Button from './components/Button';
import Card from './components/Card';

function App() {
  const handleButtonClick = (message) => {
    alert(message);
  };

  // 模拟的卡片数据数组
  const cardData = [
    {
      id: 1,
      title: "什么是 React State？",
      content: "State 是组件内部管理的数据，当 State 发生改变时，React 会自动重新渲染该组件以更新 UI。在函数组件中，我们使用 useState Hook 来管理状态。掌握 State 是学习 React 的关键一步。"
    },
    {
      id: 2,
      title: "什么是 JSX？",
      content: "JSX 是 JavaScript 的语法扩展，允许我们在 JS 中写类似 HTML 的标签。它使得编写 React 组件的 UI 结构变得更加直观和高效。在底层，JSX 会被编译成普通的 JavaScript 函数调用。"
    },
    {
      id: 3,
      title: "什么是 Props？",
      content: "Props（Properties）是组件的只读属性，用于从父组件向子组件传递数据。它是 React 组件之间通信的主要方式。子组件不能修改接收到的 Props，只能读取它们。"
    }
  ];

  return (
    <div className="app">
      <h1>Hello React</h1>
      
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px', marginBottom: '40px' }}>
        <Button 
          text="默认按钮" 
          onClick={() => handleButtonClick('你点击了默认按钮！')} 
        />
        <Button 
          text="主要按钮" 
          type="primary" 
          onClick={() => handleButtonClick('你点击了主要按钮！')} 
        />
        <Button 
          text="危险按钮" 
          type="danger" 
          onClick={() => handleButtonClick('警告：你点击了危险按钮！')} 
        />
      </div>

      <h2>卡片组件展示 (使用 map 循环渲染)</h2>
      <div className="card-list">
        {cardData.map((card) => (
          <Card 
            key={card.id}
            title={card.title} 
            content={card.content}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
