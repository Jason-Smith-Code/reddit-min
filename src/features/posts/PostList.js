import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPosts,
  selectPosts,
  fetchComments,
  selectPostSearchQuery,
  toggleShowingComments,
} from "../../app/redditSlice";
import { selectSelectedSubreddit } from "../../app/subredditSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { faReddit } from "@fortawesome/fontawesome-free-brands";

const PostList = () => {
  const dispatch = useDispatch();
  const prefix = useSelector(selectSelectedSubreddit);
  const posts = useSelector(selectPosts);
  const search = useSelector(selectPostSearchQuery);

  // I need to detect when comments are loading and display some text to the viewer

  useEffect(() => {
    dispatch(fetchPosts(prefix, search));
  }, [search, prefix, dispatch]);

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
      return Math.ceil(timeAgoInDays) + " Days ago";
    } else {
      return Math.ceil(timeAgoInHours) + " Hours ago";
    }
  };

  const getComments = (index, permalink) => {
    dispatch(fetchComments(index, permalink));
  };

  const toggleCommentDisplay = (index) => {
    dispatch(toggleShowingComments(index));
  };

  return (
    <div>
      {posts.length < 1 ? (
        <p className="notification-text">
          Sorry, it looks like there were no results found for that search. Please try again
        </p>
      ) : (
        ""
      )}
      {posts.map((redditPost, index) => (
        <article className="post-container" key={redditPost.id}>
          {/* Subreddit */}
          <p className="margin-bottom bold">
            <FontAwesomeIcon className="button-icon" icon={faReddit} />
            {redditPost.subreddit_name_prefixed}
          </p>
          {/* Show video > image if image exists else show nothing */}
          {checkIfImage(redditPost.url) ? (
            <img
              alt={redditPost.title}
              className="post-image margin-bottom"
              src={redditPost.url}
            ></img>
          ) : (
            ""
          )}
          {/* Post title */}
          <p className="margin-bottom">{redditPost.title}</p>
          {/* Upvotes */}
          <p className="margin-bottom">Likes: {redditPost.ups}</p>
          {/* Author + Hours / Days posted ago */}
          <p className="margin-bottom">
            Posted by
            <span className="bold"> {redditPost.author}</span>{" "}
            {today(redditPost.created_utc)}
          </p>
          {/* Comments - if the comments have been loaded or not*/}
          {/* display something if the comments are loading */}
          {redditPost.comments.length > 0 ? (
            /* Comments - if the comments are showing or not*/
            redditPost.showingComments ? (
              <button
                onClick={() => toggleCommentDisplay(index)}
                className="comments-button"
              >
                Hide comments
              </button>
            ) : (
              <button
                onClick={() => toggleCommentDisplay(index)}
                className="comments-button"
              >
                Show comments
              </button>
            )
          ) : (
            <button
              className="comments-button"
              onClick={() => getComments(index, redditPost.permalink)}
            >
              <FontAwesomeIcon className="button-icon" icon={faMessage} />
              Load comments
            </button>
          )}
          {/* Display a message to let using know comments are loading */}
          {redditPost.loadingComments ? (
            <p className="notification-text">Loading comments...</p>
          ) : (
            ""
          )}
          {/* Display an error message for comments if they fail to load */}
          {redditPost.errorComments ? (
            <p className="notification-text">
              There has been an error loading the comments
            </p>
          ) : (
            ""
          )}
          {redditPost.showingComments
            ? // Map through all comments
              redditPost.comments.map((comment) => {
                return (
                  <blockquote className="comment-container" key={comment.id}>
                    <p className="margin-bottom bold">{comment.author}</p>
                    <p>{comment.body}</p>
                  </blockquote>
                );
              })
            : ""}
        </article>
      ))}
    </div>
  );
};

export default PostList;
