import React, { useState } from "react";
import "../styles/ContactForm.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("access_key", "70d2048f-23ce-4bd0-b93d-902b841ade63");
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("message", formData.message);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: data,
    });

    if (response.ok) {
      setStatus("Mesaj trimis cu succes!");
      setFormData({ name: "", email: "", message: "" });
    } else {
      setStatus("A apărut o eroare. Încearcă din nou.");
    }
  };

  return (
    <div className="contact-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Numele tău"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email-ul tău"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          className="inputMessage"
          name="message"
          placeholder="Mesajul tău..."
          rows="5"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">Trimite</button>
      </form>
      {status && <p className="status-message">{status}</p>}
    </div>
  );
};

export default ContactForm;
