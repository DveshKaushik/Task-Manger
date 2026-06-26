import TaskForm from "./components/TaskForm";
import SearchBar from "./components/SearchBar";
import PriorityFilter from "./components/PriorityFilter";
import SortTasks from "./components/SortTasks";
import TaskList from "./components/TaskList";

function App() {
  return (
    <div className="app">
      <h1>Task Manager</h1>

      <TaskForm />

      <h2>Tasks</h2>

      <SearchBar />
      <PriorityFilter />
      <SortTasks />

      <TaskList />
    </div>
  );
}

export default App;