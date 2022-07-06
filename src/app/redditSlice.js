import { createSlice } from "@reduxjs/toolkit";
import {
  getPostsFromReddit,
  getPostsFromRedditWithoutSearch,
  getCommentsFromPost,
} from "../api/RedditAPI";

export const fetchPosts = (prefix, search) => async (dispatch) => {
  try {
    dispatch(loadingPosts());
    const posts = await getPostsFromReddit(prefix, search);
    // Add more attrbutes to the post to hold comment data
    const postsWithMetadata = posts.map((post) => ({
      ...post,
      showingComments: false,
      comments: [],
      loadingComments: false,
      errorComments: false,
    }));
    dispatch(getPostsSuccess(postsWithMetadata));
    // Load comments
  } catch (error) {
    dispatch(getPostFail());
  }
};

// /r/Damnthatsinteresting/comments/uy0jxw/over_the_24_hours_since_the_uvalde_massacre_fox/
export const fetchComments = (index, permalink) => async (dispatch) => {
  try {
    dispatch(loadingComments(index));
    const comments = await getCommentsFromPost(permalink);
    //console.log(comments);
    // remove last object in array as its not a comment but more of a summary and we dont need to use this
    comments.pop();
    //console.log(comments.length);
    dispatch(getCommentsSuccess({ index, comments }));
    dispatch(toggleShowingComments(index));
  } catch (error) {
    console.log(error);
    dispatch(getCommentFail());
  }
};

export const fetchPostsFromSubReddit = (subreddit) => async (dispatch) => {
  try {
    dispatch(loadingPosts());
    const posts = await getPostsFromRedditWithoutSearch(subreddit);
    dispatch(getPostsSuccess(posts));
  } catch (error) {
    dispatch(getPostFail());
  }
};

const redditSlice = createSlice({
  name: "redditPosts",
  initialState: {
    posts: [],
    postSearchTerm: "news",
    isLoading: false,
    error: false,
  },
  reducers: {
    loadingPosts(state) {
      state.isLoading = true;
      state.error = false;
    },
    getPostsSuccess(state, action) {
      state.isLoading = false;
      state.posts = action.payload;
    },
    getPostFail(state) {
      state.isLoading = false;
      state.error = true;
    },
    setPostSearchTerm(state, action) {
      state.postSearchTerm = action.payload;
    },
    loadingComments(state, action) {
      // console.log("loading comments");
      state.posts[action.payload].loadingComments = true;
      state.posts[action.payload].error = false;
    },
    getCommentsSuccess(state, action) {
      // console.log("comments successfully loaded");
      state.posts[action.payload.index].loadingComments = false;
      state.posts[action.payload.index].comments = action.payload.comments;
    },
    getCommentFail(state, action) {
      // console.log("comments failed");
      state.posts[action.payload].loadingComments = false;
      state.posts[action.payload].error = true;
    },
    toggleShowingComments(state, action) {
      state.posts[action.payload].showingComments =
        !state.posts[action.payload].showingComments;
    },
  },
});

export const {
  loadingPosts,
  getPostsSuccess,
  getPostFail,
  setPostSearchTerm,
  loadingComments,
  getCommentsSuccess,
  getCommentFail,
  toggleShowingComments,
} = redditSlice.actions;

export default redditSlice.reducer;

// Export a constant which holds the current array of posts
export const selectPosts = (state) => state.reddit.posts;
export const selectPostSearchQuery = (state) => state.reddit.postSearchTerm;
export const selectPostComments = (state) => state.reddit.posts.comments;
export const postLoading = (state) => state.reddit.isLoading;