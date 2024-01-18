"use client";
import { createContext, useState, useContext } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const changeQuantity = (productId, quantity) => {
    setCartItems((prevItems) => {
      // Check if product is already in cart
      const existingItem = prevItems.find((item) => item.id === productId);
      if (existingItem) {
        // Increase quantity
        return prevItems.map((item) =>
          item.id === productId ? { ...item, quantity: quantity } : item
        );
      }
    });
  };

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // Check if product is already in cart
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        // Increase quantity
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Add new product to cart
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const value = { cartItems, addToCart, removeFromCart, changeQuantity };

  return (
    
      <CartContext.Provider value={value}>{children}</CartContext.Provider>
    
  );
};
