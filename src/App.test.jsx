import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders ZOOMIES header", () => {
  render(<App />);
  const headerElement = screen.getByText("ZOOMIES");
  expect(headerElement).toBeInTheDocument();
});
