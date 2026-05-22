import { NextResponse, NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import fs from "fs";
import path from "path";

const CONFIG_PATH = path.join(process.cwd(), "config", "portfolio.json");

// Helper to read configuration
function readConfig() {
  try {
    if (!fs.existsSync(CONFIG_PATH)) {
      return null;
    }
    const data = fs.readFileSync(CONFIG_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading portfolio config:", error);
    return null;
  }
}

// Helper to write configuration
function writeConfig(data: any) {
  try {
    const dir = path.dirname(CONFIG_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error writing portfolio config:", error);
    return false;
  }
}

export async function GET() {
  const data = readConfig();
  if (!data) {
    return NextResponse.json({ error: "Portfolio data not found" }, { status: 404 });
  }
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  // Protect route with admin session check
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
    }

    // Write back updated parameters
    const success = writeConfig(body);
    if (!success) {
      return NextResponse.json({ error: "Failed to persist updates" }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Portfolio updated successfully" });
  } catch (error) {
    console.error("Error in portfolio update handler:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
