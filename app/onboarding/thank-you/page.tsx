// app/onboarding/thank-you/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircleIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function ThankYouPage() {
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user came from successful submission
    const submitted = sessionStorage.getItem('onboarding_submitted');
    const timestamp = sessionStorage.getItem('onboarding_timestamp');
    
    // Check if submission was within last 5 minutes
    if (submitted === 'true' && timestamp) {
      const submissionTime = parseInt(timestamp);
      const currentTime = Date.now();
      const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds
      
      if (currentTime - submissionTime < fiveMinutes) {
        setIsValid(true);
        // Clear the flags after validation
        sessionStorage.removeItem('onboarding_submitted');
        sessionStorage.removeItem('onboarding_timestamp');
      } else {
        // Redirect if submission is too old
        router.push('/');
      }
    } else {
      // Redirect if no valid submission found
      router.push('/');
    }
    
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isValid) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-6"
        >
          <CheckCircleIcon className="h-12 w-12 text-green-600" />
        </motion.div>
        
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Thank You!
        </h1>
        
        <p className="text-muted-foreground mb-6">
          Your onboarding request has been submitted successfully. Our team will 
          contact you within 24 hours to discuss the next steps and payment details.
        </p>
        
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-muted p-4 rounded-lg"
          >
            <h3 className="font-semibold mb-2">What happens next?</h3>
            <ul className="text-sm text-muted-foreground space-y-1 text-left">
              <li>• We'll review your requirements</li>
              <li>• Contact you for payment details</li>
              <li>• Start designing your store</li>
              <li>• Provide regular updates</li>
            </ul>
          </motion.div>
          
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            onClick={() => router.push('/')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Home
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}