import '../styles/Contact.css'


import Subscribe from '../components/Subscribe.jsx';
import ContactForm from '../components/ContactForm';

const Contact = () => {
  return (
    <>
      
      <div className='contactContainer'>
        <h1>Contactează-ne!</h1>
        <p>
          Ne poți găsi și pe rețelele sociale! 📱💙  
          <br />
          📌 <b>Facebook:</b> <a href="facebook.com">Voluntar de Ocazie</a>  
          <br />
          📸 <b>Instagram:</b> <a href="instagram.com">@voluntardeocazie</a>  
          <br />
          ✉️ <b>E-mail:</b> <a href="mailto:voluntardeocazie@gmail.com">voluntardeocazie@gmail.com</a>  
          <br />
          📞 <b>Telefon:</b> <a href="tel:+40712345678">+40 712 345 678</a>  
        </p>


        <h2>Scrie-ne un mesaj</h2>
        <ContactForm />

        <p className='contact-organizator'>
          <b>Ești un organizator</b> și vrei să faci un eveniment sau dorești să fii unul din partenerii noștri? Trimite-ne un e-mail la adresa <a href="mailto:voluntardeocazie@gmail.com">voluntardeocazie@gmail.com</a> și vom răspunde îndată!
        </p>
      </div>

      <Subscribe />
      
    </>
  );
};

export default Contact;