import React, { useState, useEffect } from 'react';
import Map from '../../components/Common/Map';

const ParkingManagement = () => {
  const [parkingZones, setParkingZones] = useState([]);
  const [chargingStations, setChargingStations] = useState([]);

  useEffect(() => {
    // Hämta parkeringszoner och laddstationer från API
    // setParkingZones(fetchedParkingZones);
    // setChargingStations(fetchedChargingStations);
  }, []);

  return (
    <div className="admin-parking-management">
      <div className="content">
        <main>
          <h1>Hantera parkeringszoner och laddstationer</h1>
          <Map />
          <div className="zones-list">
            <h2>Parkeringszoner</h2>
            {parkingZones.map(zone => (
              <div key={zone.id}>
                <h3>{zone.name}</h3>
                <p>Antal cyklar: {zone.bikeCount}</p>
                <button>Redigera</button>
              </div>
            ))}
          </div>
          <div className="stations-list">
            <h2>Laddstationer</h2>
            {chargingStations.map(station => (
              <div key={station.id}>
                <h3>{station.name}</h3>
                <p>Lediga platser: {station.availableSlots}</p>
                <button>Redigera</button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ParkingManagement;
