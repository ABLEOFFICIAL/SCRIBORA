// app/api/posts/[id]/route.js
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("scribodaBlogDB");

    // Validate ID
    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const post = await db
      .collection("Posts")
      .findOne({ _id: new ObjectId(params.id) }); // Fix: Use params.id

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("scribodaBlogDB");
    const body = await request.json();

    // Validate ID
    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const result = await db
      .collection("Posts")
      .updateOne({ _id: new ObjectId(params.id) }, { $set: body });

    return NextResponse.json(
      { modifiedCount: result.modifiedCount },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("scribodaBlogDB");

    // Validate ID
    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const result = await db
      .collection("Posts")
      .deleteOne({ _id: new ObjectId(params.id) });

    return NextResponse.json(
      { deletedCount: result.deletedCount },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
