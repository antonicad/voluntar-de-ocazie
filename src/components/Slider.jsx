import React, { useState, useEffect } from "react";
import "../styles/Slider.css";

import poza1 from "./slider-images/poza-1.jpg";
import poza2 from "./slider-images/poza-2.jpg";
import poza3 from "./slider-images/poza-3.jpg";
import poza4 from "./slider-images/poza-4.jpg";
import poza5 from "./slider-images/poza-5.jpg";

const images = [poza1, poza2, poza3, poza4, poza5];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Funcție pentru a merge la imaginea următoare
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Funcție pentru a merge la imaginea anterioară
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Schimbă automat imaginea la fiecare 5 secunde
  useEffect(() => {
    const interval = setInterval(nextSlide, 15000);
    return () => clearInterval(interval); // Curățăm intervalul la unmount
  }, []);

  return (
    <div className="slider">
      <h1>Facem totul așa cum trebuie!</h1>
      <div className="slider-container">
        <button className="slide-left" onClick={prevSlide}>⬅️</button>
        <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="slider-image" />
        <button className="slide-right" onClick={nextSlide}>➡️</button>
      </div>
      <p>
      Fiecare fotografie spune o poveste despre pasiunea, implicarea și energia voluntarilor noștri. De la momente de bucurie și echipă, până la evenimente memorabile, fiecare imagine reflectă dorința noastră de a face o schimbare reală. Alătură-te și tu acestui drum plin de emoții și descoperă cum fiecare gest contează! 💙✨
      </p>
    </div>
  );
};

export default Slider;
