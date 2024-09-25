"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  redirect,
  useParams,
  useRouter,
  useSearchParams,
} from "next/navigation";

const HeaderSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const q = useSearchParams().get("q");

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };
  useEffect(() => {
    if (q?.trim()) setSearchQuery(q);
  }, [setSearchQuery]);

  return (
    <form
      onSubmit={handleSearch}
      className="bg-gray-100 hidden md:flex items-center h-12 w-[500px] space-x-2 p-2 px-4 rounded-md"
    >
      <button type="submit" className="cursor-pointer bg-transparent">
        <MagnifyingGlassIcon className="h-6 w-6" />
      </button>
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="bg-transparent flex-grow outline-none border-none px-2"
      />
    </form>
  );
};

export default HeaderSearchBar;
