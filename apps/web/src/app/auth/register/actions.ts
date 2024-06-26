"use server";

import { hashPassword } from "@/lib/hash";
import { actionClient } from "@/lib/next-safe-actions";
import { redirect } from "next/navigation";
import { z } from "zod";
const registrationSchema = z.object({
  email: z.string().email(),
  username: z.string().min(4),
  password: z.string().min(6),
});

export const handleRegisterAction = actionClient
  .schema(registrationSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { email, password, username } = parsedInput;
    console.log("pss");
    const passwordHash = await hashPassword(password)
    console.log("pss2");
    const user = await ctx.db.user.create({
      data: {
        email,
        password: passwordHash,
        username: username,
      },
    });
    await ctx.db.cart.create({
      data: {
        userId: user.id,
      },
    });
    redirect("/auth/login");
  });
