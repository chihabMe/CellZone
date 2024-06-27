"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useRef } from "react";
interface Props {
  queryKey: string;

  handleSearch: (key: string, value: string) => void;
}
const Search = ({ handleSearch, queryKey }: Props) => {
  const q = useRef<HTMLInputElement>(null);
  return (
    <div className="bg-gray-100 hidden md:flex items-center h-11   space-x-2 p-1   px-4 rounded-md">
      <button
        onClick={() => handleSearch(queryKey, q?.current?.value ?? "")}
        className="cursor-pointer bg-transparent"
      >
        <MagnifyingGlassIcon className="h-6 w-6 text-gray-400 " />
      </button>
      <input
        ref={q}
        type="text"
        placeholder="Search"
        className="bg-transparent flex-grow  outline-none border-none px-2"
      />
    </div>
  );
};

export default Search;
