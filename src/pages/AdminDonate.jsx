import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import "../styles/Admin.css";
import Navbar from "../components/Navbar";
import { supabase } from "../assets/supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import profilePic from "../assets/profile.png";

const AdminDonate = () => {
  const [userData, setUserData] = useState(null);
  const [donations, setDonations] = useState([]);
  const totalSum = donations.reduce((acc, d) => acc + (d.suma || 0), 0);
  const [loading, setLoading] = useState(true);
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

      const { data: donationsData, error: donateError } = await supabase
        .from("donate")
        .select("*")
        .order("created_at", { ascending: false });

      if (donateError) {
        console.error("Eroare la preluarea donațiilor:", donateError.message);
      } else {
        setDonations(donationsData);
      }

      setLoading(false);
    };

    fetchData();
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

          <h2>Donații înregistrate</h2>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Suma</th>
                <th>Email</th>
                <th>Nume</th>
                <th>Telefon</th>
                <th>Observații</th>
                <th>Ziua nașterii</th>
              </tr>
            </thead>
            <tbody>
              {donations.length === 0 ? (
                <tr><td colSpan="7">Nu există donații înregistrate.</td></tr>
              ) : (
                donations.map((d, idx) => (
                  <tr key={idx}>
                    <td>{new Date(d.created_at).toLocaleString()}</td>
                    <td>{d.suma}</td>
                    <td>{d.email}</td>
                    <td>{d.nume}</td>
                    <td>{d.telefon}</td>
                    <td>{d.observatii}</td>
                    <td>{d.ziua_nasterii}</td>
                  </tr>
                ))
              )}
              <tr className="total-row">
                <td colSpan="7" style={{ textAlign: "right", fontWeight: "bold" }}>
                  Sume încasate: {totalSum} RON
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminDonate;
