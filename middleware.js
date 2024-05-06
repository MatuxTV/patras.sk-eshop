// Import necessary modules from Next.js and NextAuth
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// This exports the middleware provided by NextAuth which handles the token and session management
export { default } from "next-auth/middleware";

// Configuration for the middleware to match specific paths
export const config = {
  matcher: ["/user", "/admin"], // Ensure that the middleware applies to all subpaths under '/user' and '/admin'
};

// The middleware function to check user roles and handle access
export async function middleware(req) {
  // Obtain the JWT token from the request
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET
  });

  // Get the pathname from the request URL
  const { pathname } = req.nextUrl;

  // Check if the request starts with '/admin' and if the user role is not the admin role
  if (pathname.startsWith("/admin") && session?.user?.role !== process.env.ADMIN_ROLE) {
    // If the user is not an admin, redirect them to the login page
    return NextResponse.redirect(new URL("/login", req.url));
  }
  // Check if the request starts with '/user' and if the user role is not the user role
  if (pathname.startsWith("/user") && session?.user?.role !== process.env.USER_ROLE) {
    // If the user does not have the user role, redirect them to the login page
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If none of the conditions are met, continue with the request
  return NextResponse.next();
}
