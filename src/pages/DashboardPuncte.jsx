import React, { useEffect, useState } from "react";
import { supabase } from "../assets/supabaseClient";
import Navbar from "../components/Navbar";
import "../styles/Dashboard.css";
import { Link, useNavigate } from "react-router-dom";

const DashboardPuncte = () => {
  const [userData, setUserData] = useState(null);
  const [usedCodes, setUsedCodes] = useState([]);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return;

      // Ia datele utilizatorului
      const { data: userInfo } = await supabase
        .from("users")
        .select("*")
        .eq("userid", user.id)
        .single();

      setUserData(userInfo);

      // Ia codurile folosite
      const { data: codesUsed, error } = await supabase
        .from("used_codes")
        .select("used_at, code_id, codes(code)")
        .eq("user_id", user.id)
        .order("used_at", { ascending: false });

      if (!error) {
        setUsedCodes(codesUsed);
      } else {
        console.error("Eroare la coduri:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="left-side">
          <h1>Panoul voluntarului</h1>
          <Link to="/dashboard"><button>Contul meu</button></Link>
          <Link to="/evenimente"><button>Evenimente</button></Link>
          <Link to="/dashboardpremii"><button>Premii</button></Link>
          <Link to="/dashboardpuncte"><button>Info Puncte</button></Link>
          <button className="logout" onClick={handleLogout}>
            Ieși din cont
          </button>
        </div>
        <div className="right-side">
          <h2>Coduri folosite</h2>

          {usedCodes.length === 0 ? (
            <p>Nu ai folosit niciun cod încă.</p>
          ) : (
            <ul>
              {usedCodes.map((entry) => (
                <li key={entry.code_id}>
                  Cod: <strong>{entry.codes.code}</strong> – folosit pe{" "}
                  {new Date(entry.used_at).toLocaleDateString()}
                </li>
              ))}
            </ul>
          )}

          <h3>XP total acumulat: {userData?.experience ?? 0}</h3>

          <hr></hr>
          <div className="regulament">
            <h3>Regulament puncte</h3>
            <p>– Fiecare cod adăugat oferă 50 XP.</p>
            <p>– Codurile pot fi folosite o singură dată.</p>
            <p>– XP-ul se adună și se transformă în niveluri progresive.</p>
            <p>– Încercările de fraudă vor duce la pierderea punctelor.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPuncte;
