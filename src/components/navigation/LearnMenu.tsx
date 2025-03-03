
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

  // Menu items sorted alphabetically
  const menuItems = [
    { icon: Building, label: "Banking", onClick: () => handleLearnOption("Banking") },
    { icon: Shield, label: "Insurance", onClick: () => handleLearnOption("Insurance") },
    { icon: Briefcase, label: "Mutual Funds", onClick: () => handleLearnOption("Mutual Funds") },
    { icon: TrendingUp, label: "Stocks", onClick: () => handleLearnOption("Stocks") },
  ];

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
        {menuItems.map((item, index) => (
          <NavigationMenuItem 
            key={index}
            icon={item.icon}
            label={item.label}
            onClick={item.onClick}
          />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
