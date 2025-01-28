import React from "react";
import { Outlet } from "react-router-dom";
import CustomerHeader from "../Customer/CustomerHeader";
import CustomerSidebar from "../Customer/CustomerSidebar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CustomerLayout = () => {
  return (
    <>
      <CustomerSidebar />
      <CustomerHeader />
      <Outlet />
      <ToastContainer />
    </>
  );
};

export default CustomerLayout;
