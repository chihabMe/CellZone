"use client";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as FilledHeartIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { Product } from "@prisma/client";

import React, { useState } from "react";
import Button from "./Button";
interface Props {
  product: Product;
}
const ProductCard = (props: Props) => {
  const [liked, setIsLIked] = useState(false);
  const handleToggleLike = () => setIsLIked((p) => !p);
  return (
    <div className="relative flex flex-col rounded-md py-4 pt-10  bg-gray-200 items-center space-y-4">
      <div className="cursor-pointer" onClick={handleToggleLike}>
        {!liked && (
          <HeartIcon
            className={`h-7 w-7 absolute top-4 right-3 text-red-400`}
          />
        )}
        {liked && (
          <FilledHeartIcon
            className={`h-7 w-7 absolute top-4 right-3 text-red-500`}
          />
        )}
      </div>
      <Image
        src={props.product.image}
        alt={props.product.name}
        width={150}
        height={150}
      />
      <div className="max-w-[240px] text-center">

      <h3>{props.product.name}</h3>
      <h2 className="font-medium text-xl my-2">$ {props.product.price.toString()}</h2>
      </div>
      <Button className="bg-gray-900 py-3 text-base font-medium text-gray-100">Buy Now</Button>
    </div>
  );
};

export default ProductCard;
