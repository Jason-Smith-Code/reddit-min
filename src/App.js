import React from "react";
import "./App.css";
import logo from "./Logo.png";
import SearchBar from './features/Search/SearchBar';
import SubReddits from "./features/SubReddits/SubReddits";
import Posts from "./features/posts/Posts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function App() {


  function toggleMenu() {

  }
  return (
    <div className="App">
      <div id="header">
        <img id="logo" alt="Logo" src={logo}></img>
        <button id="menu" onClick={toggleMenu}><FontAwesomeIcon icon={faBars} /></button>
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
