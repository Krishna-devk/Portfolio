import { NextResponse, NextRequest } from "next/server";
import { createSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const expectedPassword = process.env.ADMIN_PASSWORD || "admin123";

    if (password === expectedPassword) {
      // Valid credentials - initialize administrative session
      await createSession("admin");
      return NextResponse.json({ success: true, message: "Logged in successfully" });
    }

    return NextResponse.json({ error: "Invalid administrative credentials" }, { status: 401 });
  } catch (error) {
    console.error("Login route error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
