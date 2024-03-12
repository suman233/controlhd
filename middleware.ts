import { NextRequest, NextResponse } from "next/server";
// If the incoming request has the "token" cookie
export function middleware(request: NextRequest) {
  const has_token = request.cookies.get(
    process.env.NEXT_APP_TOKEN_NAME!!
  )?.name;

  if (has_token === undefined || has_token === null) {
    request.nextUrl.pathname = "/auth/login";
    return NextResponse.redirect(request.nextUrl);
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/dashboard/:any"]
};
