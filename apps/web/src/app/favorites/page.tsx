import ProductCard from "@/components/ui/ProductCard";
import { getLikedProducts } from "@/data/products.data";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "favorites ",
  description: "favorites products ",
};
const FavoritesPage = async () => {
  const products = await getLikedProducts();
  return (
    <main className="min-h-screen pt-20">
      <section className="container mx-auto">
        <h1 className="py-4 text-3xl  font-medium">Favorites products</h1>
        <ul className="py-8 grid-grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default FavoritesPage;
