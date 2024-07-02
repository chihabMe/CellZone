"use client";

import IProduct from "@/interfaces/IProduct";
import React, { useState } from "react";
import Image from "next/image";
interface Props {
  product: IProduct;
}
const capacities = [" 64GB", "128GB", "256GB", "512GB"];
const ProductInfos = ({ product }: Props) => {
  return (
    <section className="w-1/2 flex justify-center  container mx-auto">
      <div>
        <Image
          // placeholder="blur"
          src={product.image}
          alt={product.name}
          width={300}
          height={400}
        />
      </div>
      <div className="w-1/2 flex flex-col gap-2">
        <h1 className="font-bold text-2xl">{product.name}</h1>
        <h2 className="text-xl font-medium">${product.price.toString()}</h2>
        <ProductCapacities capacities={capacities} />
      </div>
    </section>
  );
};
const ProductCapacities = ({ capacities }: { capacities: string[] }) => {
  const [selectedCapacity, setSelectedCapacity] = useState<string>(
    capacities[0]
  );
  return (
    <ul className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
      {capacities.map((capacity) => (
        <li
          onClick={() => setSelectedCapacity(capacity)}
          key={capacity}
          className={`flex ${selectedCapacity == capacity && "ring-gray-800 font-medium"} transition-all duration-200 justify-center  items-center ring-2 ring-gray-300  space-x-2 text-gray-900 px-4 py-2.5 rounded-md cursor-pointer`}
        >
          <span>{capacity}</span>
        </li>
      ))}
    </ul>
  );
};

export const ProductInfo = ({
  text,
  value,
  image,
}: {
  text: string;
  value: string;
  image: string;
}) => {
  return (
    <div className="flex items-center">
      <Image src={image}  alt={text} width={20} height={20} />
      <div>
        <span className="text-gray-400">{text}</span>
        <span className="text-gray-600">{value}</span>
      </div>
    </div>
  );
};
export default ProductInfos;
