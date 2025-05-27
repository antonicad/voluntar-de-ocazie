import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import "../styles/Admin.css";
import Navbar from "../components/Navbar";
import { supabase } from "../assets/supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import profilePic from "../assets/profile.png";

const AdminEvents = () => {
  const [userData, setUserData] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    organizer: "",
  });

  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  useEffect(() => {
    const fetchAdmin = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        navigate("/login");
        return;
      }

      const { data: adminInfo, error: adminError } = await supabase
        .from("admins")
        .select("*")
        .eq("email", user.email)
        .single();

      if (adminError || !adminInfo) {
        navigate("/");
        return;
      }

      setUserData(adminInfo);
      setLoading(false);
    };

    fetchAdmin();
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const { data, error } = await supabase.from("events").select("*").order("date", { ascending: true });
    if (!error) setEvents(data);
  };

  const handleAddEvent = async () => {
    const { error } = await supabase.from("events").insert([newEvent]);
    if (!error) {
      fetchEvents();
      setNewEvent({ title: "", description: "", date: "", location: "", organizer: "" });
    } else {
      console.error("Eroare la adăugare:", error.message);
    }
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (!error) fetchEvents();
  };

  if (loading) return <p>Se încarcă...</p>;

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="left-side">
          <h1>Admin Panel</h1>
          <Link to="/adminevents"><button>Evenimente</button></Link>
          <Link to="/adminusers"><button>Utilizatori</button></Link>
          <Link to="/adminrewards"><button>Premii</button></Link>
          <Link to="/admindonations"><button>Donatii</button></Link>
          <button className="logout" onClick={handleLogout}>Ieși din cont</button>
        </div>

        <div className="right-side">
          <h2>Adaugă Eveniment</h2>
          <div className="event-form">
            <input
              type="text"
              placeholder="Titlu"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Descriere"
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            />
            <input
              type="date"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            />
            <input
              type="text"
              placeholder="Locație"
              value={newEvent.location}
              onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
            />
            <input
              type="text"
              placeholder="Organizator"
              value={newEvent.organizer}
              onChange={(e) => setNewEvent({ ...newEvent, organizer: e.target.value })}
            />
            <button onClick={handleAddEvent}>Adaugă</button>
          </div>

          <h2>Lista Evenimentelor</h2>
          <div className="event-list">
            {events.map((event) => (
              <div key={event.id} className="event-item">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <p><strong>Data:</strong> {new Date(event.date).toLocaleDateString()}</p>
                <p><strong>Locație:</strong> {event.location}</p>
                <p><strong>Organizator:</strong> {event.organizer}</p>
                <button onClick={() => handleDelete(event.id)}>Șterge</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminEvents;
