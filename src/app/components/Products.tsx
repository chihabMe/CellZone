import ProductCard from "@/components/ui/ProductCard";
import { Product } from "@prisma/client";
import * as Tabs from "@radix-ui/react-tabs";
import ClientMotion from "./ClientMotion";
let host = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "http://localhost:3000";
if (!host.includes("https")) host = "https://" + host;

const getProducts = async (url: string): Promise<Product[]> => {
  const response = await fetch(url, {
    method: "GET",
    cache: "no-cache",
  });
  if (!response.ok) throw new Error("can't fetch the products");
  return response.json();
};
const tabs = [
  {
    name: "New Arrival",
    url: host + "/api/products",
  },
  {
    name: "Bestseller",
    url: host + "/api/products/bestseller",
  },
  {
    name: "Featured Products",
    url: host + "/api/products/featured",
  },
];
const Products = async () => {
  return (
    <section>
      <Tabs.Root
        defaultValue={`tab_${tabs[0].name}`}
        className="container max-w-screen-xl py-4 mx-auto"
      >
        <Tabs.List className="flex gap-2">
          {tabs.map((tab) => (
            <Tabs.Trigger
              className="px-4 data-[state=active]:bg-gray-100 transition-all duration-200 rounded-lg py-2.5 cursor-pointer hover:bg-gray-100"
              key={"trigger_" + tab.name}
              value={`tab_${tab.name}`}
            >
              {tab.name}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <div className="py-4"></div>
        {tabs.map((tab) => (
          <Tabs.Content key={"content_" + tab.name} value={`tab_${tab.name}`}>
            <ProductsList url={tab.url} title={tab.name} />
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </section>
  );
};

const ProductsList = async (props: { url: string; title: string }) => {
  const products = await getProducts(props.url);
  return (
    <div>
      <div className=" px-2 container mx-auto max-w-screen-xl gap-4 grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product, idx) => (
          <ClientMotion key={"home_product_card_" + product.id} idx={idx}>
            <ProductCard key={product.id} product={product} />
          </ClientMotion>
        ))}
      </div>
    </div>
  );
};

export default Products;
