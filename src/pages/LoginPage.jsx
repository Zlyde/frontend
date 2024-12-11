import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUserContext();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const mockuser = {
      id: 1,
      name: "John Doe",
      role: "admin",
    };

    login(mockuser);

    if (mockuser.role === "admin") {
      navigate("/admin/dashboard");
    } else if (mockuser.role === "customer") {
      navigate("/customer/dashboard");
    } else if (mockuser.role === "service") {
      navigate("/service/dashboard");
    } else {
      navigate("/");
    }
  };
  // const { error, setError } = useMessage();
  // const { connectSocket } = useSocket();
  // const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     const url = 'https://jsramverk-editor-tesi23-beh7hvfadub6fugk.northeurope-01.azurewebsites.net/login';
  //     const userData = { email, password };

  //     try {
  //         const requestOptions = {
  //             method: 'POST',
  //             headers: {
  //                 'content-type': 'application/json',
  //             },
  //             body: JSON.stringify(userData),
  //         };
  //         const response = await fetch(url, requestOptions);
  //         const data = await response.json();

  //         if (response.ok) {
  //             localStorage.setItem('token', data.data.token);
  //             connectSocket(data.data.token);
  //             navigate('/documents');
  //         } else {
  //             setError('Failed to login. Please try again');
  //         }
  //     } catch (error) {
  //         setError('Failed to login. Please try again');
  //         console.error(error);
  //     }
  // };

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
              placeholder="Ange din e-post"
              // required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Lösenord</label>
            <input
              type="password"
              id="password"
              placeholder="Ange ditt lösenord"
              // required
            />
          </div>

          <button type="submit" className="btn-primary" onClick={handleLogin}>
            Logga in
          </button>
        </form>

        <div className="login-links">
          <p>
            Har du inget konto? <Link to="/register">Registrera dig här</Link>
          </p>
          <p>
            <Link to="/forgot-password">Glömt lösenordet?</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
