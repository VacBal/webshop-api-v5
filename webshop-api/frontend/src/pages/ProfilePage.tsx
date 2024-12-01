import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile, logoutUser } from '../services/authService';


const ProfilePage = () => {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const data = await fetchUserProfile();
        setUser(data);
      } catch (err: any) {
        setError(err.message);
        navigate('/login'); // Ha nem sikerül, irányítás a belépés oldalra
      }
    };

    getUserProfile();
  }, [navigate]);

  const handleLogout = () => {
    logoutUser();
    navigate('/login'); // Kilépés után irányítás a belépés oldalra
  };

  if (error) {
    return <div>Hiba történt: {error}</div>;
  }

  if (!user) {
    return <div>Adatok betöltése...</div>;
  }

  return (
    <div className="profile-page">
      <h1>Profilom</h1>
      <p><strong>Név:</strong> {user.firstName} {user.lastName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <h2>Szállítási cím:</h2>
      <p>{user.shippingAddress.name}</p>
      <p>{user.shippingAddress.street}, {user.shippingAddress.city}, {user.shippingAddress.zip}</p>
      <p>{user.shippingAddress.country}</p>
      <p><strong>Telefonszám:</strong> {user.shippingAddress.phoneNumber}</p>
      <h2>Számlázási cím:</h2>
      <p>{user.billingAddress.name}</p>
      <p>{user.billingAddress.street}, {user.billingAddress.city}, {user.billingAddress.zip}</p>
      <p>{user.billingAddress.country}</p>
      {user.billingAddress.taxNumber && (
        <p><strong>Adószám:</strong> {user.billingAddress.taxNumber}</p>
      )}
      <button onClick={handleLogout}>Kilépés</button>
    </div>
  );
};

export default ProfilePage;
