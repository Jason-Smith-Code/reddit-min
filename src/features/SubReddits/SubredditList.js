import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDefaultSubreddits,
  selectSubreddits,
  selectSubredditSearchQuery,
  fetchSubreddits,
} from "../../app/subredditSlice";
import "./SubredditList.css";

const SubredditList = () => {
  const [selectedSubreddit, setSelectedSubreddit] = useState("Home");

  const dispatch = useDispatch();
  const subreddits = useSelector(selectSubreddits);
  const search = useSelector(selectSubredditSearchQuery);

  // Change the list when user performs a search
  useEffect(() => {
    dispatch(fetchSubreddits(search));
  }, [search]);

  // show default search
  useEffect(() => {
    dispatch(fetchDefaultSubreddits());
  }, [dispatch]);

  // when selectedSubreddit changes need to take action

  // handle click of subreddit
  function handleClick(e) {
    e.preventDefault();
    const value = e.target.getAttribute("value");
    console.log(value);
    setSelectedSubreddit(value);
  }

  // perform a search for subreddits
  // https://www.reddit.com/search/?q=NAMEOFSUBREDDIT&type=sr

  return (
    <div>
      <ul id="subreddits-list">
        {subreddits.map((subreddit) => (
          <li
            onClick={handleClick}
            value={subreddit.display_name}
            className="subreddit-list-row"
            key={subreddit.id}
          >
            <img
              className="subreddit-image"
              src={
                subreddit.icon_img ||
                `https://api.adorable.io/avatars/25/${subreddit.display_name}`
              }
              alt={`${subreddit.display_name}`}
            />
            {subreddit.display_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubredditList;
