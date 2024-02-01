import { NextResponse, type NextRequest } from "next/server";
import { CookieAdapter } from "./utils/store/cookieAdapter";
import { Token } from "./utils/token/token";

export function middleware(request: NextRequest) {
  const { at, rt } = new Token(new CookieAdapter());

  if (!at || !rt) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
}

export const config = {
  matcher: ["/event/:path*", "/my-page"],
};
