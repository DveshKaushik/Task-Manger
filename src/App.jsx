import AuthPage from "./components/AuthPage";
import { useAuth } from "./context/AuthContext";

import TaskStats from "./components/TaskStats";
import TaskForm from "./components/TaskForm";
import SearchBar from "./components/SearchBar";
import PriorityFilter from "./components/PriorityFilter";
import SortTasks from "./components/SortTasks";
import TaskList from "./components/TaskList";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  const {
    currentUser,
    authLoading,
    authError,
    logout,
  } = useAuth();

  if (authLoading) {
    return (
      <main className="auth-status">
        <h2>Checking authentication...</h2>
      </main>
    );
  }

  if (!currentUser) {
    return <AuthPage />;
  }

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1>Task Manager</h1>
          <p>{currentUser.email}</p>
        </div>

        <div className="header-actions">
          <ThemeToggle />

          <button type="button" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      {authError && (
        <p className="error-message">{authError}</p>
      )}

      <TaskStats />
      <TaskForm />

      <h2>Tasks</h2>

      <div className="task-controls">
        <SearchBar />
        <PriorityFilter />
        <SortTasks />
      </div>

      <TaskList />
    </div>
  );
}

export default App;