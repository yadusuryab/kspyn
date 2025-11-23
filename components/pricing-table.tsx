"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import NumberFlow from "@number-flow/react";
import { Badge } from "./ui/badge";

export type PlanLevel = "online-lite" | "online-pro" | "wa-lite" | "wa-pro" | "track-lite" | "track-pro" | string;

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
  description: string;
  popular?: boolean;
}

export interface Addon {
  title: string;
  price: string;
  desc: string;
  originalPrice?: string;
}

export interface PricingTableProps extends React.HTMLAttributes<HTMLDivElement> {
  features: PricingFeature[];
  plans: PricingPlan[];
  onPlanSelect?: (plan: PricingPlan) => void;
  defaultPlan?: PlanLevel;
  defaultInterval?: "monthly" | "yearly";
  containerClassName?: string;
  buttonClassName?: string;
  selectedAddons: string[];
  onAddonToggle: (addonTitle: string) => void;
  addons: Addon[];
  onWhatsAppRedirect: () => void;
  totalAmount: number;
}

export function PricingTable({
  features,
  plans,
  onPlanSelect,
  defaultPlan = "online-lite",
  defaultInterval = "yearly",
  className,
  containerClassName,
  buttonClassName,
  selectedAddons,
  onAddonToggle,
  addons,
  onWhatsAppRedirect,
  totalAmount,
  ...props
}: PricingTableProps) {
  const [isYearly, setIsYearly] = React.useState(defaultInterval === "yearly");
  const [selectedPlan, setSelectedPlan] = React.useState<PlanLevel>(defaultPlan);

  const handlePlanSelect = (plan: PricingPlan) => {
    setSelectedPlan(plan.level);
    onPlanSelect?.(plan);
  };

  const getPlanDescription = (level: PlanLevel) => {
    return plans.find(p => p.level === level)?.description || "";
  };

  return (
    <section
      className={cn(
        "bg-background text-foreground",
        "py-12 sm:py-24 md:py-32 px-4",
        "fade-bottom overflow-hidden pb-0"
      )}
    >
      <div
        className={cn("w-full max-w-7xl mx-auto px-4", containerClassName)}
        {...props}
      >
        {/* Plan Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.level}
              className={cn(
                "border rounded-xl p-6 transition-all cursor-pointer",
                "hover:shadow-lg hover:border-primary/50",
                selectedPlan === plan.level
                  ? "ring-2 ring-primary border-primary shadow-lg"
                  : "border-border",
                plan.popular ? "relative bg-gradient-to-b from-primary/5 to-transparent" : ""
              )}
              onClick={() => handlePlanSelect(plan)}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-3 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold tracking-tighter">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
              </div>
              
              <div className="text-center mb-4">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-2xl font-bold">₹</span>
                  <NumberFlow
                    value={plan.price.yearly}
                    className="text-3xl font-bold"
                  />
                </div>
                <p className="text-sm text-muted-foreground">one-time payment</p>
              </div>

              <div className="space-y-2">
                {features
                  .filter(feature => feature.included === plan.level)
                  .slice(0, 4)
                  .map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature.name}</span>
                    </div>
                  ))}
                {features.filter(feature => feature.included === plan.level).length > 4 && (
                  <div className="text-sm text-muted-foreground text-center">
                    +{features.filter(feature => feature.included === plan.level).length - 4} more features
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Selected Plan Features */}
        <div className="border rounded-lg overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <div className="w-full divide-y divide-border">
              <div className="flex items-center p-4 bg-muted/50">
                <div className="flex-1 flex gap-2 text-xl uppercase items-center font-bold">
                  {plans.find(p => p.level === selectedPlan)?.name} 
                  <Badge variant={'secondary'}>Features</Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  {getPlanDescription(selectedPlan)}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                {features
                  .filter(feature => feature.included === selectedPlan)
                  .map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/30"
                    >
                      <CheckIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature.name}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Add-ons Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Premium Add-ons</h2>
          <p className="text-muted-foreground">Enhance your store with these powerful features</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {addons.map((addon, idx) => (
            <div 
              key={idx} 
              onClick={() => onAddonToggle(addon.title)}
              className={cn(
                "border rounded-xl p-6 shadow-sm cursor-pointer transition-all relative",
                "hover:shadow-lg hover:border-primary/50",
                selectedAddons.includes(addon.title) 
                  ? "ring-2 ring-primary border-primary bg-primary/5" 
                  : "border-border"
              )}
            >
              {addon.originalPrice && (
                <div className="absolute -top-2 -right-2">
                  <Badge variant="secondary" className="text-xs line-through">
                    {addon.originalPrice}
                  </Badge>
                </div>
              )}
              
              <h3 className="text-xl font-semibold mb-2">{addon.title}</h3>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-2xl font-bold text-primary">{addon.price}</span>
                {addon.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    {addon.originalPrice}
                  </span>
                )}
              </div>
              <p className="text-muted-foreground mb-4 text-sm">{addon.desc}</p>
              
              <div className="flex items-center justify-between">
                <span className={cn(
                  "text-sm font-medium",
                  selectedAddons.includes(addon.title) ? "text-primary" : "text-muted-foreground"
                )}>
                  {selectedAddons.includes(addon.title) ? "Selected" : "Click to select"}
                </span>
                <div className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center",
                  selectedAddons.includes(addon.title) 
                    ? "bg-primary border-primary" 
                    : "border-border"
                )}>
                  {selectedAddons.includes(addon.title) && (
                    <CheckIcon className="w-4 h-4 text-white" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total & CTA */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold mb-2">Your Selection</h3>
              <p className="text-muted-foreground">
                {plans.find(p => p.level === selectedPlan)?.name} + {selectedAddons.length} add-ons
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">
                ₹{totalAmount.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total one-time investment</div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className={cn(
              "px-8 py-6 text-lg font-semibold",
              buttonClassName
            )}
            onClick={onWhatsAppRedirect}
          >
            Start Your Project - ₹{totalAmount.toLocaleString()}
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </Button>
          <p className="text-sm text-muted-foreground mt-3">
            No advance payment required. Discuss your requirements first.
          </p>
        </div>
      </div>
    </section>
  );
}