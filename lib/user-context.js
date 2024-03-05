'use client'
import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}
export const UserProvider = ({ user, children }) => {
    return (
      <UserContext.Provider value={user}>
        {children}
      </UserContext.Provider>
    );
  };