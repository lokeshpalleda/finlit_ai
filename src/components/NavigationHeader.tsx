
import { useToast } from "@/hooks/use-toast";
import { LearnMenu } from "./navigation/LearnMenu";
import { InvestMenu } from "./navigation/InvestMenu";
import { AboutMenu } from "./navigation/AboutMenu";
import { ProfileMenu } from "./navigation/ProfileMenu";

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

  const handleGenericToast = (title: string, description: string) => {
    toast({
      title,
      description,
    });
  };

  const handleLearnOption = (option: string) => {
    handleGenericToast(
      `You selected ${option}`,
      "This feature is coming soon!"
    );
  };

  const handleInvestOption = (option: string) => {
    handleGenericToast(
      `You selected to ${option}`,
      "Investment feature coming soon!"
    );
  };

  const handleAboutOption = (option: string) => {
    handleGenericToast(
      `You selected ${option}`,
      option === "Help" ? "Our support team will assist you soon!" : "Your complaint has been registered."
    );
  };

  const handleProfileClick = (option: string) => {
    handleGenericToast(
      `You selected ${option}`,
      "This feature is coming soon!"
    );
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
              <LearnMenu
                onStockGameSelect={onStockGameSelect}
                onBankingSelect={onBankingSelect}
                onMutualFundsLearnSelect={onMutualFundsLearnSelect}
                onInsuranceLearnSelect={onInsuranceLearnSelect}
                onMenuItemSelect={handleLearnOption}
              />
              <InvestMenu
                onGoldSelect={onGoldSelect}
                onStockDataSelect={onStockDataSelect}
                onInsuranceSelect={onInsuranceSelect}
                onSIPSelect={onSIPSelect}
                onMenuItemSelect={handleInvestOption}
              />
              <AboutMenu onMenuItemSelect={handleAboutOption} />
              <ProfileMenu
                onBudgetSelect={onBudgetSelect}
                onMenuItemSelect={handleProfileClick}
              />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
