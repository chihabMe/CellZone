import { db } from "@/lib/db";
import { hash } from "bcrypt";
import React from "react";

const RegisterPage = async () => {
  return (
    <div>
      <form action={handleRegisterAction}>
        <input type="email" name="email" />

        <input name="username" type="text" />
        <input type="password" name="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
const handleRegisterAction = async (data: FormData) => {
  "use server";
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
    return {
      errors: "invalid inputs",
    };
  const passwordHash = await hash(password, 14);
  await db.user.create({
    data: {
      email,
      password: passwordHash,
      usenrame: username,
    },
  });
};

export default RegisterPage;
