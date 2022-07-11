import { render, screen } from "@testing-library/react";
import { Logo } from "./Logo";

describe("<Logo />", () => {
  test("The logo renders", () => {
    // render the logo
    render(<Logo />);
    // identify the logo by role
    const logo = screen.getByRole("heading", { name: "Reddit Mini" });
    // expect the logo to be in the document
    expect(logo).toBeInTheDocument();
  });
});
