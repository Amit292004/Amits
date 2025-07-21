import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { VideoPlayer } from "@/components/video-player";
import { Video, Plus } from "lucide-react";
import type { Video as VideoType } from "@shared/schema";
import { CLASSES, SUBJECTS, type VideoFilters } from "@/lib/types";

export default function Videos() {
  const [filters, setFilters] = useState<VideoFilters>({
    class: "all",
    subject: "all",
  });

  const { data: videos, isLoading, error, refetch } = useQuery<VideoType[]>({
    queryKey: ["/api/videos", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== "all") params.append(key, value);
      });
      
      const response = await fetch(`/api/videos?${params}`);
      if (!response.ok) throw new Error("Failed to fetch videos");
      return response.json();
    },
  });

  const handleFilterChange = (key: keyof VideoFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      class: "all",
      subject: "all",
    });
  };

  const handleVideoPlay = async (videoId: number) => {
    try {
      await fetch(`/api/videos/${videoId}`);
      refetch();
    } catch (error) {
      console.error("Failed to increment video views:", error);
    }
  };

  const videoCategories = [
    {
      subject: "Mathematics",
      icon: "📐",
      bgColor: "bg-red-100",
      count: videos?.filter(v => v.subject.toLowerCase().includes("math")).length || 0,
    },
    {
      subject: "Science",
      icon: "🧪",
      bgColor: "bg-blue-100",
      count: videos?.filter(v => v.subject.toLowerCase().includes("science")).length || 0,
    },
    {
      subject: "English",
      icon: "📚",
      bgColor: "bg-green-100",
      count: videos?.filter(v => v.subject.toLowerCase().includes("english")).length || 0,
    },
    {
      subject: "Social Science",
      icon: "🌍",
      bgColor: "bg-purple-100",
      count: videos?.filter(v => v.subject.toLowerCase().includes("social")).length || 0,
    },
  ];

  return (
    <section className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Concept Videos
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Learn with carefully curated YouTube videos
          </p>
        </div>

        {/* Video Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {videoCategories.map((category) => (
            <Card
              key={category.subject}
              className="bg-white shadow-md text-center group hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleFilterChange("subject", category.subject.toLowerCase())}
            >
              <CardContent className="p-6">
                <div className={`${category.bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <span className="text-2xl">{category.icon}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {category.subject}
                </h3>
                <p className="text-sm text-gray-600">
                  {category.count} Videos
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Card className="bg-white mb-12">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-4">
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

              <div className="flex items-end">
                <Button variant="outline" onClick={clearFilters} className="w-full">
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Loading State */}
        {isLoading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="aspect-video w-full" />
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-600">Failed to load videos. Please try again.</p>
          </div>
        )}

        {/* Videos Grid */}
        {videos && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <Video className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No videos found</h3>
                <p className="text-gray-500">Try adjusting your filters to find more results.</p>
              </div>
            ) : (
              videos.map((video) => (
                <Card key={video.id} className="bg-white overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <VideoPlayer
                    video={video}
                    onPlay={() => handleVideoPlay(video.id)}
                  />
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        Class {video.class}
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {video.subject}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {video.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {video.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>
                        {video.views && video.views > 0 ? `${video.views.toLocaleString()} views` : "No views yet"}
                      </span>
                      <span>
                        {video.createdAt ? new Date(video.createdAt).toLocaleDateString() : "Recently added"}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Load More Button */}
        {videos && videos.length > 0 && (
          <div className="text-center mt-12">
            <Button size="lg">
              <Plus className="mr-2 h-5 w-5" />
              Load More Videos
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
