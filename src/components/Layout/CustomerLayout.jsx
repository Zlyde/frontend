import React from "react";
import { Outlet } from "react-router-dom";
import CustomerHeader from "../Customer/CustomerHeader";
import CustomerSidebar from "../Customer/CustomerSidebar";

const CustomerLayout = () => {
  return (
    <>
      <CustomerSidebar />
      <CustomerHeader />
      <Outlet />
    </>
  );
};

export default CustomerLayout;
