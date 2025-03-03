
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
  PiggyBank,
  BarChart,
  HelpCircle,
  AlertCircle,
  User
} from "lucide-react";

interface NavigationHeaderProps {
  onStockGameSelect?: () => void;
  onGoldSelect?: () => void;
  onStockDataSelect?: () => void;
  onMutualFundsLearnSelect?: () => void;
  onInsuranceSelect?: () => void;
  onBudgetSelect?: () => void;
  onBankingSelect?: () => void;
  onInsuranceLearnSelect?: () => void;
  onSIPSelect?: () => void;
}

export const NavigationHeader = ({ 
  onStockGameSelect,
  onGoldSelect,
  onStockDataSelect,
  onMutualFundsLearnSelect,
  onInsuranceSelect,
  onBudgetSelect,
  onBankingSelect,
  onInsuranceLearnSelect,
  onSIPSelect
}: NavigationHeaderProps) => {
  const { toast } = useToast();

  const handleLearnOption = (option: string) => {
    if (option === "Stocks" && onStockGameSelect) {
      onStockGameSelect();
      return;
    }

    if (option === "Mutual Funds" && onMutualFundsLearnSelect) {
      onMutualFundsLearnSelect();
      return;
    }
    
    if (option === "Banking" && onBankingSelect) {
      onBankingSelect();
      return;
    }

    if (option === "Insurance" && onInsuranceLearnSelect) {
      onInsuranceLearnSelect();
      return;
    }
    
    toast({
      title: `You selected ${option}`,
      description: "This feature is coming soon!",
    });
  };

  const handleInvestOption = (option: string) => {
    if (option === "Gold" && onGoldSelect) {
      onGoldSelect();
      return;
    }

    if (option === "Stocks" && onStockDataSelect) {
      onStockDataSelect();
      return;
    }

    if (option === "Insurance" && onInsuranceSelect) {
      onInsuranceSelect();
      return;
    }

    if (option === "SIP" && onSIPSelect) {
      onSIPSelect();
      return;
    }

    toast({
      title: `You selected to invest in ${option}`,
      description: "Investment feature coming soon!",
    });
  };

  const handleAboutOption = (option: string) => {
    toast({
      title: `You selected ${option}`,
      description: option === "Help" ? "Our support team will assist you soon!" : "Your complaint has been registered.",
    });
  };

  const handleProfileClick = (option: string) => {
    if (option === "My Budget" && onBudgetSelect) {
      onBudgetSelect();
      return;
    }
    
    toast({
      title: `You selected ${option}`,
      description: "This feature is coming soon!",
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-sm font-medium transition-colors hover:text-primary"
                  >
                    About
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end"
                  className="w-48"
                >
                  <DropdownMenuItem onClick={() => handleAboutOption("Help")}>
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Help</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleAboutOption("Complaints")}>
                    <AlertCircle className="mr-2 h-4 w-4" />
                    <span>Complaints</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-sm font-medium transition-colors hover:text-primary"
                  >
                    <User className="mr-2 h-4 w-4" />
                    My Profile
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => handleProfileClick("Profile Settings")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleProfileClick("My Budget")}>
                    <PiggyBank className="mr-2 h-4 w-4" />
                    <span>My Budget</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
