// utils/InvoiceCall.jsx
import API_VERSION from "../config/api_version"
const API_URL = `http://localhost:5001${API_VERSION}/invoice`;

/**
 * Hämta alla fakturor för en specifik användare
 * @param {number} userId - Användarens ID
 * @returns {Promise<Array>} - Listan av fakturor
 */
export const fetchInvoices = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/user/${userId}`);
    if (!response.ok) {
      throw new Error('Kunde inte hämta fakturor');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fel vid hämtning av fakturorna:', error.message);
    throw error; // Kasta vidare felet så att det kan hanteras i komponenten
  }
};

/**
 * Hämta en specifik faktura
 * @param {number} invoiceId - fakturans ID
 * @returns {Promise<Object>} - Den specifika fakturan som ett objekt
 */
export const fetchSpecificInvoice = async (invoiceId) => {
  try {
    const response = await fetch(`${API_URL}/${invoiceId}`);
    if (!response.ok) {
      throw new Error('Kunde inte hämta fakturan');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fel vid hämtning av fakturan:', error.message);
    throw error;
  }
};

/**
 * Markera en faktura som betald
 * @param {number} invoiceId - Fakturans ID
 * @param {string} paymentMethod - Betalningsmetod ('prepaid' eller 'autogiro')
 * @returns {Promise<Object>} - Den uppdaterade fakturan
 */
export const markInvoiceAsPaid = async (invoiceId, paymentMethod) => {
  try {
    const response = await fetch(`${API_URL}/pay/${invoiceId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ paymentMethod }),
    });

    if (!response.ok) {
      throw new Error('Kunde inte markera fakturan som betald');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fel vid försök av att markera fakturan som betald:', error.message);
    throw error;
  }
};
