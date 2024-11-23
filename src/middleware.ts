import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname == "/") {
    const queryParams = request.nextUrl.search;
    // Construct the new URL with the query parameters
    const newUrl = new URL(`/phase2/login`, request.nextUrl.origin);

    // Redirect to the new URL
    return NextResponse.redirect(newUrl);
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/"],
};
