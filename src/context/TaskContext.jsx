import {
  createContext,
  useEffect,
  useState,
} from "react";

import {
  getTasks,
  createTask,
  updateTask,
  removeTask,
} from "../services/taskApi";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriority, setSelectedPriority] =
    useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // GET /tasks
  useEffect(() => {
    const loadTasks = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await getTasks();

        setTasks(response.data);
      } catch (requestError) {
        console.error(requestError);
        setError(
          "Could not load tasks. Make sure JSON Server is running."
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, []);

  // POST /tasks
  const addTask = async (task) => {
    try {
      setError("");

      // Let JSON Server generate the ID.
      const { id, ...taskWithoutId } = task;

      const response = await createTask(taskWithoutId);

      setTasks((previousTasks) => [
        ...previousTasks,
        response.data,
      ]);
    } catch (requestError) {
      console.error(requestError);
      setError("Could not add the task.");
    }
  };

  // DELETE /tasks/:id
  const deleteTask = async (id) => {
    try {
      setError("");

      await removeTask(id);

      setTasks((previousTasks) =>
        previousTasks.filter((task) => task.id !== id)
      );
    } catch (requestError) {
      console.error(requestError);
      setError("Could not delete the task.");
    }
  };

  // PATCH /tasks/:id
  const editTask = async (updatedTask) => {
    try {
      setError("");

      const response = await updateTask(
        updatedTask.id,
        updatedTask
      );

      setTasks((previousTasks) =>
        previousTasks.map((task) =>
          task.id === updatedTask.id
            ? response.data
            : task
        )
      );
    } catch (requestError) {
      console.error(requestError);
      setError("Could not update the task.");
    }
  };

  // PATCH only the status when dragging.
  const moveTask = async (taskId, newStatus) => {
    try {
      setError("");

      const response = await updateTask(taskId, {
        status: newStatus,
      });

      setTasks((previousTasks) =>
        previousTasks.map((task) =>
          String(task.id) === String(taskId)
            ? response.data
            : task
        )
      );
    } catch (requestError) {
      console.error(requestError);
      setError("Could not move the task.");
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        editTask,
        moveTask,

        searchTerm,
        setSearchTerm,

        selectedPriority,
        setSelectedPriority,

        sortBy,
        setSortBy,

        isLoading,
        error,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}