
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TrendingUp, Building, Briefcase, Shield } from "lucide-react";
import { NavigationMenuItem } from "./NavigationMenuItem";

interface LearnMenuProps {
  onStockGameSelect?: () => void;
  onBankingSelect?: () => void;
  onMutualFundsLearnSelect?: () => void;
  onInsuranceLearnSelect?: () => void;
  onMenuItemSelect: (option: string) => void;
}

export const LearnMenu = ({
  onStockGameSelect,
  onBankingSelect,
  onMutualFundsLearnSelect,
  onInsuranceLearnSelect,
  onMenuItemSelect,
}: LearnMenuProps) => {
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
    
    onMenuItemSelect(option);
  };

  return (
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
        <NavigationMenuItem 
          icon={TrendingUp}
          label="Stocks"
          onClick={() => handleLearnOption("Stocks")}
        />
        <NavigationMenuItem 
          icon={Building}
          label="Banking"
          onClick={() => handleLearnOption("Banking")}
        />
        <NavigationMenuItem 
          icon={Briefcase}
          label="Mutual Funds"
          onClick={() => handleLearnOption("Mutual Funds")}
        />
        <NavigationMenuItem 
          icon={Shield}
          label="Insurance"
          onClick={() => handleLearnOption("Insurance")}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
