import TitleHeader from '@/components/layout/title-header'
import { PricingPageComponent } from '@/components/sections/pricing'
import Head from 'next/head'
import React from 'react'

function page() {
  return (
    <div>
       <Head>
        <title>Website Pricing – Affordable Plans by shopigo</title>
        <meta
          name="description"
          content="Explore our affordable website pricing plans. shopigo offers web design, development, and ecommerce websites at the best rates in Kerala, India."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://shopigo.in"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Pricing",
                  "item": "https://shopigo.in/pricing"
                }
              ]
            })
          }}
        />
      </Head>
      <TitleHeader subtitle='Pricing'/>
      <div className="pt-20 md:pt-32">
      <PricingPageComponent/>
      </div>
    </div>
  )
}

export default page
