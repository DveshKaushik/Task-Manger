import {
  createContext,
  useState,
  useEffect
} from "react";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks =localStoragae.getitem("Task");
    return savedTasks 
    ? JSON.parse(savedTasks)
    :[];
  })
  
  useEffect(() => {
  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );
}, [tasks]);;

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