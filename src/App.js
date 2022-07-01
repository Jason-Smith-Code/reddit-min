import React from "react";
import "./App.css";
import logo from "./Logo.png";
import SearchBar from './features/Search/SearchBar';
import SubReddits from "./features/SubReddits/SubReddits";
import Posts from "./features/posts/Posts";
function App() {
  return (
    <div className="App">
      <div id="header">
        <img id="logo" alt="Logo" src={logo}></img>
        <SearchBar />
      </div>
      <div id="main-container">
        <Posts />
        <SubReddits />
      </div>
    </div>
  );
}

export default App;
