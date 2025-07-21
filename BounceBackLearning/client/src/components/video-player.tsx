import { useState } from "react";
import { Play, ExternalLink } from "lucide-react";
import type { Video } from "@shared/schema";

interface VideoPlayerProps {
  video: Video;
  onPlay?: () => void;
}

export function VideoPlayer({ video, onPlay }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string): string | null => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const videoId = getYouTubeVideoId(video.youtubeUrl);
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : "";
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : "";

  const handlePlay = () => {
    setIsPlaying(true);
    onPlay?.();
  };

  if (!videoId) {
    return (
      <div className="bg-gray-100 aspect-video flex items-center justify-center rounded-lg">
        <p className="text-gray-500">Invalid YouTube URL</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {!isPlaying ? (
        <div className="relative bg-gray-900 aspect-video flex items-center justify-center group cursor-pointer rounded-lg overflow-hidden">
          <img
            src={thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <button
              onClick={handlePlay}
              className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
            >
              <Play className="text-white text-xl ml-1" fill="currentColor" />
            </button>
          </div>
          {video.duration && (
            <div className="absolute top-3 right-3 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm font-medium">
              {video.duration}
            </div>
          )}
        </div>
      ) : (
        <div className="aspect-video rounded-lg overflow-hidden">
          <iframe
            src={embedUrl}
            title={video.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
      
      <div className="mt-2 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          {video.views && video.views > 0 && (
            <span>{video.views.toLocaleString()} views</span>
          )}
        </div>
        <a
          href={video.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          <ExternalLink className="h-4 w-4" />
          Watch on YouTube
        </a>
      </div>
    </div>
  );
}
