import type { SiteData } from "@/lib/siteData";

const StatsSection = ({ data }: { data: SiteData }) => (
  <section className="py-16 border-y border-border bg-muted/30">
    <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
      {data.stats.map((s) => (
        <div key={s.label} className="text-center">
          <div className="text-3xl md:text-5xl font-black gradient-text">{s.value}</div>
          <div className="text-sm md:text-base text-muted-foreground mt-2">{s.label}</div>
        </div>
      ))}
    </div>
  </section>
);

export default StatsSection;
