
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  isAI?: boolean;
  className?: string;
}

export const ChatMessage = ({ message, isAI = false, className }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex w-full mb-4 animate-fade-up",
        isAI ? "justify-start" : "justify-end",
        className
      )}
    >
      <div
        className={cn(
          "max-w-[80%] px-4 py-2 rounded-lg message-transition",
          isAI
            ? "bg-secondary text-secondary-foreground rounded-tl-none"
            : "bg-primary text-primary-foreground rounded-tr-none"
        )}
      >
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};
