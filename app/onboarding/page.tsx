// app/onboarding/page.tsx
'use client';

import { useState, useEffect } from 'react';
import TitleHeader from "@/components/layout/title-header";
import { motion, AnimatePresence } from 'framer-motion';

// Sample website designs for preview
const websiteDesigns = [
  {
    id: 1,
    name: "Modern Minimal",
    image: "/api/placeholder/400/250",
    description: "Clean, spacious layout with focus on products",
    category: ["Fashion", "Electronics", "Home Decor"]
  },
  {
    id: 2,
    name: "Vibrant Commerce",
    image: "/api/placeholder/400/250",
    description: "Colorful and engaging for fashion & accessories",
    category: ["Fashion", "Beauty", "Jewelry"]
  },
  {
    id: 3,
    name: "Professional Business",
    image: "/api/placeholder/400/250",
    description: "Corporate look for established brands",
    category: ["Electronics", "Sports", "Books"]
  },
  {
    id: 4,
    name: "Creative Boutique",
    image: "/api/placeholder/400/250",
    description: "Artistic layout for unique products",
    category: ["Home Decor", "Jewelry", "Fashion Accessories"]
  }
];

const OnboardingPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    personalDetails: {
      fullName: '', email: '', phone: '', whatsapp: '', whatsappSameAsPhone: false,
      address: '', pincode: '', district: '', state: '', dob: ''
    },
    businessDetails: {
      storeName: '', storeInstagram: '', storeWhatsapp: '', storePhone: '', storeFacebook: '',
      storeTagline: '', storeDescription: '', storeCategory: '', returnPolicy: '',
      shippingPolicy: '', termsConditions: '', aboutStore: '', yearOfStarting: '',
      primaryColor: '#000000', secondaryColor: '#ffffff'
    },
    websiteDetails: {
      websiteType: '', prepaidShippingCharge: 0, codCharge: 0, hasDomain: false,
      domainName: '', preferredDomain: '', needSubdomain: false, preferredSubdomain: '',
      designPreference: '', selectedDesign: '', needTracking: false, specialNotes: '', 
      additionalFeatures: [] as string[]
    },
    paymentLegal: {
      agreedToTerms: false, paymentOption: '', emiAdvancePaid: false, 
      fullPaymentAdvancePaid: false, totalAmount: 0, advancePaid: 0, remainingAmount: 0
    }
  });

  const [loading, setLoading] = useState(false);
  const [developmentMode, setDevelopmentMode] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Development mode auto-fill
  useEffect(() => {
    if (developmentMode) {
      setFormData({
        personalDetails: {
          fullName: 'John Doe',
          email: 'john@example.com',
          phone: '9876543210',
          whatsapp: '9876543210',
          whatsappSameAsPhone: true,
          address: '123 Business Street, Commercial Area',
          pincode: '400001',
          district: 'Mumbai City',
          state: 'Maharashtra',
          dob: '1990-01-01'
        },
        businessDetails: {
          storeName: 'Fashion Hub',
          storeInstagram: '@fashionhub',
          storeWhatsapp: '9876543210',
          storePhone: '9876543210',
          storeFacebook: 'fashionhub',
          storeTagline: 'Your Style Destination',
          storeDescription: 'Premium fashion store offering latest trends',
          storeCategory: 'Fashion Accessories',
          returnPolicy: '7 days return policy',
          shippingPolicy: 'Free shipping above ₹999',
          termsConditions: 'Standard terms apply',
          aboutStore: 'We are a premium fashion retailer...',
          yearOfStarting: '2020',
          primaryColor: '#3B82F6',
          secondaryColor: '#1E40AF'
        },
        websiteDetails: {
          websiteType: 'Online Payment',
          prepaidShippingCharge: 49,
          codCharge: 79,
          hasDomain: false,
          domainName: '',
          preferredDomain: 'fashionhub',
          needSubdomain: true,
          preferredSubdomain: 'store',
          designPreference: 'Modern and clean design',
          selectedDesign: 'Modern Minimal',
          needTracking: true,
          specialNotes: 'Need mobile app like experience',
          additionalFeatures: ['Wishlist', 'Product Reviews']
        },
        paymentLegal: {
          agreedToTerms: true,
          paymentOption: 'emi',
          emiAdvancePaid: false,
          fullPaymentAdvancePaid: false,
          totalAmount: 7000,
          advancePaid: 2000,
          remainingAmount: 5000
        }
      });
    }
  }, [developmentMode]);

  const steps = [
    { id: 1, name: 'Personal Details', description: 'Your basic information' },
    { id: 2, name: 'Business Info', description: 'About your store' },
    { id: 3, name: 'Website Design', description: 'Choose your design' },
    { id: 4, name: 'Final Steps', description: 'Review & submit' }
  ];

  const handleInputChange = (section: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
    
    // Clear error when user starts typing
    if (formErrors[`${section}.${field}`]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`${section}.${field}`];
        return newErrors;
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.personalDetails.fullName) errors['personalDetails.fullName'] = 'Full name is required';
      if (!formData.personalDetails.email) errors['personalDetails.email'] = 'Email is required';
      if (!formData.personalDetails.phone) errors['personalDetails.phone'] = 'Phone is required';
      if (!formData.personalDetails.address) errors['personalDetails.address'] = 'Address is required';
      if (!formData.personalDetails.pincode) errors['personalDetails.pincode'] = 'Pincode is required';
    }

    if (step === 2) {
      if (!formData.businessDetails.storeName) errors['businessDetails.storeName'] = 'Store name is required';
      if (!formData.businessDetails.storeCategory) errors['businessDetails.storeCategory'] = 'Store category is required';
    }

    if (step === 3) {
      if (!formData.websiteDetails.websiteType) errors['websiteDetails.websiteType'] = 'Website type is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(4)) {
      setLoading(true);
      
      try {
        const response = await fetch('/api/submit-onboarding', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            submittedAt: new Date().toISOString(),
            status: 'new'
          })
        });
  
        if (response.ok) {
          // Store submission success in sessionStorage
          sessionStorage.setItem('onboarding_submitted', 'true');
          // Store submission timestamp
          sessionStorage.setItem('onboarding_timestamp', Date.now().toString());
          
          // Redirect to thank you page
          window.location.href = '/onboarding/thank-you';
        } else {
          alert('Error submitting form. Please try again.');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Error submitting form. Please try again.');
        setLoading(false);
      }
    }
  };

  const getPriceFromWebsiteType = (type: string): number => {
    const prices: Record<string, number> = {
      'Online Payment': 7000,
      'WhatsApp Orders': 5000,
      'Online Payment + Tracking': 12000
    };
    return prices[type] || 0;
  };

  useEffect(() => {
    if (formData.websiteDetails.websiteType) {
      const price = getPriceFromWebsiteType(formData.websiteDetails.websiteType);
      handleInputChange('paymentLegal', 'totalAmount', price);
    }
  }, [formData.websiteDetails.websiteType]);

  return (
    <div className="min-h-screen bg-background">
      <TitleHeader title="Client Onboarding" subtitle='Onboarding'/>
      
      {/* Development Mode Toggle */}
      {/* <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-end mb-4">
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={developmentMode}
              onChange={(e) => setDevelopmentMode(e.target.checked)}
              className="rounded border-border"
            />
            <span>Development Mode (Auto-fill)</span>
          </label>
        </div>
      </div> */}

      <div className="max-w-4xl mx-auto p-2 mt-24">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {step.id}
                </div>
                <span className={`text-xs mt-2 text-center ${
                  currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step.name}
                </span>
              </div>
            ))}
          </div>
          <div className="relative h-2 bg-muted rounded-full">
            <motion.div
              className="absolute top-0 left-0 h-full bg-primary rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-lg shadow-lg p-2 space-y-8">
          <AnimatePresence mode="wait">
            {/* Step 1: Personal Details */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold">Personal Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: 'Full Name *', field: 'fullName', type: 'text' },
                    { label: 'Email *', field: 'email', type: 'email' },
                    { label: 'Phone *', field: 'phone', type: 'tel' },
                    { label: 'WhatsApp *', field: 'whatsapp', type: 'tel' },
                  ].map(({ label, field, type }) => (
                    <div key={field}>
                      <label className="block mb-2 text-sm font-medium">{label}</label>
                      <input
                        type={type}
                        required
                        className={`w-full p-3 border rounded-lg transition-colors ${
                          formErrors[`personalDetails.${field}`] 
                            ? 'border-destructive' 
                            : 'border-input'
                        }`}
                        value={formData.personalDetails[field as keyof typeof formData.personalDetails] as string}
                        onChange={(e) => handleInputChange('personalDetails', field, e.target.value)}
                      />
                      {formErrors[`personalDetails.${field}`] && (
                        <p className="text-destructive text-xs mt-1">
                          {formErrors[`personalDetails.${field}`]}
                        </p>
                      )}
                    </div>
                  ))}
                  
                  <div className="md:col-span-2 flex items-center space-x-2 p-3 bg-muted rounded-lg">
                    <input
                      type="checkbox"
                      checked={formData.personalDetails.whatsappSameAsPhone}
                      onChange={(e) => {
                        handleInputChange('personalDetails', 'whatsappSameAsPhone', e.target.checked);
                        if (e.target.checked) {
                          handleInputChange('personalDetails', 'whatsapp', formData.personalDetails.phone);
                        }
                      }}
                      className="rounded border-border"
                    />
                    <label className="text-sm">WhatsApp same as Phone</label>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block mb-2 text-sm font-medium">Address *</label>
                    <textarea
                      required
                      className={`w-full p-3 border rounded-lg transition-colors ${
                        formErrors['personalDetails.address'] 
                          ? 'border-destructive' 
                          : 'border-input'
                      }`}
                      value={formData.personalDetails.address}
                      onChange={(e) => handleInputChange('personalDetails', 'address', e.target.value)}
                    />
                    {formErrors['personalDetails.address'] && (
                      <p className="text-destructive text-xs mt-1">
                        {formErrors['personalDetails.address']}
                      </p>
                    )}
                  </div>

                  {[
                    { label: 'Pincode *', field: 'pincode' },
                    { label: 'District *', field: 'district' },
                    { label: 'State *', field: 'state' },
                    { label: 'Date of Birth *', field: 'dob', type: 'date' },
                  ].map(({ label, field, type = 'text' }) => (
                    <div key={field}>
                      <label className="block mb-2 text-sm font-medium">{label}</label>
                      <input
                        type={type}
                        required
                        className={`w-full p-3 border rounded-lg transition-colors ${
                          formErrors[`personalDetails.${field}`] 
                            ? 'border-destructive' 
                            : 'border-input'
                        }`}
                        value={formData.personalDetails[field as keyof typeof formData.personalDetails] as string}
                        onChange={(e) => handleInputChange('personalDetails', field, e.target.value)}
                      />
                      {formErrors[`personalDetails.${field}`] && (
                        <p className="text-destructive text-xs mt-1">
                          {formErrors[`personalDetails.${field}`]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Business Details */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold">Business Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium">Store Name *</label>
                    <input
                      type="text"
                      required
                      className={`w-full p-3 border rounded-lg transition-colors ${
                        formErrors['businessDetails.storeName'] 
                          ? 'border-destructive' 
                          : 'border-input'
                      }`}
                      value={formData.businessDetails.storeName}
                      onChange={(e) => handleInputChange('businessDetails', 'storeName', e.target.value)}
                    />
                    {formErrors['businessDetails.storeName'] && (
                      <p className="text-destructive text-xs mt-1">
                        {formErrors['businessDetails.storeName']}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium">Store Category *</label>
                    <select
                      required
                      className={`w-full p-3 border rounded-lg transition-colors ${
                        formErrors['businessDetails.storeCategory'] 
                          ? 'border-destructive' 
                          : 'border-input'
                      }`}
                      value={formData.businessDetails.storeCategory}
                      onChange={(e) => handleInputChange('businessDetails', 'storeCategory', e.target.value)}
                    >
                      <option value="">Select Category</option>
                      <option value="Fashion Accessories">Fashion Accessories</option>
                      <option value="Footwears">Footwears</option>
                      <option value="Watches">Watches</option>
                      <option value="Clothing">Clothing</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Home Decor">Home Decor</option>
                      <option value="Beauty & Cosmetics">Beauty & Cosmetics</option>
                      <option value="Jewelry">Jewelry</option>
                      <option value="Sports Equipment">Sports Equipment</option>
                      <option value="Books">Books</option>
                      <option value="Other">Other</option>
                    </select>
                    {formErrors['businessDetails.storeCategory'] && (
                      <p className="text-destructive text-xs mt-1">
                        {formErrors['businessDetails.storeCategory']}
                      </p>
                    )}
                  </div>

                  {[
                    { label: 'Store Instagram', field: 'storeInstagram' },
                    { label: 'Store WhatsApp', field: 'storeWhatsapp' },
                    { label: 'Store Phone', field: 'storePhone' },
                    { label: 'Store Facebook', field: 'storeFacebook' },
                  ].map(({ label, field }) => (
                    <div key={field}>
                      <label className="block mb-2 text-sm font-medium">{label}</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-input rounded-lg transition-colors"
                        value={formData.businessDetails[field as keyof typeof formData.businessDetails] as string}
                        onChange={(e) => handleInputChange('businessDetails', field, e.target.value)}
                      />
                    </div>
                  ))}

                  <div className="md:col-span-2">
                    <label className="block mb-2 text-sm font-medium">Store Description</label>
                    <textarea
                      className="w-full p-3 border border-input rounded-lg transition-colors"
                      rows={3}
                      value={formData.businessDetails.storeDescription}
                      onChange={(e) => handleInputChange('businessDetails', 'storeDescription', e.target.value)}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block mb-2 text-sm font-medium">About Your Store</label>
                    <textarea
                      className="w-full p-3 border border-input rounded-lg transition-colors"
                      rows={4}
                      value={formData.businessDetails.aboutStore}
                      onChange={(e) => handleInputChange('businessDetails', 'aboutStore', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium">Primary Color</label>
                    <div className="flex space-x-2">
                      <input
                        type="color"
                        className="w-12 h-12 rounded border border-input"
                        value={formData.businessDetails.primaryColor}
                        onChange={(e) => handleInputChange('businessDetails', 'primaryColor', e.target.value)}
                      />
                      <input
                        type="text"
                        className="flex-1 p-3 border border-input rounded-lg"
                        value={formData.businessDetails.primaryColor}
                        onChange={(e) => handleInputChange('businessDetails', 'primaryColor', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium">Secondary Color</label>
                    <div className="flex space-x-2">
                      <input
                        type="color"
                        className="w-12 h-12 rounded border border-input"
                        value={formData.businessDetails.secondaryColor}
                        onChange={(e) => handleInputChange('businessDetails', 'secondaryColor', e.target.value)}
                      />
                      <input
                        type="text"
                        className="flex-1 p-3 border border-input rounded-lg"
                        value={formData.businessDetails.secondaryColor}
                        onChange={(e) => handleInputChange('businessDetails', 'secondaryColor', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Website Design */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold">Website Design & Features</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium">Website Type *</label>
                    <select
                      required
                      className={`w-full p-3 border rounded-lg transition-colors ${
                        formErrors['websiteDetails.websiteType'] 
                          ? 'border-destructive' 
                          : 'border-input'
                      }`}
                      value={formData.websiteDetails.websiteType}
                      onChange={(e) => handleInputChange('websiteDetails', 'websiteType', e.target.value)}
                    >
                      <option value="">Select Type</option>
                      <option value="Online Payment">Online Payment - ₹7000</option>
                      <option value="WhatsApp Orders">WhatsApp Orders - ₹5000</option>
                      <option value="Online Payment + Tracking">Online Payment + Tracking - ₹12000</option>
                    </select>
                    {formErrors['websiteDetails.websiteType'] && (
                      <p className="text-destructive text-xs mt-1">
                        {formErrors['websiteDetails.websiteType']}
                      </p>
                    )}
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Selected Plan</h3>
                    <p className="text-2xl font-bold text-primary">
                      ₹{getPriceFromWebsiteType(formData.websiteDetails.websiteType).toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {formData.websiteDetails.websiteType}
                    </p>
                  </div>
                </div>

                {/* Website Design Samples */}
                <div className="space-y-4">
                  <label className="block text-sm font-medium">Choose Design Style</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {websiteDesigns.map((design) => (
                      <motion.div
                        key={design.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                          formData.websiteDetails.selectedDesign === design.name
                            ? 'border-primary bg-primary/5'
                            : 'border-input hover:border-primary/50'
                        }`}
                        onClick={() => handleInputChange('websiteDetails', 'selectedDesign', design.name)}
                      >
                        <div className="aspect-video bg-muted rounded-md mb-3 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-full h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded mb-2"></div>
                            <span className="text-sm text-muted-foreground">Design Preview: {design.name}</span>
                          </div>
                        </div>
                        <h3 className="font-semibold">{design.name}</h3>
                        <p className="text-sm text-muted-foreground">{design.description}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {design.category.map(cat => (
                            <span key={cat} className="text-xs bg-muted px-2 py-1 rounded">
                              {cat}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium">Design Preference</label>
                    <input
                      type="text"
                      className="w-full p-3 border border-input rounded-lg"
                      placeholder="Describe your design preferences..."
                      value={formData.websiteDetails.designPreference}
                      onChange={(e) => handleInputChange('websiteDetails', 'designPreference', e.target.value)}
                    />
                  </div>

                  <div className="flex items-center space-x-2 p-4 bg-muted rounded-lg">
                    <input
                      type="checkbox"
                      checked={formData.websiteDetails.needTracking}
                      onChange={(e) => handleInputChange('websiteDetails', 'needTracking', e.target.checked)}
                      className="rounded border-border"
                    />
                    <label className="text-sm font-medium">Include Order Tracking System</label>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium">Special Notes & Requirements</label>
                  <textarea
                    className="w-full p-3 border border-input rounded-lg"
                    rows={4}
                    placeholder="Any special requirements, features, or notes for your website..."
                    value={formData.websiteDetails.specialNotes}
                    onChange={(e) => handleInputChange('websiteDetails', 'specialNotes', e.target.value)}
                  />
                </div>
              </motion.div>
            )}

            {/* Step 4: Final Review */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold">Review & Submit</h2>
                
                <div className="space-y-6">
                  {/* Personal Details Review */}
                  <div className="border border-input rounded-lg p-4">
                    <h3 className="font-semibold mb-3">Personal Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div><strong>Name:</strong> {formData.personalDetails.fullName}</div>
                      <div><strong>Email:</strong> {formData.personalDetails.email}</div>
                      <div><strong>Phone:</strong> {formData.personalDetails.phone}</div>
                      <div><strong>Address:</strong> {formData.personalDetails.address}</div>
                    </div>
                  </div>

                  {/* Business Details Review */}
                  <div className="border border-input rounded-lg p-4">
                    <h3 className="font-semibold mb-3">Business Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div><strong>Store Name:</strong> {formData.businessDetails.storeName}</div>
                      <div><strong>Category:</strong> {formData.businessDetails.storeCategory}</div>
                      <div><strong>Instagram:</strong> {formData.businessDetails.storeInstagram || 'Not provided'}</div>
                      <div><strong>Description:</strong> {formData.businessDetails.storeDescription || 'Not provided'}</div>
                    </div>
                  </div>

                  {/* Website Details Review */}
                  <div className="border border-input rounded-lg p-4">
                    <h3 className="font-semibold mb-3">Website Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div><strong>Website Type:</strong> {formData.websiteDetails.websiteType}</div>
                      <div><strong>Selected Design:</strong> {formData.websiteDetails.selectedDesign || 'Not selected'}</div>
                      <div><strong>Total Amount:</strong> ₹{formData.paymentLegal.totalAmount.toLocaleString()}</div>
                      <div><strong>Order Tracking:</strong> {formData.websiteDetails.needTracking ? 'Yes' : 'No'}</div>
                    </div>
                  </div>

                  {/* Terms Agreement */}
                  <div className="border border-input rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        required
                        checked={formData.paymentLegal.agreedToTerms}
                        onChange={(e) => handleInputChange('paymentLegal', 'agreedToTerms', e.target.checked)}
                        className="mt-1 rounded border-border"
                      />
                      <div>
                        <label className="font-medium">Agreement to Terms & Conditions</label>
                        <p className="text-sm text-muted-foreground mt-1">
                          I agree to the terms and conditions and understand that I'll be contacted for payment details and further process. 
                          I confirm that all information provided is accurate to the best of my knowledge.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t border-border">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-3 border border-input rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted transition-colors"
            >
              Previous
            </button>

            {currentStep < steps.length ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading || !formData.paymentLegal.agreedToTerms}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
              >
                {loading ? (
                  <span className="flex items-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"
                    />
                    Submitting...
                  </span>
                ) : (
                  'Submit Onboarding Request'
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default OnboardingPage;