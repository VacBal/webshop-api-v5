import React, { useState } from 'react';
import '../styles/AddToCart.css';

interface AddToCartProps {
  productId: string;
  stock: number;
  onAdd: (productId: string, quantity: number, maxStock: number) => void;
}

const AddToCart: React.FC<AddToCartProps> = ({ productId, stock, onAdd }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (quantity > 0 && quantity <= stock) {
      onAdd(productId, quantity, stock);
    }
  };

  return (
    <div className="add-to-cart">
      <input
        type="number"
        min="1"
        max={stock}
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <button
        onClick={handleAddToCart}
        disabled={quantity > stock || quantity <= 0}
      >
        Kosárba
      </button>
      {quantity > stock && <p>Nem rendelhetsz több terméket!</p>}
    </div>
  );
};

export default AddToCart;
