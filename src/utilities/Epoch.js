// create a function to work out the time from when a post was create to now
// this should be shown in days if it is older than 24 hours

export const today = (epoch) => {
  let seconds = Math.floor(Date.now() / 1000);
  let timeAgoInSeconds = seconds - epoch;
  let timeAgoInMinutes = timeAgoInSeconds / 60;
  let timeAgoInHours = timeAgoInMinutes / 60;
  let timeAgoInDays = timeAgoInHours / 24;
  if (timeAgoInHours > 24) {
    return Math.ceil(timeAgoInDays) + " Days ago";
  } else {
    return Math.ceil(timeAgoInHours) + " Hours ago";
  }
};
