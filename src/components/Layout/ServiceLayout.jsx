import React from "react";
import { Outlet } from "react-router-dom";
import ServiceSidebar from "../Service/ServiceSidebar";
import ServiceHeader from "../Service/ServiceHeader";

const ServiceLayout = () => {
  return (
    <>
      <ServiceSidebar />
      <ServiceHeader />
      <Outlet />
    </>
  );
};

export default ServiceLayout;
