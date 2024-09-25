import React from "react";
import HeaderNavItem from "./HeaderNavItem";
import UserAvatar from "./UserAvatar";
import Link from "next/link";
import HeaderCart from "./HeaderCart";
import HeaderFavorites from "./HeaderFavorites";
import HeaderSearchBar from "./HeaderSearchBar";

const links = [
  { text: "Home", href: "/" },
  { text: "About", href: "/about" },
  { text: "Contact us", href: "/contact" },
  { text: "Blog", href: "/blog" },
];
const Header = async () => {
  return (
    <header className="flex container mx-auto items-center justify-between py-4">
      <div className="flex space-x-14 items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            <Link href={"/"}>CellShop</Link>
          </h1>
        </div>
        <HeaderSearchBar/>
      </div>

      <nav className="hidden md:block">
        <ul className="flex space-x-12">
          {links.map((link) => (
            <HeaderNavItem key={link.text} text={link.text} href={link.href} />
          ))}
        </ul>
      </nav>
      <div className="flex items-center space-x-6 ">
        <HeaderFavorites />
        <HeaderCart />
        <UserAvatar />
      </div>
    </header>
  );
};

export default Header;
