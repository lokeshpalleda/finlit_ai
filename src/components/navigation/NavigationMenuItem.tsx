
import { LucideIcon } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface NavigationMenuItemProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}

export const NavigationMenuItem = ({ icon: Icon, label, onClick }: NavigationMenuItemProps) => {
  return (
    <DropdownMenuItem onClick={onClick}>
      <Icon className="mr-2 h-4 w-4" />
      <span>{label}</span>
    </DropdownMenuItem>
  );
};
