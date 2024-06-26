import NextAuth from "next-auth";
import { authOptions } from "./auth";

export const { auth:authMiddleware} = NextAuth(authOptions);
