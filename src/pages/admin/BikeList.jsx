import React, { useState, useEffect } from 'react';
import { fetchBikes, updateBike } from '../../utils/BikeCall';
import { fetchStations, fetchZones, fetchBikesAtStation, fetchBikesAtZone } from '../../utils/StationZoneCall';
import { fetchCities } from '../../utils/ApiCall';

const BikeList = () => {
  const [center] = useState({ lat: 56.18245003903675, lng: 15.59082446366235 });
  const [bikes, setBikes] = useState([]);
  const [stations, setStations] = useState([]);
  const [zones, setZones] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedStation, setSelectedStation] = useState('');
  const [selectedZone, setSelectedZone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [fetchedBikes, fetchedStations, fetchedZones, fetchedCities] = await Promise.all([
          fetchBikes(),
          fetchStations(),
          fetchZones(),
          fetchCities()
        ]);
        setBikes(Array.isArray(fetchedBikes) ? fetchedBikes : []);
        setBikes(fetchedBikes);
        setStations(fetchedStations);
        setZones(fetchedZones);
        setCities(fetchedCities);
      } catch (error) {
        console.error('Kunde inte hämta data:', error);
      }
    };
    loadData();

  }, []);

const handleStationChange = async (stationId) => {
    setSelectedStation(stationId);
    try {
      if (stationId) {
        const bikesAtStation = await fetchBikesAtStation(stationId);
        if (!bikesAtStation.bikes || bikesAtStation.bikes.length === 0) {
          setErrorMessage(`Inga cyklar hittades vid laddstation ${stationId}`);
          setBikes([]);
        } else {
          setBikes(bikesAtStation.bikes);
          setErrorMessage('');
        }
      } else {
        const data = await fetchBikes();
        setBikes(Array.isArray(data) ? data : []);
        setErrorMessage('');
      }
    } catch (error) {
      console.error('Fel vid hämtning av cyklar:', error);
      setErrorMessage('Finns inga cyklar vid den valda laddstationen.');
      setBikes([]);
    }
  };
  
  const handleZoneChange = async (zoneId) => {
    setSelectedZone(zoneId);
    try {
      if (zoneId) {
        const bikesAtZone = await fetchBikesAtZone(zoneId);
        if (!bikesAtZone.bikes || bikesAtZone.bikes.length === 0) {
          setErrorMessage(`Inga cyklar hittades i parkeringszon ${zoneId}`);
          setBikes([]);
        } else {
          setBikes(bikesAtZone.bikes);
          setErrorMessage('');
        }
      } else {
        const data = await fetchBikes();
        setBikes(Array.isArray(data) ? data : []);
        setErrorMessage('');
      }
    } catch (error) {
      console.error('Fel vid hämtning av cyklar:', error);
      setErrorMessage('Finns inga cyklar vid den valda parkeringszonen.');
      setBikes([]);
    }
  };



  const handleStatusChange = async (bike) => {
    try {
      const newStatus = bike.status === 'maintenance' 
        ? 'available' 
        : 'maintenance';

      const updatedBike = await updateBike(bike.bike_id, { status: newStatus });
      
      setBikes(bikes.map(b => 
        b.bike_id === bike.bike_id ? updatedBike : b
      ));
    } catch (error) {
      console.error('Kunde inte uppdatera cykelstatus:', error);
    }
  };

  return (
    <div className="bikes-admin">

      <div className="filters flex gap-4 mb-4">
        <select 
          value={selectedStation} 
          onChange={(e) => handleStationChange(e.target.value)}
          className="btn"
          >
          <option value="">Alla laddstationer</option>
          {stations.map(station => (
            <option key={station._id} value={station.charging_station_id}>
              {station.charging_station_id}
            </option>
          ))}
        </select>

        <select 
          value={selectedZone} 
          onChange={(e) => handleZoneChange(e.target.value)}
          className="btn"
        >
          <option value="">Alla parkeringszoner</option>
          {zones.map(zone => (
            <option key={zone.parking_zone_id} value={zone.parking_zone_id}>
              {zone.parking_zone_id}
            </option>
          ))}
        </select>
      </div>

      {errorMessage && (
      <div className="error-message" role="alert">
        <p>{errorMessage}</p>
      </div>
    )}

    {bikes.length > 0 ? (
      <table>
        <thead>
          <tr>
            <th>Cykel-ID</th>
            <th>Status</th>
            <th>Battery</th>
            <th>Åtgärder</th>
          </tr>
        </thead>
        <tbody>
          {bikes.map((bike) => (
            <tr key={bike.bike_id}>
              <td>{bike.bike_id}</td>
              <td>{bike.status}</td>
              <td>{bike.battery_level}</td>
              <td>
                <button 
                  onClick={() => handleStatusChange(bike)}
                  className={`btn secondary-btn ${bike.status === 'maintenance' ? 'active' : ''}`}
                >
                  {bike.status === 'maintenance' ? 'Aktivera' : 'Underhåll'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      ) : !errorMessage && (
        <div className="error-message">
          Inga cyklar att visa
        </div>
      )}
    </div>
  );
};

export default BikeList;
