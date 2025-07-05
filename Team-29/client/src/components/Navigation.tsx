import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🍃 Centre For MicroFinance & Livelihood
        </Link>
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Schemes
          </Link>
          <Link 
            to="/crops" 
            className={`nav-link ${location.pathname === '/crops' ? 'active' : ''}`}
          >
            Crops
          </Link>
          <Link 
            to="/farmers" 
            className={`nav-link ${location.pathname === '/farmers' ? 'active' : ''}`}
          >
            Farmers
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 