import React from "react";
import { useUserContext } from "../../context/UserContext";

function AdminHeader() {
  // const { user } = useUserContext();
  const userData = localStorage.getItem('user')
  const user = JSON.parse(userData)
  return (
    <header className="admin-header">
      <h3>Hej {user.name}</h3>
    </header>
  );
}

export default AdminHeader;
