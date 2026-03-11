import { X, MessageCircle } from "lucide-react";
import type { SiteData } from "@/lib/siteData";

type Step = "ask" | "download" | "whatsapp";

interface Props {
  data: SiteData;
  step: Step;
  setStep: (s: Step) => void;
  onClose: () => void;
}

const TestModal = ({ data, step, setStep, onClose }: Props) => (
  <div className="fixed inset-0 z-[90] flex items-center justify-center bg-background/80 backdrop-blur-sm" onClick={onClose}>
    <div className="card-cinema p-8 max-w-md w-full mx-4 relative animate-slide-up" onClick={(e) => e.stopPropagation()}>
      <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"><X size={20} /></button>

      {step === "ask" && (
        <div className="text-center">
          <h3 className="text-xl font-bold text-foreground mb-6">Já baixou o nosso aplicativo?</h3>
          <div className="flex gap-4 justify-center">
            <button onClick={() => setStep("whatsapp")} className="gradient-btn px-8 py-3 rounded-lg">Sim</button>
            <button onClick={() => setStep("download")} className="px-8 py-3 rounded-lg border border-primary text-primary hover:bg-primary hover:text-background transition-all">Não</button>
          </div>
        </div>
      )}

      {step === "download" && (
        <div className="text-center">
          <h3 className="text-xl font-bold text-foreground mb-6">Baixar Aplicativo</h3>
          <div className="flex flex-col gap-3">
            <a href={data.downloadLinks.android} target="_blank" rel="noopener noreferrer" className="gradient-btn py-3 rounded-lg block">Android / Smart TV / TV Box</a>
            <a href={data.downloadLinks.ios} target="_blank" rel="noopener noreferrer" className="py-3 rounded-lg block border border-primary text-primary hover:bg-primary hover:text-background transition-all">iPhone / iOS</a>
            <a href={data.downloadLinks.pc} target="_blank" rel="noopener noreferrer" className="py-3 rounded-lg block border border-secondary text-secondary hover:bg-secondary hover:text-background transition-all">PC / PS4 / PS5</a>
          </div>
          <button onClick={() => setStep("whatsapp")} className="mt-4 text-sm text-muted-foreground hover:text-primary transition-colors">Já baixei, solicitar teste →</button>
        </div>
      )}

      {step === "whatsapp" && (
        <div className="text-center">
          <h3 className="text-xl font-bold text-foreground mb-4">Solicitar Teste Gratuito</h3>
          <p className="text-sm text-muted-foreground mb-6">Clique abaixo para falar connosco no WhatsApp</p>
          <a href={data.whatsappLink} target="_blank" rel="noopener noreferrer" className="gradient-btn px-8 py-3 rounded-lg inline-flex items-center gap-2">
            <MessageCircle size={20} /> Abrir WhatsApp
          </a>
        </div>
      )}
    </div>
  </div>
);

export default TestModal;
