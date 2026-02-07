import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const signups = pgTable("signups", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  location: text("location"),
  interest: text("interest").notNull(),
  message: text("message"),
  wantsSparkKit: boolean("wants_spark_kit").default(false),
  wantsNewsletter: boolean("wants_newsletter").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertSignupSchema = createInsertSchema(signups).omit({
  id: true,
  createdAt: true,
});

export type InsertSignup = z.infer<typeof insertSignupSchema>;
export type Signup = typeof signups.$inferSelect;
