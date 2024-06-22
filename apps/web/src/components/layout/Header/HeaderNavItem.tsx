"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const HeaderNavItem = ({ text, href }: { text: string; href: string }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <li
      className={`${
        isActive && "text-gray-800"
      } hover:text-gray-600 cursor-pointer text-gray-400 font-medium`}
    >
      <Link href={href}>{text}</Link>
    </li>
  );
};

export default HeaderNavItem;
