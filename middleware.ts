import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { loginPaths, redirect_path } from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  if (isLoggedIn) {
    if (nextUrl.pathname === "/login") {
      return Response.redirect(new URL(redirect_path, nextUrl));
    }
    return;
  }

  if (loginPaths.includes(nextUrl.pathname)) {
    return Response.redirect(new URL("/login", nextUrl));
  }

  return;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
