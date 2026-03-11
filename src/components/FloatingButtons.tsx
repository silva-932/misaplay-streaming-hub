import { MessageCircle, Download } from "lucide-react";

const FloatingButtons = ({ onTest, onDownload }: { onTest: () => void; onDownload: () => void }) => (
  <>
    <button
      onClick={onTest}
      className="floating-btn bottom-24 right-4 bg-primary text-background flex items-center gap-2"
      style={{ animationDelay: "0s" }}
    >
      <MessageCircle size={18} /> Solicitar Teste
    </button>
    <button
      onClick={onDownload}
      className="floating-btn bottom-6 right-4 bg-secondary text-background flex items-center gap-2"
      style={{ animationDelay: "1.5s" }}
    >
      <Download size={18} /> Aplicativo
    </button>
  </>
);

export default FloatingButtons;
