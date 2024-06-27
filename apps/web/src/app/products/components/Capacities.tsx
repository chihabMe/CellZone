"use client";
import Checkbox from "@/components/ui/Checkbox";
import React from "react";
import { ICapacity } from "./LeftSideFilterSearch";
interface Props {
  capacity: ICapacity[];

  handleSearch: (key: string, value: string) => void;
  queryKey: string;
}
const Capacities = ({ capacity, handleSearch, queryKey }: Props) => {
  return (
    <div className="px-2 py-2">
      <h1 className="py-2 text-xl font-medium"> Built-in capacity </h1>
      <ul className="flex flex-col gap-2">
        {capacity.map((c) => (
          <li
            key={`capacity_${c.capacity}`}
            className="flex items-center space-x-4"
          >
            <Checkbox
              onChange={(active) => {
                if (active) handleSearch(queryKey, c.capacity.toString());
                else handleSearch(queryKey, "");
              }}
            />
            <span>{c.capacity}GB</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Capacities;
