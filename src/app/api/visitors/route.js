export const runtime = "nodejs";

import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("scribodaBlogDB");
    const ip = request.headers.get("x-forwarded-for") || "unknown";

    // Check if visitor exists
    const exists = await db.collection("Visitors").findOne({ ip });

    if (!exists) {
      await db.collection("Visitors").insertOne({
        ip,
        visitedAt: new Date(),
      });
    }

    const totalVisitors = await db.collection("Visitors").countDocuments();

    return NextResponse.json({ success: true, totalVisitors });
  } catch (error) {
    console.error("Error tracking visitor:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}

// ✅ ADD THIS:
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("scribodaBlogDB");

    const totalVisitors = await db.collection("Visitors").countDocuments();

    return NextResponse.json({ success: true, totalVisitors });
  } catch (error) {
    console.error("Error fetching visitors:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
