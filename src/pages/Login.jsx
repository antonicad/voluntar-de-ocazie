import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

import Footer from "../components/Footer";
import { supabase } from "../assets/supabaseClient";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Verifică dacă userul e deja autentificat
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        navigate("/dashboard");
      }
    };
    checkUser();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Toate câmpurile sunt obligatorii!");
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError("Eroare la autentificare! Verifică datele.");
        return;
      }

      console.log("Autentificare reușită!", data);
      setError("");
      navigate("/dashboard");
    } catch (err) {
      setError("Eroare la autentificare! Verifică datele.");
      console.error(err);
    }
  };

  return (
    <>
      

      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Loghează-te</h1>

          {error && <p className="error">{error}</p>}

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
            placeholder="Introdu parola"
          />

          <p>
            Ai uitat parola? <Link to="/recover">Recuperează parola</Link>
            <br></br>
            Nu ai un cont? <Link to="/register">Creează unul aici</Link>
          </p>

          <button type="submit">Loghează-te</button>
        </form>
      </div>

      
    </>
  );
};

export default Login;
