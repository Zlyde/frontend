import React from "react";

function CustomerHeader() {
  const userData = localStorage.getItem('user')
  const user = JSON.parse(userData)
  
  return (
    <header className="customer-header">
      <h3>Välkommen, {user.name}!</h3>
    </header>
  );
}

export default CustomerHeader;
