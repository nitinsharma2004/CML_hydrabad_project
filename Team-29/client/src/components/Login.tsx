import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

interface LoginProps {
  onLogin: (userType: 'admin' | 'user', userId: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [userType, setUserType] = useState<'admin' | 'user'>('user');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!userId.trim() || !password.trim()) {
      setError('Please enter both ID and password');
      return;
    }

    if (userType === 'admin') {
      if (userId === 'CFGTEAM29' && password === 'CFGTEAM29') {
        onLogin('admin', userId);
        navigate('/');
      } else {
        setError('Invalid admin credentials');
      }
    } else {
      // For user login, check specific credentials
      if (userId === 'farmer123' && password === 'farmer123') {
        onLogin('user', userId);
        navigate('/');
      } else {
        setError('Invalid user credentials');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <img 
            src="https://cmlnortheast.com/wp-content/uploads/2018/05/CML-Logo-black-text-2.png" 
            alt="CML Logo" 
            className="login-logo" 
          />
          <h1>Centre for Microfinance & Livelihood</h1>
          <p>Welcome to the Digital Farming Platform</p>
        </div>

        <div className="login-tabs">
          <button
            className={`tab-button ${userType === 'user' ? 'active' : ''}`}
            onClick={() => setUserType('user')}
          >
            Login as User
          </button>
          <button
            className={`tab-button ${userType === 'admin' ? 'active' : ''}`}
            onClick={() => setUserType('admin')}
          >
            Login as Admin
          </button>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="userId">User ID</label>
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder={userType === 'admin' ? 'Enter Admin ID' : 'Enter User ID'}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="form-input"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button">
            {userType === 'admin' ? 'Login as Admin' : 'Login as User'}
          </button>
        </form>

      </div>
    </div>
  );
};

export default Login; 