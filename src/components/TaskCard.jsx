import { useState } from "react";
import EditTaskForm from "./EditTaskForm";
import { Draggable } from "@hello-pangea/dnd";

function TaskCard({ task, index, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <Draggable draggableId={task.id.toString()} index={index}>
        {(provided) => (
          <div
            className="task-card"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <h3>{task.title}</h3>

            <p className="task-description">
              {task.description || "No description"}
            </p>

            <span className={`priority ${task.priority.toLowerCase()}`}>
              {task.priority}
            </span>

            <p className="task-status">
              Status: <strong>{task.status}</strong>
            </p>

            <div className="task-actions">
              <button
                type="button"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() => onDelete(task.id)}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </Draggable>

      {isEditing && (
        <EditTaskForm
          task={task}
          onClose={() => setIsEditing(false)}
        />
      )}
    </>
  );
}

export default TaskCard;