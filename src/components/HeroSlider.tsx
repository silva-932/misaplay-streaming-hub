import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { SiteData } from "@/lib/siteData";

interface Props {
  data: SiteData;
  onRequestTest: () => void;
  onDownload: () => void;
}

const HeroSlider = ({ data, onRequestTest, onDownload }: Props) => {
  const [current, setCurrent] = useState(0);
  const slides = data.heroSlides;

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), [slides.length]);

  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next]);

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {slides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img src={s.image} alt="" className="w-full h-full object-cover" />
        </div>
      ))}
      <div className="hero-overlay absolute inset-0" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-4" style={{ animation: "slide-up 0.8s ease-out" }}>
          <h1 className="text-5xl md:text-7xl font-black gradient-text mb-4">{data.heroTitle}</h1>
          <p className="text-xl md:text-3xl font-light text-foreground mb-2">{data.heroSubtitle}</p>
          <p className="text-sm md:text-lg text-muted-foreground mb-8">{data.heroTagline}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={onRequestTest} className="gradient-btn px-8 py-3 rounded-full text-lg">
              Solicitar Teste
            </button>
            <button onClick={onDownload} className="px-8 py-3 rounded-full text-lg font-semibold border border-primary text-primary hover:bg-primary hover:text-background transition-all duration-300">
              Baixar Aplicativo
            </button>
          </div>
        </div>
      </div>
      <button onClick={() => setCurrent((c) => (c - 1 + slides.length) % slides.length)} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/30 text-foreground hover:bg-primary/50 transition-colors">
        <ChevronLeft size={28} />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/30 text-foreground hover:bg-primary/50 transition-colors">
        <ChevronRight size={28} />
      </button>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-3 h-3 rounded-full transition-all ${i === current ? "bg-primary w-8" : "bg-foreground/30"}`} />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
