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
    <div className="relative space-y-4">
      <div className="cursor-pointer" onClick={handleToggleLike}>
        {!liked && (
          <HeartIcon
            className={`h-5 w-5 absolute top-2 right-2 text-red-500`}
          />
        )}
        {liked && (
          <FilledHeartIcon
            className={`h-5 w-5 absolute top-2 right-2 text-red-500`}
          />
        )}
      </div>
      <Image
        src={props.product.image}
        alt={props.product.name}
        width={300}
        height={300}
      />
      <h3>{props.product.name}</h3>
      <h2>$ {props.product.price.toString()}</h2>
      <Button className="bg-green-900 text-gray-100">Buy Now</Button>
    </div>
  );
};

export default ProductCard;
