import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import store from "../redux/store";

describe("<App />", () => {

  beforeEach(() => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  test("The logo renders", () => {

    const logo = screen.getByRole("logo");
    expect(logo).toBeInTheDocument();
  });

  test("The menu can be toggled in and out of view (on mobile screen) ", () => {
    // Set window width to less that 1000 px
    window.innerWidth = "1200"
    expect(window.innerWidth).toBe("1200")

    const menu = screen.getByText("Menu")
    expect(menu).toBeTruthy()
    // click the menu
    // check that the subreddit content is displaying on the screen

    // click the menu

    // check that the subreddit content is not displaying on the screen
  });
});
