
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlayCircle, PauseCircle, SkipForward, SkipBack } from "lucide-react";

interface LessonContent {
  id: number;
  title: string;
  content: string;
}

export const MutualFundsLearning = () => {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const lessons: LessonContent[] = [
    {
      id: 1,
      title: "What are Mutual Funds?",
      content: "A mutual fund is a professionally managed investment fund that pools money from many investors to purchase securities. These securities can include stocks, bonds, and other assets.",
    },
    {
      id: 2,
      title: "Types of Mutual Funds",
      content: "There are several types of mutual funds: Equity funds invest in stocks, Bond funds invest in bonds, Money market funds invest in short-term debt, and Balanced funds invest in both stocks and bonds.",
    },
    {
      id: 3,
      title: "Benefits of Mutual Funds",
      content: "Mutual funds offer professional management, diversification, and liquidity. They're a great way for beginners to start investing with relatively small amounts of money.",
    },
    {
      id: 4,
      title: "How to Invest in Mutual Funds",
      content: "You can invest in mutual funds through a broker, directly from a fund company, or through your retirement plan. Many funds allow you to start with a small initial investment.",
    },
  ];

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextLesson = () => {
    if (currentLesson < lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
      setIsPlaying(false);
    }
  };

  const previousLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
      setIsPlaying(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 glass dark:glass-dark rounded-lg border shadow-lg animate-fade-up">
      <h2 className="text-2xl font-bold mb-6">Learn About Mutual Funds</h2>

      <div className="relative aspect-video mb-6 rounded-lg overflow-hidden bg-black/90">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-8">
            <h3 className="text-xl font-semibold mb-4 text-white">
              {lessons[currentLesson].title}
            </h3>
            <p className="text-gray-200 leading-relaxed">
              {lessons[currentLesson].content}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={previousLesson}
          disabled={currentLesson === 0}
        >
          <SkipBack className="h-4 w-4" />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          onClick={togglePlay}
        >
          {isPlaying ? (
            <PauseCircle className="h-4 w-4" />
          ) : (
            <PlayCircle className="h-4 w-4" />
          )}
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={nextLesson}
          disabled={currentLesson === lessons.length - 1}
        >
          <SkipForward className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-6">
        <div className="h-1 bg-gray-200 rounded-full">
          <div
            className="h-1 bg-primary rounded-full transition-all duration-300"
            style={{
              width: `${((currentLesson + 1) / lessons.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
