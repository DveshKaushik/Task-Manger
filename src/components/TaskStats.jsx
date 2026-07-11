import { useContext, useMemo } from "react";
import { TaskContext } from "../context/TaskContext";

function TaskStats() {
  const { tasks } = useContext(TaskContext);

  const stats = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const overdue = tasks.filter((task) => {
      if (!task.dueDate || task.status === "Done") {
        return false;
      }

      const dueDate = new Date(`${task.dueDate}T00:00:00`);

      return dueDate < today;
    }).length;

    return {
      total: tasks.length,

      todo: tasks.filter(
        (task) => task.status === "Todo"
      ).length,

      inProgress: tasks.filter(
        (task) => task.status === "In Progress"
      ).length,

      completed: tasks.filter(
        (task) => task.status === "Done"
      ).length,

      overdue,
    };
  }, [tasks]);

  const completionPercentage =
    stats.total === 0
      ? 0
      : Math.round(
          (stats.completed / stats.total) * 100
        );

  return (
    <section className="task-stats">
      <div className="stat-card">
        <span>Total Tasks</span>
        <strong>{stats.total}</strong>
      </div>

      <div className="stat-card">
        <span>Todo</span>
        <strong>{stats.todo}</strong>
      </div>

      <div className="stat-card">
        <span>In Progress</span>
        <strong>{stats.inProgress}</strong>
      </div>

      <div className="stat-card">
        <span>Completed</span>
        <strong>{stats.completed}</strong>
      </div>

      <div className="stat-card">
        <span>Overdue</span>
        <strong>{stats.overdue}</strong>
      </div>

      <div className="completion-card">
        <div className="completion-header">
          <span>Completion Progress</span>
          <strong>{completionPercentage}%</strong>
        </div>

        <div className="progress-track">
          <div
            className="progress-value"
            style={{
              width: `${completionPercentage}%`,
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default TaskStats;