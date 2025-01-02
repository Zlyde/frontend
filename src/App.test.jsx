import { render, screen } from "@testing-library/react";
import App from "./App";

// test("renders learn react link", () => {
//   render(<App />);
//   const linkElement = screen.getByText("Bike Rental");
//   expect(linkElement).toBeInTheDocument();
// });

test("renders Svenska Elsparkcyklar header", () => {
  render(<App />);
  const headerElement = screen.getByText("Svenska Elsparkcyklar AB");
  expect(headerElement).toBeInTheDocument();
});
