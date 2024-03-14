import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import Home from './components/Home'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    if (storedUsername && storedPassword) {
      setIsLoggedIn(true);
    }
  }, []);

  

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={!isLoggedIn ? (
          <>
            <LoginForm onLogin={handleLogin} />
          </>
        ) : (
          <Navigate to="/home" replace />
        )} />
        <Route path="/home" element={isLoggedIn ? <Home onLogout={handleLogout} /> : <Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;