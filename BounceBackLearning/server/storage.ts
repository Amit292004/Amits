import { 
  users, 
  questionPapers, 
  videos, 
  feedback, 
  adminSessions,
  type User, 
  type InsertUser,
  type QuestionPaper,
  type InsertQuestionPaper,
  type Video,
  type InsertVideo,
  type Feedback,
  type InsertFeedback,
  type AdminSession
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Question Paper methods
  getQuestionPapers(filters?: {
    class?: string;
    subject?: string;
    year?: number;
    phase?: string;
  }): Promise<QuestionPaper[]>;
  getQuestionPaper(id: number): Promise<QuestionPaper | undefined>;
  createQuestionPaper(paper: InsertQuestionPaper): Promise<QuestionPaper>;
  deleteQuestionPaper(id: number): Promise<boolean>;
  
  // Video methods
  getVideos(filters?: {
    class?: string;
    subject?: string;
  }): Promise<Video[]>;
  getVideo(id: number): Promise<Video | undefined>;
  createVideo(video: InsertVideo): Promise<Video>;
  deleteVideo(id: number): Promise<boolean>;
  incrementVideoViews(id: number): Promise<void>;
  
  // Feedback methods
  getFeedback(): Promise<Feedback[]>;
  createFeedback(feedback: InsertFeedback): Promise<Feedback>;
  deleteFeedback(id: number): Promise<boolean>;
  
  // Admin session methods
  createAdminSession(sessionId: string): Promise<AdminSession>;
  getAdminSession(sessionId: string): Promise<AdminSession | undefined>;
  authenticateAdmin(username: string, password: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private questionPapers: Map<number, QuestionPaper>;
  private videos: Map<number, Video>;
  private feedback: Map<number, Feedback>;
  private adminSessions: Map<string, AdminSession>;
  private currentUserId: number;
  private currentPaperId: number;
  private currentVideoId: number;
  private currentFeedbackId: number;
  private currentSessionId: number;

  constructor() {
    this.users = new Map();
    this.questionPapers = new Map();
    this.videos = new Map();
    this.feedback = new Map();
    this.adminSessions = new Map();
    this.currentUserId = 1;
    this.currentPaperId = 1;
    this.currentVideoId = 1;
    this.currentFeedbackId = 1;
    this.currentSessionId = 1;
    
    // Initialize with some sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample question papers
    const samplePapers: InsertQuestionPaper[] = [
      {
        title: "Mathematics - 2023",
        description: "NBSE Class 10 Mathematics Question Paper 2023 - Annual Examination",
        class: "10",
        subject: "Mathematics",
        year: 2023,
        phase: "annual",
        fileName: "math_10_2023.pdf",
        filePath: "/uploads/math_10_2023.pdf"
      },
      {
        title: "Physics - 2023",
        description: "NBSE Class 12 Physics Question Paper 2023 - Board Examination",
        class: "12",
        subject: "Physics",
        year: 2023,
        phase: "annual",
        fileName: "physics_12_2023.pdf",
        filePath: "/uploads/physics_12_2023.pdf"
      },
      {
        title: "Science - Phase 1",
        description: "NBSE Class 8 Science Question Paper 2023 - Phase 1 Examination",
        class: "8",
        subject: "Science",
        year: 2023,
        phase: "phase1",
        fileName: "science_8_2023_p1.pdf",
        filePath: "/uploads/science_8_2023_p1.pdf"
      }
    ];

    samplePapers.forEach(paper => {
      this.createQuestionPaper(paper);
    });

    // Sample videos
    const sampleVideos: InsertVideo[] = [
      {
        title: "Quadratic Equations - Complete Chapter",
        description: "Comprehensive explanation of quadratic equations with solved examples and practice problems.",
        class: "10",
        subject: "Mathematics",
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        duration: "10:45"
      },
      {
        title: "Organic Chemistry Basics",
        description: "Introduction to organic chemistry concepts with practical examples and nomenclature rules.",
        class: "12",
        subject: "Chemistry",
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        duration: "15:23"
      },
      {
        title: "Shakespeare's Hamlet Analysis",
        description: "Detailed character analysis and themes in Shakespeare's Hamlet with exam-focused discussion.",
        class: "11",
        subject: "English",
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        duration: "12:18"
      }
    ];

    sampleVideos.forEach(video => {
      this.createVideo(video);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getQuestionPapers(filters?: {
    class?: string;
    subject?: string;
    year?: number;
    phase?: string;
  }): Promise<QuestionPaper[]> {
    let papers = Array.from(this.questionPapers.values());
    
    if (filters) {
      if (filters.class) {
        papers = papers.filter(paper => paper.class === filters.class);
      }
      if (filters.subject) {
        papers = papers.filter(paper => paper.subject.toLowerCase().includes(filters.subject!.toLowerCase()));
      }
      if (filters.year) {
        papers = papers.filter(paper => paper.year === filters.year);
      }
      if (filters.phase) {
        papers = papers.filter(paper => paper.phase === filters.phase);
      }
    }
    
    return papers.sort((a, b) => b.year - a.year);
  }

  async getQuestionPaper(id: number): Promise<QuestionPaper | undefined> {
    return this.questionPapers.get(id);
  }

  async createQuestionPaper(insertPaper: InsertQuestionPaper): Promise<QuestionPaper> {
    const id = this.currentPaperId++;
    const paper: QuestionPaper = { 
      ...insertPaper, 
      id,
      createdAt: new Date()
    };
    this.questionPapers.set(id, paper);
    return paper;
  }

  async deleteQuestionPaper(id: number): Promise<boolean> {
    return this.questionPapers.delete(id);
  }

  async getVideos(filters?: {
    class?: string;
    subject?: string;
  }): Promise<Video[]> {
    let videos = Array.from(this.videos.values());
    
    if (filters) {
      if (filters.class) {
        videos = videos.filter(video => video.class === filters.class);
      }
      if (filters.subject) {
        videos = videos.filter(video => video.subject.toLowerCase().includes(filters.subject!.toLowerCase()));
      }
    }
    
    return videos.sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  async getVideo(id: number): Promise<Video | undefined> {
    return this.videos.get(id);
  }

  async createVideo(insertVideo: InsertVideo): Promise<Video> {
    const id = this.currentVideoId++;
    const video: Video = { 
      ...insertVideo, 
      id,
      views: 0,
      createdAt: new Date()
    };
    this.videos.set(id, video);
    return video;
  }

  async deleteVideo(id: number): Promise<boolean> {
    return this.videos.delete(id);
  }

  async incrementVideoViews(id: number): Promise<void> {
    const video = this.videos.get(id);
    if (video) {
      video.views = (video.views || 0) + 1;
      this.videos.set(id, video);
    }
  }

  async getFeedback(): Promise<Feedback[]> {
    return Array.from(this.feedback.values()).sort((a, b) => 
      (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }

  async createFeedback(insertFeedback: InsertFeedback): Promise<Feedback> {
    const id = this.currentFeedbackId++;
    const feedback: Feedback = { 
      ...insertFeedback, 
      id,
      createdAt: new Date()
    };
    this.feedback.set(id, feedback);
    return feedback;
  }

  async deleteFeedback(id: number): Promise<boolean> {
    return this.feedback.delete(id);
  }

  async createAdminSession(sessionId: string): Promise<AdminSession> {
    const id = this.currentSessionId++;
    const session: AdminSession = {
      id,
      sessionId,
      isAuthenticated: true,
      createdAt: new Date()
    };
    this.adminSessions.set(sessionId, session);
    return session;
  }

  async getAdminSession(sessionId: string): Promise<AdminSession | undefined> {
    return this.adminSessions.get(sessionId);
  }

  async authenticateAdmin(username: string, password: string): Promise<boolean> {
    // Hardcoded admin credentials
    return username === "admin" && password === "admin123";
  }
}

export const storage = new MemStorage();
