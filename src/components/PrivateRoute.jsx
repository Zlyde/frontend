import React from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const PrivateRoute = ({ elemet, allwedRoles, redirectTo }) => {
  const token = localStorage.getItem('token');
  const userData = localStorage.getItem('user')
  const user = JSON.parse(userData)

  if (!token || !allwedRoles.includes(user.role)) {
    return <Navigate to={redirectTo} />;
  }

  return elemet;
};

export default PrivateRoute;
