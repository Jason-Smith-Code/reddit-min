import { render, screen, fireEvent } from "@testing-library/react";
import App from "../../app/App";
import { Provider } from "react-redux";
import store from "../../redux/store";

describe("<Searchbar />", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
  test("The Searchbar renders", () => {
    const searchBar = screen.getByPlaceholderText("Searching");
    expect(searchBar).toBeInTheDocument();
  });

  test("Submit button does not render unless search has a value", () => {
    const searchBar = screen.getByPlaceholderText("Searching");
    // to see the submit button we need to enter a value into the search bar
    fireEvent.change(searchBar, { target: { value: "search query" } });
    const submitButton = screen.getByTestId("search-submit");
    expect(submitButton).toBeInTheDocument();
    // when we remove the value in the search bar the submit button is no longer on the screen
    fireEvent.change(searchBar, { target: { value: "" } });
    expect(submitButton).not.toBeInTheDocument();
  });

  test("The Searchbar renders results when user submits", async () => {
    const searchBar = screen.getByPlaceholderText("Searching");
    expect(searchBar).toBeInTheDocument();
    fireEvent.change(searchBar, { target: { value: "diablo" } });
    expect(searchBar).toHaveValue("diablo")
    const submitButton = screen.getByTestId("search-submit");
    fireEvent.click(submitButton)
    const loadingPosts = screen.getByText("Loading posts")
    expect(loadingPosts).toBeInTheDocument()

    // since we need to wait for the results we need to use async await
    // Currently the search is yielding no results
  });
});
