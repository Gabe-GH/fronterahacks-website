import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({ message: "Cookie set" });
  // Set a cookie to expire after a long time, like 30 days
  response.cookies.set("modal_opened", "true", {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  });
  return response;
}
