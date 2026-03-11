import { Check, MessageCircle, CreditCard } from "lucide-react";
import type { SiteData } from "@/lib/siteData";

const PlansSection = ({ data }: { data: SiteData }) => (
  <section id="plans" className="py-20">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 gradient-text">Nossos Planos</h2>
      <p className="text-center text-muted-foreground mb-12">Escolha o plano ideal para você</p>
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {data.plans.map((plan) => (
          <div key={plan.name} className={`card-cinema p-8 flex flex-col items-center text-center ${plan.popular ? "pricing-popular relative" : ""}`}>
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-background text-xs font-bold px-4 py-1 rounded-full">POPULAR</span>
            )}
            <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
            <div className="text-4xl font-black gradient-text mb-1">{plan.price}</div>
            <div className="text-sm text-muted-foreground mb-6">ou {plan.priceUsd} via PayPal</div>
            <ul className="space-y-3 mb-8 w-full">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check size={16} className="text-secondary flex-shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3 w-full mt-auto">
              <a href={data.whatsappLink} target="_blank" rel="noopener noreferrer" className="gradient-btn flex items-center justify-center gap-2 py-3 rounded-lg">
                <MessageCircle size={18} /> Confirmar no WhatsApp
              </a>
              <a href={plan.paypalLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3 rounded-lg border border-primary text-primary hover:bg-primary hover:text-background transition-all">
                <CreditCard size={18} /> Pagar com PayPal
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PlansSection;
