import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import "../styles/Admin.css";

import { supabase } from "../assets/supabaseClient";
import { Link, useNavigate } from "react-router-dom";

const AdminRewards = () => {
  const [userData, setUserData] = useState(null);
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        navigate("/login");
        return;
      }

      const { data: adminInfo, error: adminError } = await supabase
        .from("admins")
        .select("*")
        .eq("email", user.email)
        .single();

      if (adminError || !adminInfo) {
        navigate("/");
        return;
      }

      setUserData(adminInfo);

      const { data: revendicate, error: rewardError } = await supabase
        .from("revendicat")
        .select("email, premiu");

      if (rewardError) {
        console.error("Eroare la preluarea premiilor:", rewardError.message);
      } else {
        setRewards(revendicate);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

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
          <button className="logout" onClick={handleLogout}>Ieși din cont</button>
        </div>

        <div className="right-side">
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            ⚙️ Open Admin Panel
          </button>
          <h2>Premii revendicate</h2>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Premiu</th>
              </tr>
            </thead>
            <tbody>
              {rewards.length === 0 ? (
                <tr><td colSpan="2">Nu există premii revendicate.</td></tr>
              ) : (
                rewards.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.email}</td>
                    <td>{item.premiu}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminRewards;
