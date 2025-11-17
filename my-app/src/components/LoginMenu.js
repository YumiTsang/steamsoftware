import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginMenu.css';

const LoginMenu = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Home Page', icon: '🏠', path: '/home' },
    { id: 'robotics', label: 'Topic Robotics', icon: '⚙️', path: '/robotics' },
    { id: 'load-robotics', label: 'Load Robotics', icon: '📦', path: '/load-robotics' },
    { id: 'my-drawings', label: 'My Drawings', icon: '🖼️', path: '/drawings' },
  ];

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div className="login-menu">
      <header className="menu-header">
        <h1>STEAM System</h1>
        <div className="user-section">
          <button className="user-button" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            👤 {user?.name || 'User'}
          </button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <button onClick={() => navigate('/profile')}>Profile</button>
              <button onClick={() => navigate('/settings')}>Settings</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </header>

      <nav className="menu-navigation">
        <div className="menu-grid">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="menu-item"
              onClick={() => handleNavigate(item.path)}
            >
              <div className="menu-icon">{item.icon}</div>
              <div className="menu-label">{item.label}</div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default LoginMenu;
