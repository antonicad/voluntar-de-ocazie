import React, { useState } from "react";
import "../styles/Subscribe.css";

const Subscribe = () => {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("access_key", "70d2048f-23ce-4bd0-b93d-902b841ade63");
    formData.append("email", email);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      alert("Te-ai abonat cu succes!");
      setEmail("");
      setShowForm(false);
    } else {
      alert("A apărut o eroare. Încearcă din nou.");
    }
  };

  return (
    <>
      <button className="newsletter-btn" onClick={() => setShowForm(!showForm)}>
        📩 Newsletter
      </button>

      {showForm && (
        <div className="newsletter-popup">
          <form onSubmit={handleSubmit}>
            <h3>Abonează-te la Newsletter</h3>
            <input
              type="email"
              placeholder="Introdu email-ul"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Abonează-te</button>
          </form>
        </div>
      )}
    </>
  );
};

export default Subscribe;
