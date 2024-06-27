import ProductCard from "@/components/ui/ProductCard";
import { getProductsInCart } from "@/data/products.data";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "cart  ",
  description: "cart products",
};

const CartPage = async () => {
  const products = await getProductsInCart();
  return (
    <main className="min-h-screen pt-20">
      <section className="container mx-auto">
        <h1 className="py-4 text-3xl  font-medium">Cart products</h1>
        <ul className="py-8 grid-grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default CartPage;
