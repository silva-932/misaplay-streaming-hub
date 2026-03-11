import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSiteData, saveSiteData, isAdminLoggedIn, adminLogout, type SiteData } from "@/lib/siteData";
import { toast } from "sonner";
import { LogOut, Save } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<SiteData>(getSiteData());

  useEffect(() => {
    if (!isAdminLoggedIn()) navigate("/admin");
  }, [navigate]);

  const save = () => {
    saveSiteData(data);
    toast.success("Alterações salvas com sucesso!");
  };

  const logout = () => {
    adminLogout();
    navigate("/admin");
  };

  const updatePlan = (i: number, field: string, value: string) => {
    const plans = [...data.plans];
    (plans[i] as any)[field] = value;
    setData({ ...data, plans });
  };

  const updateBank = (i: number, field: string, value: string) => {
    const banks = [...data.bankDetails.banks];
    (banks[i] as any)[field] = value;
    setData({ ...data, bankDetails: { ...data.bankDetails, banks } });
  };

  const updateChannel = (ci: number, chi: number, value: string) => {
    const channels = [...data.channels];
    channels[ci] = { ...channels[ci], channels: [...channels[ci].channels] };
    channels[ci].channels[chi] = value;
    setData({ ...data, channels });
  };

  const updateStat = (i: number, field: string, value: string) => {
    const stats = [...data.stats];
    (stats[i] as any)[field] = value;
    setData({ ...data, stats });
  };

  const Field = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => (
    <div>
      <label className="text-xs text-muted-foreground block mb-1">{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-3 py-2 rounded bg-muted text-foreground border border-border focus:border-primary outline-none text-sm" />
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/images/logo.png" alt="" className="h-8" />
            <span className="font-bold text-foreground">Admin</span>
          </div>
          <div className="flex gap-3">
            <button onClick={save} className="gradient-btn px-4 py-2 rounded-lg flex items-center gap-2 text-sm"><Save size={16} /> Salvar</button>
            <button onClick={logout} className="px-4 py-2 rounded-lg border border-border text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 text-sm"><LogOut size={16} /> Sair</button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8 max-w-4xl">
        {/* Hero */}
        <section className="card-cinema p-6">
          <h3 className="font-bold text-foreground mb-4">Hero Slider</h3>
          <div className="space-y-3">
            <Field label="Título" value={data.heroTitle} onChange={(v) => setData({ ...data, heroTitle: v })} />
            <Field label="Subtítulo" value={data.heroSubtitle} onChange={(v) => setData({ ...data, heroSubtitle: v })} />
            <Field label="Tagline" value={data.heroTagline} onChange={(v) => setData({ ...data, heroTagline: v })} />
            {data.heroSlides.map((s, i) => (
              <Field key={i} label={`Imagem ${i + 1} URL`} value={s.image} onChange={(v) => {
                const slides = [...data.heroSlides];
                slides[i] = { image: v };
                setData({ ...data, heroSlides: slides });
              }} />
            ))}
          </div>
        </section>

        {/* Links */}
        <section className="card-cinema p-6">
          <h3 className="font-bold text-foreground mb-4">Links</h3>
          <div className="space-y-3">
            <Field label="WhatsApp" value={data.whatsappLink} onChange={(v) => setData({ ...data, whatsappLink: v })} />
            <Field label="Android" value={data.downloadLinks.android} onChange={(v) => setData({ ...data, downloadLinks: { ...data.downloadLinks, android: v } })} />
            <Field label="iOS" value={data.downloadLinks.ios} onChange={(v) => setData({ ...data, downloadLinks: { ...data.downloadLinks, ios: v } })} />
            <Field label="PC" value={data.downloadLinks.pc} onChange={(v) => setData({ ...data, downloadLinks: { ...data.downloadLinks, pc: v } })} />
          </div>
        </section>

        {/* Plans */}
        <section className="card-cinema p-6">
          <h3 className="font-bold text-foreground mb-4">Planos</h3>
          <div className="space-y-6">
            {data.plans.map((p, i) => (
              <div key={i} className="p-4 rounded-lg border border-border space-y-3">
                <Field label="Nome" value={p.name} onChange={(v) => updatePlan(i, "name", v)} />
                <Field label="Preço (Kz)" value={p.price} onChange={(v) => updatePlan(i, "price", v)} />
                <Field label="Preço (USD)" value={p.priceUsd} onChange={(v) => updatePlan(i, "priceUsd", v)} />
                <Field label="PayPal Link" value={p.paypalLink} onChange={(v) => updatePlan(i, "paypalLink", v)} />
              </div>
            ))}
          </div>
        </section>

        {/* Bank */}
        <section className="card-cinema p-6">
          <h3 className="font-bold text-foreground mb-4">Dados Bancários</h3>
          <div className="space-y-3">
            <Field label="Titular" value={data.bankDetails.name} onChange={(v) => setData({ ...data, bankDetails: { ...data.bankDetails, name: v } })} />
            {data.bankDetails.banks.map((b, i) => (
              <div key={i} className="p-4 rounded-lg border border-border space-y-3">
                <Field label="Banco" value={b.name} onChange={(v) => updateBank(i, "name", v)} />
                <Field label="IBAN" value={b.iban} onChange={(v) => updateBank(i, "iban", v)} />
              </div>
            ))}
            <Field label="Multicaixa Express" value={data.bankDetails.multicaixa} onChange={(v) => setData({ ...data, bankDetails: { ...data.bankDetails, multicaixa: v } })} />
          </div>
        </section>

        {/* Stats */}
        <section className="card-cinema p-6">
          <h3 className="font-bold text-foreground mb-4">Estatísticas</h3>
          <div className="grid grid-cols-2 gap-4">
            {data.stats.map((s, i) => (
              <div key={i} className="space-y-2">
                <Field label="Label" value={s.label} onChange={(v) => updateStat(i, "label", v)} />
                <Field label="Valor" value={s.value} onChange={(v) => updateStat(i, "value", v)} />
              </div>
            ))}
          </div>
        </section>

        {/* Channels */}
        <section className="card-cinema p-6">
          <h3 className="font-bold text-foreground mb-4">Canais</h3>
          <div className="space-y-6">
            {data.channels.map((g, ci) => (
              <div key={ci}>
                <h4 className="font-semibold text-foreground mb-2">{g.country}</h4>
                <div className="grid grid-cols-2 gap-2">
                  {g.channels.map((ch, chi) => (
                    <input key={chi} value={ch} onChange={(e) => updateChannel(ci, chi, e.target.value)} className="px-3 py-2 rounded bg-muted text-foreground border border-border focus:border-primary outline-none text-sm" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
