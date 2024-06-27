"use client";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const ProtectedWrapper = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const session = useSession();
  if (session.status === "loading") return <div>Loading...</div>;
  if (session.status === "unauthenticated") router.push("/login");

  return children;
};

export default ProtectedWrapper;
