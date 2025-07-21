import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText, Eye, Download, Search } from "lucide-react";
import type { QuestionPaper } from "@shared/schema";
import { CLASSES, SUBJECTS, PHASES, YEARS, type FilterState } from "@/lib/types";

export default function QuestionPapers() {
  const [filters, setFilters] = useState<FilterState>({
    class: "all",
    subject: "all",
    year: "all",
    phase: "all",
  });

  const { data: papers, isLoading, error } = useQuery<QuestionPaper[]>({
    queryKey: ["/api/question-papers", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== "all") params.append(key, value);
      });
      
      const response = await fetch(`/api/question-papers?${params}`);
      if (!response.ok) throw new Error("Failed to fetch question papers");
      return response.json();
    },
  });

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      class: "all",
      subject: "all",
      year: "all",
      phase: "all",
    });
  };

  const handleViewPaper = (paper: QuestionPaper) => {
    // For now, just open in new tab - in a real app, you'd implement a PDF viewer
    window.open(`/uploads/${paper.fileName}`, '_blank');
  };

  const handleDownloadPaper = (paper: QuestionPaper) => {
    const link = document.createElement('a');
    link.href = `/uploads/${paper.fileName}`;
    link.download = paper.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Question Papers
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Browse and download NBSE previous year question papers
          </p>
        </div>

        {/* Filters */}
        <Card className="bg-gray-50 mb-12">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="class-filter" className="text-sm font-medium text-gray-700 mb-2">
                  Class
                </Label>
                <Select
                  value={filters.class}
                  onValueChange={(value) => handleFilterChange("class", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Classes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    {CLASSES.map((cls) => (
                      <SelectItem key={cls.value} value={cls.value}>
                        {cls.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="subject-filter" className="text-sm font-medium text-gray-700 mb-2">
                  Subject
                </Label>
                <Select
                  value={filters.subject}
                  onValueChange={(value) => handleFilterChange("subject", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Subjects" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    {SUBJECTS.map((subject) => (
                      <SelectItem key={subject.value} value={subject.value}>
                        {subject.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="year-filter" className="text-sm font-medium text-gray-700 mb-2">
                  Year
                </Label>
                <Select
                  value={filters.year}
                  onValueChange={(value) => handleFilterChange("year", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Years" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    {YEARS.map((year) => (
                      <SelectItem key={year.value} value={year.value}>
                        {year.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="phase-filter" className="text-sm font-medium text-gray-700 mb-2">
                  Phase
                </Label>
                <Select
                  value={filters.phase}
                  onValueChange={(value) => handleFilterChange("phase", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Phases" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Phases</SelectItem>
                    {PHASES.map((phase) => (
                      <SelectItem key={phase.value} value={phase.value}>
                        {phase.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-4 flex justify-between">
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
              <Button>
                <Search className="mr-2 h-4 w-4" />
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Loading State */}
        {isLoading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <Skeleton className="h-12 w-12" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <div className="flex items-center justify-between text-sm mb-4">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-8 flex-1" />
                    <Skeleton className="h-8 flex-1" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-600">Failed to load question papers. Please try again.</p>
          </div>
        )}

        {/* Papers Grid */}
        {papers && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {papers.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No question papers found</h3>
                <p className="text-gray-500">Try adjusting your filters to find more results.</p>
              </div>
            ) : (
              papers.map((paper) => (
                <Card key={paper.id} className="bg-white border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-red-100 p-3 rounded-lg">
                        <FileText className="text-red-600 text-2xl h-6 w-6" />
                      </div>
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        Class {paper.class}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {paper.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {paper.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>Year: {paper.year}</span>
                      <span className="capitalize">{paper.phase}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="default"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleViewPaper(paper)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleDownloadPaper(paper)}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
}
