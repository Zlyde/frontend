import React, { useState, useEffect } from 'react';

const AccountDetails = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    // Hämta användardata från API
    // setUser(fetchedUserData);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Skicka uppdaterad användardata till API
    console.log('Uppdaterad användardata:', user);
  };

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
                onChange={(e) => setUser({...user, name: e.target.value})}
              />
            </div>
            <div>
              <label>E-post</label>
              <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
              />
            </div>
            <div>
              <label>Telefon</label>
              <input
                type="tel"
                value={user.phone}
                onChange={(e) => setUser({...user, phone: e.target.value})}
              />
            </div>
            <div>
              <label>Adress</label>
              <textarea
                value={user.address}
                onChange={(e) => setUser({...user, address: e.target.value})}
              />
            </div>
            <button className="cta-button" type="submit">Uppdatera uppgifter</button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default AccountDetails;
