import NextAuth from "next-auth";
import { NextResponse, NextRequest } from "next/server";

import authConfig from "@/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null;
  };

  if (isAuthRoute) {
    console.log("this1");
    if (isLoggedIn) {
      console.log("this2");
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    };
    return null;
  };

  if (!isLoggedIn && !isPublicRoute) {
    console.log("that");
    return NextResponse.redirect(new URL("/login", nextUrl));
  };

  return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  // "/((?!api|_next/static|_next/image|favicon.ico).*)"
  // "/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"
  // "/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};