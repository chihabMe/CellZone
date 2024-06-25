"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function likeUnlike(productId: string) {
  const session = await auth();
  if (!session) return { error: "Not authenticated" };
  const likedProducts = await db.user.findFirst({
    where: {
      id: session.user?.id,
    },
    include: {
      LikedProducts: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!likedProducts) {
    return { error: "Liked products not found" };
  }
  const isLiked = likedProducts.LikedProducts.some(
    (product) => product.id === productId
  );
  if (isLiked) {
    await db.user.update({
      where: {
        id: session.user?.id,
      },
      data: {
        LikedProducts: {
          disconnect: {
            id: productId,
          },
        },
      },
    });
    revalidatePath("/");
    return { liked: false };
  } else {
    await db.user.update({
      where: {
        id: session.user?.id,
      },
      data: {
        LikedProducts: {
          connect: {
            id: productId,
          },
        },
      },
    });
  }
  revalidatePath("/");
  return { liked: true };
}
