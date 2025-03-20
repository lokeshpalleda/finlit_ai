import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";

interface GoldPrice {
  date: string;
  price: number;
}

export const GoldInvestment = () => {
  const [currentPriceUSD, setCurrentPriceUSD] = useState<number | null>(null);
  const [currentPriceINR, setCurrentPriceINR] = useState<number | null>(null);
  const [priceChange, setPriceChange] = useState<number | null>(null);
  const [recommendation, setRecommendation] = useState("Loading...");

  // Approximate exchange rate (1 USD ≈ 83 INR)
  const USD_TO_INR = 86;

  // Sample historical data
  const goldPriceData: GoldPrice[] = [    
    { date: "Oct", price: 7828 },
    { date: "Nov", price: 7827},
    { date: "Dec", price: 7586 },
    { date: "Jan", price: 8433 },
    { date: "Feb", price: 8713.3},
    { date: "Mar", price: 8623.5},
  ];

  useEffect(() => {
    const fetchGoldPrice = async () => {
      try {
        const response = await fetch("https://www.goldapi.io/api/XAU/USD", {
          headers: {
            "x-access-token": "goldapi-uur4619m7fgnueu-io", // Replace with your API key
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch gold price");
        }

        const data = await response.json();
        setCurrentPriceUSD(data.price);
        setCurrentPriceINR(data.price * USD_TO_INR); // Convert to INR
        setPriceChange(data.ch);
      } catch (error) {
        console.error("Error fetching gold price:", error);
      }
    };

    fetchGoldPrice();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 glass dark:glass-dark rounded-lg border shadow-lg animate-fade-up">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gold Investment Analysis</h2>
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">
            Current Price: ₹{currentPriceINR ? currentPriceINR.toFixed(2) : "Loading..."}
          </span>
          {priceChange !== null && (
            <span className={`flex items-center ${priceChange >= 0 ? "text-green-500" : "text-red-500"}`}>
              {priceChange >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
              {Math.abs(priceChange)}%
            </span>
          )}
        </div>
      </div>

      <div className="h-[300px] mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={goldPriceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#FFD700" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="p-4 border rounded-lg bg-card">
        <h3 className="text-xl font-semibold mb-2">AI-Based Investment Recommendation</h3>
        <div className={`text-lg ${recommendation === "Buy" ? "text-green-500" : "text-red-500"}`}>
          {recommendation}
        </div>
      </div>

      <div className="p-4 border rounded-lg bg-card">
        <h3 className="text-xl font-semibold mb-2">Market Analysis</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Strong demand from central banks</li>
          <li>• Geopolitical tensions supporting prices</li>
          <li>• Technical indicators showing bullish trends</li>
        </ul>
      </div>
    </div>
  );
};
