import { getProductBySlug } from "@/data/products.data";
import React from "react";
import ProductInfos from "../components/ProductInfos";

const ProductPage = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const product = await getProductBySlug(slug);
  return (
    <main className="min-h-screen">
      <ProductInfos product={product} />
    </main>
  );
};

export default ProductPage;
