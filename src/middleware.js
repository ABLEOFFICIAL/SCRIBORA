export const runtime = "nodejs";

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import clientPromise from "@/lib/mongodb";

export async function middleware(request) {
  const token = request.cookies.get("admin-token")?.value;
  const { pathname } = request.nextUrl;

  console.log(
    "🔒 Middleware - Path:",
    pathname,
    "Token:",
    token ? "✓ exists" : "✗ missing"
  );

  // Allow access to signIn page without token
  if (pathname === "/admin/signIn") {
    if (token) {
      try {
        // Verify JWT
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET || "your-secret-key"
        );
        console.log("✓ Middleware: Valid admin-token for", decoded.email);

        // Verify admin exists in database
        const client = await clientPromise;
        const db = client.db();
        const admin = await db
          .collection("adminLogin")
          .findOne({ email: decoded.email });

        if (admin) {
          console.log(
            "✓ Middleware: Already authenticated, redirecting to /admin"
          );
          return NextResponse.redirect(new URL("/admin", request.url));
        }
      } catch (error) {
        console.log("✗ Middleware: Invalid admin-token:", error.message);
      }
    }
    console.log("→ Middleware: Allowing access to signIn page");
    return NextResponse.next();
  }

  // Protect other /admin routes
  if (pathname.startsWith("/admin")) {
    if (!token) {
      console.log("✗ Middleware: No admin-token cookie, redirecting to signIn");
      return NextResponse.redirect(new URL("/admin/signIn", request.url));
    }

    try {
      // Verify JWT
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "your-secret-key"
      );
      console.log("✓ Middleware: Valid admin-token for", decoded.email);

      // Verify admin exists
      const client = await clientPromise;
      const db = client.db();
      const admin = await db
        .collection("adminLogin")
        .findOne({ email: decoded.email });

      if (!admin) {
        console.log("✗ Middleware: Admin not found, redirecting to signIn");
        return NextResponse.redirect(new URL("/admin/signIn", request.url));
      }

      console.log("✓ Middleware: Token verified, allowing access to", pathname);
      return NextResponse.next();
    } catch (error) {
      console.log(
        "✗ Middleware: Invalid admin-token, redirecting to signIn:",
        error.message
      );
      return NextResponse.redirect(new URL("/admin/signIn", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
