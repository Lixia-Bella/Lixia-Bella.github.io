import { useMemo, useState } from 'react';
import TaskCard from '../components/TaskCard';
import TaskFilter from '../components/TaskFilter';

function List({ tasks, completedTasks, onToggleTask }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredTasks = useMemo(() => {
    if (activeFilter === 'completed') {
      return tasks.filter((task) => task.completed);
    }

    if (activeFilter === 'pending') {
      return tasks.filter((task) => !task.completed);
    }

    return tasks;
  }, [activeFilter, tasks]);

  return (
    <section className="page-content">
      <div className="section-header">
        <div>
          <p className="section-eyebrow">任务列表页</p>
          <h2 className="page-title">第一周综合任务清单</h2>
          <p className="page-description">
            在这里查看全部任务，按状态筛选，并直接切换任务完成情况。
          </p>
        </div>

        <div className="summary-card">
          <span>已完成</span>
          <strong>
            {completedTasks} / {tasks.length}
          </strong>
        </div>
      </div>

      <TaskFilter activeFilter={activeFilter} onChange={setActiveFilter} />

      {filteredTasks.length > 0 ? (
        <div className="task-list">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleTask={onToggleTask}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>当前筛选条件下没有任务</h3>
          <p>你可以切换筛选条件，或先去完成一个任务再回来查看。</p>
        </div>
      )}
    </section>
  );
}

export default List;
