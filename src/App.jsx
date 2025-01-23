import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import PrivateRoute from "./components/PrivateRoute";
import MainLayout from "./components/Layout/MainLayout";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import AdminLayout from "./components/Layout/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CustomerLayout from "./components/Layout/CustomerLayout";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import ServiceLayout from "./components/Layout/ServiceLayout";
import ServiceDashboard from "./pages/service/ServiceDashboard";
import Users from "./pages/admin/Users";
import Pricing from "./pages/admin/Pricing";
import Bikes from "./pages/admin/Bikes";
import ParkingManagement from "./pages/admin/ParkingManagement";
import AccountDetails from "./pages/customer/AccountDetails";
import PaymentHistory from "./pages/customer/PaymentHistory";
import RentalHistory from "./pages/customer/RentalHistory";
import GitCallback from "./pages/GitCallback";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path='/oauth/callbackk' element={<GitCallback />}/>

        <Route
          path="/admin/*"
          element={
            <PrivateRoute
              elemet={<AdminLayout />}
              allwedRoles={["admin"]}
              redirectTo="/login"
            />
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Pricing />} />
          <Route path="bikes" element={<Bikes />} />
          <Route path="parkingzones" element={<ParkingManagement />} />
        </Route>

        <Route
          path="/customer/*"
          element={
            <PrivateRoute
              elemet={<CustomerLayout />}
              allwedRoles={["customer"]}
              redirectTo="/login"
            />
          }
        >
          <Route path="dashboard" element={<CustomerDashboard />} />
          <Route path="account" element={<AccountDetails />} />
          <Route path="payment" element={<PaymentHistory />} />
          <Route path="rental" element={<RentalHistory />} />
        </Route>

        <Route
          path="/service/*"
          element={
            <PrivateRoute
              elemet={<ServiceLayout />}
              allwedRoles={["service"]}
              redirectTo="/login"
            />
          }
        >
          <Route path="dashboard" element={<ServiceDashboard />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>,
    ),
  );
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
