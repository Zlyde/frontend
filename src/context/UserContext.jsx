// src/context/UserContext.jsx
import React, { createContext, useContext, useState } from "react";

// Skapar en Context
export const UserContext = createContext();

// Användare Context Provider-komponent
export const UserProvider = ({ children }) => {
  // const [user, setUser] = useState();

  const login = (user, token) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
  };

  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    localStorage.removeItem('name')
    localStorage.removeItem('role')
    localStorage.removeItem('userId')
  };

  return (
    <UserContext.Provider value={{ login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Användare Context Hook
export const useUserContext = () => useContext(UserContext);
