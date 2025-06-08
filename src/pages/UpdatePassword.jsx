import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../assets/supabaseClient";

const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [accessToken, setAccessToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace("#", ""));
    const token = params.get("access_token");
    setAccessToken(token);
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!accessToken) {
      setMessage("Token lipsă. Reîncearcă procedura de resetare.");
      return;
    }

    const { data, error } = await supabase.auth.updateUser(
      { password },
      { accessToken }
    );

    if (error) {
      setMessage("Eroare: " + error.message);
      await supabase.auth.signOut();
    } else {
      setMessage("Parola a fost schimbată cu succes! Te redirecționăm...");
      setTimeout(() => navigate("/login"), 2000);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleUpdate}>
        <h1>Setează o parolă nouă</h1>
        {message && <p>{message}</p>}
        <label>Noua parolă</label>
        <input
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Salvează parola</button>
      </form>
    </div>
  );
};

export default UpdatePassword;
