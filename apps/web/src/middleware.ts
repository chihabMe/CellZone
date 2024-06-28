import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

// export { default } from "next-auth/middleware";

const ROOT = "/";
const DEFAULT_REDIRECT = "/auth/login";
// const PUBLIC_ROUTES = ["/auth/login", "/auth/register"];
const PROTECTED_ROTES = ["/accounts/*", "/cart", "/favorites"];

// middleware is applied to all routes, use conditionals to select

export default withAuth(
  function middleware(req) {

  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        console.log("--------------");
        console.log(req.nextUrl.pathname, token);
        console.error(req.nextUrl.pathname, token);
        console.log("--------------");
        if (!token) return false;
        return true;
      },
    },
  }
);

// export const config = { matcher: ["/admin"] };
// export default authMiddleware((req) => {

// });
// export default async function middleware() {
//   console.log(session)
//   console.log("middleware");
// }

// export default auth(async function middleware(req: NextRequest) {
//     return NextResponse.redirect(new URL('/home', req.url))

// })

export const config = {
  matcher: ["/accounts/:path*", "/cart", "/favorites"],
};
