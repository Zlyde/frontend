import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Header from "../Common/Header";
import Footer from "../Common/Footer";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <ToastContainer />
      <Footer />
    </>
  );
};

export default MainLayout;
