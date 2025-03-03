
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Coins, Briefcase, PiggyBank, BarChart, Shield } from "lucide-react";
import { NavigationMenuItem } from "./NavigationMenuItem";

interface InvestMenuProps {
  onGoldSelect?: () => void;
  onStockDataSelect?: () => void;
  onInsuranceSelect?: () => void;
  onSIPSelect?: () => void;
  onMutualFundsSelect?: () => void;
  onMenuItemSelect: (option: string) => void;
}

export const InvestMenu = ({
  onGoldSelect,
  onStockDataSelect,
  onInsuranceSelect,
  onSIPSelect,
  onMutualFundsSelect,
  onMenuItemSelect,
}: InvestMenuProps) => {
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

    if (option === "Mutual Funds" && onMutualFundsSelect) {
      onMutualFundsSelect();
      return;
    }

    onMenuItemSelect(`invest in ${option}`);
  };

  // Menu items sorted alphabetically
  const menuItems = [
    { icon: Coins, label: "Gold", onClick: () => handleInvestOption("Gold") },
    { icon: Shield, label: "Insurance", onClick: () => handleInvestOption("Insurance") },
    { icon: Briefcase, label: "Mutual Funds", onClick: () => handleInvestOption("Mutual Funds") },
    { icon: PiggyBank, label: "SIP", onClick: () => handleInvestOption("SIP") },
    { icon: BarChart, label: "Stocks", onClick: () => handleInvestOption("Stocks") },
  ];

  return (
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
