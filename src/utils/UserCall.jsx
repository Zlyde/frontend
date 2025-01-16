const API_URL = 'http://localhost:5001/api/user';

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
      method: 'PUT', // PUT till /api/user/{user_id}
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
