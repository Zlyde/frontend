import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";
// import AdminRoutes from "./routes/AdminRoutes";
// import CustomerRoutes from "./routes/CustomerRoutes";
// import ServiceRoutes from "./routes/ServiceRoutes";
import Header from "./components/Common/Header";
import Footer from "./components/Common/Footer";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Publika sidor */}
        <Route path="/" element={<LoginPage />} />
        {/* <Route path="/register" element={<RegisterPage />} /> */}

        {/* Skyddade routes */}
        {/* <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/customer/*" element={<CustomerRoutes />} />
        <Route path="/service/*" element={<ServiceRoutes />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
