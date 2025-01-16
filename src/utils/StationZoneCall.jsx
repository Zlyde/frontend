const API_URL = 'http://localhost:5001/api';

// Hämta alla laddstationer
export const fetchStations = async () => {
  try {
    const response = await fetch(`${API_URL}/station`);
    if (!response.ok) throw new Error('Kunde inte hämta laddstationer');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Hämta alla parkeringsplatser
export const fetchZones = async () => {
  try {
    const response = await fetch(`${API_URL}/zone`);
    if (!response.ok) throw new Error('Kunde inte hämta parkeringszoner');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Hämta cyklar för en specifik laddstation
export const fetchBikesAtStation = async (stationId) => {
  try {
    const response = await fetch(`${API_URL}/station/${stationId}/bike`);
    if (!response.ok) throw new Error('Kunde inte hämta cyklar för laddstationen');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Hämta cyklar för en specifik parkeringszon
export const fetchBikesAtZone = async (zoneId) => {
  try {
    const response = await fetch(`${API_URL}/zone/${zoneId}/bike`);
    if (!response.ok) throw new Error('Kunde inte hämta cyklar för parkeringszonen');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};