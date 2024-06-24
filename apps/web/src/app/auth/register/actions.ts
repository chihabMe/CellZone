"use server";

import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { error } from "console";
import { redirect } from "next/navigation";

export async function handleRegisterAction(data: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 4000));
  console.log(data);
  const email = data.get("email");
  const username = data.get("username");
  const password = data.get("password");
  console.log(email, username, password);
  if (
    typeof email != "string" ||
    typeof username != "string" ||
    typeof password != "string"
  )
    return { error: "Invalid  Inputs" };
  const passwordHash = await hash(password, 14);
  await db.user.create({
    data: {
      email,
      password: passwordHash,
      username: username,
    },
  });
  redirect("/auth/login");
}
