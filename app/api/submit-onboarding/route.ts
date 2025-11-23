// app/api/submit-onboarding/route.js
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2023-05-03',
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

export async function POST(request:any) {
  try {
    const data = await request.json();
    
    console.log('Received onboarding data:', {
      name: data.personalDetails?.fullName,
      store: data.businessDetails?.storeName
    });

    // Save to Sanity
    const result = await client.create({
      _type: 'clientOnboarding',
      ...data
    });

    console.log('Saved to Sanity with ID:', result._id);

    // Send Telegram notification (with better error handling)
    try {
      const botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
      const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;
      
      if (botToken && chatId) {
        const message = `🚀 New Client Onboarding!\nName: ${data.personalDetails.fullName}\nStore: ${data.businessDetails.storeName}\nWebsite: ${data.websiteDetails.websiteType}\nEmail: ${data.personalDetails.email}\nPhone: ${data.personalDetails.phone}`;
        
        console.log('Sending Telegram message...');
        
        const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: message
          }),
          // Add timeout and better connection settings
          signal: AbortSignal.timeout(10000) // 10 second timeout
        });

        if (!telegramResponse.ok) {
          console.error('Telegram API error:', await telegramResponse.text());
        } else {
          console.log('Telegram message sent successfully');
        }
      } else {
        console.warn('Telegram credentials missing. Bot Token:', !!botToken, 'Chat ID:', !!chatId);
      }
    } catch (telegramError) {
      console.error('Telegram notification failed:', telegramError);
      // Don't fail the whole request if Telegram fails
    }

    return Response.json({ 
      success: true, 
      id: result._id,
      message: 'Onboarding submitted successfully!' 
    });

  } catch (error:any) {
    console.error('Submission error:', error);
    return Response.json({ 
      error: 'Failed to submit onboarding form',
      details: error.message 
    }, { status: 500 });
  }
}