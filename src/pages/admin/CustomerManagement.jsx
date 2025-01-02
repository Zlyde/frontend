import React, { useState, useEffect } from 'react';

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Hämta kunddata från API
    // setCustomers(fetchedCustomers);
  }, []);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-customer-management">
      <div className="content">
        <main>
          <h1>Kundhantering</h1>
          <input
            type="text"
            placeholder="Sök kund..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Namn</th>
                <th>E-post</th>
                <th>Åtgärder</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map(customer => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>
                    <button>Visa detaljer</button>
                    <button>Redigera</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
};

export default CustomerManagement;
