// Home search without subreddit selected
// https://www.reddit.com/search/?q=

// search with subreddit selected
// https://www.reddit.com/r/pathofexile/search/?q=chaos
// Sub reddit
//https://www.reddit.com/search/?q=NAMEOFSUBREDDIT&type=sr

// display posts in a
// https://www.reddit.com/r/pathofexile.json

const API_ROOT = "https://www.reddit.com";

// search display subreddits
export const gfjfgk = async () => {
  const response = await fetch(
    `https://www.reddit.com/search.json?q=diablo&type=sr`
  );
  const json = await response.json();
  console.log(json.data.children.map((subreddit) => subreddit.data));
  return json.data.children.map((subreddit) => subreddit.data);
};

// POSTS

// Default display

// import the searchquery from state
let postSearchQuery = "diablo";
// Search display
export const getPostsFromReddit = async (subreddit) => {
  // const response = await fetch(`${API_ROOT}/search.json?q=${postSearchQuery}`);
  const response = await fetch(`${API_ROOT}/search.json?q=${subreddit}`);
  const json = await response.json();
  console.log(json.data.children.map((post) => post.data));
  return json.data.children.map((post) => post.data);
};

// SUBREDDITS

// default display
export const getSubredditsFromReddit = async () => {
  const response = await fetch(`${API_ROOT}/subreddits.json`);
  const json = await response.json();
  console.log(json.data.children.map((subreddit) => subreddit.data));
  return json.data.children.map((subreddit) => subreddit.data);
};

// Search display
