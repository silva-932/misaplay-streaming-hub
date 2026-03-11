import { Server, Shield, Headphones, MonitorPlay } from "lucide-react";

const features = [
  { icon: Server, title: "Alta Estabilidade", desc: "Servidores otimizados para streaming sem interrupções" },
  { icon: Shield, title: "Streaming Seguro", desc: "Conexão encriptada para máxima segurança" },
  { icon: Headphones, title: "Suporte 24/7", desc: "Equipa de suporte disponível a qualquer hora" },
  { icon: MonitorPlay, title: "HD e Full HD", desc: "Qualidade de imagem premium em todos os canais" },
];

const FeaturesSection = () => (
  <section className="py-20">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 gradient-text">Por que escolher MISAPLAY?</h2>
      <p className="text-center text-muted-foreground mb-12">A melhor experiência de streaming</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {features.map((f) => (
          <div key={f.title} className="card-cinema p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <f.icon size={28} className="text-primary" />
            </div>
            <h3 className="font-bold text-foreground mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
