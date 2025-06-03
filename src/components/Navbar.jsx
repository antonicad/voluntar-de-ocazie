import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "../../public/logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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
        <Link to="/doneaza"><button className="donate-btn" onClick={() => setMenuOpen(false)}>Donează</button></Link>
        <Link to="/login"><button className="login-btn" onClick={() => setMenuOpen(false)}>Autentificare</button></Link>
        <Link to="/register"><button className="register-btn" onClick={() => setMenuOpen(false)}>Devino Voluntar 📝</button></Link>
      </div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>
    </nav>
  );
};

export default Navbar;
