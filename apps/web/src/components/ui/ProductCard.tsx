"use client";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as FilledHeartIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Image from "next/image";

import React, { useState } from "react";
import Button from "./Button";
import { likeUnlike } from "@/actions/products.actions";
import IProduct from "@/interfaces/IProduct";
interface Props {
  product: IProduct;
}
const ProductCard = (props: Props) => {
  return (
    <div className="relative  max-w-[300px]  flex flex-col rounded-md py-4 pt-10  bg-gray-200 items-center space-y-4">
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
const LikeButton = (props: { product: IProduct }) => {
  const [liked, setIsLIked] = useState(props.product.liked);
  const handleToggleLike = async () => {
    setIsLIked((p) => !p);
    const response = await likeUnlike(props.product.id);
    if (response.error) return console.error(response.error);
    console.log("response ", response);
  };

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
