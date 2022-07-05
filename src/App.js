import React, { useState } from "react";
import "./App.css";
import SearchBar from "./features/search/SearchBar";
import SubReddits from "./features/SubReddits/SubReddits";
import Posts from "./features/posts/Posts";
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
        <p id="logo-text">
          <span id="reddit">Reddit</span>
          <span id="mini">Mini</span>
        </p>
        <button id="menu" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <SearchBar />
      </div>
      <div id="main-container">
        <Posts />
        <SubReddits menu={menu} setMenu={setMenu} />
      </div>
    </div>
  );
}

export default App;
