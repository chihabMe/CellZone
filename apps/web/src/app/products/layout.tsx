import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex min-h-screen justify-between pt-10">
      <div className="container  flex mx-auto  ">
        <div className="flex flex-col space-y-2 w-[300px]">
          <h1 className="text-2xl">Brand</h1>
          <div className="bg-gray-100 hidden md:flex items-center h-11   space-x-2 p-1   px-4 rounded-md">
            <button className="cursor-pointer bg-transparent">
              <MagnifyingGlassIcon className="h-6 w-6 text-gray-400 " />
            </button>
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent flex-grow  outline-none border-none px-2"
            />
          </div>
          <ul className="flex flex-col"></ul>
        </div>
        <section>{children}</section>
      </div>
    </main>
  );
};

export default layout;
