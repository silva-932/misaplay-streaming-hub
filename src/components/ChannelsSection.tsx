import { Tv } from "lucide-react";
import type { SiteData } from "@/lib/siteData";

const flags: Record<string, string> = {
  Angola: "🇦🇴", Portugal: "🇵🇹", Brasil: "🇧🇷", França: "🇫🇷",
};

const ChannelsSection = ({ data }: { data: SiteData }) => (
  <section id="channels" className="py-20">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 gradient-text">Canais Disponíveis</h2>
      <p className="text-center text-muted-foreground mb-12">Conteúdo de todo o mundo</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {data.channels.map((g) => (
          <div key={g.country} className="card-cinema p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{flags[g.country] || "🌍"}</span>
              <h3 className="font-bold text-foreground">{g.country}</h3>
            </div>
            <ul className="space-y-2">
              {g.channels.map((ch) => (
                <li key={ch} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Tv size={14} className="text-primary" /> {ch}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ChannelsSection;
