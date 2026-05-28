import { supabase } from "@/integrations/supabase/client";

export interface SiteData {
  heroSlides: { image: string }[];
  heroTitle: string;
  heroSubtitle: string;
  heroTagline: string;
  whatsappLink: string;
  downloadLinks: { android: string; ios: string; pc: string };
  plans: {
    name: string;
    price: string;
    priceUsd: string;
    paypalLink: string;
    features: string[];
    popular?: boolean;
  }[];
  bankDetails: {
    name: string;
    banks: { name: string; iban: string }[];
    multicaixa: string;
  };
  channels: { country: string; channels: string[] }[];
  stats: { label: string; value: string }[];
}

export const defaultData: SiteData = {
  heroSlides: [
    { image: "/images/hero-1.jpg" },
    { image: "/images/hero-2.png" },
    { image: "/images/hero-3.jpg" },
  ],
  heroTitle: "MISAPLAY-TV",
  heroSubtitle: "Assista tudo, em qualquer lugar",
  heroTagline: "Filmes • Séries • Desporto • Canais ao Vivo",
  whatsappLink:
    "https://wa.me/244912083163?text=Olá,%20quero%20solicitar%20um%20teste%20gratuito%20da%20MISAPLAY-TV",
  downloadLinks: {
    android: "https://go.aftvnews.com/6383520",
    ios: "https://apps.apple.com/us/app/blessed-player/id6743084241?l",
    pc: "http://misaplay-tv.studioapp.click/login",
  },
  plans: [
    { name: "Plano Mensal", price: "5000 Kz", priceUsd: "$5", paypalLink: "https://www.paypal.com/paypalme/misaplay/5", features: ["+6500 canais", "+16000 filmes", "+25000 séries"] },
    { name: "Plano Trimestral", price: "14000 Kz", priceUsd: "$14", paypalLink: "https://www.paypal.com/paypalme/misaplay/14", features: ["+6500 canais", "+16000 filmes", "+25000 séries"], popular: true },
    { name: "Plano Semestral", price: "28000 Kz", priceUsd: "$28", paypalLink: "https://www.paypal.com/paypalme/misaplay/28", features: ["+6500 canais", "+16000 filmes", "+25000 séries"] },
  ],
  bankDetails: {
    name: "Fábio Branco",
    banks: [
      { name: "Banco Atlântico", iban: "0055 0000 3636 0181 1019 0" },
      { name: "Banco BIC", iban: "0051 0000 1385 0180 1014 2" },
    ],
    multicaixa: "935 181 383",
  },
  channels: [
    { country: "Angola", channels: ["TPA", "TV Zimbo", "Zap Novelas", "TPA 2", "TV Palanca"] },
    { country: "Portugal", channels: ["RTP", "Sport TV", "Eleven Sports", "SIC", "TVI"] },
    { country: "Brasil", channels: ["Globo", "SBT", "Record", "Band", "RedeTV"] },
    { country: "França", channels: ["TF1", "Canal+", "France 2", "M6", "Arte"] },
  ],
  stats: [
    { label: "Canais", value: "+6500" },
    { label: "Filmes", value: "+16000" },
    { label: "Séries", value: "+25000" },
    { label: "Clientes", value: "+3000" },
  ],
};

const ADMIN_EMAIL = "misael@misaplay-tv.local";
const ADMIN_USERNAME = "MISAEL CASTELO";
const ADMIN_PASSWORD = "CASTELO2025";

export async function fetchSiteData(): Promise<SiteData> {
  const { data, error } = await supabase
    .from("site_settings")
    .select("data")
    .eq("id", 1)
    .maybeSingle();
  if (error || !data || !data.data || Object.keys(data.data as object).length === 0) {
    return defaultData;
  }
  return { ...defaultData, ...(data.data as Partial<SiteData>) };
}

export async function saveSiteData(data: SiteData): Promise<void> {
  const { error } = await supabase
    .from("site_settings")
    .update({ data: data as any })
    .eq("id", 1);
  if (error) throw error;
}

async function bootstrapAdmin() {
  try {
    await supabase.functions.invoke("bootstrap-admin");
  } catch {}
}

export async function adminLogin(username: string, password: string): Promise<{ ok: boolean; error?: string }> {
  if (username.trim() !== ADMIN_USERNAME) {
    return { ok: false, error: "Credenciais inválidas" };
  }
  // First attempt
  let { error } = await supabase.auth.signInWithPassword({ email: ADMIN_EMAIL, password });
  if (error) {
    // Try to bootstrap (creates the admin if it doesn't exist), then retry
    await bootstrapAdmin();
    const retry = await supabase.auth.signInWithPassword({ email: ADMIN_EMAIL, password });
    if (retry.error) return { ok: false, error: "Credenciais inválidas" };
  }
  return { ok: true };
}

export async function adminLogout() {
  await supabase.auth.signOut();
}

export async function isAdminLoggedIn(): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;
  const { data } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .eq("role", "admin")
    .maybeSingle();
  return !!data;
}

// Ensure admin exists on first site load (no-op if already created)
export async function ensureAdminBootstrap() {
  await bootstrapAdmin();
}
