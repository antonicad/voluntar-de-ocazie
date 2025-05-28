import React, { useEffect, useState } from "react";
import { supabase } from "../assets/supabaseClient";

import "../styles/Dashboard.css";
import { Link, useNavigate } from "react-router-dom";

const DashboardPremii = () => {
  const [premii, setPremii] = useState([]);
  const [userData, setUserData] = useState(null);
  const [revendicate, setRevendicate] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", user.email)
        .single();
      if (!error) {
        setUserData(data);
        fetchRevendicate(user.email);
      }
    }
  };

  const fetchPremii = async () => {
    const { data, error } = await supabase
      .from("premii")
      .select("*")
      .order("nivel_necesar", { ascending: true });

    if (!error) setPremii(data);
  };

  const fetchRevendicate = async (email) => {
    const { data, error } = await supabase
      .from("revendicat")
      .select("premiu")
      .eq("email", email);

    if (!error) {
      const lista = data.map((item) => item.premiu);
      setRevendicate(lista);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const handleRevendica = async (premiu) => {
    if (!userData) return;

    const { error: insertError } = await supabase.from("revendicat").insert([
      {
        email: userData.email,
        premiu: premiu.titlu,
      },
    ]);

    if (insertError) {
      console.error("Eroare la revendicare:", insertError);
      return;
    }

    const { error: updateError } = await supabase
      .from("premii")
      .update({ persoane: premiu.persoane + 1 })
      .eq("id", premiu.id);

    if (updateError) {
      console.error("Eroare la actualizarea numărului de persoane:", updateError);
    }

    setRevendicate([...revendicate, premiu.titlu]);
    alert(`Premiul "${premiu.titlu}" a fost revendicat! Te vom contacta pe e-mail.`);
  };

  useEffect(() => {
    fetchUserData();
    fetchPremii();
  }, []);

  const xpPentruNivel = (nivel) => {
    let xp = 100;
    for (let i = 2; i <= nivel; i++) {
      xp += 20 * (i - 1);
    }
    return xp;
  };

  return (
    <>
      
      <div className="dashboard-container">
        <div className={`left-side ${menuOpen ? "open" : "closed"}`}>
          <h1>Panoul voluntarului</h1>
          <Link to="/dashboard"><button>Contul meu</button></Link>
          <Link to="/evenimente"><button>Evenimente</button></Link>
          <Link to="/dashboardpremii"><button>Premii</button></Link>
          <Link to="/dashboardpuncte"><button>Info Puncte</button></Link>
          <button className="logout" onClick={handleLogout}>Ieși din cont</button>
        </div>

        <div className="right-side">
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            ⚙️ Deschide Panoul Voluntarului
          </button>
          <h2>Premiile tale!</h2>
          <div className="premii">
          {premii.map((premiu) => {
            const revendicat = revendicate.includes(premiu.titlu);
            const xpNecesari = xpPentruNivel(premiu.nivel_necesar);
            const poateRevendica = userData && userData.experience >= xpNecesari;

            return (
              <div key={premiu.id} className="premiu-div">
                <h3>{premiu.titlu}</h3>
                <p>de la level {premiu.nivel_necesar}</p>

                {revendicat ? (
                  <button disabled>Revendicat deja</button>
                ) : poateRevendica ? (
                  <button onClick={() => handleRevendica(premiu)}>Revendică!</button>
                ) : (
                  <button disabled>Nu poți revendica</button>
                )}

                <p>Persoane care au revendicat: {premiu.persoane}</p>
              </div>
            );
          })}
        </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPremii;
