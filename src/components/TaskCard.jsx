function TaskCard({ task, onDelete }) {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>

      <p className="task-description">
        {task.description}
      </p>

      <span className={`priority ${task.priority.toLowerCase()}`}>
        {task.priority}
      </span>

      <br />
      <br />

      <button onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </div>
  );
}

export default TaskCard;