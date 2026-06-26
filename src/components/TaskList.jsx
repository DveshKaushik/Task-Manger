import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskColumn from "./TaskColumn";
import { DragDropContext } from "@hello-pangea/dnd";

function TaskList() {
  const {
    tasks,
    deleteTask,
    searchTerm,
    selectedPriority,
    sortBy,
    moveTask,
  } = useContext(TaskContext);

  const priorityOrder = {
    High: 3,
    Medium: 2,
    Low: 1,
  };

  const filteredTasks = [...tasks]
    .filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((task) =>
      selectedPriority === "All"
        ? true
        : task.priority === selectedPriority
    )
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }

      if (sortBy === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }

      if (sortBy === "high") {
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }

      if (sortBy === "low") {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }

      return 0;
    });

  const todoTasks = filteredTasks.filter(
    (task) => task.status === "Todo"
  );

  const progressTasks = filteredTasks.filter(
    (task) => task.status === "In Progress"
  );

  const doneTasks = filteredTasks.filter(
    (task) => task.status === "Done"
  );
  const handleDragEnd = (result) => {
    const { destination, draggableId } = result;

    if (!destination) return;

    moveTask(draggableId, destination.droppableId);
  };



  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="kanban-board">
        <TaskColumn
          title="Todo"
          tasks={todoTasks}
          onDelete={deleteTask}
        />

        <TaskColumn
          title="In Progress"
          tasks={progressTasks}
          onDelete={deleteTask}
        />

        <TaskColumn
          title="Done"
          tasks={doneTasks}
          onDelete={deleteTask}
        />
      </div>
    </DragDropContext>
  );
}

export default TaskList;