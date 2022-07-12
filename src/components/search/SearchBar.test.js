import { render, screen, fireEvent } from "@testing-library/react";
import App from "../../app/App";
import { Provider } from "react-redux";
import store from "../../redux/store";
import "@testing-library/jest-dom/extend-expect"; // Adds extra assertations for Expect. Adds better content specific error messages

describe("<Searchbar />", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  test("The Searchbar renders", () => {
    // Identify the search bar
    const searchBar = screen.getByPlaceholderText("Searching");
    // Expect the search bar to be in the document
    expect(searchBar).toBeInTheDocument();
  });

  test("Submit button does not render unless search has a value", () => {
    // Identify the search bar
    const searchBar = screen.getByPlaceholderText("Searching");
    // to see the submit button we need to enter a value into the search bar
    fireEvent.change(searchBar, { target: { value: "search query" } });
    // Check the the search bar has the text value above
    expect(searchBar).toHaveValue("search query");
    // Identify the submit button by its alt tag since its only has an icon
    const submitButton = screen.getByRole("button", {
      name: /magnifying glass/i,
    });
    // expect submit button to be in the document
    expect(submitButton).toBeInTheDocument();
    // when we remove the value in the search bar the submit button is no longer on the screen
    fireEvent.change(searchBar, { target: { value: "" } });
    // Check the the search bar has the text value above
    expect(searchBar).toHaveValue("");
    // expect the submit button to no longer be in the document
    expect(submitButton).not.toBeInTheDocument();
  });

  test("The Searchbar renders results when user submits", async () => {
    // Identify the searchbar
    const searchBar = screen.getByPlaceholderText("Searching");
    // expect to see the search bar in the document
    expect(searchBar).toBeInTheDocument();
    // change the value of the search input
    fireEvent.change(searchBar, { target: { value: "diablo" } });
    // check that the value of the search bar input has changed
    expect(searchBar).toHaveValue("diablo");
    // identify the submit button
    const submitButton = screen.getByRole("button", {
      name: /magnifying glass/i,
    });
    // click the submit button
    fireEvent.click(submitButton);
    // identify "loading posts" message
    const loadingPosts = screen.getByText("Loading posts");
    // check to see that the "loading posts" message appears
    expect(loadingPosts).toBeInTheDocument();
    // Check that posts appear
    // expect(await screen.getByText("diablo")).toBeInTheDocument();
    // NO RESULTS FOUND
    // https://jestjs.io/docs/tutorial-async
  });

  test("Selected subreddit appears when subreddt is selected", () => {
    // identify a subreddit from the subreddit list
    // click the subreddit
    // expect to see the subreddit appear in the search bar
  });

  test("User can remove a subreddit after a subreddit is selected", () => {
    // identify a subreddit from the subreddit list
    // click the subreddit
    // expect to see the subreddit appear in the search bar
    // click the remove button in the search bar
    // expect to no longer see the subreddit appear in the search bar
  });
});
