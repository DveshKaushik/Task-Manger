import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

function TaskColumn({ title, tasks, onDelete }) {
  return (
    <Droppable droppableId={title}>
      {(provided) => (
        <div
          className="task-column"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <h2>{title}</h2>

          {tasks.map((task, index) => (
            <TaskCard
              key={task.id}
              task={task}
              index={index}
              onDelete={onDelete}
            />
          ))}

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default TaskColumn;