import { Link } from 'react-router-dom';
import TaskStatusBadge from './TaskStatusBadge';

function TaskCard({ task, onToggleTask }) {
  return (
    <article className="task-card">
      <div className="task-card-header">
        <div>
          <p className="task-card-category">{task.category}</p>
          <h3 className="task-card-title">{task.title}</h3>
        </div>
        <TaskStatusBadge completed={task.completed} />
      </div>

      <p className="task-card-summary">{task.summary}</p>

      <div className="task-card-meta">
        <span>预计用时：{task.estimatedTime}</span>
        <span>难度：{task.difficulty}</span>
      </div>

      <div className="task-card-actions">
        <Link className="ghost-button" to={`/tasks/${task.id}`}>
          查看详情
        </Link>
        <button
          type="button"
          className={task.completed ? 'primary-button muted' : 'primary-button'}
          onClick={() => onToggleTask(task.id)}
        >
          {task.completed ? '取消完成' : '标记完成'}
        </button>
      </div>
    </article>
  );
}

export default TaskCard;
