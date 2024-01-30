import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { CookieTokenAdapter } from "./utils/token/cookieAdapter";

// This function can be marked `async` if using `await` inside
const cookies = new CookieTokenAdapter();

export function middleware(request: NextRequest) {
  const at = cookies.getToken("at");
  const rt = cookies.getToken("rt");

  if (!at || !rt) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
}

export const config = {
  matcher: ["/event/:path*", "/my-page"],
};
