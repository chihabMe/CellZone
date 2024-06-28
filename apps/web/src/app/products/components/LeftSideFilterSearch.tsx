"use client";
import React from "react";
import Search from "./Search";
import Marks from "./Marks";
import BatteryCapacities from "./BatteryCapacities";
import ScreenSizes from "./ScreenSizes";
import MemorySizes from "./MemorySizes";
import Capacities from "./Capacities";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
export interface IMark {
  id: string;
  name: string;
  _count: { Products: number };
}
export interface IScreenSize {
  screenSize: number;
}
export interface ICapacity {
  capacity: number;
}
export interface IBatteryCapacity {
  batteryCapacity: number;
}
export interface IMemorySize {
  memory: number;
}
interface Props {
  marks: IMark[];
  screenSize: IScreenSize[];
  memorySizes: IMemorySize[];
  capacities: ICapacity[];
  batteryCapacities: IBatteryCapacity[];
}

const LeftSideFilterSearch = ({
  batteryCapacities,
  capacities,
  marks,
  memorySizes,
  screenSize,
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const handleSearch = (key: string, value: string[]) => {
    const params = new URLSearchParams(searchParams);
    if (value.length) {
      params.set(key, value.join("_or_"));
    } else {
      params.delete(key);
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col space-y-2 w-[300px]">
      <Search handleSearch={handleSearch} queryKey="query" />
      <Marks handleSearch={handleSearch} queryKey="mark" marks={marks} />
      <BatteryCapacities
        handleSearch={handleSearch}
        queryKey="batteryCapacity"
        capacities={batteryCapacities}
      />
      <ScreenSizes
        handleSearch={handleSearch}
        queryKey="screenSize"
        screenSize={screenSize}
      />
      <MemorySizes
        handleSearch={handleSearch}
        queryKey="memorySize"
        memorySizes={memorySizes}
      />

      <Capacities
        handleSearch={handleSearch}
        queryKey="capacity"
        capacity={capacities}
      />
    </div>
  );
};

export default LeftSideFilterSearch;
