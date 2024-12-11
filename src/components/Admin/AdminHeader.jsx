import React from "react";
import { useUserContext } from "../../context/UserContext";

function AdminHeader() {
  const { user } = useUserContext();
  return (
    <header className="admin-header">
      <h3>Hej {user.name}</h3>
    </header>
  );
}

export default AdminHeader;
