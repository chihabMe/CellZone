"use client";
import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as FilledHeartIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

import React, { useEffect, useState } from "react";
import Button from "./Button";
import { addToCart, likeUnlike } from "@/actions/products.actions";
import { useAction } from "next-safe-action/hooks";
import IProduct from "@/interfaces/IProduct";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { getBase64 } from "@/lib/images";
import { queryClient } from "../layout/Wrappers";
interface Props {
  product: IProduct;
}
const ProductCard = (props: Props) => {
  const [isVisisble, setIsVisible] = useState(false);

  return (
    <div
      onMouseOver={() => setIsVisible(true)}
      onMouseOut={() => setIsVisible(false)}
      className="relative group  max-w-[300px]  flex flex-col rounded-md py-4 pt-10  bg-gray-200 items-center space-y-4"
    >
      <div className="flex flex-col  items-center  absolute top-2 right-2">
        <LikeButton product={props.product} />
        <AnimatePresence>
          {isVisisble && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0, x: 1 }}
            >
              <CartButton
                className="  transition-all duration-300  "
                product={props.product}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Image
        src={props.product.image}
        alt={props.product.name}
        width={150}
        height={150}
      />
      <div className="max-w-[240px] text-center">
        <h3>{props.product.name}</h3>
        <h2 className="font-medium text-xl my-2">
          $ {props.product.price.toString()}
        </h2>
      </div>
      <Button className="bg-gray-900 py-3 text-base font-medium text-gray-100">
        Buy Now
      </Button>
    </div>
  );
};

const CartButton = (props: { className?: string; product: IProduct }) => {
  const [isInCart, setIsInCart] = useState(props.product.inCart);
  const { execute, result, status, hasSucceeded, isExecuting } =
    useAction(addToCart);
  const handleAddToCart = async () => {
    await execute({ productId: props.product.id });

    queryClient.setQueryData(["cart_count"], (old: number) =>
      isInCart ? old - 1 : old + 1
    );
    queryClient.invalidateQueries({ queryKey: ["cart_count"] });
    setIsInCart((prev) => !prev);
  };
  useEffect(() => {
    if (hasSucceeded && result.data) setIsInCart(result.data?.inCart);
  }, [isExecuting, hasSucceeded, result]);

  return (
    <div
      className={twMerge(
        `cursor-pointer w-11 h-11 ${isInCart && "!bg-blue-50 ring-2 ring-blue-200"} hover:bg-gray-100 transition-all duration-200 flex items-center justify-center rounded-full `,
        props.className
      )}
      onClick={handleAddToCart}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <ShoppingCartIcon className="w-6 h-6 active:scale-95 text-gray-500" />
      </motion.div>
    </div>
  );
};
const LikeButton = (props: { product: IProduct }) => {
  const [liked, setIsLIked] = useState(props.product.liked);
  const { execute, hasErrored, hasSucceeded, result } = useAction(likeUnlike);
  const handleToggleLike = async () => {
    setIsLIked((p) => !p);
    await execute({ productId: props.product.id });
    if (hasErrored) console.error(result);
  };

  return (
    <div
      className="cursor-pointer overflow-hidden w-11 h-11 hover:bg-gray-100 transition-all duration-200 flex items-center justify-center rounded-full "
      onClick={handleToggleLike}
    >
      {!liked && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <HeartIcon className={`h-6 w-6   text-red-400`} />
        </motion.div>
      )}
      {liked && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <FilledHeartIcon className={`h-6 w-6   text-red-400`} />
        </motion.div>
      )}
    </div>
  );
};

export default ProductCard;
