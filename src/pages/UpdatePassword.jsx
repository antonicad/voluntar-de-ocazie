import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import Footer from "../components/Footer";
import { supabase } from "../assets/supabaseClient";

const UpdatePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      setError("A apărut o eroare la schimbarea parolei. Încearcă din nou.");
    } else {
      setMessage("Parola a fost schimbată cu succes!");
      setTimeout(() => navigate("/login"), 2000);
    }
  };

  return (
    <>
      <div className="login-container">
        <form className="login-form" onSubmit={handleUpdatePassword}>
          <h1>Setează Parolă Nouă</h1>

          {message && <p className="success">{message}</p>}
          {error && <p className="error">{error}</p>}

          <label htmlFor="newPassword">Parolă nouă</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Parolă nouă"
          />

          <button type="submit">Salvează</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default UpdatePassword;
