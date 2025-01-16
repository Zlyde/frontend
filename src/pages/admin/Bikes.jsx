import React, { useState, useEffect } from "react";
import Map from "../../components/Common/Map";
import { fetchCities } from "../../utils/ApiCall";
import { fetchBikes } from "../../utils/BikeCall";
import io from "socket.io-client";

const socket = io("http://localhost:5001");

const MapPage = () => {
  const [center, setCenter] = useState({ lat: 59.329323, lng: 18.068581 });
  const [cities, setCities] = useState([]);
  const [bikes, setBikes] = useState([]);
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

  useEffect(() => {
    getCities();
    getBikes();

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
