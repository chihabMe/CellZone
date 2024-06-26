import { getProductsInCartCount } from "@/data/products.data";
import {  ShoppingCartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
const HeaderFavorites = async () => {
  const count = await getProductsInCartCount();
  console.log("count ", count);
  return (
    <div className="cursor-pointer w-12 h-12 flex justify-center items-center hover:bg-gray-100 rounded-full  relative ">
      <Link href="/cart">
        <div>
          <span className="w-5 h-5 rounded-full bg-blue-500 text-white p-1 text-xs text-center absolute top-1 right-1">
            {count}
          </span>
          <ShoppingCartIcon className="h-6 w-6 " />
        </div>
      </Link>
    </div>
  );
};

export default HeaderFavorites;
