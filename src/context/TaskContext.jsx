import { createContext, useEffect, useState } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedPriority, setSelectedPriority] = useState("All");
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");

    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks((previousTasks) => [...previousTasks, task]);
  };

  const deleteTask = (id) => {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id)
    );
  };


  const moveTask = (taskId, newStatus) => {
  setTasks((previousTasks) =>
    previousTasks.map((task) =>
      task.id.toString() === taskId.toString()
        ? { ...task, status: newStatus }
        : task
    )
  );
};


  const editTask = (updatedTask) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        editTask,
        searchTerm,
        setSearchTerm,
        selectedPriority,
        setSelectedPriority,
        sortBy,
        setSortBy,
        moveTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};