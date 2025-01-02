import React from 'react'
import { GeoJSON } from 'react-leaflet'

const City = ({ boundary, color }) => {
  return (
    <GeoJSON
      data={boundary}
      style={{
        color: color,
        weight: 2,
        fillColor: color,
        fillOpacity: 0.5
      }} 
    />
  )
}

export default City
