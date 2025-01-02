import React from "react";
import { Link } from "react-router-dom";

const CustomerSidebar = () => {
  return (
    <div className="sidebar">
      <h3>Customer Menu</h3>
      <ul>
        <li>
          <Link to="/customer/account">Account Details</Link>
        </li>
        <li>
          <Link to="/customer/rental">Rental History</Link>
        </li>
        <li>
          <Link to="/customer/payment">Payment History</Link>
        </li>
      </ul>
    </div>
  );
};

export default CustomerSidebar;
