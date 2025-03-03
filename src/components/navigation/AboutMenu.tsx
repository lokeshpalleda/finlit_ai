
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HelpCircle, AlertCircle } from "lucide-react";
import { NavigationMenuItem } from "./NavigationMenuItem";

interface AboutMenuProps {
  onMenuItemSelect: (option: string) => void;
}

export const AboutMenu = ({ onMenuItemSelect }: AboutMenuProps) => {
  const handleAboutOption = (option: string) => {
    onMenuItemSelect(option);
  };

  return (
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
        <NavigationMenuItem 
          icon={HelpCircle}
          label="Help"
          onClick={() => handleAboutOption("Help")}
        />
        <NavigationMenuItem 
          icon={AlertCircle}
          label="Complaints"
          onClick={() => handleAboutOption("Complaints")}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
