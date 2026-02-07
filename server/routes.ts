import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSignupSchema } from "@shared/schema";
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

  return httpServer;
}
