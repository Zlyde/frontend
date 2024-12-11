import React, { useContext } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import AdminSidebar from '../Admin/AdminSidebar';
import CustomerSidebar from '../Customer/CustomerSidebar';
import ServiceSidebar from '../Service/ServiceSidebar';
import { UserContext } from '../../context/UserContext'; // För användarroll

const MainLayout = () => {
  const { user } = useContext(UserContext); // Antag att du har en UserContext för att hantera användardata

  const renderSidebar = () => {
    switch (user.role) {
      case 'admin':
        return <AdminSidebar />;
      case 'customer':
        return <CustomerSidebar />;
      case 'service':
        return <ServiceSidebar />;
      default:
        return null;
    }
  };

  return (
    <div className="main-layout">
      <div className="sidebar-container">
        {renderSidebar()} {/* Visa rätt sidebar baserat på användarroll */}
      </div>
      <div className="content-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/customer/profile" element={<CustomerProfile />} />
          {/* Lägg till fler rutter för admin, customer, service etc */}
        </Routes>
      </div>
    </div>
  );
};

export default MainLayout;
