import ProductCard from "@/components/ui/ProductCard";
import { Prisma } from "@prisma/client";
import * as Tabs from "@radix-ui/react-tabs";
import ClientMotion from "./ClientMotion";
import { getProducts } from "@/data/products.data";
let host = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "http://localhost:3000";
if (!host.includes("https")) host = "https://" + host;

const tabs: {
  name: string;
  where: Prisma.ProductWhereInput;
}[] = [
  {
    name: "New Arrival",
    where: {},
  },
  {
    name: "Bestseller",
    where: {
      isBestseller: true,
    },
  },
  {
    name: "Featured Products",
    where: {
      isFeatured: true,
    },
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
            <ProductsList where={tab.where} title={tab.name} />
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </section>
  );
};

const ProductsList = async (props: {
  where: Prisma.ProductWhereInput;
  title: string;
}) => {
  const products = await getProducts({ where: props.where });
  return (
    <div>
      <div className=" px-2 container mx-auto max-w-screen-xl gap-4 grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product, idx) => (
          <ClientMotion key={"home_product_card_" + product.id} idx={idx}>
            <ProductCard  key={product.id} product={product} />
          </ClientMotion>
        ))}
      </div>
    </div>
  );
};

export default Products;
