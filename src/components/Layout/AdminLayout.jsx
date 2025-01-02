import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../Admin/AdminSidebar";
import AdminHeader from "../Admin/AdminHeader";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../Common/Footer";

const AdminLayout = () => {
  return (
    <>
      <AdminSidebar />
      <AdminHeader />
      <Outlet />
      <ToastContainer />
      {/* <Footer /> */}
    </>
  );
};

export default AdminLayout;
