import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import Navbar from "../components/Navbar";
import { supabase } from "../assets/supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import profilePic from "../assets/profile.png"; // mută imaginea în src/assets/

const AdminDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  useEffect(() => {
    const fetchAdmin = async () => {
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
      setLoading(false);
    };

    fetchAdmin();
  }, []);

  if (loading) return <p>Se încarcă...</p>;

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="left-side">
          <h1>Admin Panel</h1>
          <Link to="/adminevents"><button>Evenimente</button></Link>
          <Link to="/adminusers"><button>Utilizatori</button></Link>
          <Link to="/adminrewards"><button>Premii</button></Link>
          <Link to="/admindonations"><button>Donatii</button></Link>
          <button className="logout" onClick={handleLogout}>Ieși din cont</button>
        </div>

        <div className="right-side">
          <img src={profilePic} alt="Profil" />
          <p>Salutare, {userData.nume}!</p>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
