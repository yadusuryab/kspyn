export default {
    name: 'clientOnboarding',
    title: 'Client Onboarding',
    type: 'document',
    fields: [
      // Personal Details
      {
        name: 'personalDetails',
        title: 'Personal Details',
        type: 'object',
        fields: [
          { name: 'fullName', title: 'Full Name', type: 'string' },
          { name: 'email', title: 'Email', type: 'string' },
          { name: 'phone', title: 'Phone Number', type: 'string' },
          { name: 'whatsapp', title: 'WhatsApp Number', type: 'string' },
          { name: 'whatsappSameAsPhone', title: 'WhatsApp same as Phone', type: 'boolean' },
          { name: 'address', title: 'Address', type: 'text' },
          { name: 'pincode', title: 'Pincode', type: 'string' },
          { name: 'district', title: 'District', type: 'string' },
          { name: 'state', title: 'State', type: 'string' },
          { name: 'dob', title: 'Date of Birth', type: 'date' },
        ]
      },
      // Business Details
      {
        name: 'businessDetails',
        title: 'Business Details',
        type: 'object',
        fields: [
          { name: 'storeName', title: 'Store Name', type: 'string' },
          { name: 'storeInstagram', title: 'Store Instagram', type: 'string' },
          { name: 'storeWhatsapp', title: 'Store WhatsApp', type: 'string' },
          { name: 'storePhone', title: 'Store Phone', type: 'string' },
          { name: 'storeFacebook', title: 'Store Facebook', type: 'string' },
          { name: 'storeTagline', title: 'Store Tagline', type: 'string' },
          { name: 'storeDescription', title: 'Store Description', type: 'text' },
          { name: 'storeCategory', title: 'Store Category', type: 'string' },
          { name: 'returnPolicy', title: 'Return Policy', type: 'text' },
          { name: 'shippingPolicy', title: 'Shipping Policy', type: 'text' },
          { name: 'termsConditions', title: 'Terms & Conditions', type: 'text' },
          { name: 'aboutStore', title: 'About Your Store', type: 'text' },
          { name: 'yearOfStarting', title: 'Year of Starting', type: 'string' },
          { name: 'storeIcon', title: 'Store Icon', type: 'image' },
          { name: 'storeLogo', title: 'Store Logo', type: 'image' },
          { name: 'brandGuidelines', title: 'Brand Guidelines', type: 'file' },
          { name: 'primaryColor', title: 'Primary Color', type: 'string' },
          { name: 'secondaryColor', title: 'Secondary Color', type: 'string' },
        ]
      },
      // Website Details
      {
        name: 'websiteDetails',
        title: 'Website Details',
        type: 'object',
        fields: [
          { name: 'websiteType', title: 'Website Type', type: 'string' },
          { name: 'prepaidShippingCharge', title: 'Prepaid Shipping Charge', type: 'number' },
          { name: 'codCharge', title: 'COD Charge', type: 'number' },
          { name: 'hasDomain', title: 'Has Domain', type: 'boolean' },
          { name: 'domainName', title: 'Domain Name', type: 'string' },
          { name: 'preferredDomain', title: 'Preferred Domain', type: 'string' },
          { name: 'needSubdomain', title: 'Need Subdomain', type: 'boolean' },
          { name: 'preferredSubdomain', title: 'Preferred Subdomain', type: 'string' },
          { name: 'designPreference', title: 'Design Preference', type: 'string' },
          { name: 'needTracking', title: 'Need Tracking', type: 'boolean' },
          { name: 'specialNotes', title: 'Special Notes', type: 'text' },
          { name: 'additionalFeatures', title: 'Additional Features', type: 'array', of: [{type: 'string'}] },
        ]
      },
      // Payment & Legal
      {
        name: 'paymentLegal',
        title: 'Payment & Legal',
        type: 'object',
        fields: [
          { name: 'agreedToTerms', title: 'Agreed to Terms', type: 'boolean' },
          { name: 'paymentOption', title: 'Payment Option', type: 'string' },
          { name: 'emiAdvancePaid', title: 'EMI Advance Paid', type: 'boolean' },
          { name: 'fullPaymentAdvancePaid', title: 'Full Payment Advance Paid', type: 'boolean' },
          { name: 'totalAmount', title: 'Total Amount', type: 'number' },
          { name: 'advancePaid', title: 'Advance Paid', type: 'number' },
          { name: 'remainingAmount', title: 'Remaining Amount', type: 'number' }
        ]
      },
      { name: 'status', title: 'Status', type: 'string', initialValue: 'new' },
      { name: 'submittedAt', title: 'Submitted At', type: 'datetime' }
    ]
  }