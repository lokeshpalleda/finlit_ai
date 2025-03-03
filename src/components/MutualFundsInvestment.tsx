
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ArrowUpRight, Briefcase, TrendingUp, DollarSign, BarChart } from "lucide-react";

// Mock data for mutual funds
const mutualFunds = [
  {
    id: 1,
    name: "Growth Fund",
    type: "Equity",
    returns: {
      "1y": 12.5,
      "3y": 42.8,
      "5y": 76.2
    },
    risk: "High",
    minInvestment: 1000,
    rating: 4.5,
    companies: ["Apple", "Microsoft", "Google", "Amazon", "Tesla"],
    aiScore: 85
  },
  {
    id: 2,
    name: "Balanced Advantage",
    type: "Hybrid",
    returns: {
      "1y": 9.8,
      "3y": 32.4,
      "5y": 58.9
    },
    risk: "Moderate",
    minInvestment: 500,
    rating: 4.2,
    companies: ["Procter & Gamble", "Johnson & Johnson", "Coca-Cola", "Walmart", "Verizon"],
    aiScore: 79
  },
  {
    id: 3,
    name: "Blue Chip Index",
    type: "Equity",
    returns: {
      "1y": 11.2,
      "3y": 38.5,
      "5y": 67.3
    },
    risk: "Moderate-High",
    minInvestment: 750,
    rating: 4.7,
    companies: ["JPMorgan Chase", "Visa", "Mastercard", "McDonald's", "Nike"],
    aiScore: 88
  },
  {
    id: 4,
    name: "Corporate Bond",
    type: "Debt",
    returns: {
      "1y": 6.5,
      "3y": 21.2,
      "5y": 34.8
    },
    risk: "Low",
    minInvestment: 1500,
    rating: 4.0,
    companies: ["AT&T", "Exxon Mobil", "IBM", "General Electric", "Pfizer"],
    aiScore: 72
  }
];

// Historical performance data for charts
const generatePerformanceData = (years: number, baseReturn: number, volatility: number) => {
  const data = [];
  let value = 10000; // Starting with 10,000 investment
  
  for (let month = 0; month <= years * 12; month++) {
    const monthName = new Date(2023, month % 12, 1).toLocaleString('default', { month: 'short' });
    const yearNum = Math.floor(month / 12) + 2018;
    const label = `${monthName} ${yearNum}`;
    
    // Add some randomness to simulate real market fluctuations
    const monthlyReturn = (baseReturn / 12) + (Math.random() - 0.5) * volatility;
    value = value * (1 + monthlyReturn / 100);
    
    data.push({
      name: label,
      value: Math.round(value),
    });
  }
  
  return data;
};

