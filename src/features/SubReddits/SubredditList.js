import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, selectPosts } from "../../app/redditSlice";
import "./SubredditList.css";

const SubredditList = () => {
  const [selectedSubreddit, setSelectedSubreddit] = useState("Home");

  const dispatch = useDispatch();
  const subreddits = useSelector(selectPosts);

  useEffect(() => {
    dispatch(fetchPosts());
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
        {/* Add Search form here */}
        <p>Selected Subreddit: {selectedSubreddit}</p>
        <br />
        {subreddits.map((redditPost) => (
          <li
            onClick={handleClick}
            value={redditPost.display_name}
            className="subreddit-list-row"
            key={redditPost.id}
          >
            <img
              className="subreddit-image"
              src={
                redditPost.icon_img ||
                `https://api.adorable.io/avatars/25/${redditPost.display_name}`
              }
              alt={`${redditPost.display_name}`}
            />
            {redditPost.display_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubredditList;
