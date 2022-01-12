import React from 'react';
import './App.css';
import logo from './Logo.png';
import SearchBar from './features/Search/SearchBar';
import PostList from './features/PostList/PostList';

function App() {

  return (
    <div className="App">
      <div className="MainContainer">
        <header className="AppHeader">
          <img alt="Logo" src={logo}></img>
        </header>
        <div className="SearchContainer">
          <SearchBar />
        </div>
        <PostList />
      </div>  
    </div>
  );
}

export default App;
