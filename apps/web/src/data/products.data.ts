"use server";

import IProduct from "@/interfaces/IProduct";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { Prisma, Product } from "db";
import { cache } from "react";

// Fetch user session

// Fetch products liked by the user
const fetchLikedProducts = async (userId: string) => {
  const userWithLikedProducts = await db.user.findFirst({
    where: { id: userId },
    select: { LikedProducts: true },
  });
  return userWithLikedProducts?.LikedProducts || [];
};

// Fetch products in the user's cart
const fetchCartProducts = async (userId: string) => {
  const cart = await db.cart.findFirst({
    where: { userId },
    select: {
      products: true,
    },
  });
  return cart?.products || [];
};

// Check if a product is liked
const isProductLiked = (likedProducts: Product[], productId: string) => {
  return likedProducts.some((product) => product.id === productId);
};

// Check if a product is in the cart
const isProductInCart = (cartProducts: Product[], productId: string) => {
  return cartProducts.some((product) => product.id === productId);
};

// Enhance products with liked and inCart properties
const enhanceProducts = async (products: Product[], userId?: string) => {
  const likedProducts = userId ? await fetchLikedProducts(userId) : [];
  const cartProducts = userId ? await fetchCartProducts(userId) : [];

  return products.map((p) => ({
    ...p,
    liked: isProductLiked(likedProducts, p.id),
    inCart: isProductInCart(cartProducts, p.id),
  }));
};

export const getProducts = cache(
  async (args: Prisma.ProductFindManyArgs): Promise<IProduct[]> => {
    const session = await auth();
    const products = await db.product.findMany(args);

    // if (!session) {
    //   // Return products without liked and inCart information
    //   return products.map((p) => ({
    //     ...p,
    //     liked: false,
    //     inCart: false,
    //   }));
    // }

    // Enhance products with liked and inCart information
    return enhanceProducts(products, session?.user.id);
  }
);

export const getLikedProducts = cache(async (): Promise<IProduct[]> => {
  const session = await auth();
  if (!session) return [];
  const likedProducts = await fetchLikedProducts(session.user.id);

  // Enhance liked products with inCart information
  return enhanceProducts(likedProducts, session.user.id);
});

export const getLikedCount = cache(async () => {
  const likedProducts = await getLikedProducts();
  return likedProducts.length;
});

export const getPopularProducts = cache(() =>
  getProducts({
    take: 4,
  })
);

export const getProductsInCart = cache(async () => {
  const session = await auth();
  if (!session) return [];
  const cartProducts = await fetchCartProducts(session.user.id);
  // Enhance cart products with liked information
  return enhanceProducts(cartProducts, session.user.id);
});

export const getProductsInCartCount = cache(async () => {
  const products = await getProductsInCart();
  return products.length;
});
