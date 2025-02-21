
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
  Shield
} from "lucide-react";

export const NavigationHeader = () => {
  const { toast } = useToast();

  const handleLearnOption = (option: string) => {
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
              <Button
                variant="ghost"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => toast({ title: "Coming soon!" })}
              >
                Invest
              </Button>
              <Button
                variant="ghost"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => toast({ title: "Coming soon!" })}
              >
                About
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
