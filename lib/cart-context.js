"use client";
import { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);


  //Zmena mnozstva v kosiku
  const changeQuantity = (productId, quantity) => {
    setCartItems((prevItems) => {
      // Check
      const existingItem = prevItems.find((item) => item.id === productId);
      if (existingItem) {
       
        return prevItems.map((item) =>
          item.id === productId ? { ...item, quantity: quantity } : item
        );
      }
    });
  };
  //Pridanie do kosiku
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // Check
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
  
//Odstranenie
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
