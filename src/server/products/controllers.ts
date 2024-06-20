import { Context, Env } from "hono";

export const getAllProductsController = async (c: Context<Env>) => {
  const products = await c.get("db").product.findMany();
  return c.json(products);
};
