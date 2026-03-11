import { Building2, Smartphone, Copy } from "lucide-react";
import type { SiteData } from "@/lib/siteData";
import { toast } from "sonner";

const BankSection = ({ data }: { data: SiteData }) => {
  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copiado!");
  };

  return (
    <section id="payment" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 gradient-text">Dados de Pagamento</h2>
        <p className="text-center text-muted-foreground mb-12">Titular: <span className="text-foreground font-semibold">{data.bankDetails.name}</span></p>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {data.bankDetails.banks.map((b) => (
            <div key={b.name} className="card-cinema p-6">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="text-primary" size={24} />
                <h3 className="font-bold text-foreground">{b.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-2">IBAN:</p>
              <div className="flex items-center gap-2">
                <code className="text-xs text-foreground bg-muted px-3 py-2 rounded flex-1">{b.iban}</code>
                <button onClick={() => copy(b.iban)} className="text-primary hover:text-secondary transition-colors"><Copy size={16} /></button>
              </div>
            </div>
          ))}
          <div className="card-cinema p-6">
            <div className="flex items-center gap-3 mb-4">
              <Smartphone className="text-secondary" size={24} />
              <h3 className="font-bold text-foreground">Multicaixa Express</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-2">Número:</p>
            <div className="flex items-center gap-2">
              <code className="text-lg font-bold text-foreground bg-muted px-3 py-2 rounded flex-1">{data.bankDetails.multicaixa}</code>
              <button onClick={() => copy(data.bankDetails.multicaixa)} className="text-primary hover:text-secondary transition-colors"><Copy size={16} /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BankSection;
