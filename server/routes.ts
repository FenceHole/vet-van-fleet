import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSignupSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { z } from "zod";
import { createGitHubRepo } from "./github";

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

  app.post("/api/github/repos", async (req, res) => {
    if (!process.env.GITHUB_TOKEN) {
      return res.status(503).json({
        message: "GitHub integration is not configured. Set the GITHUB_TOKEN environment variable.",
      });
    }

    const schema = z.object({
      name: z.string().min(1),
      description: z.string().optional(),
      isPrivate: z.boolean().optional(),
      autoInit: z.boolean().optional(),
    });

    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: fromZodError(result.error).message });
    }

    try {
      const repo = await createGitHubRepo(result.data);
      return res.status(201).json(repo);
    } catch (error: unknown) {
      console.error("Error creating GitHub repository:", error);
      const message =
        error instanceof Error ? error.message : "Failed to create repository";
      return res.status(500).json({ message });
    }
  });

  return httpServer;
}
