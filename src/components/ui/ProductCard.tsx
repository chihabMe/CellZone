"use client";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as FilledHeartIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Image from "next/image";
import { Product } from "@prisma/client";

import React, { useState } from "react";
import Button from "./Button";
import { AnimatePresence } from "framer-motion";
interface Props {
  product: Product;
}
const ProductCard = (props: Props) => {
  return (
    <div className="relative   flex flex-col rounded-md py-4 pt-10  bg-gray-200 items-center space-y-4">
      <LikeButton product={props.product} />
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
const LikeButton = (props: { product: Product }) => {
  const [liked, setIsLIked] = useState(false);
  const handleToggleLike = () => setIsLIked((p) => !p);
  return (
    <div
      className="cursor-pointer absolute top-4 right-3"
      onClick={handleToggleLike}
    >
        {!liked && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <HeartIcon className={`h-7 w-7   text-red-400`} />
          </motion.div>
        )}
        {liked && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <FilledHeartIcon className={`h-7 w-7   text-red-400`} />
          </motion.div>
        )}
    </div>
  );
};

export default ProductCard;
