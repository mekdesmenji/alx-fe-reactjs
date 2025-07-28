import { useState } from "react";
import "./App.css";
import Search from "./components/Search";

function App() {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", search);
  };

  return (
    <div className="app-container">
      <h1>GitHub User Search</h1>
      <Search />
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="results">
        <p>No results yet.</p>
      </div>
    </div>
  );
}

export default App;
