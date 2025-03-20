import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TrendingUp, TrendingDown, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Stock {
  id: number;
  name: string;
  price: number;
  change: number;
  owned: number;
  hint: string;
}

export const StockGame = () => {
  const { toast } = useToast();
  const [coins, setCoins] = useState(1000);
  const [investAmount, setInvestAmount] = useState("");
  const [stocks, setStocks] = useState<Stock[]>([
    { id: 1, name: "AAPL", price: 215.25, change: 2.55, owned: 0, hint: "Strong tech sector performance." },
    { id: 2, name: "TSLA", price: 235.83, change: 10.55, owned: 0, hint: "Renewable energy sector shows promise." },
    { id: 3, name: "TCS", price: 41.34, change: 59.40, owned: 0, hint: "Healthcare sector is defensive." },
    { id: 4, name: "ADANI", price: 6.034, change: -2.00, owned: 0, hint: "Financial sector may benefit." },
  ]);

  const handleBuy = (stock: Stock) => {
    const amount = Number(investAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({ title: "Invalid amount", description: "Please enter a valid amount", variant: "destructive" });
      return;
    }
    if (amount > coins) {
      toast({ title: "Insufficient funds", description: "Not enough coins", variant: "destructive" });
      return;
    }
    const sharesToBuy = Math.floor(amount / stock.price);
    if (sharesToBuy === 0) {
      toast({ title: "Amount too low", description: `Minimum: ${stock.price} coins`, variant: "destructive" });
      return;
    }
    const totalCost = sharesToBuy * stock.price;
    setCoins((prev) => prev - totalCost);
    setStocks((prev) => prev.map((s) => (s.id === stock.id ? { ...s, owned: s.owned + sharesToBuy } : s)));
    setInvestAmount("");
    toast({ title: "Investment successful!", description: `Bought ${sharesToBuy} shares of ${stock.name}` });
  };

  const handleSell = (stock: Stock) => {
    if (stock.owned === 0) {
      toast({ title: "No stocks to sell", description: `You don't own any ${stock.name} shares`, variant: "destructive" });
      return;
    }
    setCoins((prev) => prev + stock.owned * stock.price);
    setStocks((prev) => prev.map((s) => (s.id === stock.id ? { ...s, owned: 0 } : s)));
    toast({ title: "Stocks sold!", description: `Sold all shares of ${stock.name}` });
  };

  const simulateMarket = () => {
    setStocks((prev) => prev.map((stock) => {
      const randomChange = (Math.random() * 10 - 5) / 100;
      const newPrice = stock.price * (1 + randomChange);
      return { ...stock, price: Number(newPrice.toFixed(2)), change: Number((randomChange * 100).toFixed(2)) };
    }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 glass dark:glass-dark rounded-lg border shadow-lg animate-fade-up">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Stock Market Game</h2>
        <div className="text-lg font-semibold">Coins: {coins.toFixed(2)} 🪙</div>
      </div>
      <div className="grid gap-4">
        <div className="flex gap-4 items-center mb-4">
          <Input type="number" placeholder="Investment amount" value={investAmount} onChange={(e) => setInvestAmount(e.target.value)} className="max-w-[200px]" />
          <Button onClick={simulateMarket}>Simulate Market</Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {stocks.map((stock) => (
            <div key={stock.id} className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{stock.name}</h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6"><Info className="h-4 w-4" /></Button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs"><p>{stock.hint}</p></TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span className={stock.change >= 0 ? "text-green-500" : "text-red-500"}>
                  {stock.change >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />} {Math.abs(stock.change)}%
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span>Price: {stock.price.toFixed(2)} 🪙</span>
                <span>Owned: {stock.owned}</span>
              </div>
              <div className="flex gap-2">
                <Button className="w-1/2" onClick={() => handleBuy(stock)} disabled={!investAmount || Number(investAmount) > coins}>Buy</Button>
                <Button className="w-1/2" onClick={() => handleSell(stock)} disabled={stock.owned === 0}>Sell</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
