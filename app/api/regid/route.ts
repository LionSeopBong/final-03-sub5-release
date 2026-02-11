// app/api/regid/route.ts
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "data/stn.json");
    const jsonStr = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(jsonStr);
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Failed to load regid.json" }, { status: 500 });
  }
}
