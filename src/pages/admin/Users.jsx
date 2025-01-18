import React, { useState, useEffect } from 'react';
import { fetchUsers, deleteUser, updateUser } from "../../utils/UserCall";
import { FaTrash, FaEdit, FaCheck, FaTimes, FaSearch } from "react-icons/fa";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editMode, setEditMode] = useState(null);
  const [editData, setEditData] = useState({ name: "", email: "", role: "" });
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
      } catch (err) {
        setError("Kunde inte ladda användare.");
      }
    };

    loadUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (window.confirm("Är du säker på att du vill ta bort användaren?")) {
      try {
        await deleteUser(id);
        setUsers(users.filter((user) => user.id !== id));
      } catch (err) {
        setError("Kunde inte ta bort användaren.");
      }
    }
  };

  const handleEdit = (user) => {
    setEditMode(user.id);
    setEditData({ name: user.name, email: user.email, role: user.role });
  };

  const handleSave = async () => {
    try {
      const updatedUser = await updateUser(editMode, editData);
      setUsers(
        users.map((user) => (user.id === editMode ? updatedUser : user))
      );
      setEditMode(null);
    } catch (err) {
      setError("Kunde inte uppdatera användaren.");
    }
  };

  return (
    <div className="admin-users">
      <div className="content">
        <main>
          <h1>Användarhantering</h1>

          {/* Sökfält */}
          <div className="search-bar">
            <FaSearch />
            <input
              type="text"
              placeholder="Sök efter namn eller e-post..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {error && <p className="error">{error}</p>}

          {/* Tabell */}
          <table className="user-table">
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
              {filteredUsers.map((user) => (
                <tr key={user.id} className={editMode === user.id ? "editing" : ""}>
                  {editMode === user.id ? (
                    <>
                      <td>{user.id}</td>
                      <td>
                        <input
                          type="text"
                          value={editData.name}
                          onChange={(e) =>
                            setEditData({ ...editData, name: e.target.value })
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="email"
                          value={editData.email}
                          onChange={(e) =>
                            setEditData({ ...editData, email: e.target.value })
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={editData.role}
                          onChange={(e) =>
                            setEditData({ ...editData, role: e.target.value })
                          }
                        />
                      </td>
                      <td>
                        <FaCheck className="action-icon" onClick={handleSave} title="Spara" />
                        <FaTimes className="action-icon cancel" onClick={() => setEditMode(null)} title="Avbryt" />
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <FaEdit
                          className="action-icon"
                          onClick={() => handleEdit(user)}
                          title="Redigera"
                        />
                        <FaTrash
                          className="action-icon delete"
                          onClick={() => handleDelete(user.id)}
                          title="Ta bort"
                        />
                      </td>
                    </>
                  )}
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
