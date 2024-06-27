import { auth } from "@/lib/auth";
import { Context, Env } from "hono";
import z from "zod";

export const getUserProfile = async (c: Context<Env>) => {
  const session = await auth();

  const user = await c.get("db").user.findFirst({
    where: {
      id: session?.user?.id,
    },
  });
  const { password: _, ...profile } = { ...user };
  return c.json(profile);
};

const UpdateProfileInput = z.object({
  username: z.string(),
});
// export const updateUserProfileInfos = async (c: Context<Env>) => {
//   const session = c.get("authUser");
//   const data = await c.req.json();
// };
