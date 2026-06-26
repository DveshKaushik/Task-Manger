import { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";

function EditTaskForm({ task, onClose }) {
    const { editTask } = useContext(TaskContext);

    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [priority, setPriority] = useState(task.priority);
    const [status, setStatus] = useState(task.status || "Todo");

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!title.trim()) {
            alert("Title is required");
            return;
        }

        const updatedTask = {
            ...task,
            title: title.trim(),
            description: description.trim(),
            priority,
            status,
        };

        editTask(updatedTask);
        onClose();
    };

    return (
        <div className="edit-overlay">
            <form className="edit-form" onSubmit={handleSubmit}>
                <h2>Edit Task</h2>

                <input
                    type="text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Task title"
                />

                <textarea
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="Task description"
                />

                <select
                    value={priority}
                    onChange={(event) => setPriority(event.target.value)}
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>

                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="Todo">Todo</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </select>

                <div className="edit-actions">
                    <button type="submit">Update Task</button>

                    <button type="button" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditTaskForm;