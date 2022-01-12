//Here we will capture information from reddit urls, which will return a json

export const API_ROOT = 'https://www.reddit.com';

// export const getPostsFromReddit = async (subreddit) => {
//     const response = await fetch(`${API_ROOT}${subreddit}.json`);
//     const json = await response.json();
//     return json.data.children.map((post) => post.data);
// };

export const getPostsFromReddit = async () => {
    const response = await fetch(`${API_ROOT}/subreddits.json`);
    const json = await response.json();
  
    return json.data.children.map((subreddit) => subreddit.data);
  };
