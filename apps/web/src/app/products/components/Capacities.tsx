"use client";
// Import statements (assuming they're necessary)
import Checkbox from "@/components/ui/Checkbox";
import React from "react";
import { ICapacity } from "./LeftSideFilterSearch";

// Interface for props
interface Props {
  capacity: ICapacity[];
  handleSearch: (key: string, value: string[]) => void;
  queryKey: string;
}

const Capacities = ({ capacity, handleSearch, queryKey }: Props) => {
  // State for selected values
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

  // Function to toggle selected value
  const toggleValue = (value: string) => {
    setSelectedValues((prev) => {
      if (prev.includes(value)) {
        return prev.filter((v) => v !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  // useEffect hook to call handleSearch on selectedValues change
  React.useEffect(() => {
    handleSearch(queryKey, selectedValues);
  }, [selectedValues]);

  return (
    <div className="px-2 py-2">
      <h1 className="py-2 text-xl font-medium">Built-in capacity</h1>
      <ul className="flex flex-col gap-2">
        {capacity.map((c) => (
          <li
            key={`capacity_${c.capacity}`}
            className="flex items-center space-x-4"
          >
            <Checkbox onClick={() => toggleValue(c.capacity.toString())} />
            <span>{c.capacity}GB</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Capacities;
