import { NextResponse, type NextRequest } from "next/server";
import { Cookie } from "./utils/store/cookieAdapter";
import { Token } from "./utils/token/token";

export function middleware(request: NextRequest) {
  const { at, rt } = new Token(new Cookie());

  if (request.nextUrl.pathname === "/signup") {
    if (at && rt) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (!at || !rt) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }
}

export const config = {
  matcher: ["/event/:path*", "/my-page", "/signup"],
};
