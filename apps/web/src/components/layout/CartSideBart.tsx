"use client";

import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getProductsInCart } from "@/data/products.data";
import Button from "../ui/Button";

const CartSidebar = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) => {
  const {
    data: cartItems,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cart_items"],
    queryFn: () => getProductsInCart(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading cart items</div>;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed right-0 top-0  bottom-0 w-80 bg-white shadow-lg p-4"
        >
          <div className="flex justify-between  items-center mb-4">
            <h2 className="text-xl font-bold">Cart</h2>
            <button onClick={onClose} className="text-gray-500">
              &times;
            </button>
          </div>
          <Link href="/checkout">
            <Button className="mb-4 bg-gray-800 text-white w-full">Go to Checkout</Button>
          </Link>
          <div className="space-y-4">
            {cartItems?.map((item) => (
              <div key={item.id} className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-500">${item.price.toString()}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
