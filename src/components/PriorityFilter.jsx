import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

function PriorityFilter() {
  const {
    selectedPriority,
    setSelectedPriority,
  } = useContext(TaskContext);

  return (
    <select
      value={selectedPriority}
      onChange={(e) =>
        setSelectedPriority(e.target.value)
      }
    >
      <option value="All">All</option>
      <option value="High">High</option>
      <option value="Medium">Medium</option>
      <option value="Low">Low</option>
    </select>
  );
}

export default PriorityFilter;