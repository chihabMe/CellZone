"use client";
import { ReactNode, createContext, useState } from "react";

interface UiContextType {
  showCart: boolean;
  openCart: () => void;
  closeCart: () => void;
}
const initialState: UiContextType = {
  showCart: false,
  closeCart: () => {},
  openCart: () => {},
};
export const uiContext = createContext<UiContextType>(initialState);

export const UiProvider = ({ children }: { children: ReactNode }) => {
  const [showCart, setShowCart] = useState(initialState.showCart);

  const openCart = () => setShowCart(true);
  const closeCart = () => setShowCart(false);

  return (
    <uiContext.Provider value={{ showCart, openCart, closeCart }}>
      {children}
    </uiContext.Provider>
  );
};
