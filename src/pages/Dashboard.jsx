import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import Navbar from "../components/Navbar";
import { supabase } from "../assets/supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import profilePic from "../assets/profile.png";


const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [codeInput, setCodeInput] = useState("");
  const [popupMessage, setPopupMessage] = useState("");

  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };


  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);

      const { data } = await supabase.auth.getUser();
      const sessionUser = data.user;

      if (!sessionUser) {
        window.location.href = "/login";
        return;
      }

      const { data: userData, error } = await supabase
        .from("users")
        .select("*")
        .eq("userid", sessionUser.id)
        .single();

      if (error) {
        console.error("Eroare la preluarea datelor user:", error);
      } else {
        setUserData(userData);
      }

      setLoading(false);
    };

    fetchUserData();
  }, []);

  const handleCodeSubmit = async () => {
  setPopupMessage("");

  // 1. Verifică dacă codul există
  const { data: codeData, error: codeError } = await supabase
    .from("codes")
    .select("*")
    .eq("code", codeInput)
    .single();

  if (codeError || !codeData) {
    setPopupMessage("Cod invalid!");
    return;
  }

  // 2. Verifică dacă userul a mai folosit codul
  const { data: usedCode, error: usedError } = await supabase
    .from("used_codes")
    .select("*")
    .eq("user_id", userData.userid)
    .eq("code_id", codeData.codeid)
    .maybeSingle();

  if (usedCode) {
    setPopupMessage("Ai folosit deja acest cod!");
    return;
  }

  try {
    // 3. Incrementează counter-ul codului
    await supabase
      .from("codes")
      .update({ counter: codeData.counter + 1 })
      .eq("codeid", codeData.codeid);

    // 4. Adaugă XP la utilizator
    const newXP = userData.experience + 50;
    await supabase
      .from("users")
      .update({ experience: newXP })
      .eq("userid", userData.userid);

    // 5. Marchează codul ca folosit
    await supabase.from("used_codes").insert([
      {
        user_id: userData.userid,
        code_id: codeData.codeid,
      },
    ]);

    // 6. Update local & mesaje
    setUserData((prev) => ({
      ...prev,
      experience: newXP,
    }));

    setPopupMessage("Cod adăugat cu succes! Ai primit 50 XP.");
    setCodeInput("");
  } catch (err) {
    console.error("Eroare la folosirea codului:", err);
    setPopupMessage("A apărut o eroare. Încearcă din nou.");
  }
};

const calculateLevel = (xp) => {
  let level = 1;
  let xpNeeded = 100;

  while (xp >= xpNeeded) {
    level++;
    xp -= xpNeeded;
    xpNeeded += 20;
  }

  return {
    level,
    progressXP: xp,
    nextXP: xpNeeded,
    percent: Math.floor((xp / xpNeeded) * 100)
  };
};



  if (loading) return <p>Se încarcă...</p>;
  if (!userData) return <p>Nu s-au găsit datele utilizatorului.</p>;

  const experience = userData.experience || 0;
  const level = Math.floor(experience / 100) + 1;
  const progressPercent = experience % 100;

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
          <img src={profilePic} alt="Profil" />
          <p>Salutare, {userData.name}!</p>
          <p>Cont creat la: {new Date(userData.created_at).toLocaleDateString()}</p>


        {userData && (
          <div className="nivel-container">
            <div>Nivelul tău: {calculateLevel(userData.experience).level}</div>
            <div className="progress-bar">
              <div
                className="progress"
                style={{ width: `${calculateLevel(userData.experience).percent}%` }}
              ></div>
            </div>
            <small>
              {calculateLevel(userData.experience).progressXP} XP / {calculateLevel(userData.experience).nextXP} XP
            </small>
          </div>
        )}

          <button onClick={() => setShowPopup(true)}>Adaugă cod eveniment</button>


          {/* Popup */}
          {showPopup && (
            <div className="popUpInsertCode">
              <div className="popup">
                <h2>Introdu codul</h2>
                <input
                  type="text"
                  value={codeInput}
                  onChange={(e) => setCodeInput(e.target.value)}
                  placeholder="Ex: ABC123"
                />
                <button onClick={handleCodeSubmit}>Trimite</button>
                <button onClick={() => setShowPopup(false)}>Închide</button>
                {popupMessage && <p>{popupMessage}</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
