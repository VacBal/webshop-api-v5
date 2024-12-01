import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../services/authService';
import '../styles/changepasswordpage.css';

const ChangePasswordPage = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const validatePasswords = () => {
    if (newPassword !== passwordConfirm) {
      setError('Az új jelszavak nem egyeznek.');
      return false;
    }
    if (newPassword.length < 8 || !/\d/.test(newPassword) || !/[a-z]/.test(newPassword)) {
      setError('Az új jelszó legalább 8 karakter hosszú kell legyen, és tartalmaznia kell számot és kisbetűt.');
      return false;
    }
    if (newPassword === oldPassword) {
      setError('Az új jelszó nem lehet ugyanaz, mint a régi.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validatePasswords()) return;

    try {
      await changePassword(oldPassword, newPassword);
      setSuccess(true);
      setOldPassword('');
      setNewPassword('');
      setPasswordConfirm('');
      setTimeout(() => navigate('/profile'), 2000);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="change-password-page">
      <h1>Jelszó módosítása</h1>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">A jelszavad sikeresen módosítva!</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Régi jelszó:</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Új jelszó:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Új jelszó megerősítése:</label>
          <input
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
          />
        </div>
        <button type="submit">Mentés</button>
      </form>
    </div>
  );
};

export default ChangePasswordPage;
