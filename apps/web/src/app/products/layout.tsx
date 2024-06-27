import Checkbox from "@/components/ui/Checkbox";
import {
  getCapacity,
  getMemorySizes,
  getProductMarks,
  getProductsScreenSizes,
} from "@/data/products.data";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { ReactNode } from "react";
const ProductMarks = async () => {
  const marks = await getProductMarks();
  return (
    <ul className="flex flex-col space-y-2 px-2 pt-4">
      {marks.map((m, idx) => (
        <li key={m.id} className="flex space-x-4   items-center">
          <Checkbox defaultChecked={idx == 0} />

          <div className="space-x-2 flex items-center">
            <span className="font-medium">{m.name}</span>
            <span className="text-gray-400 ">{m._count.Products}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};
const capacities = [2000, 3000, 4000, 5000, 6000];
export const BatteryCapacity = () => {
  return (
    <div className="px-2 py-2">
      <h1 className="py-2 text-xl font-medium"> Battery capacity</h1>
      <ul className="flex flex-col gap-2">
        {capacities.map((c) => (
          <li className="flex items-center space-x-4">
            <Checkbox />
            <span>{c}Ma</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
export const ScreenSizes = async () => {
  const sizes = await getProductsScreenSizes();
  return (
    <div className="px-2 py-2">
      <h1 className="py-2 text-xl font-medium"> Screen sizes </h1>
      <ul className="flex flex-col gap-2">
        {sizes.map((s) => (
          <li className="flex items-center space-x-4">
            <Checkbox />
            <span>{s.screenSize}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const MemorySizes = async () => {
  const memory = await getMemorySizes();
  return (
    <div className="px-2 py-2">
      <h1 className="py-2 text-xl font-medium"> Built-in memory </h1>
      <ul className="flex flex-col gap-2">
        {memory.map((m) => (
          <li className="flex items-center space-x-4">
            <Checkbox />
            <span>{m.memory}GB</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const Capacity = async () => {
  const capacity = await getCapacity();
  return (
    <div className="px-2 py-2">
      <h1 className="py-2 text-xl font-medium"> Built-in capacity </h1>
      <ul className="flex flex-col gap-2">
        {capacity.map((c) => (
          <li className="flex items-center space-x-4">
            <Checkbox />
            <span>{c.capacity}GB</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
const layout = async ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex min-h-screen justify-between pt-10">
      <div className="container  flex mx-auto  ">
        <div className="flex flex-col space-y-2 w-[300px]">
          <h1 className="text-2xl">Brand</h1>
          <div className="bg-gray-100 hidden md:flex items-center h-11   space-x-2 p-1   px-4 rounded-md">
            <button className="cursor-pointer bg-transparent">
              <MagnifyingGlassIcon className="h-6 w-6 text-gray-400 " />
            </button>
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent flex-grow  outline-none border-none px-2"
            />
          </div>
          <ProductMarks />
          <BatteryCapacity />
          <ScreenSizes />
          <MemorySizes />
          <Capacity />
        </div>
        <section>{children}</section>
      </div>
    </main>
  );
};

export default layout;
