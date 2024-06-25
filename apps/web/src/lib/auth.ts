import CredentialsProvider from "@auth/core/providers/credentials";
import { db } from "./db";
import { compare } from "bcrypt";
import { AuthConfig, DefaultSession } from "@auth/core/types";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthConfig } from "next-auth";
import { Adapter } from "@auth/core/adapters";
import { DefaultJWT } from "@auth/core/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    role: string;
  }
}

export const authOptions: NextAuthConfig = {
  // cookies: {
  //   csrfToken: {
  //     name: "next-auth.csrf-token",
  //   },
  //   sessionToken: {
  //     name: "next-auth.session-token",
  //   },
  // },
  secret: process.env.AUTH_SECRET,
  adapter: PrismaAdapter(db) as Adapter,
  session: {
    maxAge: 30 * 24 * 60 * 60,

    strategy: "jwt",
  },

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        return {
          ...token,
          id: user.id,
          role: user.role,
        };
      }
      return token;
    },
    session: async ({ session, user, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          role: token.role as string,
        },
      };
    },
  },

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
          if (!user) throw new Error("Invalid password or Email");
          const isValid = await compare(data.password, user.password as string);
          if (!isValid) return null;
          return {
            id: user.id,
            email: user.email,
            name: user.username,
            role: user.role,
          };
        },
      }),
    },
  ],
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },
};
export const { auth, handlers, signIn, signOut } = NextAuth(authOptions);
