//Here we will capture information from reddit urls, which will return a json

export const API_ROOT = "https://www.reddit.com";

// Home search without subreddit selected
// https://www.reddit.com/search/?q=

// search with subreddit selected
// https://www.reddit.com/r/pathofexile/search/?q=

// Sub reddit
//https://www.reddit.com/search/?q=NAMEOFSUBREDDIT&type=sr

export const getPostsFromReddit = async () => {
  const response = await fetch(`${API_ROOT}/subreddits.json`);
  const json = await response.json();
  console.log(json.data.children.map((subreddit) => subreddit.data));
  return json.data.children.map((subreddit) => subreddit.data);
};
