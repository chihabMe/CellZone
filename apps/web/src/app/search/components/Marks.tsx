"use client";
import Checkbox from "@/components/ui/Checkbox";
import React from "react";
import { IMark } from "./LeftSideFilterSearch";

interface Props {
  marks: IMark[];
  handleSearch: (key: string, value: string[]) => void;
  queryKey: string;
}

const Marks = ({ marks, handleSearch, queryKey }: Props) => {
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

  const toggleValue = (value: string) => {
    setSelectedValues((prev) => {
      if (prev.includes(value)) {
        return prev.filter((v) => v !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  React.useEffect(() => {
    handleSearch(queryKey, selectedValues);
  }, [selectedValues]);

  return (
    <div className="px-2 py-2">
      <h1 className="text-2xl">Brand</h1>
      <ul className="flex flex-col space-y-2 pt-4">
        {marks.map((m) => (
          <li key={m.id} className="flex space-x-4 items-center">
            <Checkbox
              onClick={() => toggleValue(m.name.toString())}
            />
            <div className="space-x-2 flex items-center">
              <span className="font-medium">{m.name}</span>
              <span className="text-gray-400">{m._count.Products}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Marks;

