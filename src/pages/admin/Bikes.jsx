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
  const [stations, setStations] = useState([]);
  const [zones, setZones] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);
  const numTrips = 16;
  const roomIds = Array.from({ length: numTrips }, (_, i) => `trip${i}`);

  const getCities = async () => {
    const data = await fetchCities();
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

    roomIds.forEach((roomId) => {
      socket.emit("join-trip-room", roomId);
    });

    socket.on("position-updated", (data) => {
      const bike = data;

      setBikes((prevBikes) => {
        const updatedBikes = prevBikes.filter((b) => b.bike_id !== bike.bike_id);
        return [...updatedBikes, bike];
      });
    });

    return () => {
      socket.off("position-updated");
      socket.off("disconnect");
    };
  }, []);

  return (
    <div className="bikes-page">
      {/* Karta */}
      <Map center={center} cities={cities} bikes={bikes} />

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
              <option key={station.id} value={station.id}>
                {station.name}
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
              <option key={zone.id} value={zone.id}>
                {zone.name}
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
            </tr>
          </thead>
          <tbody>
            {bikes.map((bike) => (
              <tr key={bike.bike_id}>
                <td>{bike.bike_id}</td>
                <td>{bike.status}</td>
                <td>
                  {bike.latitude && bike.longitude
                    ? `${bike.latitude.toFixed(4)}, ${bike.longitude.toFixed(4)}`
                    : "Okänd position"}
                </td>
                <td>{bike.type || "Okänd"}</td>
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
