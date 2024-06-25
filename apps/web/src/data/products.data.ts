"use server";

import IProduct from "@/interfaces/IProduct";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { Prisma, Product } from "db";
import { cache } from "react";

export const getProducts = cache(
  async (where: Prisma.ProductWhereInput): Promise<IProduct[]> => {
    const session = await auth();
    if (!session) {
      return db.product.findMany({ where });
    }
    const userId = session.user.id;
    const products = await db.product.findMany({
      where,
      include: {
        LikedBy: {
          select: {
            id: true,
          },
        },
      },
    });
    return products.map((p) => ({
      ...p,
      liked: p.LikedBy.some((u) => u.id === userId),
    }));
  }
);

export const getLikedProducts = cache(async (): Promise<Product[]> => {
  const session = await auth();
  if (!session) return [];

  // Fetch the user with their liked products
  const userWithLikedProducts = await db.user.findFirst({
    where: { id: session.user?.id },
    select: {
      LikedProducts: true,
    },
  });

  if (!userWithLikedProducts) return [];

  return userWithLikedProducts.LikedProducts.map((p) => ({
    ...p,
    liked: true,
  }));
});

export const getLikedCount = cache(async () => {
  const products = await getLikedProducts();
  if (!products) return 0;
  return products.length;
});
