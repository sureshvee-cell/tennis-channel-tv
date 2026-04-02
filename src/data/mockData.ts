export interface Match {
  id: string;
  tournament: string;
  tournamentLogo?: string;
  round: string;
  court: string;
  player1: Player;
  player2: Player;
  status: "live" | "upcoming" | "completed";
  startTime: string;
  sets: SetScore[];
  currentSet: number;
  isLive: boolean;
  streamUrl: string;
  thumbnailUrl: string;
  category: "atp" | "wta" | "grand-slam" | "fast-channel" | "pickleball";
  entitlement: "free" | "subscription" | "cable" | "free-account";
}

export interface Player {
  name: string;
  country: string;
  countryCode: string;
  seed?: number;
  ranking: number;
  imageUrl: string;
}

export interface SetScore {
  player1: number;
  player2: number;
  tiebreak?: { player1: number; player2: number };
}

export interface TVProvider {
  id: string;
  name: string;
  logoUrl: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  highlighted: boolean;
}

export const mockMatches: Match[] = [
  // Charleston Open - WTA 500 (LIVE)
  {
    id: "m1",
    tournament: "Charleston Open Tennis 2026",
    round: "Early Rounds",
    court: "Stadium Court",
    player1: {
      name: "Madison Keys",
      country: "United States",
      countryCode: "US",
      seed: 1,
      ranking: 12,
      imageUrl: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=200&h=200&fit=crop&q=80",
    },
    player2: {
      name: "Beatriz Haddad Maia",
      country: "Brazil",
      countryCode: "BR",
      seed: undefined,
      ranking: 24,
      imageUrl: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=200&h=200&fit=crop&q=80",
    },
    status: "live",
    startTime: "2026-04-01T14:00:00Z",
    sets: [
      { player1: 6, player2: 4 },
      { player1: 2, player2: 1 },
    ],
    currentSet: 2,
    isLive: true,
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    thumbnailUrl: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=640&h=360&fit=crop&q=80",
    category: "wta",
    entitlement: "subscription",
  },
  // Tennis Today on T2 (LIVE, No login required)
  {
    id: "m2",
    tournament: "Tennis Today",
    round: "Studio Show",
    court: "T2 Studio",
    player1: {
      name: "Tennis Channel",
      country: "United States",
      countryCode: "US",
      ranking: 0,
      imageUrl: "",
    },
    player2: {
      name: "Broadcast",
      country: "United States",
      countryCode: "US",
      ranking: 0,
      imageUrl: "",
    },
    status: "live",
    startTime: "2026-04-01T13:00:00Z",
    sets: [],
    currentSet: 0,
    isLive: true,
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    thumbnailUrl: "https://images.unsplash.com/photo-1511067007398-7e4b90cfa4bc?w=640&h=360&fit=crop&q=80",
    category: "fast-channel",
    entitlement: "free",
  },
  // ATP Marrakech (LIVE & UPCOMING)
  {
    id: "m3",
    tournament: "ATP Marrakech",
    round: "Round of 16",
    court: "Centre Court",
    player1: {
      name: "Jannik Sinner",
      country: "Italy",
      countryCode: "IT",
      seed: 1,
      ranking: 2,
      imageUrl: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=200&h=200&fit=crop&q=80",
    },
    player2: {
      name: "Pablo Carreno Busta",
      country: "Spain",
      countryCode: "ES",
      ranking: 45,
      imageUrl: "https://images.unsplash.com/photo-1542144582-1ba00456b5e3?w=200&h=200&fit=crop&q=80",
    },
    status: "upcoming",
    startTime: "2026-04-01T03:00:00Z",
    sets: [],
    currentSet: 0,
    isLive: false,
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    thumbnailUrl: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=640&h=360&fit=crop&q=80",
    category: "atp",
    entitlement: "subscription",
  },
  // ATP Bucharest
  {
    id: "m4",
    tournament: "ATP Bucharest",
    round: "Round of 32",
    court: "Court 1",
    player1: {
      name: "Romain Gasquet",
      country: "France",
      countryCode: "FR",
      ranking: 58,
      imageUrl: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=200&h=200&fit=crop&q=80",
    },
    player2: {
      name: "Sebastian Baez",
      country: "Argentina",
      countryCode: "AR",
      ranking: 33,
      imageUrl: "https://images.unsplash.com/photo-1599586120429-48281b6f0ece?w=200&h=200&fit=crop&q=80",
    },
    status: "upcoming",
    startTime: "2026-04-01T04:00:00Z",
    sets: [],
    currentSet: 0,
    isLive: false,
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    thumbnailUrl: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=640&h=360&fit=crop&q=80",
    category: "atp",
    entitlement: "subscription",
  },
  // Pickleball - PPA Tour (LIVE, No login required)
  {
    id: "m5",
    tournament: "PPA Tour: Asia Hanoi Cup",
    round: "Quarter-Final",
    court: "Main Court",
    player1: {
      name: "Tyson McGuffin",
      country: "United States",
      countryCode: "US",
      ranking: 1,
      imageUrl: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=200&h=200&fit=crop&q=80",
    },
    player2: {
      name: "JW Johnson",
      country: "United States",
      countryCode: "US",
      ranking: 3,
      imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=200&h=200&fit=crop&q=80",
    },
    status: "live",
    startTime: "2026-04-01T12:00:00Z",
    sets: [
      { player1: 11, player2: 8 },
      { player1: 5, player2: 3 },
    ],
    currentSet: 2,
    isLive: true,
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    thumbnailUrl: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=640&h=360&fit=crop&q=80",
    category: "pickleball",
    entitlement: "free",
  },
  // Houston ATP 250
  {
    id: "m6",
    tournament: "Houston ATP 250",
    round: "Round of 32",
    court: "Stadium Court",
    player1: {
      name: "Taylor Fritz",
      country: "United States",
      countryCode: "US",
      seed: 2,
      ranking: 7,
      imageUrl: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=200&h=200&fit=crop&q=80",
    },
    player2: {
      name: "Nuno Borges",
      country: "Portugal",
      countryCode: "PT",
      ranking: 31,
      imageUrl: "https://images.unsplash.com/photo-1542144582-1ba00456b5e3?w=200&h=200&fit=crop&q=80",
    },
    status: "upcoming",
    startTime: "2026-04-02T20:00:00Z",
    sets: [],
    currentSet: 0,
    isLive: false,
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    thumbnailUrl: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=640&h=360&fit=crop&q=80",
    category: "atp",
    entitlement: "subscription",
  },
  // Sofia Kenin Highlights
  {
    id: "m7",
    tournament: "Sofia Kenin - Match Highlights",
    round: "Featured Clip",
    court: "Various",
    player1: {
      name: "Sofia Kenin",
      country: "United States",
      countryCode: "US",
      ranking: 28,
      imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=200&h=200&fit=crop&q=80",
    },
    player2: {
      name: "Highlights",
      country: "Tennis Channel",
      countryCode: "US",
      ranking: 0,
      imageUrl: "",
    },
    status: "completed",
    startTime: "2026-03-31T16:00:00Z",
    sets: [],
    currentSet: 0,
    isLive: false,
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    thumbnailUrl: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=640&h=360&fit=crop&q=80",
    category: "wta",
    entitlement: "free",
  },
  // Jessica Pegula Highlights
  {
    id: "m8",
    tournament: "Jessica Pegula - Match Highlights",
    round: "Featured Clip",
    court: "Various",
    player1: {
      name: "Jessica Pegula",
      country: "United States",
      countryCode: "US",
      ranking: 5,
      imageUrl: "https://images.unsplash.com/photo-1599586120429-48281b6f0ece?w=200&h=200&fit=crop&q=80",
    },
    player2: {
      name: "Highlights",
      country: "Tennis Channel",
      countryCode: "US",
      ranking: 0,
      imageUrl: "",
    },
    status: "completed",
    startTime: "2026-03-31T14:00:00Z",
    sets: [],
    currentSet: 0,
    isLive: false,
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    thumbnailUrl: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=640&h=360&fit=crop&q=80",
    category: "wta",
    entitlement: "free",
  },
  // Paula Badosa Highlights
  {
    id: "m9",
    tournament: "Paula Badosa - Match Highlights",
    round: "Featured Clip",
    court: "Various",
    player1: {
      name: "Paula Badosa",
      country: "Spain",
      countryCode: "ES",
      ranking: 10,
      imageUrl: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=200&h=200&fit=crop&q=80",
    },
    player2: {
      name: "Highlights",
      country: "Tennis Channel",
      countryCode: "US",
      ranking: 0,
      imageUrl: "",
    },
    status: "completed",
    startTime: "2026-03-31T15:00:00Z",
    sets: [],
    currentSet: 0,
    isLive: false,
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    thumbnailUrl: "https://images.unsplash.com/photo-1542144582-1ba00456b5e3?w=640&h=360&fit=crop&q=80",
    category: "wta",
    entitlement: "free",
  },
];

