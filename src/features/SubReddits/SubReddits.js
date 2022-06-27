import SubredditList from "./SubredditList";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPosts, getPostsSuccess } from "../../app/redditSlice";

const SubReddits = () => {
  const dispatch = useDispatch();
  const subreddits = useSelector(selectPosts);
  // const currentArray = useSelector((state) => state.reddit.redditPosts);
  const apiUrl = `https://www.reddit.com/subreddits.json`;

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => {
        // Check if response is okay (reponse.ok == true)
        if (response.ok) {
          console.log(response);
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((data) => {
        console.log(data);
        getPostsSuccess(data);
      })
      .catch((error) => {});
  }, [dispatch]);

  return (
    <div>
      <h2>Subreddits</h2>
      <SubredditList />
    </div>
  );
};

export default SubReddits;
