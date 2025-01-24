// utils/tripCall.jsx
import API_VERSION from "../config/api_version"
const API_URL = `http://localhost:5001${API_VERSION}/trip`;

/**
 * Hämta alla resor för en specifik användare
 * @param {number} userId - Användarens ID
 * @returns {Promise<Array>} - Listan av resor
 */
export const fetchRentalHistory = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/user/${userId}`);
    if (!response.ok) {
      throw new Error('Kunde inte hämta uthyrningshistorik');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fel vid hämtning av uthyrningarna:', error.message);
    throw error; // Kasta vidare felet så att det kan hanteras i komponenten
  }
};

/**
 * Hämta detaljer för en specifik resa
 * @param {number} tripId - Resans ID
 * @returns {Promise<Object>} - Detaljer om den specifika resan
 */
export const fetchRentalDetails = async (tripId) => {
  try {
    const response = await fetch(`${API_URL}/${tripId}`);
    if (!response.ok) {
      throw new Error('Kunde inte hämta detaljinformation för resan');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fel vid hämtning av reseinformation:', error.message);
    throw error;
  }
};
