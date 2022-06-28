import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPosts,
  selectPosts,
  selectPostSearchQuery,
} from "../../app/redditSlice";

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const search = useSelector(selectPostSearchQuery);
  useEffect(() => {
    dispatch(fetchPosts(search));
  }, [search]);

  // not all image urls are images, so i need to check before rending them
  function checkIfImage(string) {
    return /\.(gif|jpg|jpeg|tiff|png)$/i.test(string);
  }

  // create a function to work out the time from when a post was create to now
  // this should be shown in days if it is older than 24 hours
  const today = (epoch) => {
    let seconds = Math.floor(Date.now() / 1000);
    let timeAgoInSeconds = seconds - epoch;
    let timeAgoInMinutes = timeAgoInSeconds / 60;
    let timeAgoInHours = timeAgoInMinutes / 60;
    let timeAgoInDays = timeAgoInHours / 24;
    if (timeAgoInHours > 24) {
      return "posted " + Math.ceil(timeAgoInDays) + " Days ago";
    } else {
      return "posted " + Math.ceil(timeAgoInHours) + " Hours ago";
    }
  };

  return (
    <div>
      <ul>
        {posts.map((redditPost) => (
          <li className="post-container" key={redditPost.id}>
            {/* Subreddit */}
            <p>{redditPost.subreddit_name_prefixed}</p>
            {/* Show image if image exists */}
            {checkIfImage(redditPost.url) ? (
              <img className="post-image" src={redditPost.url}></img>
            ) : (
              ""
            )}
            {/* Post title */}
            <p>{redditPost.title}</p>
            {/* Upvotes */}
            <p>{redditPost.ups}</p>
            {/* Comments */}
            {/* Use the "Comments" word as a trigger to expand to view all comments */}
            <p>Number of Comments: {redditPost.num_comments}</p>
            {/* Author + Hours / Days posted ago */}
            <p>
              {redditPost.author} {today(redditPost.created_utc)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
