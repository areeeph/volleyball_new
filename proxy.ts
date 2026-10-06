// proxy.ts

import { NextRequest, NextResponse } from "next/server";
import { decodeJwt } from "jose";

function isTokenValid(token: string): boolean {
  try {
    const payload = decodeJwt(token);

    if (!payload.exp) {
      return false;
    }

    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

export function proxy(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;

  // Dyk2svkhSIISapns

  const isLoggedIn = !!token && isTokenValid(token);

  const pathname = request.nextUrl.pathname;

  const isLoginPage = pathname === "/login";

  const isProtectedRoute =
    pathname.startsWith("/score") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/admin");

  // Logged in → don't allow login page
  if (isLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Not logged in / expired → login
  if (isProtectedRoute && !isLoggedIn) {
    const response = NextResponse.redirect(new URL("/login", request.url));

    response.cookies.delete("access_token");

    //return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/dashboard/:path*", "/profile/:path*", "/admin/:path*"],
};
