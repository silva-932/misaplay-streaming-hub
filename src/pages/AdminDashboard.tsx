import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSiteData, saveSiteData, isAdminLoggedIn, adminLogout, type SiteData } from "@/lib/siteData";
import { toast } from "sonner";
import {
  LogOut, Save, LayoutDashboard, Image, Link2, CreditCard, Building2,
  BarChart3, Tv, Settings, ChevronRight, Plus, Trash2, Eye, Bell,
  TrendingUp, Users, Film, Radio
} from "lucide-react";

type Tab = "overview" | "hero" | "links" | "plans" | "bank" | "stats" | "channels";

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "overview", label: "Visão Geral", icon: LayoutDashboard },
  { id: "hero", label: "Hero Slider", icon: Image },
  { id: "links", label: "Links", icon: Link2 },
  { id: "plans", label: "Planos", icon: CreditCard },
  { id: "bank", label: "Dados Bancários", icon: Building2 },
  { id: "stats", label: "Estatísticas", icon: BarChart3 },
  { id: "channels", label: "Canais", icon: Tv },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<SiteData>(getSiteData());
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (!isAdminLoggedIn()) navigate("/admin");
  }, [navigate]);

  const save = () => {
    saveSiteData(data);
    setHasChanges(false);
    toast.success("Alterações salvas com sucesso!");
  };

  const logout = () => {
    adminLogout();
    navigate("/admin");
  };

  const updateData = (updater: (prev: SiteData) => SiteData) => {
    setData(prev => {
      const next = updater(prev);
      setHasChanges(true);
      return next;
    });
  };

  const updatePlan = (i: number, field: string, value: string) => {
    updateData(d => {
      const plans = [...d.plans];
      (plans[i] as any)[field] = value;
      return { ...d, plans };
    });
  };

  const updateBank = (i: number, field: string, value: string) => {
    updateData(d => {
      const banks = [...d.bankDetails.banks];
      (banks[i] as any)[field] = value;
      return { ...d, bankDetails: { ...d.bankDetails, banks } };
    });
  };

  const updateChannel = (ci: number, chi: number, value: string) => {
    updateData(d => {
      const channels = [...d.channels];
      channels[ci] = { ...channels[ci], channels: [...channels[ci].channels] };
      channels[ci].channels[chi] = value;
      return { ...d, channels };
    });
  };

  const updateStat = (i: number, field: string, value: string) => {
    updateData(d => {
      const stats = [...d.stats];
      (stats[i] as any)[field] = value;
      return { ...d, stats };
    });
  };

  const Field = ({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) => (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-lg bg-background text-foreground border border-border focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none text-sm transition-all duration-200"
      />
    </div>
  );

  const SectionCard = ({ title, icon: Icon, children, className = "" }: { title: string; icon: React.ElementType; children: React.ReactNode; className?: string }) => (
    <div className={`rounded-xl border border-border bg-card overflow-hidden ${className}`}>
      <div className="px-6 py-4 border-b border-border flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon size={16} className="text-primary" />
        </div>
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );

  const StatCard = ({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: string; color: string }) => (
    <div className="rounded-xl border border-border bg-card p-5 hover:border-primary/30 transition-all duration-300 group">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon size={20} className="text-foreground" />
        </div>
        <TrendingUp size={14} className="text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground mt-1">{label}</p>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Bem-vindo de volta 👋</h2>
        <p className="text-muted-foreground mt-1">Aqui está um resumo do seu site MISAPLAY-TV</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Tv} label="Canais ao Vivo" value={data.stats[0]?.value || "0"} color="bg-primary/15" />
        <StatCard icon={Film} label="Filmes Disponíveis" value={data.stats[1]?.value || "0"} color="bg-secondary/15" />
        <StatCard icon={Radio} label="Séries & Shows" value={data.stats[2]?.value || "0"} color="bg-destructive/15" />
        <StatCard icon={Users} label="Clientes Activos" value={data.stats[3]?.value || "0"} color="bg-accent/15" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionCard title="Acções Rápidas" icon={Settings}>
          <div className="grid grid-cols-2 gap-3">
            {tabs.filter(t => t.id !== "overview").map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 text-left group"
              >
                <t.icon size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                <div>
                  <p className="text-sm font-medium text-foreground">{t.label}</p>
                  <p className="text-xs text-muted-foreground">Editar</p>
                </div>
                <ChevronRight size={14} className="ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Planos Activos" icon={CreditCard}>
          <div className="space-y-3">
            {data.plans.map((p, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-background border border-border">
                <div>
                  <p className="text-sm font-medium text-foreground">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.features.length} funcionalidades</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-primary">{p.price}</p>
                  <p className="text-xs text-muted-foreground">{p.priceUsd}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );

  const renderHero = () => (
    <div className="space-y-6">
      <SectionCard title="Textos do Hero" icon={Image}>
        <div className="space-y-4">
          <Field label="Título Principal" value={data.heroTitle} onChange={(v) => updateData(d => ({ ...d, heroTitle: v }))} />
          <Field label="Subtítulo" value={data.heroSubtitle} onChange={(v) => updateData(d => ({ ...d, heroSubtitle: v }))} />
          <Field label="Tagline" value={data.heroTagline} onChange={(v) => updateData(d => ({ ...d, heroTagline: v }))} />
        </div>
      </SectionCard>
      <SectionCard title="Imagens do Slider" icon={Image}>
        <div className="space-y-4">
          {data.heroSlides.map((s, i) => (
            <div key={i} className="flex gap-4 items-end">
              <div className="w-20 h-12 rounded-lg overflow-hidden border border-border bg-muted flex-shrink-0">
                <img src={s.image} alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              </div>
              <div className="flex-1">
                <Field label={`Slide ${i + 1}`} value={s.image} onChange={(v) => updateData(d => {
                  const slides = [...d.heroSlides];
                  slides[i] = { image: v };
                  return { ...d, heroSlides: slides };
                })} />
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );

  const renderLinks = () => (
    <SectionCard title="Links de Download & Contacto" icon={Link2}>
      <div className="space-y-4">
        <Field label="WhatsApp Link" value={data.whatsappLink} onChange={(v) => updateData(d => ({ ...d, whatsappLink: v }))} />
        <div className="border-t border-border pt-4 mt-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">Links de Download</p>
          <div className="space-y-4">
            <Field label="Android / Smart TV / TV Box" value={data.downloadLinks.android} onChange={(v) => updateData(d => ({ ...d, downloadLinks: { ...d.downloadLinks, android: v } }))} />
            <Field label="iPhone / iOS" value={data.downloadLinks.ios} onChange={(v) => updateData(d => ({ ...d, downloadLinks: { ...d.downloadLinks, ios: v } }))} />
            <Field label="PC / PS4 / PS5" value={data.downloadLinks.pc} onChange={(v) => updateData(d => ({ ...d, downloadLinks: { ...d.downloadLinks, pc: v } }))} />
          </div>
        </div>
      </div>
    </SectionCard>
  );

  const renderPlans = () => (
    <SectionCard title="Gestão de Planos" icon={CreditCard}>
      <div className="space-y-6">
        {data.plans.map((p, i) => (
          <div key={i} className="p-5 rounded-xl border border-border bg-background space-y-4 relative">
            {p.popular && (
              <span className="absolute -top-2.5 right-4 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary text-primary-foreground">
                Popular
              </span>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Nome do Plano" value={p.name} onChange={(v) => updatePlan(i, "name", v)} />
              <Field label="Preço (Kz)" value={p.price} onChange={(v) => updatePlan(i, "price", v)} />
              <Field label="Preço (USD)" value={p.priceUsd} onChange={(v) => updatePlan(i, "priceUsd", v)} />
              <Field label="Link PayPal" value={p.paypalLink} onChange={(v) => updatePlan(i, "paypalLink", v)} />
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );

  const renderBank = () => (
    <SectionCard title="Dados Bancários" icon={Building2}>
      <div className="space-y-4">
        <Field label="Nome do Titular" value={data.bankDetails.name} onChange={(v) => updateData(d => ({ ...d, bankDetails: { ...d.bankDetails, name: v } }))} />
        <div className="border-t border-border pt-4 space-y-4">
          {data.bankDetails.banks.map((b, i) => (
            <div key={i} className="p-4 rounded-xl border border-border bg-background space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Banco" value={b.name} onChange={(v) => updateBank(i, "name", v)} />
                <Field label="IBAN" value={b.iban} onChange={(v) => updateBank(i, "iban", v)} />
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-border pt-4">
          <Field label="Multicaixa Express" value={data.bankDetails.multicaixa} onChange={(v) => updateData(d => ({ ...d, bankDetails: { ...d.bankDetails, multicaixa: v } }))} />
        </div>
      </div>
    </SectionCard>
  );

  const renderStats = () => (
    <SectionCard title="Estatísticas do Site" icon={BarChart3}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.stats.map((s, i) => (
          <div key={i} className="p-4 rounded-xl border border-border bg-background space-y-3">
            <Field label="Label" value={s.label} onChange={(v) => updateStat(i, "label", v)} />
            <Field label="Valor" value={s.value} onChange={(v) => updateStat(i, "value", v)} />
          </div>
        ))}
      </div>
    </SectionCard>
  );

  const renderChannels = () => (
    <SectionCard title="Lista de Canais por País" icon={Tv}>
      <div className="space-y-6">
        {data.channels.map((g, ci) => (
          <div key={ci} className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <h4 className="font-semibold text-foreground text-sm">{g.country}</h4>
              <span className="text-xs text-muted-foreground">({g.channels.length} canais)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {g.channels.map((ch, chi) => (
                <input
                  key={chi}
                  value={ch}
                  onChange={(e) => updateChannel(ci, chi, e.target.value)}
                  className="px-3 py-2 rounded-lg bg-background text-foreground border border-border focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none text-sm transition-all duration-200"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "overview": return renderOverview();
      case "hero": return renderHero();
      case "links": return renderLinks();
      case "plans": return renderPlans();
      case "bank": return renderBank();
      case "stats": return renderStats();
      case "channels": return renderChannels();
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full z-40 bg-card border-r border-border flex flex-col transition-all duration-300 ${sidebarCollapsed ? "w-[68px]" : "w-[260px]"}`}>
        {/* Logo */}
        <div className="p-4 border-b border-border flex items-center gap-3">
          <img src="/images/logo.png" alt="MISAPLAY" className="h-8 w-8 object-contain flex-shrink-0" />
          {!sidebarCollapsed && (
            <div className="overflow-hidden">
              <p className="font-bold text-foreground text-sm truncate">MISAPLAY-TV</p>
              <p className="text-[10px] text-muted-foreground">Admin Panel</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {tabs.map(t => {
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                  active
                    ? "bg-primary/10 text-primary font-medium border border-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
                title={sidebarCollapsed ? t.label : undefined}
              >
                <t.icon size={18} className="flex-shrink-0" />
                {!sidebarCollapsed && <span className="truncate">{t.label}</span>}
                {active && !sidebarCollapsed && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
              </button>
            );
          })}
        </nav>

        {/* Sidebar footer */}
        <div className="p-3 border-t border-border space-y-1">
          <a
            href="/"
            target="_blank"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
            title={sidebarCollapsed ? "Ver Site" : undefined}
          >
            <Eye size={18} className="flex-shrink-0" />
            {!sidebarCollapsed && <span>Ver Site</span>}
          </a>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-all"
            title={sidebarCollapsed ? "Sair" : undefined}
          >
            <LogOut size={18} className="flex-shrink-0" />
            {!sidebarCollapsed && <span>Sair</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? "ml-[68px]" : "ml-[260px]"}`}>
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted/50 transition-colors"
              >
                <ChevronRight size={14} className={`text-muted-foreground transition-transform duration-300 ${sidebarCollapsed ? "" : "rotate-180"}`} />
              </button>
              <div>
                <h1 className="text-lg font-bold text-foreground">
                  {tabs.find(t => t.id === activeTab)?.label}
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {hasChanges && (
                <span className="text-xs text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20 animate-pulse">
                  Alterações não salvas
                </span>
              )}
              <button
                onClick={save}
                className={`gradient-btn px-5 py-2 rounded-lg flex items-center gap-2 text-sm ${hasChanges ? "shadow-lg" : "opacity-70"}`}
              >
                <Save size={14} />
                Salvar
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6 max-w-5xl">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
