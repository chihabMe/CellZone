import CredentialsProvider from "@auth/core/providers/credentials";
import { db } from "./db";
import { compare } from "bcrypt";
import { AuthConfig, DefaultSession } from "@auth/core/types";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { Adapter } from "@auth/core/adapters";

declare module "@auth/core" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }
}

export const authOptions: AuthConfig = {
  secret: process.env.AUTH_SECRET,
  adapter: PrismaAdapter(db) as Adapter,
  session: {
    maxAge: 30 * 24 * 60 * 60,

    strategy: "jwt",
  },
  // callbacks: {
  // },

  // callbacks: {
  // },
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
          console.log("------------");
          if (!user) throw new Error("Invalid password or Email");
          console.log("------------");
          const isValid = await compare(data.password, user.password as string);
          if (!isValid) return null;
          return { id: user.id, email: user.email, name: user.username };
        },
      }),
    },
  ],
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },
};
