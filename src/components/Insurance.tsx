import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";

interface GoldPrice {
  date: string;
  price: number;
}

export const GoldInvestment = () => {
  const [currentPriceINR, setCurrentPriceINR] = useState<number | null>(null);
  const [priceChange, setPriceChange] = useState<number | null>(null);
  const [recommendation, setRecommendation] = useState("Loading...");

  const USD_TO_INR = 86;

  const goldPriceData: GoldPrice[] = [    
    { date: "Oct", price: 7828 },
    { date: "Nov", price: 7827 },
    { date: "Dec", price: 7586 },
    { date: "Jan", price: 8433 },
    { date: "Feb", price: 8713.3 },
    { date: "Mar", price: 8623.5 },
  ];

  useEffect(() => {
    const fetchGoldPrice = async () => {
      try {
        const response = await fetch("https://www.goldapi.io/api/XAU/USD", {
          headers: {
            "x-access-token": "goldapi-uur4619m7fgnueu-io",
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch gold price");
        }

        const data = await response.json();
        const latestPriceINR = data.price * USD_TO_INR;
        setCurrentPriceINR(latestPriceINR);
        setPriceChange(data.ch);

        // Determine recommendation based on price trend
        const lastRecordedPrice = goldPriceData[goldPriceData.length - 1].price;
        setRecommendation(latestPriceINR >= lastRecordedPrice ? "Buy" : "Don't Buy");
      } catch (error) {
        console.error("Error fetching gold price:", error);
        setRecommendation("Failed to fetch data");
      }
    };
    fetchGoldPrice();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg border shadow-lg">
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

      <div className="h-[250px] mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={goldPriceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
            <XAxis dataKey="date" tick={{ fill: "#333" }} />
            <YAxis tick={{ fill: "#333" }} />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#FFD700" strokeWidth={2} dot={{ fill: "#FFD700", r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="p-4 border rounded-lg bg-gray-100 text-center">
        <h3 className="text-lg font-semibold">AI-Based Investment Recommendation</h3>
        <div className={`mt-2 ${recommendation === "Buy" ? "text-green-500" : "text-red-500"}`}>
          {recommendation}
        </div>
      </div>

      <div className="p-4 border rounded-lg bg-gray-100 mt-4">
        <h3 className="text-lg font-semibold">Market Analysis</h3>
        <ul className="mt-2 text-gray-700 space-y-2">
          <li>• Strong demand from central banks</li>
          <li>• Geopolitical tensions supporting prices</li>
          <li>• Technical indicators showing bullish trends</li>
        </ul>
      </div>
    </div>
  );
};
