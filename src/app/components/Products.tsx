import ProductCard from "@/components/ui/ProductCard";
import { Product } from "@prisma/client";
const getProducts = async (): Promise<Product[]> => {
  const response = await fetch("http://localhost:3000/api/products", {
    method: "GET",
    cache: "no-cache",
  });
  if (!response.ok) throw new Error("can't fetch the products");
  return response.json();
};
const Products = async () => {
  const products = await getProducts();
  return (
    <section>
      <div className=" px-2 container mx-auto max-w-screen-xl gap-4 grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default Products;
