"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { cache } from "react";

export const getLikedCount = cache(async () => {
  const session = await auth();
  if (!session) return 0;

  // Fetch the user with their liked products
  const userWithLikedProducts = await db.user.findFirst({
    where: { id: session.user?.id },
    include: {
      LikedProducts: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!userWithLikedProducts) return 0;

  return userWithLikedProducts.LikedProducts.length;
});
