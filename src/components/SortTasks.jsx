import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

function SortTasks() {
  const { sortBy, setSortBy } = useContext(TaskContext);

  return (
    <select
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
      className="filter-select"
    >
      <option value="newest">Newest First</option>
      <option value="oldest">Oldest First</option>
      <option value="high">High Priority First</option>
      <option value="low">Low Priority First</option>
    </select>
  );
}

export default SortTasks;