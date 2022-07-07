import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { faReddit } from "@fortawesome/fontawesome-free-brands";
import { fetchComments, toggleShowingComments } from "../../redux/redditSlice";
import { today } from "../../utilities/Epoch";

const Post = ({ index, redditPost }) => {
  const dispatch = useDispatch();

  // not all image urls are images, so i need to check before rending them
  function checkIfImage(string) {
    return /\.(gif|jpg|jpeg|tiff|png|mp4)$/i.test(string);
  }

  const getComments = (index, permalink) => {
    dispatch(fetchComments(index, permalink));
  };

  const toggleCommentDisplay = (index) => {
    dispatch(toggleShowingComments(index));
  };

  return (
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
      {/* Post body */}
      <p className="margin-bottom">{redditPost.selftext}</p>
      {/* Upvotes */}
      <p className="margin-bottom">Likes: {redditPost.ups}</p>
      {/* Author + Hours / Days posted ago */}
      <p className="margin-bottom">
        Posted by
        <span className="bold"> {redditPost.author}</span>{" "}
        {today(redditPost.created_utc)}
      </p>
      {/* Comments - if the comments have been loaded or not*/}
      {redditPost.num_comments === 0 ? (
        <p className="notification-text">There are no comments</p>
      ) : /* display something if the comments are loading */
      redditPost.comments.length > 0 ? (
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
  );
};

export default Post;
