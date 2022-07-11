import App from "../app/App";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../redux/store";

// Its impossible to check this from a user perspective from live data, since the returned value will change every hour

describe("<Epoch />", () => {

  const today = (epoch) => {
    let seconds = 500000;
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

  test("Returns a value in days", () => {
    // if hours are greater than 24 we return a whole number in days
    expect(today(400000)).toEqual("2 Days ago");
  });

  test("Returns a value in hours", () => {
    // if hours are less than 24 we return a whole number in hours
    expect(today(450000)).toEqual("14 Hours ago");
  });
});
