"use client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { useUi } from "@/hooks/useUi";
import CartSidebar from "./CartSideBart";
import { ReactNode } from "react";

const Wrappers = ({ children }: { children: ReactNode }) => {
  const { closeCart, openCart, showCart } = useUi();
  console.log("show cart",showCart)
  return (
    <>
      {children}
      <CartSidebar isVisible={showCart} onClose={closeCart} />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

export default Wrappers;
