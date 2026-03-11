import { useState, useCallback } from "react";
import { getSiteData } from "@/lib/siteData";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import StatsSection from "@/components/StatsSection";
import PlansSection from "@/components/PlansSection";
import BankSection from "@/components/BankSection";
import ChannelsSection from "@/components/ChannelsSection";
import CompatibilitySection from "@/components/CompatibilitySection";
import FeaturesSection from "@/components/FeaturesSection";
import FloatingButtons from "@/components/FloatingButtons";
import TestModal from "@/components/TestModal";
import DownloadModal from "@/components/DownloadModal";
import Footer from "@/components/Footer";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [testModal, setTestModal] = useState(false);
  const [testStep, setTestStep] = useState<"ask" | "download" | "whatsapp">("ask");
  const [downloadModal, setDownloadModal] = useState(false);
  const data = getSiteData();

  const openTest = useCallback(() => {
    setTestStep("ask");
    setTestModal(true);
  }, []);

  return (
    <>
      {loading && <Preloader onDone={() => setLoading(false)} />}
      <Navbar />
      <HeroSlider data={data} onRequestTest={openTest} onDownload={() => setDownloadModal(true)} />
      <StatsSection data={data} />
      <PlansSection data={data} />
      <BankSection data={data} />
      <ChannelsSection data={data} />
      <CompatibilitySection />
      <FeaturesSection />
      <Footer />
      <FloatingButtons onTest={openTest} onDownload={() => setDownloadModal(true)} />
      {testModal && <TestModal data={data} step={testStep} setStep={setTestStep} onClose={() => setTestModal(false)} />}
      {downloadModal && <DownloadModal data={data} onClose={() => setDownloadModal(false)} />}
    </>
  );
};

export default Index;
