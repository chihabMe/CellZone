"use client";
import Checkbox from "@/components/ui/Checkbox";
import React from "react";
import { IMark } from "./LeftSideFilterSearch";
interface Props {
  marks: IMark[];

  handleSearch: (key: string, value: string) => void;
  queryKey: string;
}
const Marks = ({ marks, handleSearch, queryKey }: Props) => {
  return (
    <div className="px-2 py-2">
      <h1 className="text-2xl">Brand</h1>
      <ul className="flex flex-col space-y-2  pt-4">
        {marks.map((m, idx) => (
          <li key={m.id} className="flex space-x-4   items-center">
            <Checkbox
              onChange={(active) => {
                if (active) handleSearch(queryKey, m.name.toString());
                else handleSearch(queryKey, "");
              }}
              defaultChecked={idx == 0}
            />

            <div className="space-x-2 flex items-center">
              <span className="font-medium">{m.name}</span>
              <span className="text-gray-400 ">{m._count.Products}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Marks;
