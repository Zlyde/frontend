// import { render, screen } from "@testing-library/react";
// import { UserContext } from "../context/UserContext";
// import LoginPage from "./LoginPage";

// test('Renders "login" from LoginPage', () => {
//   render(<LoginPage />);
//   const loginText = screen.getByText("Login");
//   expect(loginText).toBeInTheDocument();
// });

import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { UserContext } from "../context/UserContext";
import LoginPage from "./LoginPage";

describe('LoginPage', () => {
  it('renders "Login" from LoginPage', () => {
    // Mocka contextens värden
    const mockContextValue = {
      login: vi.fn(), // Använd vi.fn() istället för jest.fn()
    };

    // Rendera komponenten med en Provider
    render(
      <UserContext.Provider value={mockContextValue}>
        <LoginPage />
      </UserContext.Provider>
    );

    // Leta efter texten "Login"
    const loginText = screen.getByText("Login");
    expect(loginText).toBeInTheDocument();
  });
});
