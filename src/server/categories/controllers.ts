import { Product } from "@prisma/client";
import { Context, Env } from "hono";

export const getAllCategoriesController = async (c: Context<Env>) => {
  const categories = await c.get("db").category.findMany();
  return c.json(categories);
};
