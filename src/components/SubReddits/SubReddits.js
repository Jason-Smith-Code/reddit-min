import SubredditList from "./SubredditList";
import React from "react";

const SubReddits = ({ menu, setMenu }) => {
  // const currentArray = useSelector((state) => state.reddit.redditPosts);
  return (
    <div data-testid="subreddits-list" id="subreddits-list">
      <h2>Subreddits</h2>
      <SubredditList menu={menu} setMenu={setMenu} />
    </div>
  );
};

export default SubReddits;
