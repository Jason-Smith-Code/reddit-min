import { createSlice } from "@reduxjs/toolkit";
import { getPostsFromReddit } from "../api/RedditAPI";

// Thunk
export const fetchPosts = (subreddit) => async (dispatch) => {
  try {
    dispatch(loadingPosts());
    const posts = await getPostsFromReddit(subreddit);
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
  },
});

export const { loadingPosts, getPostsSuccess, getPostFail, setPostSearchTerm } =
  redditSlice.actions;

export default redditSlice.reducer;

// Export a constant which holds the current array of posts
export const selectPosts = (state) => state.reddit.posts;
export const selectPostSearchQuery = (state) => state.reddit.postSearchTerm;
