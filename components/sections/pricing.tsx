'use client'
import { PricingTable } from "../pricing-table";
import { useState } from "react";

const features = [
  // Website Store Lite (₹4,999)
  { name: "1 Page Responsive Website", included: "web-lite" },
  { name: "Basic Product Catalog", included: "web-lite" },
  { name: "Mobile & SEO Optimized", included: "web-lite" },
  { name: "Contact Form + Google Maps", included: "web-lite" },
  { name: "UPI / COD Checkout", included: "web-lite" },

  // Website Store Pro (₹6,999)
  { name: "Multi-page Website (Home, About, Shop)", included: "web-pro" },
  { name: "Customer Review System", included: "web-pro" },
  { name: "Advanced Admin Dashboard", included: "web-pro" },
  { name: "Custom UI with Brand Colors", included: "web-pro" },
  { name: "About Store Section", included: "web-pro" },
  { name: "Customizable Banners", included: "web-pro" },
  { name: "Free Custom Domain (1 Year)", included: "web-pro" },

  // WhatsApp Store Lite (₹2,999)
  { name: "WhatsApp Order System", included: "wa-lite" },
  { name: "Product Catalog", included: "wa-lite" },
  { name: "Basic Cart Experience", included: "wa-lite" },
  { name: "Mobile Optimized", included: "wa-lite" },
  { name: "Customer Info Collection", included: "wa-lite" },

  // WhatsApp Store Pro (₹3,999)
  { name: "Review & Rating System", included: "wa-pro" },
  { name: "Customizable Store Pages", included: "wa-pro" },
  { name: "Advanced Product Display", included: "wa-pro" },
  { name: "Brand Customization", included: "wa-pro" },
  { name: "About Business Section", included: "wa-pro" },

  // Tracking System Lite (₹2,999)
  { name: "Order Tracking Page", included: "track-lite" },
  { name: "Auto Light/Dark Mode", included: "track-lite" },
  { name: "Multi-Carrier Support", included: "track-lite" },
  { name: "Basic Admin Panel", included: "track-lite" },
  { name: "Order Update System", included: "track-lite" },

  // Tracking System Pro (₹4,999)
  { name: "Advanced Analytics Dashboard", included: "track-pro" },
  { name: "Bulk Order Updates", included: "track-pro" },
  { name: "Multi-Image Upload", included: "track-pro" },
  { name: "Custom Branding", included: "track-pro" },
  { name: "Shareable Tracking Links", included: "track-pro" },
];

const plans = [
  {
    name: "WhatsApp Lite",
    price: { yearly: 2999 },
    level: "wa-lite",
    description: "Basic WhatsApp store for small shops",
    popular: false,
  },
  {
    name: "Website Store Lite",
    price: { yearly: 4999 },
    level: "web-lite",
    description: "1-page website with catalog + checkout",
    popular: true,
  },
  {
    name: "WhatsApp Pro",
    price: { yearly: 3999 },
    level: "wa-pro",
    description: "Advanced WhatsApp shop with reviews",
    popular: false,
  },
  {
    name: "Website Store Pro",
    price: { yearly: 6999 },
    level: "web-pro",
    description: "Multi-page e-commerce website",
    popular: true,
  },
  {
    name: "Tracking Lite",
    price: { yearly: 2999 },
    level: "track-lite",
    description: "Basic tracking system",
    popular: false,
  },
  {
    name: "Tracking Pro",
    price: { yearly: 4999 },
    level: "track-pro",
    description: "Advanced tracking with branding",
    popular: false,
  },
];

const addons = [
  {
    title: "Poster Designing",
    price: "₹799/month",
    desc: "15 custom-designed posters every month",
    originalPrice: "₹900"
  },
  {
    title: "SEO Engine",
    price: "₹1,999 one-time",
    desc: "Auto meta tags, schema, performance boost",
    originalPrice: "₹2,499"
  },
  {
    title: "Advanced Analytics",
    price: "₹1,999 one-time",
    desc: "Insights on sales, products & customers",
    originalPrice: "₹2,499"
  },
  {
    title: "Wishlist System",
    price: "₹1,499 one-time",
    desc: "Save for later + email reminders",
    originalPrice: "₹1,999"
  },
  {
    title: "Payment Gateway",
    price: "₹1,999 one-time",
    desc: "UPI, card, netbanking via Razorpay/Paytm",
    originalPrice: "₹2,499"
  },
  {
    title: "Meta Pixel Setup",
    price: "₹999 one-time",
    desc: "Instagram/Facebook tracking for ads",
    originalPrice: "₹1,499"
  },
];


function PricingPageComponent() {
  const [selectedPlan, setSelectedPlan] = useState(plans[1]); // default to Online Store Lite
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const handlePlanSelect = (plan: any) => {
    setSelectedPlan(plan);
  };

  const toggleAddon = (addonTitle: string) => {
    setSelectedAddons(prev =>
      prev.includes(addonTitle)
        ? prev.filter(item => item !== addonTitle)
        : [...prev, addonTitle]
    );
  };

  const calculateTotal = () => {
    const planPrice = selectedPlan?.price.yearly || 0;
    const addonPrices = selectedAddons.reduce((total, addonTitle) => {
      const addon = addons.find(a => a.title === addonTitle);
      if (addon) {
        const price = parseInt(addon.price.replace(/[^0-9]/g, ''));
        return total + price;
      }
      return total;
    }, 0);
    
    return planPrice + addonPrices;
  };

  const handleWhatsAppRedirect = () => {
    const selectedFeatures = features.filter(f => f.included === selectedPlan.level);
    const totalAmount = calculateTotal();

    let message = `Hi, I'm interested in the ${selectedPlan?.name} plan.\n\n`;
    message += `*Plan Price:* ₹${selectedPlan?.price.yearly.toLocaleString()}\n`;
    message += `*Plan Description:* ${selectedPlan?.description}\n\n`;
    
    message += `*Included Features:*\n`;
    selectedFeatures.forEach(f => message += `• ${f.name}\n`);
    
    if (selectedAddons.length > 0) {
      message += `\n*Selected Add-ons:*\n`;
      addons.forEach(addon => {
        if (selectedAddons.includes(addon.title)) {
          message += `• ${addon.title} - ${addon.price}\n`;
        }
      });
    }
    
    message += `\n*Total Amount:* ₹${totalAmount.toLocaleString()}`;
    message += `\n\nI'd like to proceed with this setup. Please guide me through the next steps.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/919495314108?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="pb-36">
      <PricingTable
        features={features}
        plans={plans}
        defaultPlan={selectedPlan.level}
        defaultInterval="yearly"
        onPlanSelect={handlePlanSelect}
        containerClassName="pb-20"
        buttonClassName="bg-primary hover:bg-primary/90"
        selectedAddons={selectedAddons}
        onAddonToggle={toggleAddon}
        addons={addons}
        onWhatsAppRedirect={handleWhatsAppRedirect}
        totalAmount={calculateTotal()}
      />
    </div>
  );
}

export { PricingPageComponent, features, plans, addons };