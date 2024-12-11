import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Common/Header";
import Footer from "../Common/Footer";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
