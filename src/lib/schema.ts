import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

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
