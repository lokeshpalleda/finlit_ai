
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
  onMenuItemSelect: (option: string) => void;
}

export const InvestMenu = ({
  onGoldSelect,
  onStockDataSelect,
  onInsuranceSelect,
  onSIPSelect,
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

    onMenuItemSelect(`invest in ${option}`);
  };

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
        <NavigationMenuItem 
          icon={Coins}
          label="Gold"
          onClick={() => handleInvestOption("Gold")}
        />
        <NavigationMenuItem 
          icon={Briefcase}
          label="Mutual Funds"
          onClick={() => handleInvestOption("Mutual Funds")}
        />
        <NavigationMenuItem 
          icon={PiggyBank}
          label="SIP"
          onClick={() => handleInvestOption("SIP")}
        />
        <NavigationMenuItem 
          icon={BarChart}
          label="Stocks"
          onClick={() => handleInvestOption("Stocks")}
        />
        <NavigationMenuItem 
          icon={Shield}
          label="Insurance"
          onClick={() => handleInvestOption("Insurance")}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
