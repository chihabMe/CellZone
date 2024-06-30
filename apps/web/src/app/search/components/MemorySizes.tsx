"use client";
import Checkbox from "@/components/ui/Checkbox";
import { IMemorySize } from "./LeftSideFilterSearch";
import { useEffect, useState } from "react";

interface Props {
  memorySizes: IMemorySize[];
  handleSearch: (key: string, value: string[]) => void;
  queryKey: string;

  initialState: string[];
}

const MemorySizes = ({ handleSearch,initialState, memorySizes, queryKey }: Props) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(initialState);

  const toggleValue = (value: string) => {
    setSelectedValues((prev) => {
      if (prev.includes(value)) {
        return prev.filter((v) => v !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  useEffect(() => {
    handleSearch(queryKey, selectedValues);
  }, [selectedValues]);

  return (
    <div className="px-2 py-2">
      <h1 className="py-2 text-xl font-medium">Built-in memory</h1>
      <ul className="flex flex-col gap-2">
        {memorySizes.map((m) => (
          <li
            key={`memory_size_${m.memory}`}
            className="flex items-center space-x-4"
          >
            <Checkbox
            defaultChecked={initialState.includes(m.memory.toString())}
            
            onClick={() => toggleValue(m.memory.toString())} />
            <span>{m.memory}GB</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemorySizes;
