import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import "../styles/Admin.css";

import { supabase } from "../assets/supabaseClient";
import { Link, useNavigate } from "react-router-dom";

const AdminUsers = () => {
  const [userData, setUserData] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) return navigate("/login");

      const { data: adminInfo, error: adminError } = await supabase
        .from("admins")
        .select("*")
        .eq("email", user.email)
        .single();

      if (adminError || !adminInfo) return navigate("/");

      setUserData(adminInfo);

      const { data: usersData } = await supabase.from("users").select("*");
      setUsers(usersData.map(u => ({ ...u, originalEmail: u.email })));
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleDelete = async (email) => {
    await supabase.from("users").delete().eq("email", email);
    setUsers(users.filter((u) => u.email !== email));
  };

  const handleUpdate = async (index) => {
    const user = users[index];
    await supabase
      .from("users")
      .update({
        email: user.email,
        experience: user.experience,
        nume: user.nume
      })
      .eq("email", user.originalEmail);

    const updatedUsers = [...users];
    updatedUsers[index].originalEmail = user.email;
    setUsers(updatedUsers);
  };

  const handleChange = (index, field, value) => {
    const updatedUsers = [...users];
    updatedUsers[index][field] = value;
    setUsers(updatedUsers);
  };

  if (loading) return <p>Se încarcă...</p>;

  return (
    <>
      
      <div className="dashboard-container">
        <div className={`left-side ${menuOpen ? "open" : "closed"}`}>
          <h1>Admin Panel</h1>
          <Link to="/adminevents"><button>Evenimente</button></Link>
          <Link to="/adminusers"><button>Utilizatori</button></Link>
          <Link to="/adminrewards"><button>Premii</button></Link>
          <Link to="/admindonations"><button>Donatii</button></Link>
          <button className="logout" onClick={() => supabase.auth.signOut().then(() => navigate("/login"))}>
            Ieși din cont
          </button>
        </div>

        <div className="right-side">
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            ⚙️ Open Admin Panel
          </button>
          <h2>Lista utilizatori</h2>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nume</th>
                <th>Email</th>
                <th>Experiență</th>
                <th>Acțiuni</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user.email}>
                  <td>
                    <input
                      type="text"
                      value={user.name || ""}
                      onChange={(e) => handleChange(idx, "nume", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      value={user.email}
                      onChange={(e) => handleChange(idx, "email", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={user.experience || 0}
                      onChange={(e) => handleChange(idx, "experience", parseInt(e.target.value))}
                    />
                  </td>
                  <td>
                    <button onClick={() => handleUpdate(idx)}>Salvează</button>
                    <button onClick={() => handleDelete(user.email)} className="delete-btn">Șterge</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminUsers;
