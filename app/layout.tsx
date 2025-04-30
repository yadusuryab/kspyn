import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import BottomHeader from "@/components/layout/bottom-header";
import og from '@/public/1.jpg'

const helvetica = localFont({
  src: [
    {
      path: "../public/HelveticaNeueRoman.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/HelveticaNeueMedium.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/HelveticaNeueBold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-helvetica",
});

export const metadata: Metadata = {
  title: "kspyn – Website Design & Development Agency in Kerala | Web Solutions India",
  description:
    "kspyn is a full-service web design and development agency in Kerala, India. We specialize in creating stunning websites, custom web apps, and high-converting landing pages. Contact us for modern digital solutions.",

  keywords: [
    "web design Kerala",
    "website development Kerala",
    "web design agency India",
    "website agency Kerala",
    "kspyn",
    "poster design Kerala",
    "website developers Kerala",
    "Next.js agency India",
    "freelance web developer Kerala",
    "SEO web design Kerala",
    "custom websites Kerala",
    "responsive web development India"
  ],

  metadataBase: new URL("https://kspyn.vercel.app"),
  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "kspyn – Website Design & Development Agency in Kerala",
    description:
      "kspyn builds high-performance websites and custom web solutions for clients across Kerala and India. Elevate your brand with our modern web design and development services.",
    url: "https://kspyn.vercel.app",
    siteName: "kspyn",
    locale: "en_IN",
    images: [
      {
        url: og.src,
        width: 1200,
        height: 630,
        alt: "kspyn – Website Design & Development Agency in Kerala",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "kspyn – Website Design & Development Agency in Kerala",
    description:
      "Looking for a web design agency in Kerala? kspyn offers stunning, SEO-friendly websites, landing pages, and more.",
    creator: "@kspynweb", // Optional: Add your Twitter handle
    images: [og.src],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
  },

  category: "Web Design Agency",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      <meta name="google-site-verification" content="jVW2L3Lpp6z747dZtOCYX4iAX7UE0gCp8xWmrVNZihc" />
      </head>
      <body
        className={`${helvetica.className}  antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
         
          {children}
          <BottomHeader/>
        </ThemeProvider>
      </body>
    </html>
  );
}
