import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "../assets/supabaseClient";

const UpdatePassword = () => {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const accessToken = searchParams.get("access_token");

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
