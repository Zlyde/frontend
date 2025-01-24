import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { userLogin } from "../api/UserAuth";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUserContext();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await userLogin(email, password); // Få svaret här
      console.log('Login success:', data); // Kolla vad som returneras
  
      // Kontrollera om servern har returnerat något fel
      if (data.error) {
        toast.error(data.error); 
        return;
      }
  
      // Kontrollera att användardata finns
      if (!data.user || !data.token) {
        toast.error('User data or token is missing');
        return;
      }
  
      const { user, token, message } = data;
      console.log('User logged in:', user.role, token);
  
      login(user, token); // Logga in användaren
      toast.success(message);
  
      // Navigera beroende på användarroll
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user.role === "customer") {
        navigate("/customer/dashboard");
      } else if (user.role === "service") {
        navigate("/service/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log('Failed to login', error); // Felhantering om något går fel
      toast.error('Failed to login, try again!');
    }
  };

  const handleGitHubLogin = () => {
    window.location.href = 'http://localhost:5001/api/v1/auth/githubb'
  }

  return (
    <div className="login-page">
      <header className="header">
        <div className="container">
          <h1>Välkommen tillbaka!</h1>
          <p>Logga in för att fortsätta till våra tjänster.</p>
        </div>
      </header>

      <main className="container">
        <form className="login-form">
          <div className="form-group">
            <label htmlFor="email">E-postadress</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ange din e-post"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Lösenord</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ange ditt lösenord"
            />
          </div>

          <button type="submit" className="btn-primary" onClick={handleLogin}>
            Logga in
          </button>
        </form>

        <button className="btn-primary" onClick={handleGitHubLogin}>
          Logga in med GitHub
        </button>

        <div className="login-links">
          <p>
            Har du inget konto? <Link to="/register">Registrera dig här</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
