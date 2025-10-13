export const runtime = "nodejs";

import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const client = await clientPromise;
    const db = client.db("scribodaBlogDB");

    const result = await db.collection("Posts").updateOne(
      { _id: new ObjectId(id) },
      { $inc: { views: 1 } } // 👈 increment by 1
    );

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error updating views:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update views" },
      { status: 500 }
    );
  }
}
