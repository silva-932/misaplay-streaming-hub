import { X } from "lucide-react";
import type { SiteData } from "@/lib/siteData";

const DownloadModal = ({ data, onClose }: { data: SiteData; onClose: () => void }) => (
  <div className="fixed inset-0 z-[90] flex items-center justify-center bg-background/80 backdrop-blur-sm" onClick={onClose}>
    <div className="card-cinema p-8 max-w-md w-full mx-4 relative animate-slide-up" onClick={(e) => e.stopPropagation()}>
      <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"><X size={20} /></button>
      <h3 className="text-xl font-bold text-foreground mb-6 text-center">Baixar Aplicativo</h3>
      <div className="flex flex-col gap-3">
        <a href={data.downloadLinks.android} target="_blank" rel="noopener noreferrer" className="gradient-btn py-3 rounded-lg block text-center">Android / Smart TV / TV Box</a>
        <a href={data.downloadLinks.ios} target="_blank" rel="noopener noreferrer" className="py-3 rounded-lg block text-center border border-primary text-primary hover:bg-primary hover:text-background transition-all">iPhone / iOS</a>
        <a href={data.downloadLinks.pc} target="_blank" rel="noopener noreferrer" className="py-3 rounded-lg block text-center border border-secondary text-secondary hover:bg-secondary hover:text-background transition-all">PC / PS4 / PS5</a>
      </div>
    </div>
  </div>
);

export default DownloadModal;
