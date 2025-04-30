'use client'
import { PricingTable } from "../pricing-table";
import { useState } from "react";

const features = [
    // Smart Start
    { name: "1 Page Responsive Website", included: "starter" },
    { name: "Contact Form + Google Maps", included: "starter" },
    { name: "Mobile & SEO Optimized", included: "starter" },
    { name: "1 Free Poster Design", included: "starter" },
  
    // Growth Pro
    { name: "Multi-page Website (Home, About, Services, etc.)", included: "scale" },
    { name: "Order via WhatsApp (Cart Functionality)", included: "scale" },
    { name: "Basic Admin Dashboard for Orders", included: "scale" },
    { name: "Sanity CMS for Product Management", included: "scale" },
    { name: "Custom UI with Brand Colors", included: "scale" },
  
    // Brand Pro Max
    { name: "Online Payments", included: "pro" },
    { name: "Advanced Admin Panel (Add/Edit/Delete Products)", included: "pro" },
    { name: "Thank You Page + Conversion Tracking", included: "pro" },
    { name: "Free SEO Setup (Meta tags, Sitemap)", included: "pro" },
    { name: "Client Training (How to Use Admin Panel)", included: "pro" },
  
    // Custom Plan
    { name: "Choose Your Own Features (Mix & Match)", included: "custom" },
  ];
  

const plans = [
    {
        name: "Starter",
        price: { yearly: 1999 },
        level: "starter",
      },
      {
        name: "Scale",  // or Vision, Elevate, Craft, etc.
        price: { yearly: 4999 },
        level: "scale",
        popular: true,
      },
      {
        name: "Pro",
        price: { yearly: 7999 },
        level: "pro",
      },
      {
        name: "Custom",
        price: { yearly: 9999 },
        level: "custom",
      },
      
  ];
  


function PricingPageComponent() {
  const [selectedPlan, setSelectedPlan] = useState(plans[1]); // default to Pro

  const handleWhatsApp = () => {
    const message = `Hi Yadu, I'm interested in the ${selectedPlan?.name} Plan (₹${selectedPlan?.price.yearly} one-time). Let's get started!`;
    const encodedMsg = encodeURIComponent(message);
    window.open(`https://wa.me/91YOURNUMBER?text=${encodedMsg}`, "_blank");
  };

  return (
    <div className="pb-36">
      <PricingTable
        features={features}
        plans={plans}
        defaultPlan={selectedPlan.level}
        defaultInterval="yearly"
        onPlanSelect={(plan:any) => setSelectedPlan(plan)}
        containerClassName="pb-20"
        buttonClassName="bg-primary hover:bg-primary/90"
      />

    

     
    </div>
  );
}

export { PricingPageComponent };
