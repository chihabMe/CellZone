import { createSafeActionClient } from "next-safe-action";
import { auth } from "./auth";
import { db } from "./db";

export const actionClient = createSafeActionClient().use(
  async ({ next, ctx }) => {
    return next({ ctx: { db } });
  }
);
export const protectedActionClient = actionClient.use(async ({ next, ctx }) => {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
  return next({ ctx: { ...ctx, session } });
});
