import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import path from "path";
import { storage } from "./storage";
import { insertQuestionPaperSchema, insertVideoSchema, insertFeedbackSchema } from "@shared/schema";
import { z } from "zod";

// Configure multer for file uploads
const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"));
    }
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Session middleware for admin authentication
  app.use((req, res, next) => {
    if (!req.session) {
      req.session = {} as any;
    }
    next();
  });

  // Get question papers with optional filters
  app.get("/api/question-papers", async (req, res) => {
    try {
      const filters = {
        class: req.query.class as string,
        subject: req.query.subject as string,
        year: req.query.year ? parseInt(req.query.year as string) : undefined,
        phase: req.query.phase as string,
      };

      // Remove undefined values
      Object.keys(filters).forEach(key => {
        if (filters[key as keyof typeof filters] === undefined) {
          delete filters[key as keyof typeof filters];
        }
      });

      const papers = await storage.getQuestionPapers(filters);
      res.json(papers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch question papers" });
    }
  });

  // Get specific question paper
  app.get("/api/question-papers/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const paper = await storage.getQuestionPaper(id);
      
      if (!paper) {
        return res.status(404).json({ message: "Question paper not found" });
      }
      
      res.json(paper);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch question paper" });
    }
  });

  // Upload question paper (admin only)
  app.post("/api/upload-paper", upload.single("file"), async (req, res) => {
    try {
      // Check admin authentication
      if (!req.session.isAuthenticated) {
        return res.status(401).json({ message: "Admin authentication required" });
      }

      if (!req.file) {
        return res.status(400).json({ message: "PDF file is required" });
      }

      const paperData = {
        title: req.body.title,
        description: req.body.description,
        class: req.body.class,
        subject: req.body.subject,
        year: parseInt(req.body.year),
        phase: req.body.phase,
        fileName: req.file.originalname,
        filePath: req.file.path,
      };

      const validatedData = insertQuestionPaperSchema.parse(paperData);
      const paper = await storage.createQuestionPaper(validatedData);
      
      res.json(paper);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to upload question paper" });
    }
  });

  // Delete question paper (admin only)
  app.delete("/api/question-papers/:id", async (req, res) => {
    try {
      if (!req.session.isAuthenticated) {
        return res.status(401).json({ message: "Admin authentication required" });
      }

      const id = parseInt(req.params.id);
      const deleted = await storage.deleteQuestionPaper(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Question paper not found" });
      }
      
      res.json({ message: "Question paper deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete question paper" });
    }
  });

  // Get videos with optional filters
  app.get("/api/videos", async (req, res) => {
    try {
      const filters = {
        class: req.query.class as string,
        subject: req.query.subject as string,
      };

      // Remove undefined values
      Object.keys(filters).forEach(key => {
        if (filters[key as keyof typeof filters] === undefined) {
          delete filters[key as keyof typeof filters];
        }
      });

      const videos = await storage.getVideos(filters);
      res.json(videos);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch videos" });
    }
  });

  // Get specific video and increment views
  app.get("/api/videos/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const video = await storage.getVideo(id);
      
      if (!video) {
        return res.status(404).json({ message: "Video not found" });
      }

      // Increment views
      await storage.incrementVideoViews(id);
      
      res.json(video);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch video" });
    }
  });

  // Add video (admin only)
  app.post("/api/add-video", async (req, res) => {
    try {
      if (!req.session.isAuthenticated) {
        return res.status(401).json({ message: "Admin authentication required" });
      }

      const validatedData = insertVideoSchema.parse(req.body);
      const video = await storage.createVideo(validatedData);
      
      res.json(video);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to add video" });
    }
  });

  // Delete video (admin only)
  app.delete("/api/videos/:id", async (req, res) => {
    try {
      if (!req.session.isAuthenticated) {
        return res.status(401).json({ message: "Admin authentication required" });
      }

      const id = parseInt(req.params.id);
      const deleted = await storage.deleteVideo(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Video not found" });
      }
      
      res.json({ message: "Video deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete video" });
    }
  });

  // Submit feedback
  app.post("/api/submit-feedback", async (req, res) => {
    try {
      const validatedData = insertFeedbackSchema.parse(req.body);
      const feedback = await storage.createFeedback(validatedData);
      
      res.json({ message: "Feedback submitted successfully", feedback });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to submit feedback" });
    }
  });

  // Get feedback (admin only)
  app.get("/api/feedback", async (req, res) => {
    try {
      if (!req.session.isAuthenticated) {
        return res.status(401).json({ message: "Admin authentication required" });
      }

      const feedback = await storage.getFeedback();
      res.json(feedback);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch feedback" });
    }
  });

  // Delete feedback (admin only)
  app.delete("/api/feedback/:id", async (req, res) => {
    try {
      if (!req.session.isAuthenticated) {
        return res.status(401).json({ message: "Admin authentication required" });
      }

      const id = parseInt(req.params.id);
      const deleted = await storage.deleteFeedback(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Feedback not found" });
      }
      
      res.json({ message: "Feedback deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete feedback" });
    }
  });

  // Admin login
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      const isValid = await storage.authenticateAdmin(username, password);
      
      if (isValid) {
        req.session.isAuthenticated = true;
        res.json({ message: "Login successful", authenticated: true });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).json({ message: "Login failed" });
    }
  });

  // Admin logout
  app.post("/api/admin/logout", (req, res) => {
    req.session.isAuthenticated = false;
    res.json({ message: "Logout successful" });
  });

  // Check admin authentication status
  app.get("/api/admin/status", (req, res) => {
    res.json({ authenticated: !!req.session.isAuthenticated });
  });

  // Get admin stats
  app.get("/api/admin/stats", async (req, res) => {
    try {
      if (!req.session.isAuthenticated) {
        return res.status(401).json({ message: "Admin authentication required" });
      }

      const papers = await storage.getQuestionPapers();
      const videos = await storage.getVideos();
      const feedback = await storage.getFeedback();

      const stats = {
        totalPapers: papers.length,
        totalVideos: videos.length,
        totalFeedback: feedback.length,
        totalDownloads: papers.reduce((acc, paper) => acc + Math.floor(Math.random() * 1000), 0), // Mock downloads
      };

      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
