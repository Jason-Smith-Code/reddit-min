import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPosts,
  selectPosts,
  fetchComments,
  selectPostSearchQuery,
  toggleShowingComments,
  selectPostComments,
} from "../../app/redditSlice";
import { selectSelectedSubreddit } from "../../app/subredditSlice";

const PostList = () => {
  const dispatch = useDispatch();
  const prefix = useSelector(selectSelectedSubreddit);
  const posts = useSelector(selectPosts);
  const search = useSelector(selectPostSearchQuery);
  const viewComments = useSelector(selectPostComments);

  useEffect(() => {
    dispatch(fetchPosts(prefix, search));
  }, [search, prefix]);

  useEffect(() => {
    console.log("comments have changed");
  }, [viewComments, dispatch]);

  // not all image urls are images, so i need to check before rending them
  function checkIfImage(string) {
    return /\.(gif|jpg|jpeg|tiff|png|mp4)$/i.test(string);
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

  const getComments = (index, permalink) => {
    dispatch(fetchComments(index, permalink));
    // once comments are successfully loaded toggle display
    // toggle comments passing in index to toggle the correct post
    //  dispatch(toggleShowingComments(index));
  };

  const mapComments = (redditPost) => {
    redditPost.comments.map((comment) => {
      console.log(comment.body);
      return <p>{comment.body}</p>;
    });
  };

  return (
    <div>
      <ul>
        {posts.map((redditPost, index) => (
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
            <button onClick={() => getComments(index, redditPost.permalink)}>
              Display comments
            </button>
            {/* Use the "Comments" word as a trigger to expand to view all comments */}
            <p>Number of Comments: {redditPost.num_comments}</p>
            {/* Author + Hours / Days posted ago */}
            <p>
              {redditPost.author} {today(redditPost.created_utc)}
            </p>
            {redditPost.showingComments
              ? // Map through all comments
                redditPost.comments.map((comment) => {
                  return (
                    <div className="comment-container" key={comment.id}>
                      <p>{comment.author}</p>
                      <p>{comment.body}</p>
                    </div>
                  );
                })
              : // <p>{redditPost.comments[index].body}</p>
                "no comments"}
          </li>
        ))}
      </ul>
      <ul></ul>
    </div>
  );
};

export default PostList;
