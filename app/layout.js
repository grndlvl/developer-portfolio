import { personalData } from '@/utils/data/personal-data';
import { siteGraph, siteUrl } from '@/utils/structured-data';
import { GoogleTagManager } from "@next/third-parties/google";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
import JsonLd from "./components/json-ld";
import ScrollToTop from "./components/helper/scroll-to-top";
import Navbar from "./components/navbar";
import "./css/card.scss";
import "./css/globals.scss";
const inter = Inter({ subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://www.grndlvl.com"
  ),
  title: {
    default: "Jonathan DeLaigle | Applied AI Architect & CTO",
    template: "%s | grndlvl",
  },
  description: "Jonathan DeLaigle designs agentic AI systems, integrates AI into business workflows, and builds production software. Applied AI architect, CTO, and software engineer.",
  applicationName: "grndlvl",
  authors: [{ name: personalData.name, url: siteUrl }],
  creator: personalData.name,
  publisher: personalData.name,
  keywords: [
    "Jonathan DeLaigle",
    "grndlvl",
    "applied AI architect",
    "AI consultant",
    "CTO",
    "agentic AI systems",
    "AI workflow automation",
    "software engineer",
    "Next.js",
    "Drupal",
    "small business websites",
    "grndlvl Launch",
    "Augusta",
    "CSRA",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Jonathan DeLaigle | Applied AI Architect & CTO",
    description:
      "Applied AI architect, CTO, and software engineer. Agentic systems, AI workflow integration, and production software—plus grndlvl Launch for small businesses.",
    url: siteUrl,
    siteName: "grndlvl",
    locale: "en_US",
    images: [
      {
        url: personalData.profile,
        width: 945,
        height: 846,
        alt: personalData.name,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jonathan DeLaigle | Applied AI Architect & CTO",
    description:
      "Applied AI architect, CTO, and software engineer. Agentic systems, AI workflow integration, and production software.",
    creator: "@grndlvl",
    images: [personalData.profile],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${jetbrainsMono.variable}`}>
        <JsonLd data={siteGraph} />
        <ToastContainer />
        <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
          <Navbar />
          {children}
          <ScrollToTop />
        </main>
        <Footer />
      </body>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
    </html>
  );
}
