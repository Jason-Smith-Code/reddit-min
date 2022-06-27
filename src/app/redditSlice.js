import { createSlice } from "@reduxjs/toolkit";
// import the api file here
import { getPostsFromReddit } from "../api/RedditAPI";

// Thunk
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
    searchTerm: "",
    isLoading: false,
    error: false,
  },
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
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
  },
});

export const { setSearchTerm, loadingPosts, getPostsSuccess, getPostFail } =
  redditSlice.actions;

export default redditSlice.reducer;

// Export a constant which holds the current array of posts
export const selectPosts = (state) => state.reddit.posts;
