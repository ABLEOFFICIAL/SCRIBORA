// src/app/api/upload/route.js
import { NextResponse } from "next/server";
import path from "path";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Validate file type and size
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image files are allowed" },
        { status: 400 }
      );
    }
    if (file.size > 10 * 1024 * 1024) {
      // Limit to 10MB
      return NextResponse.json(
        { error: "File size exceeds 10MB limit" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique file name
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;

    // Ensure uploads directory exists in public
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
      console.log("Created uploads directory:", uploadDir);
    }

    // Save to public/uploads
    const filePath = path.join(uploadDir, filename);
    console.log("Saving file to:", filePath); // Debug log
    await writeFile(filePath, buffer);

    // Return a relative URL
    return NextResponse.json({ url: `/uploads/${filename}` });
  } catch (error) {
    console.error("Upload error:", error.message, error.stack); // Detailed error logging
    return NextResponse.json(
      { error: "Upload failed", details: error.message },
      { status: 500 }
    );
  }
}
