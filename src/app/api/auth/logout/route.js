// ==================== 9. src/app/api/auth/logout/route.js ====================
export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function POST() {
  console.log("👋 Logging out admin");

  const response = NextResponse.json(
    { success: true, message: "Logout successful" },
    { status: 200 }
  );

  response.cookies.delete("admin-token");

  return response;
}
