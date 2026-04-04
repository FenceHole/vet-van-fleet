import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSignupSchema, insertCatMugshotSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post("/api/signups", async (req, res) => {
    try {
      const result = insertSignupSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ 
          message: fromZodError(result.error).message 
        });
      }
      
      const signup = await storage.createSignup(result.data);
      return res.status(201).json(signup);
    } catch (error) {
      console.error("Error creating signup:", error);
      return res.status(500).json({ message: "Failed to submit signup" });
    }
  });

  app.get("/api/signups", async (req, res) => {
    try {
      const signups = await storage.getSignups();
      return res.json(signups);
    } catch (error) {
      console.error("Error fetching signups:", error);
      return res.status(500).json({ message: "Failed to fetch signups" });
    }
  });

  app.post("/api/cat-mugshots", async (req, res) => {
    try {
      const result = insertCatMugshotSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({
          message: fromZodError(result.error).message,
        });
      }

      const mugshot = await storage.createCatMugshot(result.data);
      return res.status(201).json(mugshot);
    } catch (error) {
      console.error("Error creating cat mugshot:", error);
      return res.status(500).json({ message: "Failed to submit cat mugshot" });
    }
  });

  app.get("/api/cat-mugshots", async (req, res) => {
    try {
      const mugshots = await storage.getCatMugshots();
      return res.json(mugshots);
    } catch (error) {
      console.error("Error fetching cat mugshots:", error);
      return res.status(500).json({ message: "Failed to fetch cat mugshots" });
    }
  });

  return httpServer;
}
