import { users, signups, catMugshots, type User, type InsertUser, type Signup, type InsertSignup, type CatMugshot, type InsertCatMugshot } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createSignup(signup: InsertSignup): Promise<Signup>;
  getSignups(): Promise<Signup[]>;
  createCatMugshot(mugshot: InsertCatMugshot): Promise<CatMugshot>;
  getCatMugshots(): Promise<CatMugshot[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createSignup(insertSignup: InsertSignup): Promise<Signup> {
    const [signup] = await db
      .insert(signups)
      .values(insertSignup)
      .returning();
    return signup;
  }

  async getSignups(): Promise<Signup[]> {
    return await db.select().from(signups).orderBy(signups.createdAt);
  }

  async createCatMugshot(insertMugshot: InsertCatMugshot): Promise<CatMugshot> {
    const [mugshot] = await db
      .insert(catMugshots)
      .values(insertMugshot)
      .returning();
    return mugshot;
  }

  async getCatMugshots(): Promise<CatMugshot[]> {
    return await db.select().from(catMugshots).orderBy(catMugshots.createdAt);
  }
}

export const storage = new DatabaseStorage();
