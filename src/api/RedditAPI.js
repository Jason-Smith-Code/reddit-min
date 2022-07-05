const root = "https://www.reddit.com";

// POSTS

// Default display
// https://www.reddit.com/search/?q=diablo&restrict_sr=1&sr_nsfw=

// Search display
export const getPostsFromReddit = async (prefix, search) => {
  const response = await fetch(
    `${root}/${prefix}/search.json?q=${search}&restrict_sr=1&sr_nsfw=`
  );
  // console.log(response);
  const json = await response.json();
  // console.log(json.data.children.map((post) => post.data));
  return json.data.children.map((post) => post.data);
};

// https://www.reddit.com/r/Diablo/search.json?q=news&restrict_sr=1&sr_nsfw=

// subreddit post search without search
// https://www.reddit.com/r/Diablo.json
export const getPostsFromRedditWithoutSearch = async (subreddit) => {
  const response = await fetch(`${root}${subreddit}.json`);
  // console.log(response);
  const json = await response.json();
  // console.log(json.data.children.map((post) => post.data));
  return json.data.children.map((post) => post.data);
};

// Comments
export const getCommentsFromPost = async (permalink) => {
  const response = await fetch(`${root}${permalink}.json`);
  const json = await response.json();
  // console.log(json);
  // [1] contains all the comment data
  return json[1].data.children.map((post) => post.data);
};

// https://www.reddit.com/r/Diablo/search.json?q=search&restrict_sr=1&sr_nsfw=

// SUBREDDITS

// default display
export const getSubredditsFromReddit = async () => {
  const response = await fetch(`${root}/subreddits.json`);
  const json = await response.json();
  console.log(json.data.children.map((subreddit) => subreddit.data));
  return json.data.children.map((subreddit) => subreddit.data);
};
// Search display
export const getSearchSubredditsFromReddit = async (search) => {
  const response = await fetch(`${root}/subreddits/search.json?q=${search}`);
  const json = await response.json();
  console.log(json.data.children.map((subreddit) => subreddit.data));
  return json.data.children.map((subreddit) => subreddit.data);
};
