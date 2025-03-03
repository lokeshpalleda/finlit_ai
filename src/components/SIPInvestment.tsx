
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, TrendingUp, Clock } from "lucide-react";

interface SIPCalculation {
  monthly: number;
  years: number;
  rate: number;
  total: number;
  investment: number;
  returns: number;
}

interface ChartData {
  year: number;
  investment: number;
  value: number;
}

export const SIPInvestment = () => {
  const { toast } = useToast();
  const [monthlyAmount, setMonthlyAmount] = useState(5000);
  const [years, setYears] = useState(10);
  const [interestRate, setInterestRate] = useState(12);
  const [sipCalculation, setSipCalculation] = useState<SIPCalculation>({
    monthly: 5000,
    years: 10,
    rate: 12,
    total: 0,
    investment: 0,
    returns: 0
  });
  const [chartData, setChartData] = useState<ChartData[]>([]);

  const calculateSIP = () => {
    // P × ({[1 + r]^n - 1} / r) × (1 + r)
    // where P is the investment amount, r is the rate of interest, and n is the number of payments
    const monthlyRate = interestRate / 12 / 100;
    const totalMonths = years * 12;
    const total = monthlyAmount * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate);
    const investment = monthlyAmount * totalMonths;
    const returns = total - investment;
    
    setSipCalculation({
      monthly: monthlyAmount,
      years: years,
      rate: interestRate,
      total: Math.round(total),
      investment: investment,
      returns: Math.round(returns)
    });

    // Generate chart data for each year
    const newChartData: ChartData[] = [];
    for (let i = 0; i <= years; i++) {
      const monthsCompleted = i * 12;
      const investmentSoFar = monthlyAmount * monthsCompleted;
      const valueSoFar = i === 0 ? 0 : monthlyAmount * 
        ((Math.pow(1 + monthlyRate, monthsCompleted) - 1) / monthlyRate) * 
        (1 + monthlyRate);
      
      newChartData.push({
        year: i,
        investment: Math.round(investmentSoFar),
        value: Math.round(valueSoFar)
      });
    }
    setChartData(newChartData);

    toast({
      title: "SIP Calculated",
      description: `Invested: ₹${investment.toLocaleString()}, Estimated returns: ₹${Math.round(returns).toLocaleString()}`
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 glass dark:glass-dark rounded-lg border shadow-lg animate-fade-up">
      <h2 className="text-2xl font-bold mb-6">SIP Investment Calculator</h2>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <div className="grid gap-4">
            <div className="space-y-2">
              <label htmlFor="monthlyAmount" className="text-sm font-medium">
                Monthly Investment (₹)
              </label>
              <Input
                id="monthlyAmount"
                type="number"
                min="500"
                value={monthlyAmount}
                onChange={(e) => setMonthlyAmount(Number(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="years" className="text-sm font-medium">
                Investment Period (Years)
              </label>
              <Select
                value={years.toString()}
                onValueChange={(value) => setYears(Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select years" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 5, 10, 15, 20, 25, 30].map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year} {year === 1 ? "year" : "years"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="interestRate" className="text-sm font-medium">
                Expected Return Rate (%)
              </label>
              <Select
                value={interestRate.toString()}
                onValueChange={(value) => setInterestRate(Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select rate" />
                </SelectTrigger>
                <SelectContent>
                  {[6, 8, 10, 12, 14, 15, 16, 18].map((rate) => (
                    <SelectItem key={rate} value={rate.toString()}>
                      {rate}%
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              onClick={calculateSIP}
              className="mt-2"
            >
              <Calculator className="mr-2 h-4 w-4" />
              Calculate
            </Button>
          </div>
          
          {sipCalculation.total > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Invested Amount
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-2xl font-bold">
                    ₹{sipCalculation.investment.toLocaleString()}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Estimated Returns
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-2xl font-bold text-green-600">
                    ₹{sipCalculation.returns.toLocaleString()}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Value
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-2xl font-bold">
                    ₹{sipCalculation.total.toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
        
        <div className="h-[300px]">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" label={{ value: "Years", position: "insideBottom", offset: -5 }} />
                <YAxis tickFormatter={(value) => `₹${value.toLocaleString()}`} />
                <Tooltip formatter={(value) => [`₹${Number(value).toLocaleString()}`, ""]} />
                <Line type="monotone" dataKey="investment" stroke="#8884d8" name="Investment" />
                <Line type="monotone" dataKey="value" stroke="#82ca9d" name="Estimated Value" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
              <TrendingUp className="h-16 w-16 mb-2" />
              <p>Enter your SIP details and calculate to see the projection</p>
            </div>
          )}
        </div>
      </div>
      
      {sipCalculation.total > 0 && (
        <div className="mt-6 p-4 border rounded-lg bg-card">
          <h3 className="text-xl font-semibold mb-2 flex items-center">
            <Clock className="mr-2 h-5 w-5" />
            Investment Summary
          </h3>
          <p className="text-muted-foreground">
            A monthly investment of ₹{sipCalculation.monthly.toLocaleString()} for {sipCalculation.years} years at {sipCalculation.rate}% expected annual returns 
            could grow to ₹{sipCalculation.total.toLocaleString()}. This includes your investment of ₹{sipCalculation.investment.toLocaleString()} and estimated returns of ₹{sipCalculation.returns.toLocaleString()}.
          </p>
        </div>
      )}
    </div>
  );
};
