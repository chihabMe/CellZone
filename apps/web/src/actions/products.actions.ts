"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { protectedActionClient } from "@/lib/next-safe-actions";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const AddToCartSchema = z.object({
  productId: z.string().cuid(),
});
export const addToCart = protectedActionClient
  .schema(AddToCartSchema)
  .action(async ({ ctx: { session, db }, parsedInput }) => {
    const product = await db.product.findUnique({
      where: {
        id: parsedInput.productId,
      },
    });

    if (!product) return { error: "Product not found" };

    const cart = await db.cart.findFirst({
      where: {
        userId: session.user?.id,
      },
      include: {
        products: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!cart) {
      // Create a new cart if none exists
      await db.cart.create({
        data: {
          userId: session.user.id,
          products: {
            connect: {
              id: parsedInput.productId,
            },
          },
        },
      });
      revalidatePath("/");
      return { inCart: true };
    }

    const productInCart = cart.products.some(
      (product) => product.id === parsedInput.productId
    );

    if (productInCart) {
      await db.cart.update({
        where: {
          id: cart.id,
        },
        data: {
          products: {
            disconnect: {
              id: parsedInput.productId,
            },
          },
        },
      });
      revalidatePath("/");
      return { inCart: false };
    } else {
      await db.cart.update({
        where: {
          id: cart.id,
        },
        data: {
          products: {
            connect: {
              id: parsedInput.productId,
            },
          },
        },
      });
    }
    revalidatePath("/");
    return { inCart: true };
  });

const LikeUnlikeSchema = z.object({
  productId: z.string().cuid(),
});

export const likeUnlike = protectedActionClient
  .schema(LikeUnlikeSchema)
  .action(async ({ ctx: { session, db }, parsedInput: { productId } }) => {
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
  });
