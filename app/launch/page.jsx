import { personalData } from "@/utils/data/personal-data";
import { launchServiceSchema } from "@/utils/structured-data";
import JsonLd from "../components/json-ld";
import LaunchHero from "../components/launch/launch-hero";
import EnterpriseProof from "../components/launch/enterprise-proof";
import LaunchContrast from "../components/launch/launch-contrast";
import LaunchDeliverables from "../components/launch/launch-deliverables";
import PilotBuilds from "../components/launch/pilot-builds";
import RecentLaunchWork from "../components/launch/recent-launch-work";
import LaunchProcess from "../components/launch/launch-process";
import LaunchCta from "../components/launch/launch-cta";

export const metadata = {
  title: {
    absolute: "grndlvl Launch | Small-Business Websites Built Like Real Software",
  },
  description:
    "grndlvl Launch builds fast, credible, mobile-first launch pages for small businesses, clubs, and local organizations—without platform bloat or builder lock-in, and with room to grow into booking, payments, and automation.",
  keywords: [
    "grndlvl Launch",
    "small business website",
    "small business web design",
    "launch page",
    "mobile-first website",
    "local SEO",
    "accessible website",
    "Augusta GA web design",
    "CSRA web design",
  ],
  alternates: {
    canonical: "/launch",
  },
  openGraph: {
    title: "grndlvl Launch | Small-Business Websites Built Like Real Software",
    description:
      "Fast, credible, mobile-first launch pages for small businesses—built by an engineer, with room to grow.",
    url: "/launch",
    siteName: "grndlvl",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "grndlvl Launch | Small-Business Websites Built Like Real Software",
    description:
      "Fast, credible, mobile-first launch pages for small businesses—built by an engineer, with room to grow.",
    creator: "@grndlvl",
  },
};

const mailtoHref = `mailto:${personalData.email}?subject=${encodeURIComponent(
  "grndlvl Launch project"
)}&body=${encodeURIComponent(
  "Tell me about your business:\n\n- What you're building:\n- What you need people to do:\n- What's currently getting in the way:\n"
)}`;

export default function LaunchPage() {
  return (
    <div>
      <JsonLd data={launchServiceSchema} />
      <LaunchHero startHref="#start" />
      <EnterpriseProof />
      <LaunchContrast />
      <LaunchDeliverables />
      <PilotBuilds />
      <RecentLaunchWork />
      <LaunchProcess />
      <LaunchCta id="start" mailtoHref={mailtoHref} />
    </div>
  );
}
