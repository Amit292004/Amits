export interface FilterState {
  class: string;
  subject: string;
  year: string;
  phase: string;
}

export interface VideoFilters {
  class: string;
  subject: string;
}

export interface AdminStats {
  totalPapers: number;
  totalVideos: number;
  totalFeedback: number;
  totalDownloads: number;
}

export interface YouTubeVideoInfo {
  videoId: string;
  embedUrl: string;
  thumbnailUrl: string;
}

export const CLASSES = [
  { value: "8", label: "Class 8" },
  { value: "9", label: "Class 9" },
  { value: "10", label: "Class 10" },
  { value: "11-science", label: "Class 11 (Science)" },
  { value: "12-science", label: "Class 12 (Science)" },
];

export const SUBJECTS = [
  { value: "mathematics", label: "Mathematics" },
  { value: "science", label: "Science" },
  { value: "physics", label: "Physics" },
  { value: "chemistry", label: "Chemistry" },
  { value: "biology", label: "Biology" },
  { value: "english", label: "English" },
  { value: "hindi", label: "Hindi" },
  { value: "social", label: "Social Science" },
  { value: "history", label: "History" },
  { value: "geography", label: "Geography" },
  { value: "economics", label: "Economics" },
  { value: "political_science", label: "Political Science" },
];

export const PHASES = [
  { value: "phase1", label: "Phase 1" },
  { value: "phase2", label: "Phase 2" },
  { value: "annual", label: "Annual" },
];

export const YEARS = Array.from({ length: 10 }, (_, i) => {
  const year = new Date().getFullYear() - i;
  return { value: year.toString(), label: year.toString() };
});
