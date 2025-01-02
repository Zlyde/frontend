import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="sidebar">
      <h3>Admin Menu</h3>
      <ul>
        <li>
          <Link to="/admin/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/admin/users">Manage Users</Link>
        </li>
        <li>
          <Link to="/admin/settings">Settings</Link>
        </li>
        <li>
          <Link to="/admin/bikes">Manage and view bikes</Link>
        </li>
        <li>
          <Link to="/admin/parkingzones">Manage Parking Zones</Link>
        </li>
        <li>
          <Link to="/admin/customers">Manage Customers</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
