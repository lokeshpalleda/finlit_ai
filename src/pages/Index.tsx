
import { NavigationHeader } from "@/components/NavigationHeader";
import { ChatInterface } from "@/components/ChatInterface";
import { StockGame } from "@/components/StockGame";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const Index = () => {
  const [showStockGame, setShowStockGame] = useState(false);

  const scrollToChat = () => {
    const chatSection = document.getElementById("chat-section");
    chatSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <NavigationHeader onStockGameSelect={() => setShowStockGame(true)} />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(200,200,255,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(200,255,200,0.1),transparent_50%)]" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center animate-fade-up">
          {showStockGame ? (
            <>
              <h2 className="text-3xl font-bold mb-8">Stock Market Game</h2>
              <StockGame />
              <Button 
                variant="outline" 
                className="mt-8"
                onClick={() => setShowStockGame(false)}
              >
                Back to Chat
              </Button>
            </>
          ) : (
            <>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
                Your AI-powered
                <br />
                Financial Guide
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Get personalized financial advice, learn about investing, and make informed decisions
                with our AI assistant.
              </p>
              <Button
                size="lg"
                onClick={scrollToChat}
                className="animate-float"
              >
                Start Chatting
              </Button>
            </>
          )}
        </div>
        
        {!showStockGame && (
          <div className="absolute bottom-8 w-full flex justify-center animate-fade-down">
            <Button
              variant="ghost"
              size="icon"
              onClick={scrollToChat}
              className="animate-float"
            >
              <ChevronDown className="h-6 w-6" />
            </Button>
          </div>
        )}
      </section>

      {/* Chat Section */}
      {!showStockGame && (
        <section
          id="chat-section"
          className="min-h-screen flex flex-col items-center justify-center p-4 relative"
        >
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(200,200,255,0.1),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(200,255,200,0.1),transparent_50%)]" />
          </div>
          
          <ChatInterface />
        </section>
      )}
    </div>
  );
};

export default Index;
