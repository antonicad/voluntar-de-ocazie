import React, { useState } from "react";
import "../styles/Login.css";
import { Link } from "react-router-dom";

import Footer from "../components/Footer";
import { supabase } from "../assets/supabaseClient";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword || !name) {
      setError("Toate câmpurile sunt obligatorii!");
      return;
    }

    if (password !== confirmPassword) {
      setError("Parolele nu coincid!");
      return;
    }

    try {
      // 1. Creează cont în Supabase Auth
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) throw signUpError;

      const userId = data.user?.id;

      // 2. Inserează utilizatorul în tabela "users"
      const { error: insertError } = await supabase.from("users").insert([
        {
          userid: userId,
          email,
          name,
          // experience se setează implicit cu 0 în baza de date
        },
      ]);

      if (insertError) throw insertError;

      setSuccess("Cont creat cu succes! Vei primi un e-mail pentru confirmare.");
      setError("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setName("");
    } catch (err) {
      console.error("Eroare la înregistrare:", err);
      setError("A apărut o eroare la înregistrare. Încearcă din nou.");
    }
  };

  return (
    <>
      

      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Devino Voluntar!</h1>

          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}

          <label htmlFor="name">Nume</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Numele tău"
          />

          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="exemplu@email.com"
          />

          <label htmlFor="password">Parola</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Alege o parolă"
          />

          <label htmlFor="confirmPassword">Confirmă Parola</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Reintrodu parola"
          />

          <p>Ai deja un cont? <Link to="/login">Autentifică-te aici</Link></p>
          <button type="submit">Înregistrează-te</button>
        </form>
      </div>

      
    </>
  );
};

export default Register;
