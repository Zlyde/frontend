import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

const Header = () => {
  const { user, logout } = useUserContext();
  const [dashText, setDashText] = useState("");
  const [dashboardPath, setDashboardPath] = useState("");

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    if (user) {
      switch (user.role) {
        case "admin":
          setDashText("Admin Dashboard");
          setDashboardPath("/admin/dashboard");
          break;
        case "customer":
          setDashText("Account");
          setDashboardPath("/customer/dashboard");
          break;
        case "service":
          setDashText("Service Dashboard");
          setDashboardPath("/service/dashboard");
          break;
        default:
          setDashText("");
          setDashboardPath("");
      }
    } else {
      setDashText("");
      setDashboardPath("");
    }
  }, [user]);

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
              <Link to={dashboardPath}>{dashText || "Dashboard"}</Link>
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
