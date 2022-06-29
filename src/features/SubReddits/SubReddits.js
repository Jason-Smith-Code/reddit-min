import SubredditList from "./SubredditList";
import React from "react";

import { selectSubredditSearchQuery } from "../../app/subredditSlice";
const SubReddits = () => {
  // const currentArray = useSelector((state) => state.reddit.redditPosts);
  console.log(
    `current subreddit search query is: ${selectSubredditSearchQuery}`
  );

  return (
    <div>
      <p>search query: {selectSubredditSearchQuery}</p>
      <h2>Subreddits</h2>
      <SubredditList />
    </div>
  );
};

export default SubReddits;
