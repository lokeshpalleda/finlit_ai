
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StockData {
  date: string;
  sp500: number;
  nasdaq: number;
}

export const StockInvestmentData = () => {
  const { toast } = useToast();
  
  // Sample historical data
  const stockMarketData: StockData[] = [
    { date: "Jan", sp500: 4500, nasdaq: 14000 },
    { date: "Feb", sp500: 4600, nasdaq: 14500 },
    { date: "Mar", sp500: 4700, nasdaq: 14300 },
    { date: "Apr", sp500: 4800, nasdaq: 14800 },
    { date: "May", sp500: 4750, nasdaq: 14600 },
    { date: "Jun", sp500: 4900, nasdaq: 15000 },
  ];

  const topStocks = [
    { name: "Tech Giant Inc", price: 180.50, change: 2.5, recommendation: "Buy" },
    { name: "Green Energy Co", price: 45.75, change: 1.8, recommendation: "Hold" },
    { name: "HealthTech Solutions", price: 92.30, change: -0.5, recommendation: "Buy" },
    { name: "Digital Payments Ltd", price: 210.25, change: 3.2, recommendation: "Buy" },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-6 glass dark:glass-dark rounded-lg border shadow-lg animate-fade-up">
      <h2 className="text-2xl font-bold mb-6">Stock Market Analysis</h2>

      <div className="h-[300px] mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={stockMarketData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sp500"
              stroke="#8884d8"
              name="S&P 500"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="nasdaq"
              stroke="#82ca9d"
              name="NASDAQ"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="p-4 border rounded-lg bg-card">
          <h3 className="text-xl font-semibold mb-4">Top Stock Picks</h3>
          <div className="space-y-4">
            {topStocks.map((stock) => (
              <div key={stock.name} className="flex justify-between items-center">
                <div>
                  <div className="font-medium">{stock.name}</div>
                  <div className="text-sm text-muted-foreground">
                    ${stock.price}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`flex items-center ${
                      stock.change >= 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {stock.change >= 0 ? (
                      <TrendingUp className="w-4 h-4 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 mr-1" />
                    )}
                    {Math.abs(stock.change)}%
                  </span>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      stock.recommendation === "Buy"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {stock.recommendation}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border rounded-lg bg-card">
          <h3 className="text-xl font-semibold mb-2">Market Insights</h3>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              The market is showing strong momentum with technology and healthcare sectors leading
              the gains. Consider diversifying your portfolio with a mix of growth and value stocks.
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Technology sector remains strong</li>
              <li>• Healthcare showing promising growth</li>
              <li>• Financial sector stabilizing</li>
              <li>• Energy sector facing headwinds</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
