import { NextRequest, NextResponse } from "next/server";
import { ensureScriptsTable } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { ADMIN_EMAIL } from "@/lib/users";

// POST /api/admin/migrate — creates tables if they don't exist (admin only)
export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Only allow admin email
    const body = await req.json().catch(() => ({}));
    const adminSecret = body.secret;
    if (adminSecret !== process.env.ADMIN_SECRET && adminSecret !== ADMIN_EMAIL) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await ensureScriptsTable();
    return NextResponse.json({ ok: true, message: "Migration complete" });
  } catch (err) {
    console.error("Migration error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
