import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CartIcon.css';

interface CartIconProps {
  itemCount: number;
}

const CartIcon: React.FC<CartIconProps> = ({ itemCount }) => {
  return (
    <div className="cart-icon">
      <Link to="/cart">
        <span className="icon">🛒</span>
        <span className="count">{itemCount}</span>
      </Link>
    </div>
  );
};

export default CartIcon;
