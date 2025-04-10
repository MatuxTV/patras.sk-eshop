"use client";
import { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const changeQuantity = (productId, quantity) => {
    setCartItems((prevItems) => {
      
      return prevItems.map((item) => {
        if (item.id === productId) {
          return { ...item, quantity: parseInt(quantity, 10) }; 
        }
        return item; 
      });
    });
  };
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
      
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prevItems, { ...product, quantity: 1 }];
    });

  };
  
  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const value = { cartItems, addToCart, removeFromCart, changeQuantity, clearCart };

  return (
    
      <CartContext.Provider value={value}>{children}</CartContext.Provider>
    
  );
};
