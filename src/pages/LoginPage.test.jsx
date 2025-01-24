import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import * as router from 'react-router-dom';
import { UserContext } from "../context/UserContext";
import LoginPage from "./LoginPage";
import * as UserAuth from "../api/UserAuth";

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

vi.mock("react-toastify", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

describe("LoginPage", () => {
  const mockNavigate = vi.fn();
  const mockLogin = vi.fn();

  beforeEach(() => {
    vi.spyOn(router, 'useNavigate').mockImplementation(() => mockNavigate);
    vi.clearAllMocks();
  });

  it("renders login form with email and password fields", () => {
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ login: mockLogin }}>
          <LoginPage />
        </UserContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByLabelText("E-postadress")).toBeInTheDocument();
    expect(screen.getByLabelText("Lösenord")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Logga in/i })).toBeInTheDocument();
  });

  it("calls userLogin API and context login function on successful login", async () => {
    vi.spyOn(UserAuth, "userLogin").mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: {
          user: { role: "customer" },
          token: "test-token",
          message: "Välkommen!",
        },
      }),
    });

    render(
      <MemoryRouter>
        <UserContext.Provider value={{ login: mockLogin }}>
          <LoginPage />
        </UserContext.Provider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText("E-postadress"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByLabelText("Lösenord"), { target: { value: "password123" } });
    fireEvent.click(screen.getByRole("button", { name: /Logga in/i }));

    await waitFor(() => {
      expect(UserAuth.userLogin).toHaveBeenCalledWith("test@example.com", "password123");
      expect(mockLogin).toHaveBeenCalledWith(
        { role: "customer" },
        "test-token"
      );
      expect(mockNavigate).toHaveBeenCalledWith("/customer/dashboard");
    });

    expect(require("react-toastify").toast.success).toHaveBeenCalledWith("Välkommen!");
  });

  it("shows error toast on failed login", async () => {
    vi.spyOn(UserAuth, "userLogin").mockResolvedValueOnce({
      ok: false,
      json: async () => ({
        message: "Felaktigt användarnamn eller lösenord",
      }),
    });

    render(
      <MemoryRouter>
        <UserContext.Provider value={{ login: mockLogin }}>
          <LoginPage />
        </UserContext.Provider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText("E-postadress"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByLabelText("Lösenord"), { target: { value: "wrongpassword" } });
    fireEvent.click(screen.getByRole("button", { name: /Logga in/i }));

    await waitFor(() => {
      expect(require("react-toastify").toast.error).toHaveBeenCalledWith("Felaktigt användarnamn eller lösenord");
    });
  });

  it("shows error toast when API call fails", async () => {
    vi.spyOn(UserAuth, "userLogin").mockRejectedValueOnce(new Error("Network Error"));

    render(
      <MemoryRouter>
        <UserContext.Provider value={{ login: mockLogin }}>
          <LoginPage />
        </UserContext.Provider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText("E-postadress"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByLabelText("Lösenord"), { target: { value: "password123" } });
    fireEvent.click(screen.getByRole("button", { name: /Logga in/i }));

    await waitFor(() => {
      expect(require("react-toastify").toast.error).toHaveBeenCalledWith("Failed to login, try again!");
    });
  });
});






// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import { describe, it, expect, vi } from "vitest";
// import { MemoryRouter } from "react-router-dom";
// import { UserContext } from "../context/UserContext";
// import LoginPage from "./LoginPage";
// import * as UserAuth from "../api/UserAuth"; // För att mocka `userLogin`

// vi.mock("react-router-dom", () => ({
//   ...vi.importActual("react-router-dom"),
//   useNavigate: vi.fn(),
// }));

// vi.mock("react-toastify", () => ({
//   toast: {
//     error: vi.fn(),
//     success: vi.fn(),
//   },
// }));

// describe("LoginPage", () => {
//   const mockNavigate = vi.fn();
//   const mockLogin = vi.fn();

//   beforeEach(() => {
//     vi.mocked(require("react-router-dom").useNavigate).mockReturnValue(mockNavigate);
//     vi.clearAllMocks();
//   });

//   it("renders login form with email and password fields", () => {
//     render(
//       <MemoryRouter>
//         <UserContext.Provider value={{ login: mockLogin }}>
//           <LoginPage />
//         </UserContext.Provider>
//       </MemoryRouter>
//     );

//     expect(screen.getByLabelText("E-postadress")).toBeInTheDocument();
//     expect(screen.getByLabelText("Lösenord")).toBeInTheDocument();
//     expect(screen.getByRole("button", { name: /Logga in/i })).toBeInTheDocument();
//   });

//   it("calls userLogin API and context login function on successful login", async () => {
//     vi.spyOn(UserAuth, "userLogin").mockResolvedValueOnce({
//       ok: true,
//       json: async () => ({
//         data: {
//           user: { role: "customer" },
//           token: "test-token",
//           message: "Välkommen!",
//         },
//       }),
//     });

//     render(
//       <MemoryRouter>
//         <UserContext.Provider value={{ login: mockLogin }}>
//           <LoginPage />
//         </UserContext.Provider>
//       </MemoryRouter>
//     );

//     fireEvent.change(screen.getByLabelText("E-postadress"), { target: { value: "test@example.com" } });
//     fireEvent.change(screen.getByLabelText("Lösenord"), { target: { value: "password123" } });
//     fireEvent.click(screen.getByRole("button", { name: /Logga in/i }));

//     await waitFor(() => {
//       expect(UserAuth.userLogin).toHaveBeenCalledWith("test@example.com", "password123");
//       expect(mockLogin).toHaveBeenCalledWith(
//         { role: "customer" },
//         "test-token"
//       );
//       expect(mockNavigate).toHaveBeenCalledWith("/customer/dashboard");
//     });

//     expect(require("react-toastify").toast.success).toHaveBeenCalledWith("Välkommen!");
//   });

//   it("shows error toast on failed login", async () => {
//     vi.spyOn(UserAuth, "userLogin").mockResolvedValueOnce({
//       ok: false,
//       json: async () => ({
//         message: "Felaktigt användarnamn eller lösenord",
//       }),
//     });

//     render(
//       <MemoryRouter>
//         <UserContext.Provider value={{ login: mockLogin }}>
//           <LoginPage />
//         </UserContext.Provider>
//       </MemoryRouter>
//     );

//     fireEvent.change(screen.getByLabelText("E-postadress"), { target: { value: "test@example.com" } });
//     fireEvent.change(screen.getByLabelText("Lösenord"), { target: { value: "wrongpassword" } });
//     fireEvent.click(screen.getByRole("button", { name: /Logga in/i }));

//     await waitFor(() => {
//       expect(require("react-toastify").toast.error).toHaveBeenCalledWith("Felaktigt användarnamn eller lösenord");
//     });
//   });

//   it("shows error toast when API call fails", async () => {
//     vi.spyOn(UserAuth, "userLogin").mockRejectedValueOnce(new Error("Network Error"));

//     render(
//       <MemoryRouter>
//         <UserContext.Provider value={{ login: mockLogin }}>
//           <LoginPage />
//         </UserContext.Provider>
//       </MemoryRouter>
//     );

//     fireEvent.change(screen.getByLabelText("E-postadress"), { target: { value: "test@example.com" } });
//     fireEvent.change(screen.getByLabelText("Lösenord"), { target: { value: "password123" } });
//     fireEvent.click(screen.getByRole("button", { name: /Logga in/i }));

//     await waitFor(() => {
//       expect(require("react-toastify").toast.error).toHaveBeenCalledWith("Failed to login, try again!");
//     });
//   });
// });
