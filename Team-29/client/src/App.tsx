import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import FarmerDashboard from './components/FarmerDashboard'
import AdminDashboard from './components/AdminDashboard'
import AboutUs from './components/AboutUs'
import ContactUs from './components/ContactUs'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Market from './components/Market'
import Farmers from './components/Farmers'
import FarmerProfile from './components/FarmerProfile'
import FarmerEnrollment from './components/FarmerEnrollment'
import EditFarmer from './components/EditFarmer'
import Crops from './components/Crops'
import CropDetail from './components/CropDetail'
import Schemes from './components/Schemes'
import Donations from './components/Donations'
import Login from './components/Login'
import './App.css'

interface User {
  type: 'admin' | 'user';
  id: string;
}

// Create a wrapper component to use useNavigate
function AppContent() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (userType: 'admin' | 'user', userId: string) => {
    setUser({ type: userType, id: userId });
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  // Define navigation items based on user type
  const getNavigationItems = () => {
    const baseItems = [
      { name: "Home", href: "/" },
      { name: "Dashboard", href: "/farmer/101" },
      { name: "Market", href: "/market" },
      { name: "Crops", href: "/crops" },
      { name: "Schemes", href: "/schemes" },
      { name: "Donations/Volunteering", href: "/donations" }
    ];

    // Admin gets all items including Farmers management
    if (user?.type === 'admin') {
      return [...baseItems, { name: "Farmers", href: "/farmers" }, { name: "Admin Dashboard", href: "/admin-dashboard" }];
    }

    // User gets limited items plus About and Contact
    return [...baseItems, { name: "About", href: "/about" }, { name: "Contact Us", href: "/contact" }];
  };

  // Don't show navbar on login page
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="app-container">
      {!isLoginPage && (
        <Navbar navigationItems={getNavigationItems()} onLogout={handleLogout} userType={user?.type} />
      )}
      <main className={`main-content ${isLoginPage ? 'no-navbar' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/farmer/:id" element={<FarmerDashboard userType={user?.type} />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/market" element={<Market />} />
          <Route path="/crops" element={<Crops />} />
          <Route path="/crop-detail/:cropId" element={<CropDetail />} />
          <Route path="/schemes" element={<Schemes />} />
          <Route path="/donations" element={<Donations />} />
          
          {/* Admin-only routes */}
          {user?.type === 'admin' && (
            <>
              <Route path="/farmers" element={<Farmers />} />
              <Route path="/farmer/:phone" element={<FarmerProfile />} />
              <Route path="/farmer-profile/:phone" element={<FarmerProfile />} />
              <Route path="/enrollment" element={<FarmerEnrollment />} />
              <Route path="/edit-farmer/:phone" element={<EditFarmer />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
            </>
          )}
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App 