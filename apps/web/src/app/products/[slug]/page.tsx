import { getProductBySlug } from "@/data/products.data";
import React from "react";

const ProductPage = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const product = await getProductBySlug(slug);
  return <main className="min-h-screen">{product.name}</main>;
};

export default ProductPage;
