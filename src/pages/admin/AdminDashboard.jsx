import React, { useState, useEffect } from "react";
import { fetchBikeStats } from "../../utils/BikeCall";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalBikes: 0,
    activeRentals: 0,
    chargingStations: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const bikeStats = await fetchBikeStats();
        setStats(bikeStats);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  return (
    <div className="admin-dashboard">
      <div className="dashboard-content">
        <main>
          <h1>Administratörspanel</h1>
          {loading ? (
            <p>Laddar...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            <div className="dashboard-summary">
              <div className="stat-card">
                <h3>Totalt antal cyklar</h3>
                <p>{stats.totalBikes}</p>
              </div>
              <div className="stat-card">
                <h3>Aktiva uthyrningar</h3>
                <p>{stats.activeRentals}</p>
              </div>
              <div className="stat-card">
                <h3>Antal cyklar som laddas</h3>
                <p>{stats.chargingStations}</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
