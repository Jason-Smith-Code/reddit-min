import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectPostSearchQuery,
  setPostSearchTerm,
} from "../../app/redditSlice";
import {
  setsubRedditSearchTerm,
  selectSelectedSubreddit,
} from "../../app/subredditSlice";

const SearchBar = () => {
  // store local search term ini useState
  const [localSearchTerm, setLocalSearchTerm] = useState("");
  const dispatch = useDispatch();
  const subRedditSelected = useSelector(selectSelectedSubreddit);
  const selectPostTerm = useSelector(selectPostSearchQuery);

  function handleSubmit(e) {
    e.preventDefault();
    // change search term for posts
    dispatch(setPostSearchTerm(localSearchTerm));
    // change search term for subreddits
    dispatch(setsubRedditSearchTerm(localSearchTerm));
    // reset input to empty string
    setLocalSearchTerm("");
  }

  return (
    <div>
      {/* Show subreddit */}
      <p>{subRedditSelected}</p>
      <form
        id="search"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <p>Current Search Term: {selectPostTerm}</p>

        <input
          onChange={(e) => setLocalSearchTerm(e.target.value)}
          value={localSearchTerm}
          type="search"
          id="query"
          name="q"
          placeholder="Search..."
        ></input>
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
