import React, { useState, useEffect } from 'react';
import { fetchRentalHistory, fetchRentalDetails } from '../../utils/TripCall'; // Importera API-funktionerna

const RentalHistory = () => {
  const [rentals, setRentals] = useState([]); // Sätt ett tomt array som defaultvärde
  const [selectedRental, setSelectedRental] = useState(null);
  const [loading, setLoading] = useState(true); // För att visa laddningsstatus
  const [error, setError] = useState(null); // För att hantera fel

  useEffect(() => {
    // Hämta användarens ID från localStorage
    const userId = localStorage.getItem('userId');

    loadRentalHistory(userId);
  }, []);

  // Funktion för att hämta uthyrningshistorik från backend
  const loadRentalHistory = async (userId) => {
    try {
      setLoading(true); // Börja ladda
      const fetchedRentals = await fetchRentalHistory(userId); // Anropa den nya fetch-funktionen
      setRentals(fetchedRentals); // Sätt uthyrningshistoriken i state
      setError(null); // Återställ eventuella tidigare fel
    } catch (error) {
      console.error('Fel vid hämtning av uthyrningar:', error.message);
      setError('Kunde inte hämta uthyrningshistorik. Försök igen senare.');
    } finally {
      setLoading(false); // Sluta ladda
    }
  };

  const handleRentalClick = async (rental) => {
    try {
      const rentalDetails = await fetchRentalDetails(rental.trip_id); // Hämta detaljer för vald resa
      setSelectedRental(rentalDetails); // Sätt detaljer i state för att visa
    } catch (error) {
      console.error('Fel vid hämtning av resedetaljer:', error.message);
      setError('Kunde inte hämta resedetaljer. Försök igen senare.');
    }
  };

  if (loading) return <p>Laddar uthyrningshistorik...</p>; // Visa laddningsmeddelande

  if (error) return <p>{error}</p>; // Visa felmeddelande om något gick fel

  if (rentals.length === 0) return <p>Ingen uthyrningshistorik hittades.</p>; // Om inga uthyrningar finns

  return (
    <div className="customer-rental-history">
      <div className="content">
        <main>
          <h1>Uthyrningshistorik</h1>
          <table>
            <thead>
              <tr>
                <th>Datum</th>
                <th>Starttid</th>
                <th>Sluttid</th>
                <th>Kostnad</th>
                <th>Detaljer</th>
              </tr>
            </thead>
            <tbody>
              {rentals.map((rental) => (
                <tr key={rental.trip_id}>
                  <td>{new Date(rental.start_time).toLocaleDateString()}</td>
                  <td>{new Date(rental.start_time).toLocaleTimeString()}</td>
                  <td>{rental.end_time ? new Date(rental.end_time).toLocaleTimeString() : 'Pågående'}</td>
                  <td>{rental.total_cost} SEK</td>
                  <td>
                    <button onClick={() => handleRentalClick(rental)} className="btn primary-btn">Visa detaljer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Detaljer för vald uthyrning */}
          {selectedRental && (
            <div>
              <h2>Detaljer för uthyrning</h2>
              <p><strong>Starttid:</strong> {new Date(selectedRental.start_time).toLocaleString()}</p>
              <p><strong>Sluttid:</strong> {selectedRental.end_time ? new Date(selectedRental.end_time).toLocaleString() : 'Pågående'}</p>
              <p><strong>Kostnad:</strong> {selectedRental.total_cost} SEK</p>
              <p><strong>Startpunkt:</strong> {selectedRental.start_location.coordinates.join(', ')}</p>
              <p><strong>Slutpunkt:</strong> {selectedRental.end_location.coordinates.join(', ')}</p>
              {/* Här kan du också lägga till en karta eller mer detaljer om uthyrningen */}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default RentalHistory;
