import { useState } from "react";
import axios from "axios";
import RepoList from "./RepoList";

export default function SearchPage() {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError("");
    setSearched(true);

    try {
      const response = await axios.get(`http://localhost:8080/api/${username}`);
      setRepos(response.data);
      console.log("response is : ", response.data);
    } catch (err) {
      setError(`User "${username}" not found or server error`);
      setRepos([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-12 animate-fade-in">
        <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
          GitHub Repository Finder
        </h1>
        <p className="text-center text-gray-600 text-lg">
          Search for repositories by GitHub username
        </p>
      </div>

      {/* Search Form */}
      <div
        className="max-w-2xl mx-auto mb-12 animate-fade-in"
        style={{ animationDelay: "0.1s" }}
      >
        <form onSubmit={handleSearch} className="flex gap-3">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub Username"
            className="flex-1 px-6 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white shadow-sm hover:shadow-md"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
      </div>

      {/* Summary Card */}
      {searched && repos.length > 0 && (
        <div
          className="max-w-2xl mx-auto mb-12 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl p-8 shadow-lg">
            <div className="grid grid-cols-2 gap-8">
              <div className="transform transition-transform duration-300 hover:scale-105">
                <p className="text-blue-100 text-sm font-medium mb-2">
                  Total Repositories
                </p>
                <p className="text-4xl font-bold">{repos.length}</p>
              </div>
              <div className="transform transition-transform duration-300 hover:scale-105">
                <p className="text-blue-100 text-sm font-medium mb-2">
                  Total Commits
                </p>
                <p className="text-4xl font-bold">
                  {Math.floor(Math.random() * 5000) + 1000}
                  {/*total overall commits will come over here .  */}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <div className="inline-block">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600 mt-4 font-medium">
            Loading repositories...
          </p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="max-w-2xl mx-auto mb-8 animate-fade-in">
          <div className="bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-xl">
            <p className="font-semibold">Error</p>
            <p>{error}</p>
          </div>
        </div>
      )}

      {/* Repo List */}
      {searched && repos.length > 0 && !loading && (
        <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <RepoList repos={repos} username={username} />
        </div>
      )}

      {/* Empty State */}
      {searched && repos.length === 0 && !loading && !error && (
        <div className="max-w-2xl mx-auto text-center animate-fade-in">
          <p className="text-gray-500 text-lg">No repositories found</p>
        </div>
      )}
    </div>
  );
}
