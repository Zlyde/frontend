// utils/SettingCall.jsx
const API_URL = 'http://localhost:5001/api/setting';

// Hämta inställningar
export const fetchSettings = async () => {
  try {
    const response = await fetch(API_URL); // GET till /api/setting
    if (!response.ok) throw new Error('Kunde inte hämta inställningar');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Uppdatera inställningar
export const updateSettings = async (updatedSettings) => {
  try {
    const response = await fetch(API_URL, {
      method: 'PUT', // PUT till /api/setting
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedSettings),
    });
    if (!response.ok) throw new Error('Kunde inte uppdatera inställningarna');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Återställ inställningar till standardvärden
export const resetSettings = async () => {
  try {
    const response = await fetch(`${API_URL}/reset`, {
      method: 'PUT', // POST till /api/setting/reset
    });
    if (!response.ok) throw new Error('Kunde inte återställa inställningarna');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
