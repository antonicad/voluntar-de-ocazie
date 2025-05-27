import React from 'react';
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2025 Proiectul Voluntar de Ocazie. Toate drepturile rezervate.</p>
        <div className="footer-links">
          <a href="/privacy-policy">Politica de confidențialitate</a>
          <a href="/terms-of-service">Termeni și condiții</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
