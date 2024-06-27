"use client";
import Checkbox from "@/components/ui/Checkbox";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import { useRouter } from "next/navigation";
import { IBatteryCapacity } from "./LeftSideFilterSearch";
interface Props {
  capacities: IBatteryCapacity[];
  queryKey: string;
  handleSearch: (key: string, value: string) => void;
}
const BatteryCapacities = ({ capacities, handleSearch, queryKey }: Props) => {
  return (
    <div className="px-2 py-2">
      <h1 className="py-2 text-xl font-medium"> Battery capacity</h1>
      <ul className="flex flex-col gap-2">
        {capacities.map((c) => (
          <li key={`$battery_capacity_{c.batteryCapacity}`} className="flex items-center space-x-4">
            <Checkbox
              onChange={(active) => {
                if (active)
                  handleSearch(queryKey, c.batteryCapacity.toString());
                else handleSearch(queryKey, "");
              }}
            />
            <span>{c.batteryCapacity}Ma</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BatteryCapacities;
