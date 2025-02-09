import API_VERSION from "../config/api_version"
const API_URL = `http://localhost:5001${API_VERSION}/user`;

// Hämta alla användare
export const fetchUsers = async () => {
  try {
    const response = await fetch(API_URL); // GET till /api/user
    if (!response.ok) throw new Error('Kunde inte hämta användare');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Hämta en specifik användare
export const fetchUser = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/${userId}`);
    if (!response.ok) throw new Error('Kunde inte hämta användare');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Ta bort en användare
export const deleteUser = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/${userId}`, {
      method: 'DELETE', // DELETE till /api/user/{user_id}
    });
    if (!response.ok) throw new Error('Kunde inte ta bort användaren');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Uppdatera en användare
export const updateUser = async (userId, updatedData) => {
  try {
    const response = await fetch(`${API_URL}/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) throw new Error('Kunde inte uppdatera användaren');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
