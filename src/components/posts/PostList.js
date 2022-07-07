import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  postLoading,
  fetchPosts,
  selectPosts,
  selectPostSearchQuery,
} from "../../redux/redditSlice";
import { selectSelectedSubreddit } from "../../redux/subredditSlice";
import "./Posts.css";
import Post from "./Post";

const PostList = () => {
  const dispatch = useDispatch();
  const prefix = useSelector(selectSelectedSubreddit);
  const posts = useSelector(selectPosts);
  const search = useSelector(selectPostSearchQuery);
  const loading = useSelector(postLoading);
  // I need to detect when comments are loading and display some text to the viewer

  useEffect(() => {
    dispatch(fetchPosts(prefix, search));
  }, [search, prefix, dispatch]);

  return (
    <div id="posts-container">
      <h2 className="heading">Posts</h2>
      {loading ? (
        <p className="loading-notification-text">Loading posts</p>
      ) : posts.length < 1 ? (
        <p className="notification-text">
          Sorry, it looks like there were no results found for that search.
          Please try again
        </p>
      ) : (
        ""
      )}

      {posts.map((redditPost, index) => (
        <Post index={index} redditPost={redditPost} key={redditPost.id}/>
      ))}
    </div>
  );
};

export default PostList;
