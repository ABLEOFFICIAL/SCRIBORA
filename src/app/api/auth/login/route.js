export const runtime = "nodejs";

import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    console.log("🔐 Login attempt for:", email);

    // Get MongoDB client
    const client = await clientPromise;
    const db = client.db();

    const admin = await db.collection("adminLogin").findOne({ email });

    if (!admin) {
      console.log("✗ Admin not found");
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      console.log("✗ Invalid password");
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Create JWT
    const token = jwt.sign(
      { id: admin._id.toString(), email: admin.email },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" }
    );

    console.log("✓ Login successful for:", email);

    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful",
        admin: {
          id: admin._id.toString(),
          email: admin.email,
          name: admin.name || "Admin Scribora",
        },
      },
      { status: 200 }
    );

    // Set admin-token cookie
    response.cookies.set("admin-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    // Add CORS headers
    response.headers.set(
      "Access-Control-Allow-Origin",
      "http://localhost:3000"
    );
    response.headers.set("Access-Control-Allow-Credentials", "true");

    return response;
  } catch (error) {
    console.error("✗ Login error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
