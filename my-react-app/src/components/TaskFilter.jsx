const filterOptions = [
  { value: 'all', label: '全部' },
  { value: 'completed', label: '已完成' },
  { value: 'pending', label: '未完成' },
];

function TaskFilter({ activeFilter, onChange }) {
  return (
    <div className="task-filter" aria-label="任务筛选">
      {filterOptions.map((option) => (
        <button
          key={option.value}
          type="button"
          className={
            activeFilter === option.value
              ? 'filter-button filter-button-active'
              : 'filter-button'
          }
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default TaskFilter;
