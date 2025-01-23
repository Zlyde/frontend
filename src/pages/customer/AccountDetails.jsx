import React, { useState, useEffect } from 'react';
import { fetchUser, updateUser } from '../../utils/UserCall';

const AccountDetails = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    account_balance: 0,
    user_id: '',
    createdAt: '',
    updatedAt: '',
    preferred_payment_method: 'prepaid',
    autogiro_details: ''
  });
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hämta användardata när komponenten mountas
  useEffect(() => {
    const userIdFromStorage = localStorage.getItem('userId'); // Hämta userId från localStorage
    if (userIdFromStorage) {
      setUserId(userIdFromStorage); // Sätt användar-ID i state
      fetchUserDetails(userIdFromStorage); // Hämta användardetaljer
    } else {
      console.error('Inget användar-ID hittades. Kontrollera att användaren är inloggad.');
      // Eventuellt omdirigera användaren till inloggningssidan
      window.location.href = '/login';
    }
  }, []);
  

  const fetchUserDetails = async (id) => {
    try {
      setLoading(true); // Börjar ladda
      const userData = await fetchUser(id); // Använd fetchUser för att hämta data
      setUser({
        name: userData.name,
        email: userData.email,
        account_balance: userData.account_balance,
        user_id: userData.user_id,
        createdAt: new Date(userData.createdAt).toLocaleString(),
        updatedAt: new Date(userData.updatedAt).toLocaleString(),
        preferred_payment_method: userData.preferred_payment_method || 'prepaid', // Sätt favoritbetalmedel
        autogiro_details: userData.autogiro_details || '' // Sätt autogirodetaljer
      });
    } catch (error) {
      console.error('Kunde inte hämta användardetaljer:', error);
    } finally {
      setLoading(false); // Sluta ladda
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await updateUser(userId, user); // Skicka uppdaterad data till backend
      console.log('Uppdaterad användardata:', updatedUser);
      alert('Kontodetaljer uppdaterades!');
    } catch (error) {
      console.error('Kunde inte uppdatera användardetaljer:', error);
      alert('Något gick fel vid uppdateringen.');
    }
  };

  if (loading) return <p>Laddar...</p>; // Visa laddningsmeddelande tills data är hämtad

  return (
    <div className="customer-account-details">
      <div className="content">
        <main>
          <h1>Kontodetaljer</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Namn</label>
              <input
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </div>
            <div>
              <label>E-post</label>
              <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <div>
              <label>Kontobalans</label>
              <input
                type="number"
                value={user.account_balance}
                onChange={(e) => setUser({ ...user, account_balance: Number(e.target.value) })}
              />
            </div>

            {/* Lägg till fält för betalmetod */}
            <div>
              <label>Favoritbetalmedel</label>
              <select
                value={user.preferred_payment_method}
                onChange={(e) => setUser({ ...user, preferred_payment_method: e.target.value })}
                className="btn primary-btn">
                <option value="prepaid">Prepaid</option>
                <option value="autogiro">Autogiro</option>
              </select>
            </div>

          {/* Visa fält för autogirodetaljer om betalmetod är autogiro */}
          {user.preferred_payment_method === 'autogiro' && (
            <div>
              <label>Autogiro Detaljer</label>
              <textarea
                className="autogiro-details-textarea"
                value={user.autogiro_details}
                onChange={(e) => setUser({ ...user, autogiro_details: e.target.value })}
                placeholder="Fyll i autogiro detaljer"
                rows="3"
              />
            </div>
          )}

            <div>
              <label>Användar-ID</label>
              <input
                type="text"
                value={user.user_id}
                disabled // Gör det ej redigerbart
              />
            </div>
            <div>
              <label>Skapad</label>
              <input
                type="text"
                value={user.createdAt}
                disabled // Gör det ej redigerbart
              />
            </div>
            <div>
              <label>Uppdaterad</label>
              <input
                type="text"
                value={user.updatedAt}
                disabled // Gör det ej redigerbart
              />
            </div>
            <button className="btn primary-btn" type="submit">Uppdatera uppgifter</button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default AccountDetails;
