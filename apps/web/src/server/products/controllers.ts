import { Context, Env } from "hono";

export const getAllProductsController = async (c: Context<Env>) => {
  const products = await c.get("db").product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });
  return c.json(products);
};
export const getBestSellerProduct = async (c: Context<Env>) => {
  const products = await c.get("db").product.findMany({
    where: {
      isBestseller: true,
    },
    take: 10,
  });
  return c.json(products);
};
export const getFeaturedProducts = async (c: Context<Env>) => {
  const products = await c.get("db").product.findMany({
    where: {
      isFeatured: true,
    },
    take: 10,
  });
  return c.json(products);
};
