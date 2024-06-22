import CredentialsProvider from "@auth/core/providers/credentials";
import { db } from "./db";
import { compare } from "bcrypt";
import { AuthConfig } from "@auth/core/types";

export const authOptions: AuthConfig = {
  secret: process.env.AUTH_SECRET,
  providers: [
    {
      ...CredentialsProvider({
        credentials: {
          email: { placeholder: "Email", type: "email", name: "email" },
          password: {
            placeholder: "Password",
            type: "password",
            name: "password",
          },
        },
        async authorize(data) {
          if (
            !data.email ||
            typeof data.email != "string" ||
            typeof data.password != "string"
          )
            return null;
          const user = await db.user.findFirst({
            where: { email: data.email },
          });
          if (!user) return null;
          const isValid = await compare(data.password, user.password as string);
          if (!isValid) return null;
          return user;
        },
      }),
    },
  ],
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },
};
