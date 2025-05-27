import React from "react";
import { Link } from 'react-router-dom';
import "../styles/DonateCTA.css";

const DonateCTA = () => {
  return (
    <div className="donate-section">
      <h1>Vrei să ne ajuți?</h1>
      <p>
        Donează separat sau contribuie la acest proiect completând formularul de 
        redirecționare a impozitului. Orice ajutor contează!
      </p>
      <div className="donate-buttons">
        <Link to="/donate"><button className="donate-btn-home">Donează 💖</button></Link>
      </div>
    </div>
  );
};

export default DonateCTA;
