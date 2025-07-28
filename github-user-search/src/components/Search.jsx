import { useState } from "react";
import { fetchAdvancedUsers } from "../services/githubService";

function Search() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [results, setResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await fetchAdvancedUsers(username, location, minRepos);
    setResults(data.items);
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          className="border p-2 w-full"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="border p-2 w-full"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          className="border p-2 w-full"
          placeholder="Min Repos"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Search
        </button>
      </form>

      <div className="mt-4">
        {results &&
          results.length > 0 &&
          results.map((user) => (
            <div
              key={user.id}
              className="border p-2 flex items-center space-x-4"
            >
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-12 h-12 rounded-full"
              />
              <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                {user.login}
              </a>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Search;
