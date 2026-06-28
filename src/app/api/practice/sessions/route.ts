import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getSql, ensurePracticeSessionsTable } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await ensurePracticeSessionsTable();
    const { scenario, transcript, scores, fillerWords, wpm, durationSeconds, strengths, improvements, aiFeedback, analysis } = await req.json();
    const s = getSql();
    const rows = await s`
      INSERT INTO practice_sessions
        (user_id, scenario, transcript, scores, filler_words, wpm, duration_seconds, strengths, improvements, ai_feedback, analysis)
      VALUES
        (${userId}, ${scenario ?? ""}, ${transcript ?? ""}, ${JSON.stringify(scores ?? {})},
         ${JSON.stringify(fillerWords ?? {})}, ${wpm ?? 0}, ${durationSeconds ?? 0},
         ${JSON.stringify(strengths ?? [])}, ${JSON.stringify(improvements ?? [])}, ${aiFeedback ?? ""},
         ${JSON.stringify(analysis ?? {})})
      RETURNING id, created_at
    `;
    return NextResponse.json({ id: rows[0].id, createdAt: rows[0].created_at });
  } catch (err) {
    console.error("Save practice session error:", err);
    return NextResponse.json({ error: "Failed to save session" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await ensurePracticeSessionsTable();
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    const s = getSql();
    await s`DELETE FROM practice_sessions WHERE id = ${id} AND user_id = ${userId}`;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Delete practice session error:", err);
    return NextResponse.json({ error: "Failed to delete session" }, { status: 500 });
  }
}

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await ensurePracticeSessionsTable();
    const s = getSql();
    const rows = await s`
      SELECT id, scenario, transcript, scores, filler_words, wpm, duration_seconds, strengths, improvements, ai_feedback, analysis, created_at
      FROM practice_sessions
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
      LIMIT 100
    `;
    return NextResponse.json({ sessions: rows });
  } catch (err) {
    console.error("Fetch practice sessions error:", err);
    return NextResponse.json({ error: "Failed to fetch sessions" }, { status: 500 });
  }
}
