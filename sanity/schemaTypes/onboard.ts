// schemas/onboardingConfig.js
export default {
    name: 'onboardingConfig',
    title: 'Onboarding Configuration',
    type: 'document',
    fields: [
      {
        name: 'businessCategories',
        title: 'Business Categories',
        type: 'array',
        of: [{ type: 'string' }],
        initialValue: [
          'Fashion Accessories', 'Footwears', 'Watches', 'Clothing', 'Electronics',
          'Home Decor', 'Beauty & Cosmetics', 'Jewelry', 'Sports Equipment', 'Books', 'Other'
        ]
      },
      {
        name: 'websiteTypes',
        title: 'Website Types & Pricing',
        type: 'array',
        of: [{
          type: 'object',
          fields: [
            { name: 'name', title: 'Website Type Name', type: 'string' },
            { name: 'price', title: 'Price (₹)', type: 'number' },
            { name: 'description', title: 'Description', type: 'text' }
          ]
        }],
        initialValue: [
          { name: 'Online Payment', price: 7000, description: 'Full online payment integration' },
          { name: 'WhatsApp Orders', price: 5000, description: 'Order through WhatsApp' },
          { name: 'Online Payment + Tracking', price: 12000, description: 'Payment + order tracking' }
        ]
      },
      {
        name: 'designOptions',
        title: 'Design Options',
        type: 'array',
        of: [{
          type: 'object',
          fields: [
            { name: 'name', title: 'Design Name', type: 'string' },
            { name: 'image', title: 'Design Image', type: 'image' },
            { name: 'description', title: 'Description', type: 'text' }
          ]
        }]
      },
      {
        name: 'paymentTerms',
        title: 'Payment Terms',
        type: 'object',
        fields: [
          { name: 'emiAdvance', title: 'EMI Advance Amount', type: 'number', initialValue: 2000 },
          { name: 'fullPaymentAdvance', title: 'Full Payment Advance', type: 'number', initialValue: 3000 },
          { name: 'additionalFeatureCost', title: 'Additional Feature Cost', type: 'number', initialValue: 100 },
          { name: 'emiMonths', title: 'EMI Months', type: 'number', initialValue: 3 }
        ]
      },
      {
        name: 'termsAndConditions',
        title: 'Terms & Conditions',
        type: 'text',
        rows: 10,
        initialValue: `1. All payments are non-refundable once development begins...
        2. Client must provide all content within agreed timeframe...
        3. Additional features cost ₹100+ each...`
      },
      {
        name: 'telegramConfig',
        title: 'Telegram Configuration',
        type: 'object',
        fields: [
          { name: 'botToken', title: 'Bot Token', type: 'string' },
          { name: 'chatId', title: 'Chat ID', type: 'string' },
          { name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true }
        ]
      },
      {
        name: 'formInstructions',
        title: 'Form Instructions & Labels',
        type: 'object',
        fields: [
          { name: 'personalDetailsTitle', title: 'Personal Details Title', type: 'string', initialValue: 'Personal Details' },
          { name: 'businessDetailsTitle', title: 'Business Details Title', type: 'string', initialValue: 'Business Details' },
          { name: 'websiteDetailsTitle', title: 'Website Details Title', type: 'string', initialValue: 'Website Details' },
          { name: 'paymentTitle', title: 'Payment & Legal Title', type: 'string', initialValue: 'Payment & Legal' }
        ]
      }
    ]
  }
  
  // schemas/clientOnboarding.js
 