import React, { useState, useEffect } from "react";
import Map from "../../components/Common/Map";
import { fetchCities } from "../../utils/ApiCall";
import { fetchBikes } from "../../utils/BikeCall";
import io from 'socket.io-client'

const socket = io('http://localhost:5001')

const MapPage = () => {
  const [center, setCenter] = useState({ lat: 59.329323, lng: 18.068581 });
  const [cities, setCities] = useState([])
  const [bikes, setBikes] = useState([])
  const numTrips = 16;
  const roomIds = Array.from({ length: numTrips }, (_, i) => `trip${i}`);

  const getCities = async () => {
    const data = await fetchCities()
    // console.log(data)
    setCities(data)
  }

  const getBikes = async () => {
    const bikes = await fetchBikes()
    // console.log(bikes)
    setBikes(bikes)
  }

  useEffect(() => {
    getCities()
    getBikes()

    roomIds.forEach((roomId) => {
      socket.emit("join-trip-room", roomId);
    });

    // const tripiD = 'trip1'
    // socket.emit('join-trip-room', (tripiD))

    socket.on('position-updated', (data) => {
      const bike = data

      setBikes((prevBikes) => {
        const updateBikes = prevBikes.filter((b) => b.bike_id !== bike.bike_id)
        return [...updateBikes, bike]
      })
    })

    return () => {
      socket.off('position-updated');
      socket.off('disconnect')
    }
  }, [])

  return <Map center={center} cities={cities} bikes={bikes} />
};

export default MapPage;





// import React, { useState, useEffect } from 'react';
// import Map from '../../components/Common/Map';
// import AdminHeader from '../../components/Admin/AdminHeader';
// import AdminSidebar from '../../components/Admin/AdminSidebar';

// const Bikes = () => {
//   const [bikes, setBikes] = useState([]);

//   useEffect(() => {
//     // Hämta cykeldata från API
//     // setBikes(fetchedBikes);
//   }, []);

//   return (
//     <div className="admin-bikes">
//       <AdminHeader />
//       <div className="content">
//         <AdminSidebar />
//         <main>
//           <h1>Cykelhantering</h1>
//           <div className="bike-list">
//             <h2>Alla cyklar</h2>
//             <table>
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Status</th>
//                   <th>Batterinivå</th>
//                   <th>Position</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {bikes.map(bike => (
//                   <tr key={bike.id}>
//                     <td>{bike.id}</td>
//                     <td>{bike.status}</td>
//                     <td>{bike.batteryLevel}%</td>
//                     <td>{bike.position}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <Map />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Bikes;
