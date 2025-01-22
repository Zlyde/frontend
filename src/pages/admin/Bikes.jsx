import React, { useState, useEffect } from "react";
import Map from "../../components/Common/Map";
import { fetchCities } from "../../utils/ApiCall";
import { fetchBikes } from "../../utils/BikeCall";
import {
  fetchStations,
  fetchZones,
  fetchBikesAtStation,
  fetchBikesAtZone,
} from "../../utils/StationZoneCall";
import io from "socket.io-client";

const socket = io("http://localhost:5001");

const MapPage = () => {
  const [center, setCenter] = useState({ lat: 59.329323, lng: 18.068581 });
  const [cities, setCities] = useState([]);
  const [bikes, setBikes] = useState([]);
  const [trips, setTrips] = useState([]);
  const [stations, setStations] = useState([]);
  const [zones, setZones] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);

  const getCities = async () => {
    const data = await fetchCities();
    // console.log(data)
    setCities(data);
  };

  const getBikes = async () => {
    const data = await fetchBikes();
    setBikes(data);
  };

  const getStationsAndZones = async () => {
    try {
      const [stationData, zoneData] = await Promise.all([
        fetchStations(),
        fetchZones(),
      ]);
      // console.log("Fetched zones:", zoneData);
      // console.log("Fetched sations:", stationData);
      setStations(stationData);
      setZones(zoneData);
    } catch (error) {
      console.error("Kunde inte hämta laddstationer eller parkeringszoner", error);
    }
  };

  const handleStationChange = async (stationId) => {
    setSelectedStation(stationId);
    if (stationId) {
      const bikesAtStation = await fetchBikesAtStation(stationId);
      setBikes(bikesAtStation);
    } else {
      await getBikes(); // Återställ till alla cyklar
    }
  };

  const handleZoneChange = async (zoneId) => {
    setSelectedZone(zoneId);
    if (zoneId) {
      const bikesAtZone = await fetchBikesAtZone(zoneId);
      setBikes(bikesAtZone);
    } else {
      await getBikes(); // Återställ till alla cyklar
    }
  };

  useEffect(() => {
    getCities();
    getBikes();
    getStationsAndZones();

    socket.on("admin-trip-update", (trip) => {
      const { bike } = trip

      setTrips((prevTrips) => {
        const updatedTrips = prevTrips.filter((t) => t.trip_id !== trip.trip_id);
        return [...updatedTrips, trip];
      });

      setBikes((prevBikes) => {
        const updatedBikes = prevBikes.filter((b) => b.bike_id !== bike.bike_id);
        return [...updatedBikes, bike];
      });
    });
    
    return () => {
      socket.off("admin-trip-update");
      socket.off("disconnect");
    };
  }, []);

  return (
    <div className="bikes-page">
      {/* Karta */}
      <Map 
        center={center} 
        cities={cities}
        zones={zones}
        stations={stations}  
        bikes={bikes}
      />

      {/* Filter */}
      <div className="filters">
        <h2>Filtrera cyklar</h2>
        <div className="filter-group">
          <label htmlFor="stations">Välj Laddstation:</label>
          <select
            id="stations"
            value={selectedStation || ""}
            onChange={(e) => handleStationChange(e.target.value)}
          >
            <option value="">Alla laddstationer</option>
            {stations.map((station) => (
              <option key={station._id} value={station._id}>
                {station._id}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="zones">Välj Parkeringszon:</label>
          <select
            id="zones"
            value={selectedZone || ""}
            onChange={(e) => handleZoneChange(e.target.value)}
          >
            <option value="">Alla parkeringszoner</option>
            {zones.map((zone) => (
              <option key={zone._id} value={zone.parking_zone_id}>
                {zone.parking_zone_id}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Lista över cyklar */}
      <div className="bike-list">
        <h2>Lista över Cyklar</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Status</th>
              <th>Position</th>
              <th>Typ</th>
              <th>Meddelande</th>
            </tr>
          </thead>
          <tbody>
            {bikes.map((bike) => (
              <tr key={bike.bike_id}>
                <td>{bike.bike_id}</td>
                <td>{bike.status}</td>
                <td>
                  {bike.location || bike.location.coordinates
                    ? `${bike.location.coordinates[1].toFixed(4)}, ${bike.location.coordinates[0].toFixed(4)}`
                    : "Okänd position"}
                </td>
                <td>{bike.type || "Okänd"}</td>
                <td>{bike.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MapPage;





// import React, { useState, useEffect } from "react";
// import Map from "../../components/Common/Map";
// import { fetchCities } from "../../utils/ApiCall";
// import { fetchBikes } from "../../utils/BikeCall";
// import io from "socket.io-client";

// const socket = io("http://localhost:5001");

// const MapPage = () => {
//   const [center, setCenter] = useState({ lat: 59.329323, lng: 18.068581 });
//   const [cities, setCities] = useState([]);
//   const [bikes, setBikes] = useState([]);
//   const numTrips = 16;
//   const roomIds = Array.from({ length: numTrips }, (_, i) => `trip${i}`);

//   const getCities = async () => {
//     const data = await fetchCities();
//     setCities(data);
//   };

//   const getBikes = async () => {
//     const data = await fetchBikes();
//     setBikes(data);
//   };

//   useEffect(() => {
//     getCities();
//     getBikes();

//     roomIds.forEach((roomId) => {
//       socket.emit("join-trip-room", roomId);
//     });

//     socket.on("position-updated", (data) => {
//       const bike = data;

//       setBikes((prevBikes) => {
//         const updatedBikes = prevBikes.filter((b) => b.bike_id !== bike.bike_id);
//         return [...updatedBikes, bike];
//       });
//     });

//     return () => {
//       socket.off("position-updated");
//       socket.off("disconnect");
//     };
//   }, []);

//   return (
//     <div className="bikes-page">
//       {/* Karta */}
//       <Map center={center} cities={cities} bikes={bikes} />

//       {/* Lista över cyklar */}
//       <div className="bike-list">
//         <h2>Lista över Cyklar</h2>
//         <table>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Status</th>
//               <th>Position</th>
//               <th>Typ</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bikes.map((bike) => (
//               <tr key={bike.bike_id}>
//                 <td>{bike.bike_id}</td>
//                 <td>{bike.status}</td>
//                 <td>
//                   {bike.latitude && bike.longitude
//                     ? `${bike.latitude.toFixed(4)}, ${bike.longitude.toFixed(4)}`
//                     : "Okänd position"}
//                 </td>
//                 <td>{bike.type || "Okänd"}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default MapPage;
