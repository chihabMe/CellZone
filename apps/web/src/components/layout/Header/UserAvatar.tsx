"use client";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import Skeleton from "react-loading-skeleton";
import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@hono/auth-js/react";

const UserAvatar = () => {
  const session = useSession();
  const router = useRouter();
  if (session.status === "loading")
    return (
      <div className="w-7 h-7 bg-bray-300">
        <Skeleton
          //   baseColor="#7a8df3"
          //   highlightColor="#44b7ec"
          //   className="bg-blue-400"
          circle={true}
          height={28}
          width={28}
        />
      </div>
    );
  const handleClick = () => {
    console.log(session)
    if (session.status == "authenticated") router.push("/accounts/profile");
    else router.push("/auth/login");
  };
  return (
    <div onClick={handleClick} className="cursor-pointer">
      <UserCircleIcon className="h-7 w-7" />
    </div>
  );
};

export default UserAvatar;
