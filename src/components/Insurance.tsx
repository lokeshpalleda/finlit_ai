import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Shield, Heart, Home, Car, Check } from "lucide-react";
import { useState } from "react";

interface InsurancePlan {
  id: number;
  name: string;
  description: string;
  benefits: string[];
  premium: number;
  coverage: string;
  icon: JSX.Element;
  recommendation: string;
}

export const GoldInvestment = () => {
  const [currentPriceINR, setCurrentPriceINR] = useState<number | null>(null);
  const [priceChange, setPriceChange] = useState<number | null>(null);
  const [recommendation, setRecommendation] = useState("Loading...");

  const USD_TO_INR = 86;

  const goldPriceData: GoldPrice[] = [    
    { date: "Oct", price: 7828 },
    { date: "Nov", price: 7827 },
    { date: "Dec", price: 7586 },
    { date: "Jan", price: 8433 },
    { date: "Feb", price: 8713.3 },
    { date: "Mar", price: 8623.5 },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-6 glass dark:glass-dark rounded-lg border shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Insurance Plans</h2>
      
      <div className="grid gap-6 md:grid-cols-2">
        {insurancePlans.map((plan) => (
          <Card key={plan.id} className="p-6">
            <div className="flex items-center gap-4 mb-4">
              {plan.icon}
              <h3 className="text-xl font-semibold">{plan.name}</h3>
            </div>
            
            <p className="text-muted-foreground mb-4">{plan.description}</p>
            
            <div className="mb-4">
              <div className="text-sm font-medium mb-2">Key Benefits:</div>
              <ul className="space-y-2">
                {plan.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="text-sm text-muted-foreground">Monthly Premium</div>
                <div className="text-2xl font-bold">₹{plan.premium}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Coverage</div>
                <div className="text-lg font-semibold">{plan.coverage}</div>
              </div>
            </div>
            
            <div className="mb-4 p-2 bg-muted rounded-lg">
              <div className="text-sm font-medium">Recommendation:</div>
              <div className="text-sm text-muted-foreground">{plan.recommendation}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};