import './styles/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Contact from './pages/Contact';
import CineSuntem from './pages/CineSuntem';
import Evenimente from './pages/Evenimente';
import Doneaza from './pages/Doneaza';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import DashboardPuncte from './pages/DashboardPuncte';
import DashboardPremii from './pages/DashboardPremii';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cine-suntem" element={<CineSuntem />} />
        <Route path="/evenimente" element={<Evenimente />} />
        <Route path="/doneaza" element={<Doneaza />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboardpuncte" element={<DashboardPuncte />} />
        <Route path="/dashboardpremii" element={<DashboardPremii />} />
      </Routes>
    </Router>

  );
};

export default App;
