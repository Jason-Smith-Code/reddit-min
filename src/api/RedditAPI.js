//Here we will capture information from reddit urls, which will return a json

export const API_ROOT = 'https://www.reddit.com';

export const getPostsFromReddit = async () => {
    const response = await fetch(`${API_ROOT}/subreddits.json`);
    const json = await response.json();
    console.log(json.data.children.map((subreddit) => subreddit.data))
    return json.data.children.map((subreddit) => subreddit.data);
  };
