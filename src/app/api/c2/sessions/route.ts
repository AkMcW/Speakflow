import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getSql, ensureC2SessionsTable } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await ensureC2SessionsTable();
    const { scenario, challenge, currentLevel, c2Readiness, scores, keepsBelowC2 } = await req.json();
    const s = getSql();
    const rows = await s`
      INSERT INTO c2_sessions
        (user_id, scenario, challenge, current_level, c2_readiness, scores, keeps_below)
      VALUES
        (${userId}, ${scenario ?? ""}, ${challenge ?? ""}, ${currentLevel ?? ""},
         ${Math.round(Number(c2Readiness) || 0)}, ${JSON.stringify(scores ?? {})},
         ${JSON.stringify(keepsBelowC2 ?? [])})
      RETURNING id, created_at
    `;
    return NextResponse.json({ id: rows[0].id, createdAt: rows[0].created_at });
  } catch (err) {
    console.error("Save C2 session error:", err);
    return NextResponse.json({ error: "Failed to save session" }, { status: 500 });
  }
}

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await ensureC2SessionsTable();
    const s = getSql();
    const rows = await s`
      SELECT id, scenario, challenge, current_level, c2_readiness, scores, keeps_below, created_at
      FROM c2_sessions
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
      LIMIT 200
    `;
    return NextResponse.json({ sessions: rows });
  } catch (err) {
    console.error("Fetch C2 sessions error:", err);
    return NextResponse.json({ error: "Failed to fetch sessions" }, { status: 500 });
  }
}
