import React from "react";

const RegisterPage = () => {
  const handleRegister = (event) => {
    event.preventDefault();
    console.log("Registrering skickad!");
  };

  return (
    <div className="register-page">
      <header className="register-header">
        <h1>Registrera dig</h1>
        <p>Skapa ett konto för att börja använda vår plattform.</p>
      </header>
      <form className="register-form" onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="username">Användarnamn</label>
          <input
            type="text"
            id="username"
            placeholder="Ditt användarnamn"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">E-post</label>
          <input
            type="email"
            id="email"
            placeholder="Din e-postadress"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Lösenord</label>
          <input
            type="password"
            id="password"
            placeholder="Ditt lösenord"
            required
          />
        </div>
        <button type="submit" className="register-button">
          Registrera
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
