
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";

interface VideoLesson {
  id: string;
  title: string;
  description: string;
  videoId: string;
}

export const BankingLearning = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoLesson | null>(null);

  const lessons: VideoLesson[] = [
    {
      id: "1",
      title: "Introduction to Banking",
      description: "Learn the basics of banking and financial institutions",
      videoId: "VIDEO_ID_1" // Replace with actual YouTube video ID
    },
    {
      id: "2",
      title: "Types of Bank Accounts",
      description: "Understanding different types of bank accounts and their benefits",
      videoId: "VIDEO_ID_2" // Replace with actual YouTube video ID
    },
    {
      id: "3",
      title: "Digital Banking",
      description: "Guide to modern digital banking services and security",
      videoId: "VIDEO_ID_3" // Replace with actual YouTube video ID
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-6 glass dark:glass-dark rounded-lg border shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Banking Education</h2>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          {lessons.map((lesson) => (
            <Card 
              key={lesson.id} 
              className={`p-4 cursor-pointer transition-colors hover:bg-accent ${
                selectedVideo?.id === lesson.id ? "border-primary" : ""
              }`}
              onClick={() => setSelectedVideo(lesson)}
            >
              <div className="flex items-center gap-4">
                <PlayCircle className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold">{lesson.title}</h3>
                  <p className="text-sm text-muted-foreground">{lesson.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="aspect-video bg-muted rounded-lg overflow-hidden">
          {selectedVideo ? (
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${selectedVideo.videoId}`}
              title={selectedVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              Select a video to start learning
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
