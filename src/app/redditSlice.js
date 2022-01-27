import { createSlice } from '@reduxjs/toolkit';
// import the api file here
import { getPostsFromReddit } from '../api/RedditAPI';
// I need to verify what states I want to keep track of here

const redditSlice = createSlice({
  name: 'redditPosts',
  initialState: {
    posts: [],
    searchTerm: '',
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
    }
  },
});

export const {
  setSearchTerm,
  loadingPosts,
  getPostsSuccess,
  getPostFail,
} = redditSlice.actions;

export default redditSlice.reducer;

// This is a Redux Thunk. We need this when using async await, create this using the 3 reducers above and use a try catch so that we can return an function if there is a problem
export const fetchPosts = () => async (dispatch) => {
  try {
    dispatch(loadingPosts());
    const posts = await getPostsFromReddit();
    dispatch(getPostsSuccess(posts));
  } catch (error) {
    dispatch(getPostFail());   
  }
};

// Export a constant which holds the current array of posts
export const selectPosts = (state) => state.reddit.posts;