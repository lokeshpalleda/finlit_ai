
import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown } from "lucide-react";

interface GoldPrice {
  date: string;
  price: number;
}

export const GoldInvestment = () => {
  const { toast } = useToast();
  const [currentPrice, setCurrentPrice] = useState(2050.75); // Example current price
  const [priceChange, setPriceChange] = useState(1.2); // Example price change
  const [recommendation, setRecommendation] = useState("Buy");

  // Sample historical data
  const goldPriceData: GoldPrice[] = [
    { date: "Jan", price: 1950 },
    { date: "Feb", price: 1980 },
    { date: "Mar", price: 2020 },
    { date: "Apr", price: 2000 },
    { date: "May", price: 2035 },
    { date: "Jun", price: 2050.75 },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-6 glass dark:glass-dark rounded-lg border shadow-lg animate-fade-up">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gold Investment Analysis</h2>
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">
            Current Price: ${currentPrice}
          </span>
          <span
            className={`flex items-center ${
              priceChange >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {priceChange >= 0 ? (
              <TrendingUp className="w-4 h-4 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 mr-1" />
            )}
            {Math.abs(priceChange)}%
          </span>
        </div>
      </div>

      <div className="h-[300px] mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={goldPriceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#FFD700"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-4">
        <div className="p-4 border rounded-lg bg-card">
          <h3 className="text-xl font-semibold mb-2">Investment Recommendation</h3>
          <div className={`text-lg ${recommendation === "Buy" ? "text-green-500" : "text-red-500"}`}>
            {recommendation}
          </div>
          <p className="text-muted-foreground mt-2">
            Gold prices have shown steady growth over the past months, making it a stable investment
            option in the current market conditions. Consider buying if you're looking for a long-term
            hedge against inflation.
          </p>
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
    </div>
  );
};
