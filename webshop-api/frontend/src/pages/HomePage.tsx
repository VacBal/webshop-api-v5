// pages/HomePage.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../services/authService';
import '../styles/homepage.css'; // Stílusok importálása

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    getCategories();
  }, []);

  if (error) {
    return <div>Hiba történt a kategóriák betöltése közben: {error}</div>;
  }

  return (
    <div className="homepage">
      <header>
        <h1>Üdvözlünk a Webshopban!</h1>
        <nav>
          <Link to="/login">Belépés</Link> | <Link to="/register">Regisztráció</Link>
        </nav>
      </header>

      <section className="categories">
        <h2>Termékkategóriák</h2>
        {categories.length > 0 ? (
          <div className="category-list">
            {categories.map((category: any) => (
              <div key={category.id} className="category-card">
                <img src={category.image} alt={category.name} />
                <h3>{category.name}</h3>
                <p>Elérhető termékek: {category.productCount}</p>
                <Link to={`/categories/${category.id}`}>Kategória megtekintése</Link>
              </div>
            ))}
          </div>
        ) : (
          <p>Jelenleg nincsenek elérhető kategóriák.</p>
        )}
      </section>
    </div>
  );
};

export default HomePage;
