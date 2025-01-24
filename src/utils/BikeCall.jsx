import API_VERSION from "../config/api_version"
const API_URL = `http://localhost:5001${API_VERSION}/bike`;

// Hämta alla cyklar
export const fetchBikes = async () => {
  const url = `${API_URL}`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Fetch error')
    }
    const bikes = await response.json()
    return bikes
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

// Funktion för att hämta statistik baserat på cykeldatan
export const fetchBikeStats = async () => {
  try {
    const bikes = await fetchBikes();

    // Beräkna statistiken
    const totalBikes = bikes.length;
    const activeRentals = bikes.filter((bike) => bike.status === "in-use").length;
    const chargingStations = bikes.filter((bike) => bike.status === "charging").length;

    return { totalBikes, activeRentals, chargingStations };
  } catch (error) {
    console.log("Fel vid hämtning av statistik: ", error.message);
    throw Error('Fetch error');
  }
};

// Uppdatera en cykel
export const updateBike = async (bike_id, updatedData) => {
  try {
    const response = await fetch(`${API_URL}/${bike_id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) throw new Error('Kunde inte uppdatera cykeln');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
