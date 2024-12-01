import React from 'react';
import { useCart } from '../hooks/useCart';
import AddToCart from '../components/AddToCart';
import CartIcon from './CartIcon';

const CategoryPage = () => {
  const { addToCart, getCartCount } = useCart();

  // Példa termékek (Backend lekérés után kapott adat)
  const products = [
    { id: '1', name: 'Laptop', stock: 5, price: 150000 },
    { id: '2', name: 'Telefon', stock: 3, price: 80000 },
  ];

  return (
    <div>
      <CartIcon itemCount={getCartCount()} />
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <p>Ár: {product.price} Ft</p>
            <p>Raktáron: {product.stock} db</p>
            <AddToCart
              productId={product.id}
              stock={product.stock}
              onAdd={addToCart}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default CategoryPage;