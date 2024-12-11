import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../Admin/AdminSidebar";
import AdminHeader from "../Admin/AdminHeader";

const AdminLayout = () => {
  return (
    <>
      <AdminSidebar />
      <AdminHeader />
      <Outlet />
    </>
  );
};

export default AdminLayout;
