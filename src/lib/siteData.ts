export interface SiteData {
  heroSlides: { image: string; }[];
  heroTitle: string;
  heroSubtitle: string;
  heroTagline: string;
  whatsappLink: string;
  downloadLinks: {
    android: string;
    ios: string;
    pc: string;
  };
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
    banks: { name: string; iban: string; }[];
    multicaixa: string;
  };
  channels: { country: string; channels: string[]; }[];
  stats: { label: string; value: string; }[];
}

const defaultData: SiteData = {
  heroSlides: [
    { image: "/images/hero-1.jpg" },
    { image: "/images/hero-2.png" },
    { image: "/images/hero-3.jpg" },
  ],
  heroTitle: "MISAPLAY-TV",
  heroSubtitle: "Assista tudo, em qualquer lugar",
  heroTagline: "Filmes • Séries • Desporto • Canais ao Vivo",
  whatsappLink: "https://wa.me/244912083163?text=Olá,%20quero%20solicitar%20um%20teste%20gratuito%20da%20MISAPLAY-TV",
  downloadLinks: {
    android: "https://go.aftvnews.com/6383520",
    ios: "https://apps.apple.com/us/app/blessed-player/id6743084241?l",
    pc: "http://misaplay-tv.studioapp.click/login",
  },
  plans: [
    {
      name: "Plano Mensal",
      price: "5000 Kz",
      priceUsd: "$5",
      paypalLink: "https://www.paypal.com/paypalme/misaplay/5",
      features: ["+6500 canais", "+16000 filmes", "+25000 séries"],
    },
    {
      name: "Plano Trimestral",
      price: "14000 Kz",
      priceUsd: "$14",
      paypalLink: "https://www.paypal.com/paypalme/misaplay/14",
      features: ["+6500 canais", "+16000 filmes", "+25000 séries"],
      popular: true,
    },
    {
      name: "Plano Semestral",
      price: "28000 Kz",
      priceUsd: "$28",
      paypalLink: "https://www.paypal.com/paypalme/misaplay/28",
      features: ["+6500 canais", "+16000 filmes", "+25000 séries"],
    },
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

const STORAGE_KEY = "misaplay_site_data";

export function getSiteData(): SiteData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return { ...defaultData, ...JSON.parse(stored) };
  } catch {}
  return defaultData;
}

export function saveSiteData(data: Partial<SiteData>) {
  const current = getSiteData();
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, ...data }));
}

export function isAdminLoggedIn(): boolean {
  return sessionStorage.getItem("misaplay_admin") === "true";
}

export function adminLogin(username: string, password: string): boolean {
  if (username === "MISAEL CASTELO" && password === "CASTELO2025") {
    sessionStorage.setItem("misaplay_admin", "true");
    return true;
  }
  return false;
}

export function adminLogout() {
  sessionStorage.removeItem("misaplay_admin");
}
