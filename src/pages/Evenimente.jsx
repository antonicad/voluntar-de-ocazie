import React, { useEffect, useState } from "react";
import { supabase } from "../assets/supabaseClient";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Evenimente.css";

const Evenimente = () => {
  const [user, setUser] = useState(null);
  const [evenimente, setEvenimente] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserAndEvents = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      const { data: events } = await supabase.from("events").select("*");
      const today = new Date();

      // filtrare doar evenimente cu data în viitor sau azi
      const filteredEvents = events.filter((ev) => new Date(ev.date) >= today);
      setEvenimente(filteredEvents);

      if (user) {
        const { data: userInfo } = await supabase
          .from("users")
          .select("*")
          .eq("email", user.email)
          .single();
        setUserData(userInfo);
      }
    };

    fetchUserAndEvents();
  }, []);

  const handleParticipa = async (eventId, participantsList) => {
    if (!user || !userData) return;
    if (participantsList.includes(user.email)) return;

    const updatedList = [...participantsList, user.email];
    await supabase
      .from("events")
      .update({ participants: updatedList })
      .eq("id", eventId);

    await supabase
      .from("users")
      .update({ nr_evenimente: (userData.nr_evenimente || 0) + 1 })
      .eq("email", user.email);

    const { data: events } = await supabase.from("events").select("*");
    const today = new Date();
    const filteredEvents = events.filter((ev) => new Date(ev.date) >= today);
    setEvenimente(filteredEvents);

    const { data: userInfo } = await supabase
      .from("users")
      .select("*")
      .eq("email", user.email)
      .single();
    setUserData(userInfo);
  };

  const getNextEvent = () => {
    const futureEvents = evenimente
      .filter((ev) => user && ev.participants?.includes(user.email))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    return futureEvents[0];
  };

  return (
    <>
      <Navbar />
      <div className="eventStats">
        {user ? (
          <>
            <h2>Evenimentele tale</h2>
            <p>Evenimente la care te-ai înscris: {userData?.nr_evenimente || 0}</p>
            <p>Următorul tău eveniment:<br /> {getNextEvent()?.title || "Niciunul"}</p>
          </>
        ) : (
          <p>Trebuie să fii autentificat pentru a participa la evenimente.</p>
        )}
      </div>

      <div className="evenimenteContainer">
        <h1>Evenimente</h1>
        {evenimente.map((event) => (
          <div className="eveniment" key={event.id}>
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <p><b>Data:</b> {new Date(event.date).toLocaleDateString()}</p>
            <p><b>Locația:</b> {event.location}</p>
            <p><b>Organizator:</b> {event.organizer}</p>
            <p><b>Participanți:</b> {event.participants?.length || 0}</p>
            {user && event.participants?.includes(user.email) ? (
              <button disabled>Deja înscris</button>
            ) : user ? (
              <button onClick={() => handleParticipa(event.id, event.participants || [])}>
                Participă
              </button>
            ) : (
              <button disabled>Loghează-te pentru a participa</button>
            )}
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
};

export default Evenimente;
