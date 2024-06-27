"use client";
import ProtectedWrapper from "@/components/wrappers/ProtectedWrapper";
import {   signOut } from "next-auth/react"
import React from "react";

const ProfilePage = () => {
  return (
    <main className="min-h-screen">
      <ProtectedWrapper>
        <button
          onClick={() =>
            signOut({ redirect: true, callbackUrl: "/auth/login" })
          }
          className="bg-red-400 text-white rounded-md px-4 py-2 "
        >
          logout
        </button>
      </ProtectedWrapper>
    </main>
  );
};

export default ProfilePage;
