import { NextResponse, type NextRequest } from "next/server";
import { Cookie } from "./utils/store/cookieAdapter";
import { Token } from "./utils/token/token";

export async function middleware(request: NextRequest) {
  const { at, rt } = new Token(new Cookie());
  console.log("미들웨어 실행", at, rt);
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
