import React from "react";
import "./App.css";
import logo from "./Logo.png";
import SearchBar from "./features/search/SearchBar";
import SubReddits from "./features/SubReddits/SubReddits";
import Posts from "./features/posts/Posts";

function App() {
  return (
    <div className="App">
      <img alt="Logo" src={logo}></img>
      <SearchBar />
      <div id="main-container">
        <Posts />
        <SubReddits />
      </div>
    </div>
  );
}

export default App;
