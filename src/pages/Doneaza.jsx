import "../styles/Doneaza.css";

import Footer from "../components/Footer";
import { useState } from "react";
import { supabase } from "../assets/supabaseClient";

const Doneaza = () => {
  const [formData, setFormData] = useState({
    suma: "",
    email: "",
    nume: "",
    telefon: "",
    ziua_nasterii: "",
    observatii: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validare minimă
    if (!formData.suma || !formData.email || !formData.nume) {
      setError("Completează toate câmpurile obligatorii.");
      return;
    }

    const { error } = await supabase.from("donate").insert([formData]);

    if (error) {
      console.error(error);
      setError("A apărut o eroare. Încearcă din nou.");
    } else {
      setSuccess(true);
      setFormData({
        suma: "",
        email: "",
        nume: "",
        telefon: "",
        ziua_nasterii: "",
        observatii: "",
      });
    }
  };

  return (
    <>
      
      <div className="doneazaContainer">
        <h1>Donează</h1>

        <form className="donateForm" onSubmit={handleSubmit}>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">Mulțumim pentru donație!</p>}

          <label>Suma*</label>
          <input
            type="number"
            name="suma"
            value={formData.suma}
            onChange={handleChange}
            placeholder="Ex: 100"
            required
          />

          <label>Email*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="exemplu@email.com"
            required
          />

          <label>Nume*</label>
          <input
            type="text"
            name="nume"
            value={formData.nume}
            onChange={handleChange}
            placeholder="Numele complet"
            required
          />

          <label>Telefon</label>
          <input
            type="tel"
            name="telefon"
            value={formData.telefon}
            onChange={handleChange}
            placeholder="07XXXXXXXX"
          />

          <label>Ziua nașterii</label>
          <input
            type="date"
            name="ziua_nasterii"
            value={formData.ziua_nasterii}
            onChange={handleChange}
          />

          <label>Observații</label>
          <textarea
            name="observatii"
            value={formData.observatii}
            onChange={handleChange}
            placeholder="Orice alte informații..."
          ></textarea>

          <button type="submit">Trimite donația</button>
        </form>
      </div>
      
    </>
  );
};

export default Doneaza;
