import { NextResponse, type NextRequest } from "next/server";
import { Cookie } from "./utils/localStore/Cookie";
import { Token } from "./utils/token/token";

export async function middleware(request: NextRequest) {
  const { at, rt } = new Token(new Cookie());
  if (request.nextUrl.pathname === "/signup") {
    if (at && rt) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (!at || !rt) {
      return NextResponse.rewrite(new URL("/checkAuth", request.url));
    }
  }
}

export const config = {
  matcher: ["/event/:path*", "/my-page", "/signup"],
};
