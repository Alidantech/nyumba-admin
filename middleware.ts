import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// Middleware function
export async function middleware(req: NextRequest) {
  const token = cookies().get("auth-token");

  // Declare public and protected routes
  const protectedRoutes = ["/"];

  // Determine if current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  );
  // Redirect if user is not authenticated
  if (isProtectedRoute && !token && path !== "/login") {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Apply middleware to all paths except those containing '/api', the landing page '/', and other specified ones
    "/((?!api|/api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|^$).*)",
  ],
};
