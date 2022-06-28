import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, selectPosts, selectPostSearchQuery } from "../../app/redditSlice";

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const search = useSelector(selectPostSearchQuery)
  useEffect(() => {
    dispatch(fetchPosts(search));
  }, [dispatch, search]);

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
