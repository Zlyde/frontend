import React, {useState, useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { userRegister } from "../api/UserAuth";

const RegisterPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await userRegister(name, email, password)
      if(!response.ok) {
        console.log('Failed to register')
        toast.error('Kunde inte registrera, testa igen!')
        return
      }
      console.log('User registered')
      toast.success('Använda registrerad')
      navigate('/login')
    } catch (error) {
      console.log(error)
      toast.error('Kunde inte registrera, testa igen senare!')
      return
    }
    
  };

  return (
    <div className="register-page">
      <header className="register-header">
        <h1>Registrera dig</h1>
        <p>Skapa ett konto för att börja använda vår plattform.</p>
      </header>
      <form className="register-form" onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="name">Namn</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Namn"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">E-post</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Din e-postadress"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Lösenord</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
