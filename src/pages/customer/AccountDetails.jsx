import React, { useState, useEffect } from 'react';
import { fetchUser, updateUser } from '../../utils/UserCall';
import { toast } from "react-toastify";

const AccountDetails = () => {
  const userData = localStorage.getItem('user')
  const theUser = JSON.parse(userData)
  const userIdFromStorage = theUser.user_id 
  const [user, setUser] = useState({
    name: theUser.name,
    email: theUser.email,
    account_balance: theUser.account_balance,
    user_id: userIdFromStorage,
    createdAt: theUser.createdAt,
    updatedAt: theUser.updatedAt,
    preferred_payment_method: theUser.preferred_payment_method,
    autogiro_details: theUser.autogiro_details
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await updateUser(userIdFromStorage, user); // Skicka uppdaterad data till backend
      console.log('Uppdaterad användardata:', updatedUser);
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      toast.success('Kontodetaljer uppdaterades!');
    } catch (error) {
      console.error('Kunde inte uppdatera användardetaljer:', error);
      toast.error('Något gick fel vid uppdateringen.');
    }
  };

  const fetchUserr = async () => {
    if (!userIdFromStorage) return
    const sameUser = await fetchUser(userIdFromStorage)
    setUser(sameUser);
  }

  useEffect(() => {
    fetchUserr()
  },[])

  // if (loading) return <p>Laddar...</p>; // Visa laddningsmeddelande tills data är hämtad

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
