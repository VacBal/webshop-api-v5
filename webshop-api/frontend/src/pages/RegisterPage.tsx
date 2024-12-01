// pages/RegisterPage.tsx
import React, { useState } from 'react';
import { registerUser } from '../services/authService';
import '../styles/registerpage.css'

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
    firstname: '',
    lastname: '',
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await registerUser(formData);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      {success ? (
        <p>Sikeres regisztráció!</p>
      ) : (
        <form className="register-page" onSubmit={handleSubmit}>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <input type="email" name="username" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Jelszó" onChange={handleChange} required />
          <input type="password" name="passwordConfirm" placeholder="Jelszó megerősítése" onChange={handleChange} required />
          <button type="submit">Regisztráció</button>
        </form>
      )}
    </div>
  );
};

export default RegisterPage;
