import React from "react";
import { twMerge } from "tailwind-merge";

const LoadingSpinner = ({ className }: { className?: string }) => {
  return (
    <div
      className={twMerge(
        "inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white",
        className
      )}
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
    </div>
  );
};

export default LoadingSpinner;
