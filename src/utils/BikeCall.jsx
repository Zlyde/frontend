export const fetchBikes = async () => {
  const url = 'http://localhost:5001/api/bike'

  try {
    const response = await fetch(url)
    const bikes = await response.json()
    return bikes
  } catch (error) {
    console.log(error.message)
    return
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
    throw error; // Skicka vidare felet
  }
};
