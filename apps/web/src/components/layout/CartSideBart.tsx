"use client";

import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getProductsInCart } from "@/data/products.data";
import Image from "next/image";
import {
  XMarkIcon,
  PlusCircleIcon,
  MinusCircleIcon,
} from "@heroicons/react/24/outline";
import { CartItem } from "db";
import { AsyncParseReturnType } from "zod";
import ICartItem from "@/interfaces/ICartItem";

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
          className="fixed right-0 top-0  bottom-0 w-[400px] bg-white shadow-lg p-4"
        >
          <div className="flex justify-between  items-center mb-4">
            <h2 className="text-xl font-bold">Cart</h2>
            <button
              onClick={onClose}
              className="hover:bg-gray-300 group p-2 transition-all duration-200 rounded-full"
            >
              <XMarkIcon className="w-6 h-6 transition-all duration-200 group-hover:text-white text-gray-400" />
            </button>
          </div>
          <div className="py-4">
            <Link href="/checkout">
              <button className="  rounded-lg text-sm p-2 font-bold  bg-blue-800 mt-4 border-2 border-blue-800  text-white w-full">
                Checkout
              </button>
            </Link>

            <Link href="/cart">
              <button className="  rounded-lg text-sm p-2 font-bold border-gray-500 mt-4 border-2  text-gray-900 w-full">
                Go to cart
              </button>
            </Link>
          </div>
          <div className="py-2"></div>
          <div className="space-y-4">
            {cartItems?.map((item) => (
              <div key={item.id} className="flex items-center space-x-4">
                <Image
                  src={item.image}
                  className=" object-cover"
                  alt={`${item.name} image`}
                  width={64}
                  height={64}
                />
                <div className="flex-1 text-xs flex flex-col gap-2">
                  <h3 className="  font-semibold">{item.name}</h3>
                  <p className="text-gray-500">${item.price.toString()}</p>
                <ItemQuantityController item={item} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ItemQuantityController = ({ item }: { item: ICartItem }) => {
  return (
    <div className="flex items-center gap-2">
      <button>
        <MinusCircleIcon className="w-6 h-6 text-gray-500" />
      </button>
      <span>{item.quantity}</span>
      <button>
        <PlusCircleIcon className="w-6 h-6 text-gray-500" />
      </button>
    </div>
  );
};

export default CartSidebar;
