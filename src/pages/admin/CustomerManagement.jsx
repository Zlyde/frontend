import React, { useState, useEffect } from "react";
import { fetchUsers, deleteUser, updateUser } from "../../utils/UserCall";
import { FaTrash, FaEdit, FaCheck, FaTimes, FaSearch } from "react-icons/fa";

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editMode, setEditMode] = useState(null); // Kund som redigeras
  const [editData, setEditData] = useState({});
  const [error, setError] = useState("");

  // Hämta kunddata från API vid montering
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUsers(); // Använder fetchUsers för att hämta användardata
        // Filtrera användare med rollen 'customer'
        const customersWithRole = data.filter(user => user.role === 'customer');
        setCustomers(customersWithRole);
      } catch (err) {
        setError("Kunde inte hämta kunddata.");
        console.error(err);
      }
    };
    fetchData();
  }, []);

  // Filtrera kunder baserat på sökterm
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Hantera redigering
  const handleEdit = (customer) => {
    setEditMode(customer.id || customer._id); // Antingen id eller _id
    setEditData({ ...customer }); // Kopiera data från kunden som redigeras
  };

  const handleSave = async () => {
    try {
      await updateUser(editMode, editData); // Använder updateUser för att uppdatera data
      setCustomers(
        customers.map((customer) =>
          customer.id === editMode || customer._id === editMode ? editData : customer
        )
      );
      setEditMode(null); // Avsluta redigeringsläge
    } catch (err) {
      setError("Kunde inte uppdatera kunden.");
      console.error(err);
    }
  };

  // Hantera radering
  const handleDelete = async (id) => {
    if (window.confirm("Är du säker på att du vill ta bort denna kund?")) {
      try {
        await deleteUser(id); // Använder deleteUser för att radera kunden
        setCustomers(customers.filter((customer) => customer.id !== id && customer._id !== id));
      } catch (err) {
        setError("Kunde inte ta bort kunden.");
        console.error(err);
      }
    }
  };

  return (
    <div className="admin-users">
      <div className="content">
        <main>
          <h1>Kundhantering</h1>

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

          {/* Felmeddelande */}
          {error && <p className="error">{error}</p>}

          {/* Tabell */}
          <table className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Namn</th>
                <th>E-post</th>
                <th>Telefon</th>
                <th>Åtgärder</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr
                  key={customer.id || customer._id}
                  className={editMode === (customer.id || customer._id) ? "editing" : ""}
                >
                  {editMode === (customer.id || customer._id) ? (
                    <>
                      {/* Redigeringsläge */}
                      <td>{customer.id || customer._id}</td>
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
                          value={editData.phone || ""}
                          onChange={(e) =>
                            setEditData({ ...editData, phone: e.target.value })
                          }
                        />
                      </td>
                      <td>
                        <FaCheck
                          className="action-icon"
                          onClick={handleSave}
                          title="Spara"
                        />
                        <FaTimes
                          className="action-icon cancel"
                          onClick={() => setEditMode(null)}
                          title="Avbryt"
                        />
                      </td>
                    </>
                  ) : (
                    <>
                      {/* Visningsläge */}
                      <td>{customer.id || customer._id}</td>
                      <td>{customer.name}</td>
                      <td>{customer.email}</td>
                      <td>{customer.phone || "Ej angivet"}</td>
                      <td>
                        <FaEdit
                          className="action-icon"
                          onClick={() => handleEdit(customer)}
                          title="Redigera"
                        />
                        <FaTrash
                          className="action-icon delete"
                          onClick={() =>
                            handleDelete(customer.id || customer._id)
                          }
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

export default CustomerManagement;
