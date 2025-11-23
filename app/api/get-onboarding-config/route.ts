// app/api/get-onboarding-config/route.js
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: '2023-05-03',
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

export async function GET() {
  try {
    const config = await client.fetch(`*[_type == "onboardingConfig"][0]{
      businessCategories,
      websiteTypes,
      designOptions,
      paymentTerms,
      termsAndConditions,
      formInstructions
    }`);
    
    return Response.json(config);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch config' }, { status: 500 });
  }
}

// app/api/submit-onboarding/route.js