export const mockTVProviders: TVProvider[] = [
  { id: "comcast", name: "Xfinity", logoUrl: "" },
  { id: "directv", name: "DIRECTV", logoUrl: "" },
  { id: "dish", name: "DISH Network", logoUrl: "" },
  { id: "spectrum", name: "Spectrum", logoUrl: "" },
  { id: "att", name: "AT&T U-verse", logoUrl: "" },
  { id: "verizon", name: "Verizon Fios", logoUrl: "" },
  { id: "cox", name: "Cox Communications", logoUrl: "" },
  { id: "optimum", name: "Optimum", logoUrl: "" },
  { id: "frontier", name: "Frontier", logoUrl: "" },
  { id: "mediacom", name: "Mediacom", logoUrl: "" },
  { id: "youtube-tv", name: "YouTube TV", logoUrl: "" },
  { id: "hulu-live", name: "Hulu + Live TV", logoUrl: "" },
  { id: "fubo", name: "fuboTV", logoUrl: "" },
  { id: "sling", name: "Sling TV", logoUrl: "" },
];

export const mockSubscriptionPlans: SubscriptionPlan[] = [
  {
    id: "monthly",
    name: "Monthly",
    price: "$12.99",
    period: "/ month",
    features: [
      "Live matches & tournaments",
      "Full VOD library",
      "4 simultaneous streams",
      "Multiview mode",
    ],
    highlighted: false,
  },
  {
    id: "annual",
    name: "Annual",
    price: "$109.99",
    period: "/ year",
    features: [
      "Everything in Monthly",
      "Save over 29%",
      "Priority access to new features",
      "Exclusive content",
    ],
    highlighted: true,
  },
];

export const countryFlags: Record<string, string> = {
  ES: "\u{1F1EA}\u{1F1F8}",
  IT: "\u{1F1EE}\u{1F1F9}",
  PL: "\u{1F1F5}\u{1F1F1}",
  US: "\u{1F1FA}\u{1F1F8}",
  DE: "\u{1F1E9}\u{1F1EA}",
  RU: "\u{1F1F7}\u{1F1FA}",
  BY: "\u{1F1E7}\u{1F1FE}",
  KZ: "\u{1F1F0}\u{1F1FF}",
  RS: "\u{1F1F7}\u{1F1F8}",
  BR: "\u{1F1E7}\u{1F1F7}",
  FR: "\u{1F1EB}\u{1F1F7}",
  PT: "\u{1F1F5}\u{1F1F9}",
  AR: "\u{1F1E6}\u{1F1F7}",
};
