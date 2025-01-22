// import React from 'react'
// import { MapContainer, TileLayer } from 'react-leaflet'
// import "leaflet/dist/leaflet.css";
// import City from "./City";
// import Bike from './Bike';

// const Map = ({ center, cities, bikes }) => {
//   return (
//     <MapContainer className="map" center={center} zoom={13}>
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       {cities.length > 0 && cities.map((city) => (
//         <City key={city._id} boundary={city.boundary} color={city.color} />
//       ))}

//       {bikes.length > 0 && bikes.map((bike) => (
//         <Bike key={bike._id} bike={bike}/>      
//       ))}
//     </MapContainer>
//   )
// }

// export default Map



import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import City from "./City";
import Bike from './Bike';
import Zone from './Zone';
import Station from './Station';

const Map = ({ 
  center, 
  cities = [], 
  bikes = [], 
  zones = [], 
  stations = [],
  onZoneClick,
  onStationClick 
}) => {
  // console.log(stations)
  return (
    <MapContainer className="map" center={center} zoom={13}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {cities.length > 0 && cities.map((city) => (
        <City key={city._id} city={city} />
      ))}

      {zones.length > 0 && zones.map((zone) => (
        <Zone key={zone._id} zone={zone} />
      ))}

      {stations.length > 0 && stations.map((station) => (
        <Station key={station._id} station={station} />
      ))}
      
      {bikes.length > 0 && bikes.map((bike) => (
        <Bike key={bike._id} bike={bike} />
      ))}

      {/* {zones.map((zone) => (
        <Marker
          key={zone.id}
          position={[zone.latitude, zone.longitude]}
          eventHandlers={{
            click: () => onZoneClick?.(zone)
          }}
        >
          <Popup>
            <div>
              <h3 className="font-bold">{zone.name}</h3>
              <p>Parkeringszon</p>
              <p>Antal cyklar: {zone.bikeCount || 0}</p>
            </div>
          </Popup>
        </Marker>
      ))}

      {stations.map((station) => (
        <Marker
          key={station.id}
          position={[station.latitude, station.longitude]}
          eventHandlers={{
            click: () => onStationClick?.(station)
          }}
        >
          <Popup>
            <div>
              <h3 className="font-bold">{station.name}</h3>
              <p>Laddstation</p>
              <p>Lediga platser: {station.availableSlots || 0}</p>
            </div>
          </Popup>
        </Marker>
      ))} */}
    </MapContainer>
  );
};

export default Map;