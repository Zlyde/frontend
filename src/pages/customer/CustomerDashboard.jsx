import React from 'react';
import { Link } from 'react-router-dom';

const CustomerDashboard = () => {
  const userData = localStorage.getItem('user')
  const user = JSON.parse(userData)

  return (
    <div className="customer-dashboard">
      <div className="content">
        <main>
          <h1>Välkommen tillbaka, {user.name}</h1>
          <div className="quick-actions">
            <h2>Snabbåtgärder</h2>
            <Link to="/customer/account">Kontodetaljer</Link><br></br>
            <Link to="/customer/rental">Uthyrningshistorik</Link><br></br>
            <Link to="/customer/payment">Betalningshistorik</Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CustomerDashboard;
