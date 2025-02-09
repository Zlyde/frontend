import React, { useState, useEffect } from 'react';
import { fetchBikes, updateBike } from '../../utils/BikeCall';
import { fetchStations, fetchZones, fetchBikesAtStation, fetchBikesAtZone } from '../../utils/StationZoneCall';
import { fetchCities } from '../../utils/ApiCall';
import Map from '../../components/Common/Map';
import io from 'socket.io-client';

const socket = io("http://localhost:5001");

const Bikes = () => {
  const [center] = useState({ lat: 56.18245003903675, lng: 15.59082446366235 });
  const [bikes, setBikes] = useState([]);
  const [stations, setStations] = useState([]);
  const [zones, setZones] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedStation, setSelectedStation] = useState('');
  const [selectedZone, setSelectedZone] = useState('');

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

    socket.on("admin-trip-update", (trip) => {
      const { bike } = trip;
      setBikes((prevBikes) => {
        const updatedBikes = prevBikes.filter((b) => b.bike_id !== bike.bike_id);
        return [...updatedBikes, bike];
      });
    });

    return () => {
      socket.off("admin-trip-update");
    };
  }, []);

  // const handleStationChange = async (stationId) => {
  //   setSelectedStation(stationId);
  //   if (stationId) {
  //     const bikesAtStation = await fetchBikesAtStation(stationId);
  //     console.log("available bikes", bikesAtStation.bikes)
  //     setBikes(bikesAtStation.bikes);
  //     console.log(bikes);
  //   } else {
  //     const data = await fetchBikes();
  //     setBikes(Array.isArray(data) ? data : []);
  //   }
  // };

  // const handleZoneChange = async (zoneId) => {
  //   setSelectedZone(zoneId);
  //   if (zoneId) {
  //     const bikesAtZone = await fetchBikesAtZone(zoneId);
  //     setBikes(bikesAtZone.bikes);
  //   } else {
  //     const data = await fetchBikes();
  //     setBikes(Array.isArray(data) ? data : []);
  //   }
  // };

  // const handleStatusChange = async (bike) => {
  //   try {
  //     const newStatus = bike.status === 'maintenance' 
  //       ? 'available' 
  //       : 'maintenance';

  //     const updatedBike = await updateBike(bike.bike_id, { status: newStatus });

  //     setBikes(bikes.map(b => 
  //       b.bike_id === bike.bike_id ? updatedBike : b
  //     ));
  //   } catch (error) {
  //     console.error('Kunde inte uppdatera cykelstatus:', error);
  //   }
  // };

  return (
    <div className="bikes-admin">
      <Map 
        center={center} 
        cities={cities}
        zones={zones}
        stations={stations}  
        bikes={bikes}
      />

      {/* <div className="filters flex gap-4 mb-4">
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

      <table>
        <thead>
          <tr>
            <th>Cykel-ID</th>
            <th>Status</th>
            <th>Battery</th>
            <th>Zon</th>
            <th>Typ</th>
            <th>Åtgärder</th>
          </tr>
        </thead>
        <tbody>
          {bikes.map((bike) => (
            <tr key={bike.bike_id}>
              <td>{bike.bike_id}</td>
              <td>{bike.status}</td>
              <td>{bike.battery_level}</td>
              <td>{bike.parking_zone_id || 'Ingen'}</td>
              <td>{bike.type || 'Okänd'}</td>
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
      </table> */}
    </div>
  );
};

export default Bikes;
