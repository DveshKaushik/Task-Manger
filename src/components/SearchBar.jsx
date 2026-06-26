import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

function SearchBar() {
  const { searchTerm, setSearchTerm } =
    useContext(TaskContext);

  return (
    <input
      type="text"
      placeholder="Search tasks..."
      value={searchTerm}
      onChange={(e) =>
        setSearchTerm(e.target.value)
      }
    />
  );
}

export default SearchBar;