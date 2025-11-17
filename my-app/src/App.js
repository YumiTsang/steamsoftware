import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import HomePage from './components/HomePage';
import LoginMenu from './components/LoginMenu';
import LoadRobotics from './components/LoadRobotics';
import AIProgramming from './components/AIProgramming';
import Drawing3D from './components/Drawing3D';
import DrawingsList from './components/DrawingsList';
import DrawingView from './components/DrawingView';
import UserProfile from './components/UserProfile';
import STEM from './components/STEM';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 檢查是否已登錄
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  };

  return (
    <Router basename="/steamsoftware">
      <Routes>
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/menu" /> : <Login onLoginSuccess={handleLoginSuccess} />}
        />
        <Route
          path="/home"
          element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/menu"
          element={isLoggedIn ? <LoginMenu user={user} onLogout={handleLogout} /> : <Navigate to="/login" />}
        />
        <Route
          path="/load-robotics"
          element={isLoggedIn ? <LoadRobotics /> : <Navigate to="/login" />}
        />
        <Route
          path="/ai-programming"
          element={isLoggedIn ? <AIProgramming /> : <Navigate to="/login" />}
        />
        <Route
          path="/drawing-3d"
          element={isLoggedIn ? <Drawing3D /> : <Navigate to="/login" />}
        />
        <Route
          path="/drawings"
          element={isLoggedIn ? <DrawingsList /> : <Navigate to="/login" />}
        />
        <Route
          path="/drawing/:id"
          element={isLoggedIn ? <DrawingView /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={isLoggedIn ? <UserProfile user={user} /> : <Navigate to="/login" />}
        />
        <Route
          path="/stem"
          element={isLoggedIn ? <STEM /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<Navigate to={isLoggedIn ? '/menu' : '/login'} />} />
      </Routes>
    </Router>
  );
}

export default App;
