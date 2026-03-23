import { useEffect, useMemo, useState } from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useParams,
} from 'react-router-dom';
import Home from './pages/Home';
import List from './pages/List';
import Detail from './pages/Detail';
import NotFound from './pages/NotFound';
import Layout from './components/Layout';
import { defaultTasks, TASK_STORAGE_KEY } from './data/tasks';
import './App.css';

function LegacyDetailRedirect() {
  const { id } = useParams();

  return <Navigate to={`/tasks/${id}`} replace />;
}

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem(TASK_STORAGE_KEY);

    if (!savedTasks) {
      return defaultTasks;
    }

    try {
      const parsedTasks = JSON.parse(savedTasks);

      return parsedTasks.map((task) => ({
        ...task,
        completed: Boolean(task.completed),
      }));
    } catch (error) {
      console.error('读取本地任务数据失败，已回退到默认任务。', error);
      return defaultTasks;
    }
  });

  useEffect(() => {
    localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const completedTasks = useMemo(
    () => tasks.filter((task) => task.completed).length,
    [tasks]
  );

  const toggleTaskCompletion = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route
            element={
              <Layout totalTasks={tasks.length} completedTasks={completedTasks} />
            }
          >
            <Route
              path="/"
              element={
                <Home tasks={tasks} completedTasks={completedTasks} />
              }
            />
            <Route
              path="/tasks"
              element={
                <List
                  tasks={tasks}
                  completedTasks={completedTasks}
                  onToggleTask={toggleTaskCompletion}
                />
              }
            />
            <Route
              path="/tasks/:id"
              element={
                <Detail tasks={tasks} onToggleTask={toggleTaskCompletion} />
              }
            />
            <Route path="/list" element={<Navigate to="/tasks" replace />} />
            <Route path="/detail/:id" element={<LegacyDetailRedirect />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
