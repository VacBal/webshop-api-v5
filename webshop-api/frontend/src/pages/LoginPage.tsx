// pages/LoginPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import '../styles/loginpage.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const { accessToken } = await loginUser(formData);
      localStorage.setItem('token', accessToken);
      navigate('/'); // Kezdőlapra navigálás
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form className="login-page" onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input type="email" name="username" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Jelszó" onChange={handleChange} required />
      <button type="submit">Belépés</button>
    </form>
  );
};

export default LoginPage;
