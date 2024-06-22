import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
interface Props {
  children: ReactNode;
  className?: string;
}
const Button = (props: Props) => {
  return (
    <button
      className={twMerge(
        "px-12 mt-4 transition-all duration-300  py-3.5 rounded-md bg-transparent text-white font-bold ring-2 ring-gray-400",
        props.className
      )}
    >
      {props.children}
    </button>
  );
};

export default Button;
