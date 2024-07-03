"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { protectedActionClient } from "@/lib/next-safe-actions";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Add to Cart Schema and Action
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
        items: {
          select: {
            productId: true,
          },
        },
      },
    });

    if (!cart) {
      // Create a new cart if none exists
      await db.cart.create({
        data: {
          userId: session.user.id,
          items: {
            create: {
              productId: parsedInput.productId,
            },
          },
        },
      });
      // revalidatePath("/");
      return { inCart: true };
    }

    const productInCart = cart.items.some(
      (item) => item.productId === parsedInput.productId
    );

    if (productInCart) {
      await db.cartItem.deleteMany({
        where: {
          cartId: cart.id,
          productId: parsedInput.productId,
        },
      });
      // revalidatePath("/");
      return { inCart: false };
    } else {
      await db.cartItem.create({
        data: {
          cartId: cart.id,
          productId: parsedInput.productId,
        },
      });
      // revalidatePath("/");
      return { inCart: true };
    }
  });

// Like/Unlike Schema and Action
const LikeUnlikeSchema = z.object({
  productId: z.string().cuid(),
});

export const likeUnlike = protectedActionClient
  .schema(LikeUnlikeSchema)
  .action(async ({ ctx: { session, db }, parsedInput: { productId } }) => {
    const user = await db.user.findUnique({
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

    if (!user) return { error: "User not found" };

    const isLiked = user.LikedProducts.some(
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
      // revalidatePath("/");
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
      // revalidatePath("/");
      return { liked: true };
    }
  });
