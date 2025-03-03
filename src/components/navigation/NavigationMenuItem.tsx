
import { LucideIcon } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface NavigationMenuItemProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export const NavigationMenuItem = ({ 
  icon: Icon, 
  label, 
  onClick,
  disabled = false 
}: NavigationMenuItemProps) => {
  return (
    <DropdownMenuItem 
      onClick={onClick} 
      disabled={disabled}
      className="flex items-center cursor-pointer transition-colors hover:bg-accent"
    >
      <Icon className="mr-2 h-4 w-4" />
      <span>{label}</span>
    </DropdownMenuItem>
  );
};
