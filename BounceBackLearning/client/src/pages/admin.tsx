import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import {
  LogIn,
  LogOut,
  Upload,
  Video,
  FileText,
  MessageCircle,
  Download,
  Settings,
  Eye,
  Trash2,
  Edit,
  CloudUpload,
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import type { QuestionPaper, Video as VideoType, Feedback, InsertQuestionPaper, InsertVideo } from "@shared/schema";
import type { AdminStats } from "@/lib/types";
import { CLASSES, SUBJECTS, PHASES } from "@/lib/types";

interface AdminLoginForm {
  username: string;
  password: string;
}

interface PaperUploadForm extends Omit<InsertQuestionPaper, "fileName" | "filePath"> {
  file: File | null;
}

export default function Admin() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [loginForm, setLoginForm] = useState<AdminLoginForm>({
    username: "",
    password: "",
  });

  const [paperUploadForm, setPaperUploadForm] = useState<PaperUploadForm>({
    title: "",
    description: "",
    class: "",
    subject: "",
    year: new Date().getFullYear(),
    phase: "",
    file: null,
  });

  const [videoAddForm, setVideoAddForm] = useState<InsertVideo>({
    title: "",
    description: "",
    class: "",
    subject: "",
    youtubeUrl: "",
    duration: "",
    thumbnailUrl: "",
  });

  // Check admin authentication status
  const { data: authStatus, isLoading: authLoading } = useQuery<{ authenticated: boolean }>({
    queryKey: ["/api/admin/status"],
    queryFn: async () => {
      const response = await fetch("/api/admin/status", {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to check auth status");
      return response.json();
    },
  });

  // Get admin stats
  const { data: stats, isLoading: statsLoading } = useQuery<AdminStats>({
    queryKey: ["/api/admin/stats"],
    enabled: authStatus?.authenticated,
  });

  // Get question papers for management
  const { data: papers, isLoading: papersLoading } = useQuery<QuestionPaper[]>({
    queryKey: ["/api/question-papers"],
    enabled: authStatus?.authenticated,
  });

  // Get videos for management
  const { data: videos, isLoading: videosLoading } = useQuery<VideoType[]>({
    queryKey: ["/api/videos"],
    enabled: authStatus?.authenticated,
  });

  // Get feedback for management
  const { data: feedback, isLoading: feedbackLoading } = useQuery<Feedback[]>({
    queryKey: ["/api/feedback"],
    enabled: authStatus?.authenticated,
  });

  // Admin login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: AdminLoginForm) => {
      return apiRequest("POST", "/api/admin/login", credentials);
    },
    onSuccess: () => {
      toast({
        title: "Login Successful",
        description: "Welcome to the admin panel!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/status"] });
    },
    onError: () => {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Admin logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/admin/logout", {});
    },
    onSuccess: () => {
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/status"] });
    },
  });

  // Upload question paper mutation
  const uploadPaperMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch("/api/upload-paper", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to upload paper");
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Paper Uploaded",
        description: "Question paper has been uploaded successfully!",
      });
      setPaperUploadForm({
        title: "",
        description: "",
        class: "",
        subject: "",
        year: new Date().getFullYear(),
        phase: "",
        file: null,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/question-papers"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Upload Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Add video mutation
  const addVideoMutation = useMutation({
    mutationFn: async (data: InsertVideo) => {
      return apiRequest("POST", "/api/add-video", data);
    },
    onSuccess: () => {
      toast({
        title: "Video Added",
        description: "Video has been added successfully!",
      });
      setVideoAddForm({
        title: "",
        description: "",
        class: "",
        subject: "",
        youtubeUrl: "",
        duration: "",
        thumbnailUrl: "",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/videos"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
    },
    onError: () => {
      toast({
        title: "Failed to Add Video",
        description: "Please check your input and try again.",
        variant: "destructive",
      });
    },
  });

  // Delete question paper mutation
  const deletePaperMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/question-papers/${id}`, {});
    },
    onSuccess: () => {
      toast({
        title: "Paper Deleted",
        description: "Question paper has been deleted successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/question-papers"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
    },
    onError: () => {
      toast({
        title: "Delete Failed",
        description: "Failed to delete question paper.",
        variant: "destructive",
      });
    },
  });

  // Delete video mutation
  const deleteVideoMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/videos/${id}`, {});
    },
    onSuccess: () => {
      toast({
        title: "Video Deleted",
        description: "Video has been deleted successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/videos"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
    },
    onError: () => {
      toast({
        title: "Delete Failed",
        description: "Failed to delete video.",
        variant: "destructive",
      });
    },
  });

  // Delete feedback mutation
  const deleteFeedbackMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/feedback/${id}`, {});
    },
    onSuccess: () => {
      toast({
        title: "Feedback Deleted",
        description: "Feedback has been deleted successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/feedback"] });
    },
    onError: () => {
      toast({
        title: "Delete Failed",
        description: "Failed to delete feedback.",
        variant: "destructive",
      });
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.username || !loginForm.password) {
      toast({
        title: "Missing Information",
        description: "Please enter both username and password.",
        variant: "destructive",
      });
      return;
    }
    loginMutation.mutate(loginForm);
  };

  const handlePaperUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paperUploadForm.file || !paperUploadForm.title || !paperUploadForm.class || !paperUploadForm.subject || !paperUploadForm.phase) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and select a PDF file.",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", paperUploadForm.file);
    formData.append("title", paperUploadForm.title);
    formData.append("description", paperUploadForm.description || "");
    formData.append("class", paperUploadForm.class);
    formData.append("subject", paperUploadForm.subject);
    formData.append("year", paperUploadForm.year.toString());
    formData.append("phase", paperUploadForm.phase);

    uploadPaperMutation.mutate(formData);
  };

  const handleVideoAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoAddForm.title || !videoAddForm.class || !videoAddForm.subject || !videoAddForm.youtubeUrl) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    addVideoMutation.mutate(videoAddForm);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && file.type !== "application/pdf") {
      toast({
        title: "Invalid File Type",
        description: "Please select a PDF file.",
        variant: "destructive",
      });
      return;
    }
    setPaperUploadForm(prev => ({ ...prev, file }));
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Skeleton className="h-8 w-48 mx-auto mb-4" />
          <Skeleton className="h-4 w-32 mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Admin Panel</h1>
          <p className="mt-4 text-xl text-gray-600">Manage question papers and video content</p>
        </div>

        {!authStatus?.authenticated ? (
          /* Login Form */
          <div className="max-w-md mx-auto">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      required
                      placeholder="Enter admin username"
                      value={loginForm.username}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      placeholder="Enter admin password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={loginMutation.isPending}
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    {loginMutation.isPending ? "Logging in..." : "Login to Admin Panel"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Admin Dashboard */
          <div>
            {/* Dashboard Stats */}
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        {statsLoading ? <Skeleton className="h-8 w-16" /> : stats?.totalPapers || 0}
                      </div>
                      <div className="text-gray-600">Question Papers</div>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <FileText className="text-blue-600 h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        {statsLoading ? <Skeleton className="h-8 w-16" /> : stats?.totalVideos || 0}
                      </div>
                      <div className="text-gray-600">Videos</div>
                    </div>
                    <div className="bg-red-100 p-3 rounded-lg">
                      <Video className="text-red-600 h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        {statsLoading ? <Skeleton className="h-8 w-16" /> : `${Math.floor((stats?.totalDownloads || 0) / 1000)}K`}
                      </div>
                      <div className="text-gray-600">Downloads</div>
                    </div>
                    <div className="bg-green-100 p-3 rounded-lg">
                      <Download className="text-green-600 h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        {statsLoading ? <Skeleton className="h-8 w-16" /> : stats?.totalFeedback || 0}
                      </div>
                      <div className="text-gray-600">Feedback</div>
                    </div>
                    <div className="bg-orange-100 p-3 rounded-lg">
                      <MessageCircle className="text-orange-600 h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Admin Actions */}
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {/* Upload Question Paper */}
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Upload className="text-blue-600 mr-2 h-5 w-5" />
                    Upload Question Paper
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePaperUpload} className="space-y-6">
                    <div>
                      <Label htmlFor="paper-title">Title *</Label>
                      <Input
                        id="paper-title"
                        type="text"
                        required
                        placeholder="e.g., Mathematics - 2023"
                        value={paperUploadForm.title}
                        onChange={(e) => setPaperUploadForm(prev => ({ ...prev, title: e.target.value }))}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="paper-class">Class *</Label>
                        <Select
                          value={paperUploadForm.class}
                          onValueChange={(value) => setPaperUploadForm(prev => ({ ...prev, class: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Class" />
                          </SelectTrigger>
                          <SelectContent>
                            {CLASSES.map((cls) => (
                              <SelectItem key={cls.value} value={cls.value}>
                                {cls.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="paper-subject">Subject *</Label>
                        <Input
                          id="paper-subject"
                          type="text"
                          required
                          placeholder="e.g., Mathematics"
                          value={paperUploadForm.subject}
                          onChange={(e) => setPaperUploadForm(prev => ({ ...prev, subject: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="paper-year">Year *</Label>
                        <Input
                          id="paper-year"
                          type="number"
                          required
                          min="2000"
                          max={new Date().getFullYear()}
                          value={paperUploadForm.year}
                          onChange={(e) => setPaperUploadForm(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="paper-phase">Phase *</Label>
                        <Select
                          value={paperUploadForm.phase}
                          onValueChange={(value) => setPaperUploadForm(prev => ({ ...prev, phase: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Phase" />
                          </SelectTrigger>
                          <SelectContent>
                            {PHASES.map((phase) => (
                              <SelectItem key={phase.value} value={phase.value}>
                                {phase.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="paper-description">Description</Label>
                      <Textarea
                        id="paper-description"
                        placeholder="Brief description of the question paper"
                        value={paperUploadForm.description}
                        onChange={(e) => setPaperUploadForm(prev => ({ ...prev, description: e.target.value }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="pdf-file">PDF File *</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={handleFileChange}
                          className="hidden"
                          id="pdf-upload"
                        />
                        <label htmlFor="pdf-upload" className="cursor-pointer">
                          <CloudUpload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                          <p className="text-gray-600">
                            {paperUploadForm.file
                              ? paperUploadForm.file.name
                              : "Click to upload PDF or drag and drop"}
                          </p>
                        </label>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={uploadPaperMutation.isPending}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      {uploadPaperMutation.isPending ? "Uploading..." : "Upload Question Paper"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Add Video Link */}
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Video className="text-red-600 mr-2 h-5 w-5" />
                    Add Video Link
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleVideoAdd} className="space-y-6">
                    <div>
                      <Label htmlFor="video-title">Video Title *</Label>
                      <Input
                        id="video-title"
                        type="text"
                        required
                        placeholder="Enter video title"
                        value={videoAddForm.title}
                        onChange={(e) => setVideoAddForm(prev => ({ ...prev, title: e.target.value }))}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="video-class">Class *</Label>
                        <Select
                          value={videoAddForm.class}
                          onValueChange={(value) => setVideoAddForm(prev => ({ ...prev, class: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Class" />
                          </SelectTrigger>
                          <SelectContent>
                            {CLASSES.map((cls) => (
                              <SelectItem key={cls.value} value={cls.value}>
                                {cls.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="video-subject">Subject *</Label>
                        <Input
                          id="video-subject"
                          type="text"
                          required
                          placeholder="e.g., Physics"
                          value={videoAddForm.subject}
                          onChange={(e) => setVideoAddForm(prev => ({ ...prev, subject: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="youtube-url">YouTube URL *</Label>
                      <Input
                        id="youtube-url"
                        type="url"
                        required
                        placeholder="https://www.youtube.com/watch?v=..."
                        value={videoAddForm.youtubeUrl}
                        onChange={(e) => setVideoAddForm(prev => ({ ...prev, youtubeUrl: e.target.value }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="video-duration">Duration</Label>
                      <Input
                        id="video-duration"
                        type="text"
                        placeholder="e.g., 10:45"
                        value={videoAddForm.duration || ""}
                        onChange={(e) => setVideoAddForm(prev => ({ ...prev, duration: e.target.value }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="video-description">Description</Label>
                      <Textarea
                        id="video-description"
                        placeholder="Brief description of the video content"
                        value={videoAddForm.description || ""}
                        onChange={(e) => setVideoAddForm(prev => ({ ...prev, description: e.target.value }))}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-red-600 hover:bg-red-700"
                      disabled={addVideoMutation.isPending}
                    >
                      <Video className="mr-2 h-4 w-4" />
                      {addVideoMutation.isPending ? "Adding..." : "Add Video Link"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Content Management */}
            <Card className="bg-white shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center">
                  <Settings className="text-gray-600 mr-2 h-5 w-5" />
                  Content Management
                </CardTitle>
                <Button
                  variant="destructive"
                  onClick={() => logoutMutation.mutate()}
                  disabled={logoutMutation.isPending}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="papers" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="papers">Question Papers</TabsTrigger>
                    <TabsTrigger value="videos">Videos</TabsTrigger>
                    <TabsTrigger value="feedback">Feedback</TabsTrigger>
                  </TabsList>

                  <TabsContent value="papers">
                    {papersLoading ? (
                      <div className="space-y-4">
                        {[...Array(5)].map((_, i) => (
                          <Skeleton key={i} className="h-12 w-full" />
                        ))}
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Title</TableHead>
                              <TableHead>Class</TableHead>
                              <TableHead>Subject</TableHead>
                              <TableHead>Year</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {papers?.map((paper) => (
                              <TableRow key={paper.id}>
                                <TableCell className="font-medium">{paper.title}</TableCell>
                                <TableCell>{paper.class}</TableCell>
                                <TableCell>{paper.subject}</TableCell>
                                <TableCell>{paper.year}</TableCell>
                                <TableCell>
                                  <div className="flex space-x-2">
                                    <Button size="sm" variant="outline">
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="destructive"
                                      onClick={() => deletePaperMutation.mutate(paper.id)}
                                      disabled={deletePaperMutation.isPending}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="videos">
                    {videosLoading ? (
                      <div className="space-y-4">
                        {[...Array(5)].map((_, i) => (
                          <Skeleton key={i} className="h-12 w-full" />
                        ))}
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Title</TableHead>
                              <TableHead>Class</TableHead>
                              <TableHead>Subject</TableHead>
                              <TableHead>Views</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {videos?.map((video) => (
                              <TableRow key={video.id}>
                                <TableCell className="font-medium">{video.title}</TableCell>
                                <TableCell>{video.class}</TableCell>
                                <TableCell>{video.subject}</TableCell>
                                <TableCell>{video.views || 0}</TableCell>
                                <TableCell>
                                  <div className="flex space-x-2">
                                    <Button size="sm" variant="outline">
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="destructive"
                                      onClick={() => deleteVideoMutation.mutate(video.id)}
                                      disabled={deleteVideoMutation.isPending}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="feedback">
                    {feedbackLoading ? (
                      <div className="space-y-4">
                        {[...Array(5)].map((_, i) => (
                          <Skeleton key={i} className="h-12 w-full" />
                        ))}
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Name</TableHead>
                              <TableHead>Email</TableHead>
                              <TableHead>Subject</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {feedback?.map((item) => (
                              <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.name}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{item.subject || "General"}</TableCell>
                                <TableCell>
                                  {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "N/A"}
                                </TableCell>
                                <TableCell>
                                  <div className="flex space-x-2">
                                    <Button size="sm" variant="outline">
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="destructive"
                                      onClick={() => deleteFeedbackMutation.mutate(item.id)}
                                      disabled={deleteFeedbackMutation.isPending}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
}
