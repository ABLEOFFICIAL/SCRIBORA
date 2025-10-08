// app/api/posts/route.js
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("scribodaBlogDB");
    const posts = await db.collection("Posts").find({}).toArray();
    if (!posts || posts.length === 0) {
      return NextResponse.json({ message: "No posts found" }, { status: 404 });
    }

    return NextResponse.json(posts, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("scribodaBlogDB");
    const body = await request.json();

    // Add createdAt timestamp
    const postWithTimestamp = {
      ...body,
      createdAt: new Date(),
    };

    const result = await db.collection("Posts").insertOne(postWithTimestamp);

    return NextResponse.json(
      { _id: result.insertedId, ...postWithTimestamp },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error creating post:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
