import { useParams, useNavigate } from 'react-router-dom';
import TaskStatusBadge from '../components/TaskStatusBadge';

function Detail({ tasks, onToggleTask }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const taskId = Number(id);
  const task = tasks.find((currentTask) => currentTask.id === taskId);

  const handleBack = () => {
    navigate('/tasks');
  };

  if (!task) {
    return (
      <section className="page-content">
        <div className="empty-state">
          <h2>任务不存在</h2>
          <p>没有找到对应的任务信息，请返回任务列表重新选择。</p>
          <button type="button" className="primary-button" onClick={handleBack}>
            返回任务列表
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="page-content">
      <article className="detail-card">
        <div className="detail-header">
          <div>
            <p className="section-eyebrow">任务详情页</p>
            <h2 className="page-title">{task.title}</h2>
          </div>
          <TaskStatusBadge completed={task.completed} />
        </div>

        <p className="page-description">{task.content}</p>

        <div className="detail-meta">
          <span>任务 ID：{task.id}</span>
          <span>所属主题：{task.category}</span>
          <span>预计用时：{task.estimatedTime}</span>
          <span>难度：{task.difficulty}</span>
        </div>

        <section className="content-section">
          <div className="section-header">
            <div>
              <p className="section-eyebrow">建议步骤</p>
              <h3>跟着下面的顺序完成这个任务</h3>
            </div>
          </div>

          <ol className="detail-step-list">
            {task.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <div className="task-card-actions">
          <button type="button" className="ghost-button" onClick={handleBack}>
            返回任务列表
          </button>
          <button
            type="button"
            className={task.completed ? 'primary-button muted' : 'primary-button'}
            onClick={() => onToggleTask(task.id)}
          >
            {task.completed ? '取消完成' : '标记完成'}
          </button>
        </div>
      </article>
    </section>
  );
}

export default Detail;
