import axios from "axios";

const taskApi = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000,
});

export const getTasks = () => {
  return taskApi.get("/tasks");
};

export const createTask = (task) => {
  return taskApi.post("/tasks", task);
};

export const updateTask = (id, updates) => {
  return taskApi.patch(`/tasks/${id}`, updates);
};

export const removeTask = (id) => {
  return taskApi.delete(`/tasks/${id}`);
};

export default taskApi;