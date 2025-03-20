import { useState, useEffect } from "react";
import { NavigationHeader } from "@/components/NavigationHeader";
import { ChatInterface } from "@/components/ChatInterface";
import { StockGame } from "@/components/StockGame";
import { GoldInvestment } from "@/components/GoldInvestment";
import StockInvestmentData from "@/components/StockInvestmentData";
import MutualFundsLearning from "@/components/MutualFundsLearning";
import BankingLearning from "@/components/BankingLearning";
import { BudgetAnalysis } from "@/components/BudgetAnalysis";
import { Insurance } from "@/components/Insurance";
import InsuranceLearning from "@/components/InsuranceLearning";
import { SIPInvestment } from "@/components/SIPInvestment";
import { MutualFundsInvestment } from "@/components/MutualFundsInvestment";
import { Button } from "@/components/ui/button";
import { db } from "@/components/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const Index = () => {
  const [currentView, setCurrentView] = useState("chat");
  const [videos, setVideos] = useState<{ title: string; url: string }[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "learn", "stocks", "videos")
        );
        const fetchedVideos = querySnapshot.docs.map((doc) =>
          doc.data() as { title: string; url: string }
        );
        setVideos(fetchedVideos);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  const scrollToChat = () => {
    const chatSection = document.getElementById("chat-section");
    if (chatSection) {
      chatSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getCurrentComponent = () => {
    switch (currentView) {
      case "stockGame":
        return (
          <div className="relative flex flex-col md:flex-row gap-8 items-start px-8 w-full">
            {/* Left Section - Stock Market Game */}
            <div className="md:w-[70%] flex-shrink-0">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">
                Stock Market Game
              </h2>
              <div className="scale-90 transform origin-top">
                 <StockGame />
              </div>

            </div>

            {/* Right Section - Stock Investment Videos */}
            <div className="md:w-[70%] flex-shrink-0">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">
                Stock Investment Videos
              </h2>

              {/* Video List */}
              <div className="space-y-6 overflow-y-auto max-h-[600px] pr-4 bg-white p-4 rounded-lg shadow-md">
                {videos.length === 0 ? (
                  <p className="text-gray-600">Loading videos...</p>
                ) : (
                  videos.map((video, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 shadow-lg transition-transform transform hover:scale-105"
                    >
                      <h3 className="text-xl font-semibold mb-2 text-gray-800">
                        {video.title}
                      </h3>
                      <iframe
                        width="100%"
                        height="250"
                        src={video.url.replace("watch?v=", "embed/")}
                        title={video.title}
                        allowFullScreen
                        className="rounded-lg shadow-lg h-[300px]"
                      ></iframe>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        );

      case "gold":
        return <GoldInvestment />;
      case "stockData":
        return <StockInvestmentData />;
      case "mutualFunds":
        return <MutualFundsLearning />;
      case "banking":
        return <BankingLearning />;
      case "budget":
        return <BudgetAnalysis />;
      case "insurance":
        return <Insurance />;
      case "insuranceLearn":
        return <InsuranceLearning />;
      case "sip":
        return <SIPInvestment />;
      case "mutualFundsInvest":
        return <MutualFundsInvestment />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <NavigationHeader
        onStockGameSelect={() => setCurrentView("stockGame")}
        onGoldSelect={() => setCurrentView("gold")}
        onStockDataSelect={() => setCurrentView("stockData")}
        onMutualFundsLearnSelect={() => setCurrentView("mutualFunds")}
        onBankingSelect={() => setCurrentView("banking")}
        onBudgetSelect={() => setCurrentView("budget")}
        onInsuranceSelect={() => setCurrentView("insurance")}
        onInsuranceLearnSelect={() => setCurrentView("insuranceLearn")}
        onSIPSelect={() => setCurrentView("sip")}
        onMutualFundsSelect={() => setCurrentView("mutualFundsInvest")}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 bg-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          {currentView !== "chat" ? (
            <>
              {getCurrentComponent()}
              <Button
                variant="outline"
                className="mt-8 bg-gray-200 hover:bg-gray-300 transition-all shadow-md"
                onClick={() => setCurrentView("chat")}
              >
                Back to Chat
              </Button>
            </>
          ) : (
            <>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 text-gray-900">
                Your AI-powered Financial Guide
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                Get personalized financial advice, learn about investing, and make informed decisions.
              </p>
              <Button
                size="lg"
                onClick={scrollToChat}
                className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300"
              >
                Start Chatting
              </Button>
            </>
          )}
        </div>
      </section>

      {/* Chat Section */}
      {currentView === "chat" && (
        <section id="chat-section" className="min-h-screen flex flex-col items-center justify-center p-4 bg-blue-50">
          <ChatInterface />
        </section>
      )}
    </div>
  );
};

export default Index;
