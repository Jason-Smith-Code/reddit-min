import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDefaultSubreddits,
  selectSubreddits,
  selectSubredditSearchQuery,
  fetchSubreddits,
  setSelectedSubreddit,
} from "../../app/subredditSlice";
import "./SubredditList.css";

const SubredditList = ({ menu, setMenu }) => {
  const [selectedLocalSubreddit, setSelectedLocalSubreddit] = useState("");

  const dispatch = useDispatch();
  const subreddits = useSelector(selectSubreddits);
  // console.log(subreddits);
  const search = useSelector(selectSubredditSearchQuery);

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
  // Change the list when user performs a search
  useEffect(() => {
    dispatch(fetchSubreddits(search));
  }, [search, dispatch]);

  // show default search
  useEffect(() => {
    dispatch(fetchDefaultSubreddits());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSelectedSubreddit(selectedLocalSubreddit));
  }, [selectedLocalSubreddit, dispatch]);

  // handle click of subreddit
  function handleClick(e) {
    e.preventDefault();
    let width = window.innerWidth;
    if (width <= 999) {
      toggleMenu();
    }
    const value = e.target.getAttribute("value");
    // console.log(value);
    setSelectedLocalSubreddit(value);
  }

  return (
    <ul>
      {subreddits.length < 1 ? (
        <p className="notification-text-white">
          Sorry, it looks like there were no results found for that search.
          Please try again
        </p>
      ) : (
        ""
      )}
      {subreddits.map((subreddit) => (
        <li
          onClick={handleClick}
          value={subreddit.display_name_prefixed}
          className="subreddit-list-row"
          key={subreddit.id}
        >
          <img
            className="subreddit-image"
            value={subreddit.display_name_prefixed}
            src={
              subreddit.icon_img ||
              `https://api.adorable.io/avatars/25/${subreddit.display_name}`
            }
            alt={`${subreddit.display_name}`}
          />
          <p value={subreddit.display_name_prefixed}>
            {subreddit.display_name}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default SubredditList;
