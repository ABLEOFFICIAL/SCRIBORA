export const runtime = "nodejs";

import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import jwt from "jsonwebtoken";

export async function GET(request) {
  try {
    const token = request.cookies.get("admin-token")?.value;
    console.log("🔐 Verify attempt, admin-token cookie:", !!token);

    if (!token) {
      console.log("✗ No admin-token cookie");
      return NextResponse.json(
        { message: "No admin-token cookie" },
        { status: 401 }
      );
    }

    // Verify JWT
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    );
    console.log("✓ Session valid for:", decoded.email);

    // Verify admin exists in database
    const client = await clientPromise;
    const db = client.db();
    const admin = await db
      .collection("adminLogin")
      .findOne({ email: decoded.email });

    if (!admin) {
      console.log("✗ Admin not found");
      return NextResponse.json({ message: "Invalid session" }, { status: 401 });
    }

    const response = NextResponse.json({
      authenticated: true,
      admin: {
        id: admin._id.toString(),
        email: admin.email,
        name: admin.name || "Admin Scribora",
      },
    });

    // Add CORS headers
    response.headers.set(
      "Access-Control-Allow-Origin",
      "http://localhost:3000"
    );
    response.headers.set("Access-Control-Allow-Credentials", "true");

    return response;
  } catch (error) {
    console.error("✗ Verify error:", error.message);
    return NextResponse.json(
      { message: "Invalid or expired session" },
      { status: 401 }
    );
  }
}
