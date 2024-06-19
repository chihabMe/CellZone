"use client";
import ProtectedWrapper from "@/components/wrappers/ProtectedWrapper";
import { signOut } from "@hono/auth-js/react";
import React from "react";

const ProfilePage = () => {
  return (
    <ProtectedWrapper>
      <div>
        <button
          onClick={() =>
            signOut({ redirect: true, callbackUrl: "/auth/login" })
          }
          className="bg-red-400 text-white rounded-md px-4 py-2 "
        >
          logout
        </button>
      </div>
    </ProtectedWrapper>
  );
};

export default ProfilePage;
