
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, PiggyBank } from "lucide-react";
import { NavigationMenuItem } from "./NavigationMenuItem";

interface ProfileMenuProps {
  onBudgetSelect?: () => void;
  onMenuItemSelect: (option: string) => void;
}

export const ProfileMenu = ({ onBudgetSelect, onMenuItemSelect }: ProfileMenuProps) => {
  const handleProfileClick = (option: string) => {
    if (option === "My Budget" && onBudgetSelect) {
      onBudgetSelect();
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
          <User className="mr-2 h-4 w-4" />
          My Profile
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <NavigationMenuItem 
          icon={User}
          label="Profile Settings"
          onClick={() => handleProfileClick("Profile Settings")}
        />
        <NavigationMenuItem 
          icon={PiggyBank}
          label="My Budget"
          onClick={() => handleProfileClick("My Budget")}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
