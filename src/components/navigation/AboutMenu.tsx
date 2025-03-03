
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { HelpCircle, AlertCircle, ExternalLink } from "lucide-react";
import { NavigationMenuItem } from "./NavigationMenuItem";
import { useToast } from "@/hooks/use-toast";

interface AboutMenuProps {
  onMenuItemSelect: (option: string) => void;
}

export const AboutMenu = ({ onMenuItemSelect }: AboutMenuProps) => {
  const { toast } = useToast();
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  const [showComplaintDialog, setShowComplaintDialog] = useState(false);
  const [complaintText, setComplaintText] = useState("");
  const [email, setEmail] = useState("");

  const handleHelpOption = () => {
    setShowHelpDialog(true);
  };

  const handleComplaintOption = () => {
    setShowComplaintDialog(true);
  };

  const submitComplaint = () => {
    if (!complaintText.trim()) {
      toast({
        title: "Error",
        description: "Please provide details about your complaint",
        variant: "destructive",
      });
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      toast({
        title: "Error",
        description: "Please provide a valid email address",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Complaint Submitted",
      description: "We will review your feedback and get back to you soon",
    });
    
    setComplaintText("");
    setEmail("");
    setShowComplaintDialog(false);
    onMenuItemSelect("Complaints");
  };

  return (
    <>
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
            onClick={handleHelpOption}
          />
          <NavigationMenuItem 
            icon={AlertCircle}
            label="Complaints"
            onClick={handleComplaintOption}
          />
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Help Dialog */}
      <Dialog open={showHelpDialog} onOpenChange={setShowHelpDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Help & Support</DialogTitle>
            <DialogDescription>
              Here are some resources to help you navigate FinLit AI
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="flex flex-col space-y-2">
              <h3 className="font-medium">Getting Started</h3>
              <p className="text-sm text-muted-foreground">
                Use the navigation menu to explore different financial topics and investment options.
              </p>
            </div>
            
            <div className="flex flex-col space-y-2">
              <h3 className="font-medium">Learning Resources</h3>
              <p className="text-sm text-muted-foreground">
                The Learn section contains educational content about stocks, banking, mutual funds, and insurance.
              </p>
            </div>
            
            <div className="flex flex-col space-y-2">
              <h3 className="font-medium">Investment Tools</h3>
              <p className="text-sm text-muted-foreground">
                The Invest section provides tools for gold, mutual funds, SIP, stocks, and insurance investments.
              </p>
            </div>
            
            <div className="flex flex-col space-y-2">
              <h3 className="font-medium">Contact Support</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">support@finlitai.com</span>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => window.open('mailto:support@finlitai.com')}>
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={() => setShowHelpDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Complaints Dialog */}
      <Dialog open={showComplaintDialog} onOpenChange={setShowComplaintDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Submit a Complaint</DialogTitle>
            <DialogDescription>
              We value your feedback. Please let us know about any issues you've encountered.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="email" className="text-right text-sm">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="complaint" className="text-right text-sm">
                Details
              </label>
              <Textarea
                id="complaint"
                value={complaintText}
                onChange={(e) => setComplaintText(e.target.value)}
                placeholder="Please describe the issue you're experiencing..."
                className="col-span-3"
                rows={5}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowComplaintDialog(false)}>
              Cancel
            </Button>
            <Button onClick={submitComplaint}>
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
