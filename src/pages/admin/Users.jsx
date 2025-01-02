import React, { useState, useEffect } from 'react';
import AdminHeader from "../../components/Admin/AdminHeader";
import AdminSidebar from "../../components/Admin/AdminSidebar";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Hämta användardata från API
    // setUsers(fetchedUsers);
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-users">
      {/* <AdminHeader /> */}
      <div className="content">
        {/* <AdminSidebar /> */}
        <main>
          <h1>Användarhantering</h1>
          <input
            type="text"
            placeholder="Sök användare..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Namn</th>
                <th>E-post</th>
                <th>Roll</th>
                <th>Åtgärder</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button>Redigera</button>
                    <button>Ta bort</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
};

export default Users;
