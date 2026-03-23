function TaskStatusBadge({ completed }) {
  return (
    <span
      className={
        completed
          ? 'task-status-badge task-status-badge-done'
          : 'task-status-badge task-status-badge-pending'
      }
    >
      {completed ? '已完成' : '未完成'}
    </span>
  );
}

export default TaskStatusBadge;
