// src/app/(client)/api/comments/route.js
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");

    const client = await clientPromise;
    const db = client.db("scribodaBlogDB");

    const query = postId ? { postId } : {};
    const comments = await db
      .collection("Comments") // ✅ Comments collection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(comments, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("scribodaBlogDB");
    const body = await request.json();

    if (!body.postId || !body.comment) {
      return NextResponse.json(
        { error: "postId and comment are required" },
        { status: 400 }
      );
    }

    const newComment = {
      postId: body.postId,
      author: body.author || "Anonymous",
      email: body.email || null,
      comment: body.comment,
      createdAt: new Date(),
    };

    const result = await db.collection("Comments").insertOne(newComment);

    return NextResponse.json(
      { _id: result.insertedId, ...newComment },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
