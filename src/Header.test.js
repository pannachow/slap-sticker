import { screen } from "@testing-library/react";
import Header from "./Header";
import { renderWithRouterAndTheme } from "./testUtils";

test("contains product title", () => {
  renderWithRouterAndTheme(<Header />);
  const title = screen.getByText(/SlapSticker/i);
  expect(title).toBeInTheDocument();
});
