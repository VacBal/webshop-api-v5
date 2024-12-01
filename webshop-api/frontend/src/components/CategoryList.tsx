import React, { useEffect, useState } from 'react';
import { fetchCategories } from '../services/authService';

const CategoryList = () => {
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
    return <p>Hiba történt: {error}</p>;
  }

  return (
    <div>
      <h1>Kategóriák</h1>
      <ul>
        {categories.map((category: any) => (
          <li key={category.id}>
            <img src={category.image} alt={category.name} />
            <p>{category.name}</p>
            <p>Termékek száma: {category.productCount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
