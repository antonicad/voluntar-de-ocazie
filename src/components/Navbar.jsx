import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../assets/supabaseClient"; // importă instanța supabase
import "../styles/Navbar.css";
import logo from "../../public/logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  // verificăm dacă e logat
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();

    // ascultăm schimbările de autentificare
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/">Home</Link>
        <Link to="/cine-suntem">Cine suntem?</Link>
        <Link to="/evenimente">Evenimente</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <div className="nav-center">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
      </div>

      <div className={`nav-right ${menuOpen ? "open" : ""}`}>
        <Link to="/doneaza">
          <button className="donate-btn" onClick={() => setMenuOpen(false)}>Donează</button>
        </Link>

        {user ? (
          <Link to="/dashboard">
            <button className="login-btn" onClick={() => setMenuOpen(false)}>Contul meu</button>
          </Link>
        ) : (
          <Link to="/login">
            <button className="login-btn" onClick={() => setMenuOpen(false)}>Autentificare</button>
          </Link>
        )}

        <Link to="/register">
          <button className="register-btn" onClick={() => setMenuOpen(false)}>Devino Voluntar 📝</button>
        </Link>
      </div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>
    </nav>
  );
};

export default Navbar;
