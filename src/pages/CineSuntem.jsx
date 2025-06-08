import '../styles/CineSuntem.css'

import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import logo from "/logo.png"; 
import voluntar from "../assets/volunteer.jpg";

const CineSuntem = () => {
  return (
    <>
    
    <div className="aboutUsContainer">
      <img src={logo}></img>
      <h1>Despre Voluntar de Ocazie</h1>
      <p>
        🌍 <b>Voluntar de Ocazie</b> este o platformă dedicată celor care vor să facă o schimbare în comunitate, conectând voluntarii cu evenimentele și organizatorii care au nevoie de sprijin. Credem că voluntariatul trebuie să fie accesibil, motivant și interactiv, de aceea am creat un sistem care transformă fiecare acțiune într-o experiență de neuitat.
      </p>
      <br/>
      <p>
        Fie că ești un voluntar entuziast sau un organizator în căutare de ajutor, Voluntar de Ocazie îți oferă un spațiu unde implicarea este apreciată, iar eforturile sunt răsplătite.
      </p>
      
      <h2>Misiunea noastră</h2>
      <p>
        Misiunea noastră este să revoluționăm modul în care voluntarii și organizatorii colaborează. Vrem să eliminăm barierele birocratice și lipsa de vizibilitate care îngreunează accesul la voluntariat.
      </p>
      
      <h2>Viziunea noastră</h2>
      <p>
        Visăm la o lume în care voluntariatul nu este doar o obligație morală, ci o experiență plină de satisfacții, recunoscută și apreciată. Vrem să eliminăm distanța dintre organizatori și voluntari, să oferim soluții digitale moderne și să creăm un ecosistem în care toată lumea câștigă.
      </p>
      <br></br>
      <img src={voluntar}></img>
      
      <h2>Ce oferim?</h2>
      <h3>Pentru voluntari:</h3>
      <ul>
        <li><b>Totul va părea un joc!</b> 🎮 Vei aduna puncte de experiență, achievement-uri și premii speciale.</li>
        <li><b>Acces rapid la informații.</b> 📩 Vei primi notificări despre cele mai noi evenimente și cursuri gratuite.</li>
        <li><b>Recunoaștere și recompense.</b> 🏆 Fiecare efort depus va fi apreciat și documentat.</li>
      </ul>
      
      <h3>Pentru organizatori:</h3>
      <ul>
        <li><b>Promovare GRATUITĂ!</b> 📣 Vom ajuta evenimentul tău să ajungă la voluntarii potriviți.</li>
        <li><b>Voluntarii vor fi la un click distanță!</b> 🖱️ Vei putea invita voluntarii care au mai fost la evenimentele tale.</li>
        <li><b>Creșterea comunității tale.</b> 👥 Acces la o bază mare de voluntari motivați.</li>
      </ul>
      
      <h2>De ce să alegi Voluntar de Ocazie?</h2>
      <ul>
        <li>✅ <b>Pentru că îți facem viața mai ușoară!</b> Un sistem simplu, rapid și eficient.</li>
        <li>✅ <b>Pentru că recunoaștem munca voluntarilor!</b> Oferim diplome, premii și recompense.</li>
        <li>✅ <b>Pentru că oferim o experiență unică!</b> Voluntariatul devine mai dinamic și mai captivant.</li>
      </ul>
      <p className='centered-p'>
        📅 <b>Alătură-te comunității Voluntar de Ocazie și fii parte din schimbare!</b> 🚀
        <Link to="/register"><button>Devino voluntar!</button></Link>
      </p>

    </div>
    
    </>
  );
};

export default CineSuntem;