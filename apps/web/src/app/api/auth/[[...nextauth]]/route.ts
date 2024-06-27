import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";
// import { handlers } from "../../../../lib/auth";
// export const { GET, POST } = handlers;
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
