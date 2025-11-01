import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router";
import Landing from "./pages/Landing";
import SearchPage from "./pages/SearchPage";
import RepoList from "./pages/RepoList";
import RepoDetails from "./pages/RepoDetails";

function App() {
  return (
    <>
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<Landing />} />
        {/* Home/Search page */}
        <Route path="/search" element={<SearchPage />} />

        {/* List of repos for a user */}
        <Route path="/repos/:username" element={<RepoList />} />

        {/* Details of a specific repo */}
        <Route path="/repos/:username/:repoName" element={<RepoDetails />} />
      </Routes>
    </>
  );
}

export default App;
