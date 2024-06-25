import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import React from "react";
const HeaderCart = () => {
  return (

    <div className="cursor-pointer w-12 h-12 flex justify-center items-center hover:bg-gray-100 rounded-full  relative ">
      <ShoppingCartIcon className="h-6 w-6" />
    </div>
  );
};

export default HeaderCart;
