import React from "react";

const SearchBar = () => {
  // we need to know f a sub reddit is selected, if it is, factor it into the search
  return (
    <form id="search">
      <input type="search" id="query" name="q" placeholder="Search..."></input>
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
