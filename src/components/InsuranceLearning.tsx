
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Shield, Heart, Umbrella } from "lucide-react";

interface VideoLesson {
  id: string;
  title: string;
  description: string;
  videoId: string;
  icon: React.ReactNode;
}

export const InsuranceLearning = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoLesson | null>(null);

  const lessons: VideoLesson[] = [
    {
      id: "1",
      title: "Insurance Basics",
      description: "Learn the fundamentals of insurance and risk management",
      videoId: "3tK7wjyNZJk", // Insurance basics video
      icon: <Shield className="h-8 w-8 text-primary" />
    },
    {
      id: "2",
      title: "Health Insurance",
      description: "Understanding health insurance policies and coverage options",
      videoId: "DBTmNm8D-84", // Health insurance video
      icon: <Heart className="h-8 w-8 text-primary" />
    },
    {
      id: "3",
      title: "Life Insurance",
      description: "Guide to life insurance types and when you need them",
      videoId: "9Cny-On7dQk", // Life insurance video
      icon: <Umbrella className="h-8 w-8 text-primary" />
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-6 glass dark:glass-dark rounded-lg border shadow-lg animate-fade-up">
      <h2 className="text-2xl font-bold mb-6">Insurance Education</h2>

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
                {lesson.icon}
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
