import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

import Footer from "../components/Footer";
import { supabase } from "../assets/supabaseClient";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // 1. Login cu Supabase
    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setError("Email sau parolă incorecte.");
      return;
    }

    // 2. Verificare dacă userul e în tabela admins
    const { data: adminData, error: adminError } = await supabase
      .from("admins")
      .select("*")
      .eq("email", email)
      .single();

    if (adminError || !adminData) {
      setError("Nu ai permisiunea de a accesa această zonă.");
      await supabase.auth.signOut(); // deconectare dacă nu e admin
      return;
    }

    // 3. Redirecționează la dashboard admin
    navigate("/admindashboard");
  };

  return (
    <>
      
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Admin Login</h1>

          {error && <p className="error">{error}</p>}

          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@email.com"
            required
          />

          <label htmlFor="password">Parolă</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Introdu parola"
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>
      
    </>
  );
};

export default AdminLogin;
