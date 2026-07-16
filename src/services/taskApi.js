import axios from "axios";

const taskApi = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:3000",
  timeout: 5000,
});

export const getTasks = () => taskApi.get("/tasks");

export const createTask = (task) =>
  taskApi.post("/tasks", task);

export const updateTask = (id, updates) =>
  taskApi.patch(`/tasks/${id}`, updates);

export const removeTask = (id) =>
  taskApi.delete(`/tasks/${id}`);

export default taskApi;