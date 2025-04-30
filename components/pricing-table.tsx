"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import NumberFlow from "@number-flow/react";
import { Badge } from "./ui/badge";

export type PlanLevel = "starter" | "pro" | "all" | string;

export interface PricingFeature {
  name: string;
  included: PlanLevel | null;
}

export interface PricingPlan {
  name: string;
  level: PlanLevel;
  price: {
    yearly: number;
  };
  popular?: boolean;
}

export interface PricingTableProps extends React.HTMLAttributes<HTMLDivElement> {
  features: PricingFeature[];
  plans: PricingPlan[];
  onPlanSelect?: (plan: PlanLevel) => void;
  defaultPlan?: PlanLevel;
  defaultInterval?: "monthly" | "yearly";
  containerClassName?: string;
  buttonClassName?: string;
  whatsappNumber?: string; // Add this prop for WhatsApp number
}

export function PricingTable({
  features,
  plans,
  onPlanSelect,
  defaultPlan = "pro",
  defaultInterval = "monthly",
  className,
  containerClassName,
  buttonClassName,
  whatsappNumber = "+919495314108", // Default number, replace with yours
  ...props
}: PricingTableProps) {
  const [isYearly, setIsYearly] = React.useState(defaultInterval === "yearly");
  const [selectedPlan, setSelectedPlan] = React.useState<PlanLevel>(defaultPlan);
  const [selectedAddons, setSelectedAddons] = React.useState<string[]>([]);

  const handlePlanSelect = (plan: PlanLevel) => {
    setSelectedPlan(plan);
    onPlanSelect?.(plan);
  };

  const toggleAddon = (addonTitle: string) => {
    setSelectedAddons(prev =>
      prev.includes(addonTitle)
        ? prev.filter(item => item !== addonTitle)
        : [...prev, addonTitle]
    );
  };

  const handleWhatsAppRedirect = () => {
    const selectedPlanObj = plans.find(p => p.level === selectedPlan);
    const selectedFeatures = features.filter(f => f.included === selectedPlan);
    
    const planPrice = isYearly 
      ? selectedPlanObj?.price.yearly 
      : selectedPlanObj?.price.yearly;

    // Format the message
    let message = `Hi, I'm interested in the ${selectedPlanObj?.name} plan.\n\n`;
    message += `*Plan Price:* ₹${planPrice}\n\n`;
    message += `*Included Features:*\n`;
    selectedFeatures.forEach(f => message += `- ${f.name}\n`);
    
    if (selectedAddons.length > 0) {
      message += `\n*Selected Add-ons:*\n`;
      addons.forEach(addon => {
        if (selectedAddons.includes(addon.title)) {
          message += `- ${addon.title} (${addon.price})\n`;
        }
      });
    }
    

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Open WhatsApp with the message
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
  };

  const addons = [
    { title: "Poster Designing", price: "₹800/month", desc: "Get 5 unique custom-designed posters every month." },
    { title: "SEO Optimization", price: "₹600 one-time", desc: "Keyword setup, meta tags, and search engine optimization." },
  ];

  return (
    <section
      className={cn(
        "bg-background text-foreground",
        "py-12 sm:py-24 md:py-32 px-4",
        "fade-bottom overflow-hidden pb-0"
      )}
    >
      <div
        className={cn("w-full max-w-3xl mx-auto px-4", containerClassName)}
        {...props}
      >
        <div className="flex flex-col sm:flex-row md:mb-0 mb-8">
          {plans.map((plan) => (
            <button
              key={plan.name}
              type="button"
              onClick={() => handlePlanSelect(plan.level)}
              className={cn(
                "flex-1 p-4 text-left transition-all",
                "border ",
                selectedPlan === plan.level &&
                  "ring-2 "
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl font-bold tracking-tighter">{plan.name}</span>
                {plan.popular && (
                  <span className="text-xs bg-primary text-background px-2 py-0.5 rounded-2full">
                    Popular
                  </span>
                )}
              </div>
              <div className="flex items-baseline gap-1">
                <NumberFlow
                  format={{
                    style: "currency",
                    currency: "INR",
                    trailingZeroDisplay: "stripIfInteger",
                  }}
                  value={isYearly ? plan.price.yearly : plan.price.yearly}
                  className="text-2xl font-bold"
                />
              </div>
            </button>
          ))}
        </div>

        <div className="border  overflow-hidden">
          <div className="overflow-x-auto">
            <div className="w-full divide-y divide-zinc-200 dark:divide-zinc-800">
              <div className="flex items-center p-4 ">
                <div className="flex-1 flex gap-2 text-xl uppercase items-center font-bold">{selectedPlan} <Badge variant={'secondary'}>Features</Badge></div>
              </div>
              {features.map(
                (feature) =>
                  feature.included === selectedPlan && (
                    <div
                      key={feature.name}
                      className={cn("flex items-center p-4 transition-colors")}
                    >
                      <div className="flex-1 tracking-tight">{feature.name}</div>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>

        <div className="text-center text-2xl font-semibold mt-4">Add-Ons</div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
          {addons.map((addon, idx) => (
            <div 
              key={idx} 
              onClick={() => toggleAddon(addon.title)}
              className={cn(
                "border p-6 shadow-md cursor-pointer transition-all",
                selectedAddons.includes(addon.title) 
                  ? "ring-2" 
                  : "hover:shadow-lg"
              )}
            >
              <h3 className="text-xl font-semibold mb-2">{addon.title}</h3>
              <p className="text-muted-foreground mb-2">{addon.desc}</p>
              <span className="text-lg font-bold">{addon.price}</span>
              <div className="mt-2">
                {selectedAddons.includes(addon.title) ? (
                  <CheckIcon className="w-5 h-5 text-white" />
                ) : (
                  <div className="w-5 h-5 border rounded-md border-zinc-300" />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button
            className="w-full"
            onClick={handleWhatsAppRedirect}
          >
            Book your {plans.find((p) => p.level === selectedPlan)?.name}
            <ArrowRightIcon className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}