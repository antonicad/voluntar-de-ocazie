import '../styles/Home.css'
import React, { useState } from 'react';
import Slider from '../components/Slider';
import Partners from '../components/Partners';
import DonateCTA from '../components/DonateCTA';
import { Link } from 'react-router-dom';
import facebook from "../styles/images/facebook.png";
import instagram from "../styles/images/instagram.png";
import x from "../styles/images/x.jpg";


const Home = () => {
      return (
        <>
          
          {/* Banner */}
          <div className='first-Banner'>
            <div className='banner-box'>
                <h1>Bun venit la noi pe site!</h1>
                <p>Proiectul Voluntar de Ocazie dorește să aducă mai aproape voluntarii față de evenimente și organizatori oferind premii și beneficii ambelor părți implicate.</p>
                <button><Link to="/cine-suntem">Află mai multe</Link></button>
            </div>
          </div>

          {/* Servicii */}  
          <div className='servicii-Home'>
            <h1>Ce oferim noi mai exact?</h1>
            <div className='servicii-container'>
                <div>
                    <b>Pentru voluntari</b>
                    <ul>
                        <li><b>Totul va părea ca un joc!</b><br /> Ca voluntar, vei aduna puncte de experiență în platforma noastră, vei debloca achievement-uri, iar pe parcursul avansării în nivel vei primi bonusuri, premii și diplome.</li>
                    </ul>
                    <ul>
                        <li><b>Vei fi la curent!</b><br /> Vei primi săptămânal știri despre cele mai noi evenimente, despre cursuri gratuite și despre concursuri făcute de către organizatorii noștri parteneri.</li>
                    </ul>
                    <br /><b>Ce mai aștepți?</b><br />
                    <Link to="/register"><button>Devino Voluntar!</button></Link>
                </div>
                <div>
                    <b>Pentru organizatori</b>
                    <ul>
                        <li><b>Îți vei promova mai ușor evenimentul!</b><br /> Ne vom ocupa GRATUIT de promovarea evenimentelor unde este nevoie de voluntari și aceștia se vor alătura mult mai ușor fiind motivați de sistemul nostru să participe.</li>
                    </ul>
                    <ul>
                        <li><b>Voluntarii vor fi la un click distanță!</b><br /> În meniul dedicat organizatorilor vei găsi cu ușurință voluntarii care au mai fost la evenimentele tale și îi vei putea chema ori de câte ori ai nevoie.</li>
                    </ul>
                    <br /><b>Ce mai aștepți?</b><br />
                    <Link to="/contact"><button>Organizează un eveniment!</button></Link>
                </div>
            </div>
          </div>

          {/* Imagini */}
          <Slider />

          {/* Doneaza */}
          <DonateCTA />

          {/* Parteneri */}
          <Partners />

          {/* Social Media */}
          <div className="social-media">
            <h1>Urmărește-ne pe Social Media!</h1>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <img src={facebook} alt="Facebook" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <img src={instagram} alt="Instagram" />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer">
                <img src={x} alt="x" />
              </a>
            </div>
          </div>

          <div className="contactUs">
            <h1>Intră în legătură cu noi</h1>
            <Link to="/contact">
            <button> Contactează-ne!</button>
            </Link>
          </div>

          
        </>
      );
};

export default Home;