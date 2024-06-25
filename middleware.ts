import { NextResponse, type NextRequest } from "next/server";
import { Cookie } from "./src/shared/store";
import { Token } from "./src/shared/token";

const middleware = async (request: NextRequest) => {
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
};

export const config = {
  matcher: ["/event/:path*", "/my-page", "/signup"],
};

export default middleware;
