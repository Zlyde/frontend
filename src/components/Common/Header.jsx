import React from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

const Header = () => {
  const { user, logout } = useUserContext();

  const handleLogout = () => {
    logout();
  };
  return (
    <header className="app-header">
      <div className="header-container">
        <h1>Svenska Elsparkcyklar AB</h1>
        <nav>
          {/* <a href="/">Hem</a>
          <a href="/register">Registrera</a>
          <a href="/login">Logga In</a> */}
          <Link to="/">Hem</Link>
          {user ? (
            <>
              <button onClick={handleLogout}>Logga ut</button>
            </>
          ) : (
            <>
              <Link to="/login">Logga in</Link>
              <Link to="/register">Registrera dig här</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
