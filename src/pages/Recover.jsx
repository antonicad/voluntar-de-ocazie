import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Login.css";
import Footer from "../components/Footer";
import { supabase } from "../assets/supabaseClient";

const Recover = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://antonicad.github.io/voluntar-de-ocazie/#/updatepassword",
    });

    if (error) {
      setError("A apărut o eroare. Verifică adresa de email.");
    } else {
      setSuccess("Emailul de resetare a fost trimis. Verifică inbox-ul!");
    }
  };

  return (
    <>
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Recuperează Parola</h1>

          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}

          <label htmlFor="email">Adresa E-mail</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="exemplu@email.com"
            required
          />

          <p>
            Îți amintești parola? <Link to="/login">Autentifică-te</Link>
          </p>

          <button type="submit">Trimite e-mail</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Recover;
