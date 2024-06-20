import React from "react";
import {
  HeartIcon,
  ShoppingCartIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import HeaderNavItem from "./HeaderNavItem";

const links = [
  { text: "Home", href: "/" },
  { text: "About", href: "/about" },
  { text: "Contact us", href: "/contact" },
  { text: "Blog", href: "/blog" },
];
const Header = () => {
  return (
    <header className="flex container mx-auto items-center justify-between py-4">
      <div className="flex space-x-14 items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">CellShop</h1>
        </div>
        <div className="bg-gray-100 flex items-center h-12 w-[500px]  space-x-2 p-2 px-4 rounded-md">
          <button className="cursor-pointer bg-transparent">
            <MagnifyingGlassIcon className="h-6 w-6 " />
          </button>
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent flex-grow  outline-none border-none px-2"
          />
        </div>
      </div>
      <nav>
        <ul className="flex space-x-12">
          {links.map((link) => (
            <HeaderNavItem key={link.text} text={link.text} href={link.href} />
          ))}
        </ul>
      </nav>
      <div className="flex items-center space-x-4">
        <div>
          <HeartIcon className="h-6 w-6" />
        </div>

        <div>
          <ShoppingCartIcon className="h-6 w-6" />
        </div>

        <div>
          <UserCircleIcon className="h-6 w-6" />
        </div>
      </div>
    </header>
  );
};

export default Header;
