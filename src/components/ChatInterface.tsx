
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessage } from "./ChatMessage";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY"; // We'll handle this securely later

export const ChatInterface = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Array<{ text: string; isAI: boolean }>>([
    { text: "Hi! I'm your AI financial assistant powered by Gemini. How can I help you today?", isAI: true },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateGeminiPrompt = (userMessage: string) => {
    return {
      contents: [{
        parts: [{
          text: `You are a helpful financial advisor AI assistant. Please provide advice and information about finance, investments, and money management.

User message: ${userMessage}

Please provide a helpful, informative response focused on financial topics.`
        }]
      }]
    };
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { text: userMessage, isAI: false }]);
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + GEMINI_API_KEY,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(generateGeminiPrompt(userMessage)),
        }
      );

      const data = await response.json();

      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        setMessages((prev) => [
          ...prev,
          { text: data.candidates[0].content.parts[0].text, isAI: true },
        ]);
      } else {
        throw new Error("Invalid response from Gemini API");
      }
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
      setMessages((prev) => [
        ...prev,
        { text: "I apologize, but I'm having trouble responding right now. Please try again.", isAI: true },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-2xl glass dark:glass-dark rounded-lg border shadow-lg">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message.text}
            isAI={message.isAI}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t p-4">
        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
            disabled={isLoading}
          />
          <Button 
            onClick={handleSend} 
            size="icon"
            disabled={isLoading}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
