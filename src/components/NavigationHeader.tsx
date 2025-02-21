
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export const NavigationHeader = () => {
  const { toast } = useToast();

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
              <Button
                variant="ghost"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => toast({ title: "Coming soon!" })}
              >
                Learn
              </Button>
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
