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
});
