import AboutSection from "./components/homepage/about";
import AIExpertise from "./components/homepage/ai-expertise";
import ContactSection from "./components/homepage/contact";
import CommunityWork from "./components/homepage/community-work";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section";
import LaunchTeaser from "./components/homepage/launch-teaser";
import SelectedImpact from "./components/homepage/selected-impact";
import Skills from "./components/homepage/skills";

export default function Home() {
  return (
    <div suppressHydrationWarning >
      <HeroSection />
      <AIExpertise />
      <SelectedImpact />
      <CommunityWork />
      <LaunchTeaser />
      <AboutSection />
      <Experience />
      <Skills />
      <Education />
      <ContactSection />
    </div>
  )
};
