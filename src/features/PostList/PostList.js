import Post from "./Post";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, selectPosts } from '../../app/redditSlice'

const PostList = () => {
    const dispatch = useDispatch();
    const subreddits = useSelector(selectPosts);
  
    useEffect(() => {
      dispatch(fetchPosts());
    }, [dispatch]);

    return (
        <Post className="subreddit-card">
          <h2>Subreddits</h2>
          <ul className="subreddits-list">
            {subreddits.map((redditPost) => (
              <li
                key={redditPost.id}
              >
                <button
                  type="button"
                >
                  <img
                    src={
                        redditPost.icon_img ||
                      `https://api.adorable.io/avatars/25/${redditPost.display_name}`
                    }
                    alt={`${redditPost.display_name}`}
                    className="subreddit-icon"
                    style={{ border: `3px solid ${redditPost.primary_color}` }}
                  />
                  {redditPost.display_name}
                </button>
              </li>

            ))}
          </ul>
        </Post>
      );
}

export default PostList;

