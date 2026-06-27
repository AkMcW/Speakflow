import { pgTable, serial, text, integer, timestamp, jsonb } from "drizzle-orm/pg-core";

export const scripts = pgTable("scripts", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  scenario: text("scenario").notNull(),
  content: text("content").notNull(),
  wordCount: integer("word_count").notNull().default(0),
  duration: text("duration").notNull().default(""),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type Script = typeof scripts.$inferSelect;
export type NewScript = typeof scripts.$inferInsert;

export const practiceSessions = pgTable("practice_sessions", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  scenario: text("scenario").notNull().default(""),
  transcript: text("transcript").notNull().default(""),
  scores: jsonb("scores").notNull().default({}),
  fillerWords: jsonb("filler_words").notNull().default({}),
  wpm: integer("wpm").notNull().default(0),
  durationSeconds: integer("duration_seconds").notNull().default(0),
  strengths: jsonb("strengths").notNull().default([]),
  improvements: jsonb("improvements").notNull().default([]),
  aiFeedback: text("ai_feedback").notNull().default(""),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type PracticeSession = typeof practiceSessions.$inferSelect;
export type NewPracticeSession = typeof practiceSessions.$inferInsert;
