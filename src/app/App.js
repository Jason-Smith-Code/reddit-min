import React, { useState } from "react";
import "./App.css";
import SearchBar from "../components/search/SearchBar";
import SubReddits from "../components/SubReddits/SubReddits";
import PostList from "../components/posts/PostList";
import BackToTop from "../components/backToTop/BackToTop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [menu, setMenu] = useState(true);
  function toggleMenu() {
    setMenu(!menu);
    const subredditMenu = document.getElementById("subreddits-list");
    // if menu is set to true
    if (menu) {
      subredditMenu.style.transform = "translateX(0%)";
    } else {
      subredditMenu.style.transform = "translateX(100%)";
    }
  }
  return (
    <div className="App">
      <div id="header">
        <h1 role="logo" id="logo-text">
          <span id="reddit">Reddit</span>
          <span id="mini">Mini</span>
        </h1>
        <button id="menu" onClick={toggleMenu}>
          <FontAwesomeIcon id="menu-icon" icon={faBars} />
           Menu
        </button>
        <SearchBar />
      </div>
      <div id="main-container">
        <PostList />
        <SubReddits menu={menu} setMenu={setMenu} />
      </div>
      <BackToTop />
    </div>
  );
}

export default App;
