import ProductCard from "@/components/ui/ProductCard";
import { getProducts } from "@/data/products.data";
import { Metadata } from "next";
import React from "react";

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
    batteryCapacity?: { equals: number };
    memory?: { equals: number };
    capacity?: { equals: number };
    screenSize?: { equals: number };
    ProductMark?: { name: { contains: string } };
  } = {};

  if (query) {
    whereClause.name = { contains: query };
  }

  if (batteryCapacity && !isNaN(parseInt(batteryCapacity))) {
    whereClause.batteryCapacity = { equals: parseInt(batteryCapacity) };
  }

  if (memorySize && !isNaN(parseInt(memorySize))) {
    whereClause.memory = { equals: parseInt(memorySize) };
  }

  if (capacity && !isNaN(parseInt(capacity))) {
    whereClause.capacity = { equals: parseInt(capacity) };
  }

  if (screenSize && !isNaN(parseInt(screenSize))) {
    whereClause.screenSize = { equals: parseInt(screenSize) };
  }

  if (mark) {
    whereClause.ProductMark = { name: { contains: mark } };
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
