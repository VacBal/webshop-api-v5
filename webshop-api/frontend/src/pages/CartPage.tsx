import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { fetchCartProducts } from '../services/authService';
import '../styles/CartPage.css';

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productIds = Array.from(cart.keys());
        if (productIds.length > 0) {
          const data = await fetchCartProducts(productIds);
          setProducts(data);
        }
      } catch (err: any) {
        setError(err.message);
      }
    };

    getProducts();
  }, [cart]);

  const calculateTotal = () => {
    return products.reduce((sum, product) => {
      const quantity = cart.get(product.id) || 0;
      return sum + product.price * quantity;
    }, 0);
  };

  if (error) {
    return <div className="error">Hiba: {error}</div>;
  }

  if (products.length === 0) {
    return <div className="empty-cart">A kosár üres. <Link to="/">Vissza a kezdőlapra</Link></div>;
  }

  return (
    <div className="cart-page">
      <h1>Kosár</h1>
      <div className="cart-items">
        {products.map((product) => {
          const quantity = cart.get(product.id) || 0;
          const totalPrice = product.price * quantity;

          return (
            <div key={product.id} className="cart-item">
              <img src={product.image} alt={product.name} />
              <div className="cart-details">
                <Link to={`/products/${product.id}`}>{product.name}</Link>
                <p>Ár: {product.price} Ft</p>
                <p>Mennyiség: {quantity}</p>
                <p>Részösszeg: {totalPrice} Ft</p>
              </div>
              <button onClick={() => removeFromCart(product.id)}>Eltávolítás</button>
            </div>
          );
        })}
      </div>
      <div className="cart-summary">
        <h2>Fizetendő összeg: {calculateTotal()} Ft</h2>
        <button onClick={clearCart}>Kosár ürítése</button>
        <Link to="/checkout" className="checkout-link">Tovább a pénztárhoz</Link>
      </div>
    </div>
  );
};

export default CartPage;
