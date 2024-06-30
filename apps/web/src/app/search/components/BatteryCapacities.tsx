"use client";
import Checkbox from "@/components/ui/Checkbox";
import React from "react";
import { IBatteryCapacity } from "./LeftSideFilterSearch";

interface Props {
  capacities: IBatteryCapacity[];
  queryKey: string;
  handleSearch: (key: string, value: string[]) => void;
  initialState: string[];
}

const BatteryCapacities = ({ capacities, handleSearch, queryKey,initialState }: Props) => {
  const [selectedValues, setSelectedValues] = React.useState<string[]>(initialState);

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
      <h1 className="py-2 text-xl font-medium">Battery capacity</h1>
      <ul className="flex flex-col gap-2">
        {capacities.map((c) => (
          <li key={`battery_capacity_${c.batteryCapacity}`} className="flex items-center space-x-4">
            <Checkbox
            defaultChecked={initialState.includes(c.batteryCapacity.toString())}
              onClick={() => toggleValue(c.batteryCapacity.toString())}
            />
            <span>{c.batteryCapacity}mAh</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BatteryCapacities;

