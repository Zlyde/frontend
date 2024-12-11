import React from "react";
import { Link } from "react-router-dom";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
// import { UserProvider } from './context/UserContext';
// import MainLayout from './components/Layout/MainLayout';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Home from "./pages/Home";
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
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<Home />} />
            {/* <Link to="/register">Registrera dig här</Link> */}
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
