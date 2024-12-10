import { render, screen } from "@testing-library/react";
import LoginPage from "./LoginPage";

test('Renders "login" from LoginPage', () => {
  render(<LoginPage />);
  const loginText = screen.getByText("Login");
  expect(loginText).toBeInTheDocument();
});
