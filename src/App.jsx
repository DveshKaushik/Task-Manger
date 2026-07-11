import AuthPage from "./components/AuthPage";
import { useAuth } from "./context/AuthContext";

// Keep your other component imports.

function App() {
  const {
    currentUser,
    authLoading,
    authError,
    logout,
  } = useAuth();

  if (authLoading) {
    return (
      <main style={{ padding: "40px" }}>
        <h2>Checking authentication...</h2>
      </main>
    );
  }

  if (authError && !currentUser) {
    return (
      <main style={{ padding: "40px" }}>
        <h2>Authentication configuration error</h2>
        <p>{authError}</p>
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

        <button type="button" onClick={logout}>
          Logout
        </button>
      </header>

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