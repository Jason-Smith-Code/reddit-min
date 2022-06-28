import React from "react";
import PostList from "./PostList";
import "./Posts.css";
const Posts = () => {
  return (
    <div id="posts-container">
      <h2>Posts</h2>
      <PostList />
    </div>
  );
};

export default Posts;
