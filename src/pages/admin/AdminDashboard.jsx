import React from "react";
import AdminDashboardControls from "../../components/Admin/AdminDashboardControls";
import AdminHeader from "../../components/Admin/AdminHeader";
import AdminSidebar from "../../components/Admin/AdminSidebar";
// import Map from '../../components/Common/Map';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      {/* <AdminHeader /> */}
      <div className="dashboard-content">
        {/* <AdminSidebar /> */}
        <main>
          <h1>Administratörspanel</h1>
          <div className="dashboard-summary">
            <div className="stat-card">
              <h3>Totalt antal cyklar</h3>
              <p>250</p>
            </div>
            <div className="stat-card">
              <h3>Aktiva uthyrningar</h3>
              <p>42</p>
            </div>
            <div className="stat-card">
              <h3>Laddstationer</h3>
              <p>15</p>
            </div>
          </div>
          {/* <Map /> */}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

// const AdminDashboard = () => {
//   return (
//     <>
//       <AdminDashboardControls />
//     </>
//   );
// };