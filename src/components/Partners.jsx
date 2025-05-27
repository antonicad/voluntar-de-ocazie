import React from "react";
import "../styles/Partners.css";

import poza1 from "./partner-images/crucea-rosie.png";
import poza2 from "./partner-images/unicef.png";
import poza3 from "./partner-images/disney.webp";
import poza4 from "./partner-images/facebook.png";
import poza5 from "./partner-images/feaa.png";
import poza6 from "./partner-images/google.webp";
import poza7 from "./partner-images/mcdonalds.png";
import poza8 from "./partner-images/greenpeace.png";
import poza9 from "./partner-images/duolingo.png";

const partners = [poza1, poza2, poza3, poza4, poza5, poza6, poza7,poza8, poza9];

const Partners = () => {
  return (
    <div className="partners-section">
      <h1>Partenerii noștri</h1>
      <div className="carousel">
        <div className="carousel-track">
          {partners.map((logo, index) => (
            <a href="https://partner.com" key={index}>
              <img src={logo} alt={`Partner ${index + 1}`} />
            </a>
          ))}
          {partners.map((logo, index) => (
            <a href="https://partner.com" key={`clone-${index}`}>
              <img src={logo} alt={`Partner ${index + 1}`} />
            </a>
          ))}
          {partners.map((logo, index) => (
            <a href="https://partner.com" key={`clone-${index}`}>
              <img src={logo} alt={`Partner ${index + 1}`} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partners;
