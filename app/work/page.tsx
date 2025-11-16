"use client";
import TitleHeader from "@/components/layout/title-header";
import React from "react";
import dg from '@/public/dg.png';
import bc from '@/public/bc.png';
import sz from '@/public/sz.png';
import ms from '@/public/ms.png';
import Head from "next/head";

const works = [
  {
    title: "The NorthSide",
    type: "Fashion Accessories Store",
    url: "https://thenorthside.in",
  },
  {
    title: "Traft",
    type: "Fashion Accessories Store",
    url: "https://traft.in",
  },
  {
    title: "Footex",
    type: "Fashion Accessories Store",
    url: "https://footex.in",
  },
  {
    title: "Groovex",
    type: "Fashion Accessories Store",
    url: "https://groovex.myshopigo.shop",
  },
  {
    title: "Footmart",
    type: "Online shoe store",
    url: "https://footmart.co.in",
    ogImage: "", // No OG image, fallback to gradient
  },
  {
    title: "Deltagarage",
    type: "Car Accessories",
    url: "https://deltagarage.in",
    ogImage: dg.src, // Replace with actual OG image or leave blank for fallback
  },
  {
    title: "Motostore",
    type: "Bike Accessories store",
    url: "https://motostore.co.in",
    ogImage: ms.src,
  },
  {
    title: "Brandcorner",
    type: "Fashion Accessories store",
    url: "https://brandcorner.co.in",
    ogImage: bc.src,
  },
 
  {
    title: "Stylezone",
    type: "Fashion Accessories Store",
    url: "https://thestylezone.in",
    ogImage: sz.src, // Replace with actual OG image or leave blank for fallback
  },
  {
    title: "Trendy Hub",
    type: "Fashion Accessories Store",
    url: "https://trendyhub.myshopigo.shop",
  },
  {
    title: "Lumo Shopy",
    type: "Fashion Accessories Store",
    url: "https://lumoshopy.myshopigo.shop",
  },
];

function WorkPage() {
  return (
    <div className="min-h-screen text-white">
      <Head>
        <title>Our Work – Web Projects by shopigo</title>
        <meta
          name="description"
          content="See our recent web design and development projects. shopigo builds responsive websites and ecommerce platforms for businesses across Kerala."
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
                  "name": "Work",
                  "item": "https://shopigo.in/work"
                }
              ]
            })
          }}
        />
      </Head>
      <TitleHeader subtitle="Works" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:pt-36 pt-20 pb-36 gap-6 p-6">
        {works.map((work, index) => (
          <a
            key={index}
            href={work.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block relative h-80 rounded-2xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02]"
          >
            {work.ogImage ? (
              <img
                src={work.ogImage}
                alt={work.title}
                className="w-full h-full object-cover rounded-2xl"
              />
            ) : (
              <div
                className="w-full h-full flex items-center rounded-2xl justify-center text-2xl font-bold text-white"
                style={{
                  background: `linear-gradient(135deg, #${Math.floor(
                    Math.random() * 16777215
                  ).toString(16)}, #${Math.floor(
                    Math.random() * 16777215
                  ).toString(16)})`,
                }}
              >
                {work.title}
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 p-4 m-2 rounded-2xl shadow-lg bg-background/75 border-white/10  backdrop-blur-md saturate-200 to-transparent">
              <p className="text-sm text-muted-foreground">{work.type}</p>
              <h3 className="text-lg font-semibold  tracking-tight">
                {work.title}
              </h3>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default WorkPage;
