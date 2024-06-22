"use client";
import { useSession } from "@hono/auth-js/react";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";

const ProtectedWrapper = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const session = useSession();
  if (session.status === "loading") return <div>Loading...</div>;
  if (session.status === "unauthenticated") router.push("/login");

  return children;
};

export default ProtectedWrapper;
