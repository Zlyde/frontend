import React, { useState, useEffect } from 'react';
// import { Map } from '../../components/Common';

const RentalHistory = () => {
  const [rentals, setRentals] = useState([]);
  const [selectedRental, setSelectedRental] = useState(null);

  useEffect(() => {
    // Hämta uthyrningshistorik från API
    // setRentals(fetchedRentals);
  }, []);

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
              {rentals.map(rental => (
                <tr key={rental.id}>
                  <td>{rental.date}</td>
                  <td>{rental.startTime}</td>
                  <td>{rental.endTime}</td>
                  <td>{rental.cost} SEK</td>
                  {/* Visa detaljer om uthyrningen */}
                  {/* Du kan också ha en modal för att visa detaljer */}
                  {/* För nuvarande exempel använder vi en knapp */}
                  <td><button onClick={() => setSelectedRental(rental)}>Visa detaljer</button></td> 
                </tr> 
              ))}
            </tbody> 
          </table>

          {/* Detaljer för vald uthyrning */}
          {selectedRental && (
            <>
              {/* Detaljer om den valda uthyrningen */}
              {/* Här kan du inkludera en karta eller annan relevant information */}
              {/* Exempelvis: */}
              {/* Visa start- och slutpunkter */}
              {/* Visa rutt på karta */}
              {/* Lägga till mer information om uthyrningen */}
              {/* Använd Map-komponenten för att visa rutt */}
              {/* Passa ruttdata till Map-komponenten här */}
            </>
          )}
        </main> 
      </div> 
    </div> 
  ); 
}; 

export default RentalHistory;
