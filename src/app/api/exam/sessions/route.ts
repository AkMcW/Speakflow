import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getSql, ensureExamSessionsTable } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await ensureExamSessionsTable();
    const { examId, examName, taskName, nativeScore, scoreOutOf100 } = await req.json();
    const s = getSql();
    const rows = await s`
      INSERT INTO exam_sessions (user_id, exam_id, exam_name, task_name, native_score, score_out_of_100)
      VALUES (${userId}, ${examId ?? ""}, ${examName ?? ""}, ${taskName ?? ""}, ${nativeScore ?? ""}, ${Math.round(Number(scoreOutOf100) || 0)})
      RETURNING id, created_at
    `;
    return NextResponse.json({ id: rows[0].id, createdAt: rows[0].created_at });
  } catch (err) {
    console.error("Save exam session error:", err);
    return NextResponse.json({ error: "Failed to save attempt" }, { status: 500 });
  }
}

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await ensureExamSessionsTable();
    const s = getSql();
    const rows = await s`
      SELECT id, exam_id, exam_name, task_name, native_score, score_out_of_100, created_at
      FROM exam_sessions
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
      LIMIT 200
    `;
    return NextResponse.json({ sessions: rows });
  } catch (err) {
    console.error("Fetch exam sessions error:", err);
    return NextResponse.json({ error: "Failed to fetch attempts" }, { status: 500 });
  }
}
