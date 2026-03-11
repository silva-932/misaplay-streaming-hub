import { Smartphone, Monitor, Tv, Tablet, Flame, Laptop } from "lucide-react";

const devices = [
  { name: "Android", icon: Smartphone },
  { name: "iOS", icon: Tablet },
  { name: "Smart TV", icon: Tv },
  { name: "TV Box", icon: Monitor },
  { name: "Fire Stick", icon: Flame },
  { name: "Computer", icon: Laptop },
];

const CompatibilitySection = () => (
  <section id="compatibility" className="py-20 bg-muted/20">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 gradient-text">Compatibilidade</h2>
      <p className="text-center text-muted-foreground mb-12">Assista em qualquer dispositivo</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-4xl mx-auto">
        {devices.map((d) => (
          <div key={d.name} className="card-cinema p-6 flex flex-col items-center gap-3 text-center">
            <d.icon size={36} className="text-primary" />
            <span className="text-sm font-medium text-foreground">{d.name}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default CompatibilitySection;
