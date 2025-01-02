import React from 'react'
import { Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import scooterImg from '../../assets/scooter.png'

const Bike = ({ bike }) => {
  if (!bike || !bike.location || !bike.location.coordinates || bike.status !== "available") {
    return null
  }

  const bikeIcon = new L.icon({
    iconUrl: scooterImg,
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  })

  const startRideButton = {
    backgroundColor: "#4CAF50",
    color: "white",
    cursor: "pointer",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
  }

  return (
    <Marker 
      position={[
        bike.location.coordinates[1],
        bike.location.coordinates[0]
      ]}
      icon={bikeIcon}
    >
      <Popup>
        <div>
          <h3>Bike Info</h3>
          <p><strong>ID:</strong> {bike.bike_id}</p>
          <p><strong>Battery:</strong> {bike.battery_level}</p>
          <button style={startRideButton}>
            Start Ride
          </button>
        </div>
      </Popup>
    </Marker>
  )
}

export default Bike
