import { createSafeActionClient } from "next-safe-action";
import { auth } from "./auth";
import { db } from "./db";
import { redirect } from "next/navigation";

export const actionClient = createSafeActionClient().use(
  async ({ next, ctx }) => {
    return next({ ctx: { db } });
  }
);
export const protectedActionClient = actionClient.use(async ({ next, ctx }) => {
  const session = await auth();
  // if (!session) throw new Error("Unauthorized");
  if (!session) redirect("/auth/login");
  return next({ ctx: { ...ctx, session } });
});
