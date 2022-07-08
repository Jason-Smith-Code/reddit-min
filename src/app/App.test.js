import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import store from "../redux/store";

describe("<App />", () => {
  test("The logo renders", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const logo = screen.getByRole("logo");
    expect(logo).toBeInTheDocument();
  });
});
