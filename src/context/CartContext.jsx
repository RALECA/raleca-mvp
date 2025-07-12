import React, { createContext, useContext, useState, useMemo } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      if (prev.find((p) => p.id === product.id)) return prev;
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((p) => p.id !== id));
  };

  const clearCart = () => setCartItems([]);

  const cartTotal = useMemo(
    () => cartItems.reduce((sum, p) => sum + p.price * p.quantity, 0),
    [cartItems]
  );

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
