import React from 'react'
import { GeoJSON } from 'react-leaflet'

const City = ({ city }) => {
  if(!city) return
  return (
    <GeoJSON
      data={city.boundary}
      style={{
        color: city.color,
        weight: 2,
        fillColor: city.color,
        fillOpacity: 0.5
      }} 
    />
  )
}

export default City
