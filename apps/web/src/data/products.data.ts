"use server";

import IProduct from "@/interfaces/IProduct";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { Prisma, Product } from "db";
import { notFound } from "next/navigation";
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
      items: {
        select: {
          product: true,
        },
      },
    },
  });
  return cart?.items.map(item => item.product) || [];
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

    return enhanceProducts(products, session?.user.id);
  }
);

export const getLikedProducts = cache(async (): Promise<IProduct[]> => {
  const session = await auth();
  if (!session) return [];
  const likedProducts = await fetchLikedProducts(session.user.id);

  return enhanceProducts(likedProducts, session.user.id);
});

export const getLikedCount = cache(async () => {
  const likedProducts = await getLikedProducts();
  return likedProducts.length;
});

export const getPopularProducts = cache(() =>
  getProducts({
    where: {
      isPopular: true,
    },
    take: 4,
  })
);

export const getProductsInCart = cache(async () => {
  const session = await auth();
  if (!session) return [];
  const cartProducts = await fetchCartProducts(session.user.id);

  return enhanceProducts(cartProducts, session.user.id);
});

export const getProductsInCartCount = cache(async () => {
  const products = await getProductsInCart();
  return products.length;
});

export const getProductsScreenSizes = cache(async () => {
  return db.product.findMany({
    distinct: ["screenSize"],
    select: {
      screenSize: true,
    },
  });
});

export const getProductMarks = cache(async () => {
  return db.productMark.findMany({
    select: {
      id: true,
      name: true,
      _count: {
        select: {
          Products: true,
        },
      },
    },
  });
});

export const getMemorySizes = cache(async () => {
  return db.product.findMany({
    distinct: ["memory"],
    select: {
      memory: true,
    },
  });
});

export const getCapacity = cache(async () => {
  return db.product.findMany({
    distinct: ["capacity"],
    select: {
      capacity: true,
    },
  });
});

export const getBatteryCapacity = cache(async () => {
  return db.product.findMany({
    distinct: ["batteryCapacity"],
    select: {
      batteryCapacity: true,
    },
  });
});

export const getProductBySlug = async (slug: string) => {
  const session = await auth();
  const product = await db.product.findUnique({
    where: { slug },
  });
  if (!product) return notFound();
  const enhancedProduct = await enhanceProducts([product], session?.user.id);
  return enhancedProduct[0];
};
