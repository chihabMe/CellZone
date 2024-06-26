"use server";

import { actionClient } from "@/lib/next-safe-actions";
import { hash } from "bcrypt";
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
    const passwordHash = await hash(password, 14);
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
