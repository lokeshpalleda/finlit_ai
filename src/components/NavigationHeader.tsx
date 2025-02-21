
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BookOpen,
  TrendingUp,
  Building,
  Briefcase,
  Shield,
  Coins,
  Building2,
  PiggyBank,
  BarChart
} from "lucide-react";

interface NavigationHeaderProps {
  onStockGameSelect?: () => void;
}

export const NavigationHeader = ({ onStockGameSelect }: NavigationHeaderProps) => {
  const { toast } = useToast();

  const handleLearnOption = (option: string) => {
    if (option === "Stocks" && onStockGameSelect) {
      onStockGameSelect();
      return;
    }
    
    toast({
      title: `You selected ${option}`,
      description: "This feature is coming soon!",
    });
  };

  const handleInvestOption = (option: string) => {
    toast({
      title: `You selected to invest in ${option}`,
      description: "Investment feature coming soon!",
    });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="glass dark:glass-dark border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <a href="/" className="text-xl font-semibold tracking-tight">
                FinLit AI
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-sm font-medium transition-colors hover:text-primary"
                  >
                    Learn
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end"
                  className="w-48"
                >
                  <DropdownMenuItem onClick={() => handleLearnOption("Stocks")}>
                    <TrendingUp className="mr-2 h-4 w-4" />
                    <span>Stocks</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleLearnOption("Banking")}>
                    <Building className="mr-2 h-4 w-4" />
                    <span>Banking</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleLearnOption("Mutual Funds")}>
                    <Briefcase className="mr-2 h-4 w-4" />
                    <span>Mutual Funds</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleLearnOption("Insurance")}>
                    <Shield className="mr-2 h-4 w-4" />
                    <span>Insurance</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-sm font-medium transition-colors hover:text-primary"
                  >
                    Invest
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end"
                  className="w-48"
                >
                  <DropdownMenuItem onClick={() => handleInvestOption("Gold")}>
                    <Coins className="mr-2 h-4 w-4" />
                    <span>Gold</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleInvestOption("Assets")}>
                    <Building2 className="mr-2 h-4 w-4" />
                    <span>Assets</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleInvestOption("Mutual Funds")}>
                    <Briefcase className="mr-2 h-4 w-4" />
                    <span>Mutual Funds</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleInvestOption("SIP")}>
                    <PiggyBank className="mr-2 h-4 w-4" />
                    <span>SIP</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleInvestOption("Stocks")}>
                    <BarChart className="mr-2 h-4 w-4" />
                    <span>Stocks</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleInvestOption("Insurance")}>
                    <Shield className="mr-2 h-4 w-4" />
                    <span>Insurance</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="ghost"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => toast({ title: "Coming soon!" })}
              >
                About
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
