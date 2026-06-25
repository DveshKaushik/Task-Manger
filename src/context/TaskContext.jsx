import { createContext, useState } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};