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
      </ul>
    </div>
  );
};

export default AdminSidebar;
