import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { loginPaths, redirect_path } from "@/routes";

const { auth } = NextAuth(authConfig);

// @ts-ignore
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  console.log(req.auth);

  if (isLoggedIn) {
    if (nextUrl.pathname === "/login") {
      return Response.redirect(new URL(redirect_path, nextUrl));
    }
    return null;
  }

  if (loginPaths.includes(nextUrl.pathname)) {
    return Response.redirect(new URL("/login", nextUrl));
  }

  return null;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
