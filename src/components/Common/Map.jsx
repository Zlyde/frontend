import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import City from "./City";
import Bike from './Bike';

const Map = ({ center, cities, bikes }) => {
  return (
    <MapContainer className="map" center={center} zoom={13}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {cities.length > 0 && cities.map((city) => (
        <City key={city._id} boundary={city.boundary} color={city.color} />
      ))}

      {bikes.length > 0 && bikes.map((bike) => (
        <Bike key={bike._id} bike={bike}/>      
      ))}
    </MapContainer>
  )
}

export default Map
