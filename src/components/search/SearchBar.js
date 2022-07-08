import React, { useState } from "react";
import "./SearchBar.css";
import { useSelector, useDispatch } from "react-redux";
import { setPostSearchTerm } from "../../redux/redditSlice";
import {
  setSelectedSubreddit,
  setsubRedditSearchTerm,
  selectSelectedSubreddit,
} from "../../redux/subredditSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {
  // store local search term ini useState
  const [localSearchTerm, setLocalSearchTerm] = useState("");
  const dispatch = useDispatch();
  const subRedditSelected = useSelector(selectSelectedSubreddit);

  function handleSubmit(e) {
    e.preventDefault();
    // change search term for posts
    dispatch(setPostSearchTerm(localSearchTerm));
    // change search term for subreddits
    dispatch(setsubRedditSearchTerm(localSearchTerm));
    // reset input to empty string
    setLocalSearchTerm("");
  }

  function removeSubreddit() {
    dispatch(setSelectedSubreddit(""));
  }

  return (
    <div id="search-container">
      {/* Show subreddit */}
      {subRedditSelected ? (
        <div id="search-prefix-container">
          <button id="remove-subreddit-button" onClick={removeSubreddit}>
            X
          </button>
          <p>{subRedditSelected}</p>
        </div>
      ) : (
        ""
      )}
      <form
        id="search"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          onChange={(e) => setLocalSearchTerm(e.target.value)}
          value={localSearchTerm}
          type="search"
          id="search-query"
          name="q"
          placeholder={"Searching " + subRedditSelected}
        ></input>
        {localSearchTerm === "" ? (
          ""
        ) : (
          <button data-testid="search-submit" id="search-submit" type="submit">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
