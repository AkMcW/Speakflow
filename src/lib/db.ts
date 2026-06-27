import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import type { NeonQueryFunction } from "@neondatabase/serverless";
import * as schema from "./schema";

// Lazy initialization — avoids build-time errors when DATABASE_URL is absent
let _sql: NeonQueryFunction<false, false> | null = null;
let _db: ReturnType<typeof drizzle> | null = null;

export function getSql() {
  if (!_sql) {
    if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");
    _sql = neon(process.env.DATABASE_URL);
  }
  return _sql;
}

export function getDb() {
  if (!_db) {
    _db = drizzle(getSql(), { schema });
  }
  return _db;
}

export const db = new Proxy({} as ReturnType<typeof drizzle<typeof schema>>, {
  get(_, prop) {
    return (getDb() as unknown as Record<string | symbol, unknown>)[prop];
  },
});

export function sql(strings: TemplateStringsArray, ...values: unknown[]) {
  return getSql()(strings, ...values);
}

let scriptsTableReady = false;
let sessionsTableReady = false;

export async function ensureScriptsTable() {
  if (scriptsTableReady) return;
  const s = getSql();
  await s`
    CREATE TABLE IF NOT EXISTS scripts (
      id          SERIAL PRIMARY KEY,
      user_id     TEXT NOT NULL,
      title       TEXT NOT NULL,
      scenario    TEXT NOT NULL DEFAULT '',
      content     TEXT NOT NULL,
      word_count  INTEGER NOT NULL DEFAULT 0,
      duration    TEXT NOT NULL DEFAULT '',
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await s`CREATE INDEX IF NOT EXISTS scripts_user_id_idx ON scripts(user_id)`;
  scriptsTableReady = true;
}

export async function ensurePracticeSessionsTable() {
  if (sessionsTableReady) return;
  const s = getSql();
  await s`
    CREATE TABLE IF NOT EXISTS practice_sessions (
      id               SERIAL PRIMARY KEY,
      user_id          TEXT NOT NULL,
      scenario         TEXT NOT NULL DEFAULT '',
      transcript       TEXT NOT NULL DEFAULT '',
      scores           JSONB NOT NULL DEFAULT '{}',
      filler_words     JSONB NOT NULL DEFAULT '{}',
      wpm              INTEGER NOT NULL DEFAULT 0,
      duration_seconds INTEGER NOT NULL DEFAULT 0,
      strengths        JSONB NOT NULL DEFAULT '[]',
      improvements     JSONB NOT NULL DEFAULT '[]',
      ai_feedback      TEXT NOT NULL DEFAULT '',
      created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await s`CREATE INDEX IF NOT EXISTS practice_sessions_user_id_idx ON practice_sessions(user_id)`;
  sessionsTableReady = true;
}
