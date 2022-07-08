import { render, screen, fireEvent } from "@testing-library/react";
import App from "../../app/App";
import { Provider } from "react-redux";
import store from "../../redux/store";
import { toHaveValue } from "@testing-library/jest-dom";

describe("<BackToTop />", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
  test("The Back to top button renders", () => {
    const button = screen.getByTestId("back-to-top");
    expect(button).toBeInTheDocument();
  });

  test("When clicked, user scrolls to top of screen", () => {
    // scroll to bottom of page
    fireEvent.scroll(window, { scrollY: "1000" });
    // verify vertical position
    let windowScrollYPosition = window.scrollY;

    const button = screen.getByTestId("back-to-top");
    fireEvent.click(button);

    // verify vertical position
  });
});
