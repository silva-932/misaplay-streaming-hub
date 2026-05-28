import { useState, useCallback, useEffect } from "react";
import { fetchSiteData, defaultData, type SiteData } from "@/lib/siteData";
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
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [testModal, setTestModal] = useState(false);
  const [testStep, setTestStep] = useState<"ask" | "download" | "whatsapp">("ask");
  const [downloadModal, setDownloadModal] = useState(false);
  const [data, setData] = useState<SiteData>(defaultData);

  useEffect(() => {
    let isMounted = true;
    fetchSiteData().then((d) => {
      if (isMounted) setData(d);
    });

    // Live updates: refetch when site_settings changes
    const channel = supabase
      .channel("site_settings_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "site_settings" },
        () => {
          fetchSiteData().then((d) => isMounted && setData(d));
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

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
