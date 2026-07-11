import { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import { useAuth } from "../context/AuthContext";

function TaskForm() {
  const { addTask } = useContext(TaskContext);
  const { currentUser } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Add Task clicked");

    if (!title.trim()) {
      alert("Task title is required");
      return;
    }

    if (!currentUser) {
      alert("Please log in first");
      return;
    }

    const newTask = {
      title: title.trim(),
      description: description.trim(),
      priority,
      status: "Todo",
      dueDate,
      createdAt: new Date().toISOString(),
      userId: currentUser.uid,
    };

    try {
      setSubmitting(true);

      await addTask(newTask);

      setTitle("");
      setDescription("");
      setPriority("Medium");
      setDueDate("");
    } catch (error) {
      console.error("Could not add task:", error);
      alert("Could not add task. Check the console and JSON Server.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Task</h2>

      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <textarea
        placeholder="Task description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />

      <select
        value={priority}
        onChange={(event) => setPriority(event.target.value)}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <input
        type="date"
        value={dueDate}
        onChange={(event) => setDueDate(event.target.value)}
      />

      <button type="submit" disabled={submitting}>
        {submitting ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
}

export default TaskForm;