export const MutualFundsInvestment = () => {
  const { toast } = useToast();
  const [selectedFund, setSelectedFund] = useState<number | null>(null);
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [timeframe, setTimeframe] = useState("5y");
  
  const handleInvest = () => {
    if (!selectedFund) {
      toast({
        title: "Select a Fund",
        description: "Please select a mutual fund to invest in",
        variant: "destructive",
      });
      return;
    }
    
    if (!investmentAmount || Number(investmentAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid investment amount",
        variant: "destructive",
      });
      return;
    }
    
    const fund = mutualFunds.find(f => f.id === selectedFund);
    if (Number(investmentAmount) < fund?.minInvestment!) {
      toast({
        title: "Minimum Investment Not Met",
        description: `This fund requires a minimum investment of ₹${fund?.minInvestment}`,
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Investment Successful",
      description: `You have successfully invested ₹${investmentAmount} in ${fund?.name}`,
    });
  };
  
  const selectedFundData = mutualFunds.find(f => f.id === selectedFund);
  
  // Generate performance data based on the selected fund's returns
  const performanceData = selectedFundData 
    ? generatePerformanceData(
        5, 
        selectedFundData.returns["5y"] / 5, // Average annual return
        selectedFundData.risk === "High" ? 2 : selectedFundData.risk === "Moderate" ? 1.2 : 0.7 // Volatility based on risk
      )
    : [];
  
  // Filter data based on selected timeframe
  const filteredData = (() => {
    switch(timeframe) {
      case "1y":
        return performanceData.slice(-12);
      case "3y":
        return performanceData.slice(-36);
      case "5y":
      default:
        return performanceData;
    }
  })();
  
  return (
    <div className="w-full max-w-6xl mx-auto p-6 glass dark:glass-dark rounded-lg border shadow-lg animate-fade-up">
      <h2 className="text-2xl font-bold mb-6">Mutual Funds Investment</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">Select a Mutual Fund</h3>
            
            <div className="space-y-4">
              {mutualFunds.map((fund) => (
                <div 
                  key={fund.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedFund === fund.id 
                      ? "border-primary bg-primary/10" 
                      : "hover:bg-accent"
                  }`}
                  onClick={() => setSelectedFund(fund.id)}
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">{fund.name}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      fund.risk === "High" 
                        ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" 
                        : fund.risk === "Moderate" 
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                          : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                    }`}>
                      {fund.risk} Risk
                    </span>
                  </div>
                  
                  <div className="mt-2 flex items-center text-sm text-muted-foreground">
                    <Briefcase className="h-3 w-3 mr-1" />
                    <span>{fund.type}</span>
                  </div>
                  
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground">1Y</div>
                      <div className="text-sm font-medium flex items-center justify-center">
                        {fund.returns["1y"]}%
                        <ArrowUpRight className="h-3 w-3 ml-0.5 text-green-500" />
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground">3Y</div>
                      <div className="text-sm font-medium flex items-center justify-center">
                        {fund.returns["3y"]}%
                        <ArrowUpRight className="h-3 w-3 ml-0.5 text-green-500" />
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground">5Y</div>
                      <div className="text-sm font-medium flex items-center justify-center">
                        {fund.returns["5y"]}%
                        <ArrowUpRight className="h-3 w-3 ml-0.5 text-green-500" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">Investment Details</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Amount (₹)</label>
                <Input
                  type="number"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(e.target.value)}
                  placeholder="Enter investment amount"
                  min="0"
                />
              </div>
              
              <Button onClick={handleInvest} className="w-full">
                Invest Now
              </Button>
            </div>
          </Card>
        </div>
        
        <div className="lg:col-span-2 space-y-6">
          {selectedFundData ? (
            <>
              <Card className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">{selectedFundData.name} Performance</h3>
                  <div className="flex gap-2">
                    <Button 
                      variant={timeframe === "1y" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setTimeframe("1y")}
                    >
                      1Y
                    </Button>
                    <Button 
                      variant={timeframe === "3y" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setTimeframe("3y")}
                    >
                      3Y
                    </Button>
                    <Button 
                      variant={timeframe === "5y" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setTimeframe("5y")}
                    >
                      5Y
                    </Button>
                  </div>
                </div>
                
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={filteredData}
                      margin={{
                        top: 5,
                        right: 20,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fontSize: 10 }}
                        interval={filteredData.length > 24 ? 5 : 2} 
                      />
                      <YAxis 
                        tick={{ fontSize: 10 }}
                        tickFormatter={(value) => `₹${value.toLocaleString()}`} 
                      />
                      <Tooltip 
                        formatter={(value) => [`₹${Number(value).toLocaleString()}`, 'Value']} 
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                        name="Fund Value"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4">
                  <h3 className="text-md font-semibold mb-3 flex items-center">
                    <BarChart className="h-4 w-4 mr-1.5" />
                    AI Investment Analysis
                  </h3>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">AI Recommendation Score</span>
                        <span className="text-sm font-medium">{selectedFundData.aiScore}/100</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            selectedFundData.aiScore > 80 
                              ? "bg-green-500" 
                              : selectedFundData.aiScore > 70 
                                ? "bg-yellow-500" 
                                : "bg-red-500"
                          }`}
                          style={{ width: `${selectedFundData.aiScore}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="text-sm">
                      <p className="mb-2">
                        {selectedFundData.aiScore > 80 
                          ? "Strong Buy: This fund has shown consistent performance and is well-positioned for future growth."
                          : selectedFundData.aiScore > 70
                            ? "Moderate Buy: This fund has potential but watch market conditions before increasing your position."
                            : "Hold: Consider diversifying your portfolio with other investment options."
                        }
                      </p>
                      
                      <p>
                        Based on current market trends and historical performance, this fund is expected to provide {
                          selectedFundData.risk === "High" 
                            ? "high returns with significant volatility"
                            : selectedFundData.risk === "Moderate"
                              ? "balanced returns with moderate risk"
                              : "stable returns with minimal risk"
                        }.
                      </p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4">
                  <h3 className="text-md font-semibold mb-3 flex items-center">
                    <Briefcase className="h-4 w-4 mr-1.5" />
                    Top Companies in Portfolio
                  </h3>
                  
                  <div className="space-y-3">
                    {selectedFundData.companies.map((company, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                            {company.charAt(0)}
                          </div>
                          <span className="text-sm">{company}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {20 - index * 3}%
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-2 border-t text-xs text-muted-foreground">
                    <p>This fund invests in {selectedFundData.type.toLowerCase()} assets across various sectors.</p>
                  </div>
                </Card>
              </div>
            </>
          ) : (
            <Card className="p-6 h-full flex flex-col items-center justify-center text-center">
              <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Select a Mutual Fund</h3>
              <p className="text-muted-foreground">
                Choose a mutual fund from the list to view its performance and details
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
