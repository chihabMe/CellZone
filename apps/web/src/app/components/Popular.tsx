import Button from "@/components/ui/Button";
import { getPopularProducts } from "@/data/products.data";
import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

const Popular = async () => {
  const products = await getPopularProducts();
  if (products.length == 0) return <div></div>;
  return (
    <section className="container mx-auto py-8">
      <h1 className="text-3xl font-bold py-4 pb-8">Popular products</h1>
      <div className="py-4 grid  px-4 sm:px-0  grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <PopularProductItem className="bg-[#fff]" product={products[0]} />
        {products.length > 1 && (
          <PopularProductItem className="bg-gray-100" product={products[1]} />
        )}
        {products.length > 2 && (
          <PopularProductItem className="bg-gray-200" product={products[2]} />
        )}
        {products.length > 3 && (
          <PopularProductItem
            className="text-gray-200 bg-[#2C2C2C]"
            product={products[3]}
          />
        )}
      </div>
    </section>
  );
};
const PopularProductItem = (props: {
  product: Product;
  className?: string;
}) => {
  return (
    <div
      className={twMerge(
        "flex  flex-col items-center  py-14 px-6  ",
        props.className
      )}
    >
      <Image
        src={props.product.image}
        alt={`${props.product.name} image`}
        width={180}
        height={180}
      />
      <div className="flex min-h-[300px]  flex-col w-full   items-start pt-8">
        <h1 className="text-xl py-2 max-w-[320px]  ">{props.product.name}</h1>
        <p className="py-2 pt-3  min-h-[120px]">
          {props.product.description.split(" ").slice(0, 20).join(" ")}
        </p>
        <Link href={`/products/${props.product.name}`} className="">
          <Button className="mix-blend-difference ">Shope Now</Button>
        </Link>
      </div>
    </div>
  );
};

export default Popular;
