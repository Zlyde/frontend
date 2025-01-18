import React, { useState, useEffect } from 'react';
import Map from '../../components/Common/Map';
import { fetchStations, fetchZones } from "../../utils/StationZoneCall";

const ParkingManagement = () => {
  const [center] = useState({ lat: 59.329323, lng: 18.068581 });
  const [parkingZones, setParkingZones] = useState([]);
  const [chargingStations, setChargingStations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadLocations = async () => {
    try {
      setLoading(true);
      const [zones, stations] = await Promise.all([
        fetchZones(),
        fetchStations()
      ]);
      
      setParkingZones(zones);
      setChargingStations(stations);
    } catch (err) {
      setError('Kunde inte hämta platser');
      console.error('Error fetching locations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLocations();
  }, []);

  const handleLocationClick = (location, type) => {
    setSelectedLocation({ ...location, type });
  };

  const handleEditLocation = (location) => {
    // Implementera redigering här
    console.log('Redigerar plats:', location);
  };

  // Formattera data för Map-komponenten
  const mapData = {
    cities: [], // Om du behöver visa städer
    bikes: [], // Om du behöver visa cyklar
    zones: parkingZones,
    stations: chargingStations
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Hantera parkeringszoner och laddstationer</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-4">Laddar...</div>
      ) : (
        <>
          <div className="h-[500px] rounded-lg overflow-hidden border">
            <Map 
              center={center}
              {...mapData}
              onZoneClick={(zone) => handleLocationClick(zone, 'zone')}
              onStationClick={(station) => handleLocationClick(station, 'station')}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Parkeringszoner */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-xl font-bold mb-4">Parkeringszoner</h2>
              <div className="space-y-4">
                {parkingZones.map(zone => (
                  <div 
                    key={zone.id} 
                    className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleLocationClick(zone, 'zone')}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{zone.name}</h3>
                        <p className="text-sm text-gray-600">
                          Antal cyklar: {zone.bikeCount || 0}
                        </p>
                      </div>
                      <button 
                        className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditLocation(zone);
                        }}
                      >
                        Redigera
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Laddstationer */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-xl font-bold mb-4">Laddstationer</h2>
              <div className="space-y-4">
                {chargingStations.map(station => (
                  <div 
                    key={station.id} 
                    className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleLocationClick(station, 'station')}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{station.name}</h3>
                        <p className="text-sm text-gray-600">
                          Lediga platser: {station.availableSlots || 0}
                        </p>
                      </div>
                      <button 
                        className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditLocation(station);
                        }}
                      >
                        Redigera
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ParkingManagement;
