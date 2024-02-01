'use client'
import { createContext, useContext, useState } from "react";

const ShippingContext = createContext();

export function useShipping() {
  return useContext(ShippingContext);
}

export const ShippingProvider = ({ children }) => {
  const [shippingData, setShippingData] = useState({});

  const updateShippingData = (data) => {
    setShippingData(data);
  };

  const value = { shippingData, updateShippingData, useShipping };

  return (
    <ShippingContext.Provider value={value}>
      {children}
    </ShippingContext.Provider>
  );
};
