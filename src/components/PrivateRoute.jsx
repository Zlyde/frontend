import React from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const PrivateRoute = ({ elemet, allwedRoles, redirectTo }) => {
  const { user } = useUserContext();

  if (!user || !allwedRoles.includes(user.role)) {
    return <Navigate to={redirectTo} />;
  }

  return elemet;
};

export default PrivateRoute;
