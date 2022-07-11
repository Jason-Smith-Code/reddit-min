import { render, screen, fireEvent } from "@testing-library/react";
import App from "../../app/App";
import { Provider } from "react-redux";
import store from "../../redux/store";
import "@testing-library/jest-dom/extend-expect"; // Adds extra assertations for Expect. Adds better content specific error messages

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
    // Spy on window ScrollTo
    global.scrollTo = jest.fn();
    const scrolling = jest.spyOn(window, "scrollTo");
    // Identify the scroll button
    const button = screen.getByTestId("back-to-top");
    // Click the scroll button
    fireEvent.click(button);
    // Check if the window scroll function has been called
    expect(scrolling).toHaveBeenCalled();
  });
});
