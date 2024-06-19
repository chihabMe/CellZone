"use client";
import { useSession } from "@hono/auth-js/react";

export default  function Home() {
  const session = useSession();
  return <main>{JSON.stringify(session)}</main>;
}
