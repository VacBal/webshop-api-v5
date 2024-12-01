import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';
import '../styles/header.css';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Navigáljunk vissza a belépési oldalra
  };

  return (
    <header className="app-header">
      <h1>Webshop</h1>
      <nav>
        <Link to="/">Kezdőlap</Link>
        <Link to="/profile">Profil</Link>
        <button onClick={handleLogout}>Kijelentkezés</button>
      </nav>
    </header>
  );
};

export default Header;
