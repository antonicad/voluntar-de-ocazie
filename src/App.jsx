import './styles/App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
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
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminEvents from './pages/AdminEvents';
import AdminUsers from './pages/AdminUsers';
import AdminRewards from './pages/AdminRewards';
import AdminDonate from './pages/AdminDonate';
import Newsletter from './components/Subscribe';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  return (
    <HashRouter>
      <Navbar />
      <Newsletter />
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
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/adminevents" element={<AdminEvents />} />
        <Route path="/adminusers" element={<AdminUsers />} />
        <Route path="/adminrewards" element={<AdminRewards />} />
        <Route path="/admindonations" element={<AdminDonate />} />
      </Routes>
      <Footer />
    </HashRouter>
  );
};

export default App;
