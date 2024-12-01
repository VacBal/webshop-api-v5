// hooks/useCart.ts

import { useState, useEffect } from 'react';

export const useCart = () => {
  const [cart, setCartState] = useState<Map<string, number>>(new Map());

  // Kosár betöltése localStorage-ból
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartState(new Map(JSON.parse(storedCart)));
    }
  }, []);

  // Kosár mentése localStorage-ba
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(Array.from(cart.entries())));
  }, [cart]);

  const addToCart = (productId: string, quantity: number, maxStock: number) => {
    setCartState((prevCart) => {
      const updatedCart = new Map(prevCart);
      const currentQuantity = updatedCart.get(productId) || 0;
      const newQuantity = Math.min(currentQuantity + quantity, maxStock);

      updatedCart.set(productId, newQuantity);
      return updatedCart;
    });
  };

  const removeFromCart = (productId: string) => {
    setCartState((prevCart) => {
      const updatedCart = new Map(prevCart);
      updatedCart.delete(productId);
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCartState(new Map());
  };

  const getCartCount = () => {
    let count = 0;
    cart.forEach((quantity) => {
      count += quantity;
    });
    return count;
  };

  return { cart, addToCart, removeFromCart, clearCart, getCartCount };
};
