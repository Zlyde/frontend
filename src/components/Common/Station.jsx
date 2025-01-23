import React from 'react'
import { GeoJSON, Marker, Popup } from 'react-leaflet'
import plugg from '../../assets/plugin.png'
import L from 'leaflet'

const Station = ({ station }) => {
  if (!station) return
  console.log(station)
  const getCenter = (coordinates) => {
    const latLngs = coordinates[0]; // Use the first polygon (excluding holes)
    let latSum = 0;
    let lngSum = 0;

    latLngs.forEach(([lng, lat]) => {
      latSum += lat;
      lngSum += lng;
    });

    const latCenter = latSum / latLngs.length;
    const lngCenter = lngSum / latLngs.length;

    return [latCenter, lngCenter];
  }
  const center = getCenter(station.location.coordinates);

  const pIcon = new L.icon({
    iconUrl: plugg,
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  })
  return (
    <>
      <GeoJSON
        data={station.location}
        style={{
          color: station.color,
          weight: 2,
          fillColor: station.color,
          fillOpacity: 0.3
        }} 
      />
      <Marker
        position={center}
        icon={pIcon}
      >

        <Popup>
          <div>
            <h3 className="font-bold">{station.charging_station_id}</h3>
            <p>Laddstation</p>
            {/* <p>Antal cyklar: {zone.bikeCount || 0}</p> */}
          </div>
        </Popup>
      </Marker>
    </>
  )
}

export default Station
