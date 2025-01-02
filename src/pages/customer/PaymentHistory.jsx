import React, { useState, useEffect } from 'react';

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    // Hämta betalningshistorik från API
    // setPayments(fetchedPayments);
  }, []);

  return (
    <div className="customer-payment-history">
      <div className="content">
        <main>
          <h1>Betalningshistorik</h1>
          <table>
            <thead>
              <tr>
                <th>Datum</th>
                <th>Belopp</th>
                <th>Beskrivning</th>
                <th>Status</th>
                <th>Kvitto</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(payment => (
                <tr key={payment.id}>
                  <td>{payment.date}</td>
                  <td>{payment.amount} SEK</td>
                  <td>{payment.description}</td>
                  <td>{payment.status}</td>
                  <td><button>Ladda ner kvitto</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
};

export default PaymentHistory;
