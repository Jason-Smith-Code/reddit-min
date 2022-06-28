import { createSlice } from "@reduxjs/toolkit";
// import the api file here
import { getSubredditsFromReddit, getPostsFromReddit } from "../api/RedditAPI";

// Thunk
export const fetchSubreddits = () => async (dispatch) => {
  try {
    dispatch(loadingSubreddits());
    const subreddits = await getSubredditsFromReddit();
    dispatch(getSubredditsSuccess(subreddits));
  } catch (error) {
    dispatch(getSubredditsFail());
  }
};

export const fetchPosts = () => async (dispatch) => {
  try {
    dispatch(loadingPosts());
    const posts = await getPostsFromReddit();
    dispatch(getPostsSuccess(posts));
  } catch (error) {
    dispatch(getPostFail());
  }
};

const redditSlice = createSlice({
  name: "redditPosts",
  initialState: {
    posts: [],
    postSearchTerm: "Jason",
    subreddits: [],
    subredditSearchTerm: "",
    isLoading: false,
    error: false,
  },
  reducers: {
    setPostSearchTerm(state, action) {
      state.postSearchTerm = action.payload;
    },
    setSubredditSearchTerm(state, action) {
      state.subredditSearchTerm = action.payload;
    },
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
    loadingSubreddits(state) {
      state.isLoading = true;
      state.error = false;
    },
    getSubredditsSuccess(state, action) {
      state.isLoading = false;
      state.subreddits = action.payload;
    },
    getSubredditsFail(state) {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const {
  setSearchTerm,
  loadingPosts,
  getPostsSuccess,
  getPostFail,
  loadingSubreddits,
  getSubredditsSuccess,
  getSubredditsFail,
  setPostSearchTerm
} = redditSlice.actions;

export default redditSlice.reducer;

// Export a constant which holds the current array of posts
export const selectPosts = (state) => state.reddit.posts;
export const selectSubreddits = (state) => state.reddit.subreddits;
export const selectPostSearchQuery = (state) => state.reddit.postSearchTerm;
