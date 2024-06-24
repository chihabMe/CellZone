import { auth, authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { HeartIcon } from "@heroicons/react/24/outline";
import { cookies } from "next/headers";
import React from "react";
// const getLikedCount = ()=>{
//   return db.us
// }
const HarderLiked = async () => {
  const session = await auth();
  // const session = await auth();
  console.log("session ", session);
  return (
    <div className="cursor-pointer">
      <HeartIcon className="h-7 w-7 " />
    </div>
  );
};

export default HarderLiked;
