import { getServerSession } from "next-auth/next";
import { db } from "./db";
import NextAuth, { DefaultSession, NextAuthOptions } from "next-auth";
import { compareHash } from "./hash";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: string; // Adjusted to match your session setup
    } & DefaultSession["user"];
  }

  interface User {
    role: string;
  }
}

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  session: {
    maxAge: 30 * 24 * 60 * 60,
    // Adjust your session configuration as needed
    // strategy: "jwt", // This is not needed if using credentials provider
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as string;
      return session;
    },
  },

  providers: [
    CredentialsProvider({
      name: "credentials",
      type: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        if (!email || !password) return null;

        const user = await db.user.findFirst({ where: { email } });
        if (!user) throw new Error("Invalid email or password");

        const isValid = await compareHash(password, user.password as string);
        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.username,
          role: user.role,
        };
      },
    }),
  ],

  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },
};

export const auth = () => getServerSession(authOptions);
