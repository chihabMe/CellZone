import ProductCard from "@/components/ui/ProductCard";
import { getProducts } from "@/data/products.data";
import { Metadata } from "next";
import React  from "react";

export const metadata: Metadata = {
  title: "search product",
  description:
    "search product by battery capacity, memory size, screen size, mark, capacity",
};
const ProductsPage = async ({
  searchParams,
}: {
  searchParams: {
    query: string;
    batteryCapacity: string;
    memorySize: string;
    screenSize: string;
    mark: string;
    capacity: string;
  };
}) => {
  const { query, batteryCapacity, memorySize, screenSize, mark, capacity } =
    searchParams;

  let whereClause: {
    name?: { contains: string };
    batteryCapacity?: { in: number[] };
    memory?: { in: number[] };
    capacity?: { in: number[] };
    screenSize?: { in: number[] };
    ProductMark?: { name: { in: string[] } };
  } = {};

  if (query) {
    whereClause.name = { contains: query };
  }

  if (batteryCapacity) {
    const batteryCapacityArray = batteryCapacity
      .split("_or_")
      .map((v) => parseInt(v));
    whereClause.batteryCapacity = { in: batteryCapacityArray };
  }

  if (memorySize) {
    const memorySizeArray = memorySize.split("_or_").map((v) => parseInt(v));
    whereClause.memory = { in: memorySizeArray };
  }

  if (capacity) {
    const capacityArray = capacity.split("_or_").map((v) => parseInt(v));
    whereClause.capacity = { in: capacityArray };
  }

  if (screenSize) {
    const screenSizeArray = screenSize.split("_or_").map((v) => parseInt(v));
    whereClause.screenSize = { in: screenSizeArray };
  }

  if (mark) {
    const markArray = mark.split("_or_"); // Split marks into an array
    whereClause.ProductMark = { name: { in: markArray } };
  }

  const products = await getProducts({
    where: whereClause,
  });

  return (
    <section className="">
        <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
    </section>
  );
};

export default ProductsPage;
