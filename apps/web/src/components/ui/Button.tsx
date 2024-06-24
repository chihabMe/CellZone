"use client";
import React, { HTMLProps, ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { twMerge } from "tailwind-merge";
import LoadingSpinner from "./LoadingSpinner";
interface Props extends HTMLProps<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}
const Button = (props: Props) => {
  const { pending, data, action } = useFormStatus();
  return (
    <button
      disabled={pending}
      className={twMerge(
        ` ${props.disabled && "opacity-90"} flex items-center relative  gap-2 justify-center px-12 mt-4 transition-all duration-300  py-3.5 rounded-md bg-transparent text-white font-bold ring-2 ring-gray-400`,
        props.className
      )}
    >
      {!pending && <div>{props.children}</div>}
      <div className="">
        {pending && <LoadingSpinner className="w-4 h-4 " />}
      </div>
    </button>
  );
};

export default Button;
