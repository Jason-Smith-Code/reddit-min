import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, selectPosts } from "../../app/redditSlice";

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div>
      <ul>
        {posts.map((redditPost) => (
          <li key={redditPost.id}>
            <p>{redditPost.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
