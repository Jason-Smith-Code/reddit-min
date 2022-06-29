import { createSlice } from "@reduxjs/toolkit";
import {
  getSubredditsFromReddit,
  getSearchSubredditsFromReddit,
} from "../api/RedditAPI";

// Thunk
export const fetchDefaultSubreddits = () => async (dispatch) => {
  try {
    dispatch(loadingSubreddits());
    const subreddits = await getSubredditsFromReddit();
    dispatch(getSubredditsSuccess(subreddits));
  } catch (error) {
    dispatch(getSubredditsFail());
  }
};

export const fetchSubreddits = (search) => async (dispatch) => {
  try {
    dispatch(loadingSubreddits());
    const subreddits = await getSearchSubredditsFromReddit(search);
    dispatch(getSubredditsSuccess(subreddits));
  } catch (error) {
    dispatch(getSubredditsFail());
  }
};

const subredditSlice = createSlice({
  name: "subReddits",
  initialState: {
    subreddits: [],
    subredditSearchTerm: "",
    isLoading: false,
    error: false,
  },
  reducers: {
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
    setsubRedditSearchTerm(state, action) {
      state.subredditSearchTerm = action.payload;
    },
  },
});

export const {
  loadingSubreddits,
  getSubredditsSuccess,
  getSubredditsFail,
  setsubRedditSearchTerm,
} = subredditSlice.actions;

export default subredditSlice.reducer;

// Export a constant which holds the current array of posts

export const selectSubreddits = (state) => state.subreddit.subreddits;
export const selectSubredditSearchQuery = (state) =>
  state.subreddit.subredditSearchTerm;
