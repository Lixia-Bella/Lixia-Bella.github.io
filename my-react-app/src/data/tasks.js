export const defaultTasks = [
  {
    id: 1,
    title: '组件化首页搭建',
    summary: '完成首页模块拆分，理解组件复用的基本思路。',
    content:
      '将首页拆分为标题区、学习概览区和快捷入口区，练习使用组件来组织页面结构，让页面更清晰、更容易维护。',
    category: '组件基础',
    estimatedTime: '25 分钟',
    difficulty: '入门',
    completed: false,
    steps: [
      '梳理首页需要展示的模块和内容',
      '把重复的展示块抽成可复用组件',
      '使用合适的类名组织页面结构与样式',
    ],
  },
  {
    id: 2,
    title: '任务状态管理',
    summary: '使用 Props 和 State 实现任务完成状态切换。',
    content:
      '在任务列表页和详情页中提供完成状态切换按钮，通过父组件统一管理任务数据，并将状态通过 Props 传递给子组件。',
    category: '状态管理',
    estimatedTime: '30 分钟',
    difficulty: '入门',
    completed: false,
    steps: [
      '在顶层组件中定义任务列表状态',
      '把切换任务状态的方法传递给列表页和详情页',
      '观察状态变化如何驱动界面重新渲染',
    ],
  },
  {
    id: 3,
    title: '路由与详情页联动',
    summary: '配置任务列表页和任务详情页，完成动态路由跳转。',
    content:
      '使用 React Router 配置 `/tasks` 和 `/tasks/:id`，在列表页点击任务后跳转到详情页，并根据 URL 参数找到对应任务数据。',
    category: '路由',
    estimatedTime: '30 分钟',
    difficulty: '中等',
    completed: false,
    steps: [
      '配置首页、列表页、详情页路由',
      '在列表页通过 Link 跳转到详情页',
      '在详情页通过 useParams 读取任务 id',
    ],
  },
  {
    id: 4,
    title: '本地持久化练习',
    summary: '结合 useEffect 和 localStorage 保存任务进度。',
    content:
      '在组件初始化时优先读取 localStorage 中保存的数据，在任务状态变化后自动同步保存，确保刷新页面后学习进度仍然保留。',
    category: '副作用',
    estimatedTime: '35 分钟',
    difficulty: '中等',
    completed: false,
    steps: [
      '在 useState 中使用惰性初始化读取本地缓存',
      '在 useEffect 中监听任务状态变化并写入 localStorage',
      '验证刷新页面后完成状态是否仍然存在',
    ],
  },
];

export const TASK_STORAGE_KEY = 'ai-coding-learning-tasks';
