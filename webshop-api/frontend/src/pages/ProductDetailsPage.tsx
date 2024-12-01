import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductDetails } from '../services/authService';
import '../styles/ProductDetailsPage.css';

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const data = await fetchProductDetails(productId || '');
        setProduct(data);
        document.title = data.name; // Oldal cím beállítása
      } catch (err: any) {
        setError(err.message);
      }
    };

    getProduct();
  }, [productId]);

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        <Link to="/">Vissza a kezdőlapra</Link>
      </div>
    );
  }

  if (!product) {
    return <div>Betöltés...</div>;
  }

  return (
    <div className="product-details-page">
      <h1>{product.name}</h1>
      <div className="product-details">
        <img src={product.image} alt={product.name} />
        <div className="product-info">
          <p><strong>Ár:</strong> {product.price} Ft</p>
          <p>
            <strong>Raktáron:</strong> {product.stock > 0 ? `${product.stock} db` : 'Nincs raktáron'}
          </p>
          <p><strong>Értékelés:</strong> {'★'.repeat(product.rating)} ({product.rating}/5)</p>
          <p><strong>Leírás:</strong> {product.description}</p>
        </div>
      </div>
      <div className="related-categories">
        <h2>Kapcsolódó kategóriák</h2>
        <div className="categories">
          {product.categories.map((category: any) => (
            <Link to={`/categories/${category}`} key={category} className="category-link">
              <div className="category">
                <img src={`https://picsum.photos/100/100?random=${category}`} alt={category} />
                <p>{category}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
