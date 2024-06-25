import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { HeartIcon } from "@heroicons/react/24/outline";
import React, { cache } from "react";
const getLikedCount = cache(async () => {
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
  console.log("likes",userWithLikedProducts);


  return userWithLikedProducts.LikedProducts.length;
});
const HarderLiked = async () => {
  const count = await getLikedCount();
  console.log("count ", count);
  return (
    <div className="cursor-pointer p-2 relative ">
      <span className="w-5 h-5 rounded-full bg-blue-500 text-white p-1 text-xs text-center absolute top-1 right-1">
        {count}
      </span>
      <HeartIcon className="h-8 w-8 " />
    </div>
  );
};

export default HarderLiked;
