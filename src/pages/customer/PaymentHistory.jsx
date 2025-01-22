// pages/customer/PaymentHistory.jsx
import React, { useEffect, useState } from 'react';
import { fetchInvoices, markInvoiceAsPaid } from '../../utils/InvoiceCall';

const PaymentHistory = ({ userId }) => {
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Hämta fakturor när komponenten laddas
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const loadInvoices = async () => {
      setLoading(true);
      try {
        const data = await fetchInvoices(userId);
        setInvoices(data);
      } catch (err) {
        setError('Kunde inte hämta fakturor.');
      } finally {
        setLoading(false);
      }
    };
    loadInvoices();
  }, [userId]);

  // Hantera betalning
  const handlePayment = async (invoiceId) => {
    try {
      const paymentMethod = 'prepaid'; // Eller dynamiskt beroende på användarens val
      const updatedInvoice = await markInvoiceAsPaid(invoiceId, paymentMethod);

      // Uppdatera fakturorna i state
      setInvoices((prev) =>
        prev.map((invoice) =>
          invoice.invoice_id === invoiceId ? updatedInvoice : invoice
        )
      );
    } catch (err) {
      setError('Kunde inte markera fakturan som betald.');
    }
  };

  if (loading) return <p>Laddar fakturor...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Mina fakturor</h1>
      <table>
        <thead>
          <tr>
            <th>Faktura ID</th>
            <th>Totalbelopp</th>
            <th>Status</th>
            <th>Åtgärder</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.invoice_id}>
              <td>{invoice.invoice_id}</td>
              <td>{invoice.total_amount} SEK</td>
              <td>{invoice.status}</td>
              <td>
                {invoice.status === 'unpaid' ? (
                  <button onClick={() => handlePayment(invoice.invoice_id)}>
                    Betala
                  </button>
                ) : (
                  'Betald'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
