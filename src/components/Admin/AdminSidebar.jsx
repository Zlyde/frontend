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
          <Link to="/admin/users">Hantera användare</Link>
        </li>
        <li>
          <Link to="/admin/settings">Prissättning</Link>
        </li>
        <li>
          <Link to="/admin/bikes">Hantera cyklar, stationer och zoner</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
