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
  screenSizes: IScreenSize[];
  memorySizes: IMemorySize[];
  capacities: ICapacity[];
  batteryCapacities: IBatteryCapacity[];
}

const LeftSideFilterSearch = ({
  batteryCapacities,
  capacities,
  marks,
  memorySizes,
  screenSizes,
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);
  const parseValues = (key: string): string[] => {
    const value = params.get(key);
    if (value) {
      return value.split("_or_");
    }
    return [];
  };

  const handleSearch = (key: string, value: string[]) => {
    if (value && value.length) {
      params.set(key, value.join("_or_"));
    } else {
      params.delete(key);
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col space-y-2 w-[300px]">
      <Search handleSearch={handleSearch} queryKey="query" />
      <Marks
        handleSearch={handleSearch}
        queryKey="mark"
        marks={marks}
        initialState={parseValues("mark")}
      />
      <BatteryCapacities
        handleSearch={handleSearch}
        queryKey="batteryCapacity"
        capacities={batteryCapacities}
        initialState={parseValues("batteryCapacity")}
      />
      <ScreenSizes
        handleSearch={handleSearch}
        queryKey="screenSize"
        screenSizes={screenSizes}
        initialState={parseValues("screenSize")}
      />
      <MemorySizes
        handleSearch={handleSearch}
        queryKey="memorySize"
        memorySizes={memorySizes}
        initialState={parseValues("memorySize")}
      />

      <Capacities
        handleSearch={handleSearch}
        queryKey="capacity"
        capacity={capacities}
        initialState={parseValues("capacity")}
      />
    </div>
  );
};

export default LeftSideFilterSearch;
