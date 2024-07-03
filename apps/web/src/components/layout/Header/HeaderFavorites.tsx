"use client";
import { getLikedCount } from "@/data/products.data";
import { HeartIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
const HeaderFavorites =  () => {
  // const count = await getLikedCount();
  const { data, isLoading } = useQuery({
    queryKey: ["favorites_count"],
    queryFn: () => getLikedCount(),
    // initialData: initialState,
  });
  return (
    <div className="cursor-pointer w-12 h-12 flex justify-center items-center hover:bg-gray-100 rounded-full  relative ">
      <Link href="/cart">
        {isLoading && (
          <div className="absolute top-1 right-1">
            <Skeleton
              //   baseColor="#7a8df3"
              //   highlightColor="#44b7ec"
              //   className="bg-blue-400"
              circle={true}
              height={20}
              width={20}
            />
          </div>
        )}
        <div>
          {!isLoading && (
            <span className="w-5 h-5 rounded-full bg-blue-500 text-white p-1 text-xs text-center absolute top-1 right-1">
              {data}
            </span>
          )}
          <HeartIcon className="h-6 w-6 " />
        </div>
      </Link>
    </div>
  );
};

export default HeaderFavorites;
