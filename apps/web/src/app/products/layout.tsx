import Checkbox from "@/components/ui/Checkbox";
import {
  getBatteryCapacity,
  getCapacity,
  getMemorySizes,
  getProductMarks,
  getProductsScreenSizes,
} from "@/data/products.data";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { ReactNode } from "react";
import LeftSideFilterSearch from "./components/LeftSideFilterSearch";

const layout = async ({ children }: { children: ReactNode }) => {
  const screenSize = await getProductsScreenSizes();
  const marks = await getProductMarks();
  const memorySizes = await getMemorySizes();
  const capacities = await getCapacity();
  const batteryCapacities = await getBatteryCapacity();

  return (
    <main className="flex min-h-screen  px-4 justify-between pt-10">
      <div className="container  flex mx-auto  space-x-8">
        <LeftSideFilterSearch
          batteryCapacities={batteryCapacities}
          capacities={capacities}
          marks={marks}
          memorySizes={memorySizes}
          screenSize={screenSize}
        />
        {children}
      </div>
    </main>
  );
};

export default layout;
