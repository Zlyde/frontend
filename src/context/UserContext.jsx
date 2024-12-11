// src/context/UserContext.jsx
import React, { createContext, useContext, useState } from "react";

// Skapar en Context
const UserContext = createContext();

// Användare Context Provider-komponent
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Användare Context Hook
export const useUserContext = () => useContext(UserContext);
