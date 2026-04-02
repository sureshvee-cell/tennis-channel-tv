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
      imageUrl: "/players/keys.jpg",
    },
    player2: {
      name: "Beatriz Haddad Maia",
      country: "Brazil",
      countryCode: "BR",
      seed: undefined,
      ranking: 24,
      imageUrl: "/players/haddad.jpg",
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
    thumbnailUrl: "",
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
    thumbnailUrl: "",
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
      imageUrl: "/players/sinner.jpg",
    },
    player2: {
      name: "Pablo Carreno Busta",
      country: "Spain",
      countryCode: "ES",
      ranking: 45,
      imageUrl: "/players/carreno.jpg",
    },
    status: "upcoming",
    startTime: "2026-04-01T03:00:00Z",
    sets: [],
    currentSet: 0,
    isLive: false,
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    thumbnailUrl: "",
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
      imageUrl: "/players/gasquet.jpg",
    },
    player2: {
      name: "Sebastian Baez",
      country: "Argentina",
      countryCode: "AR",
      ranking: 33,
      imageUrl: "/players/baez.jpg",
    },
    status: "upcoming",
    startTime: "2026-04-01T04:00:00Z",
    sets: [],
    currentSet: 0,
    isLive: false,
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    thumbnailUrl: "",
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
      imageUrl: "/players/mcguffin.jpg",
    },
    player2: {
      name: "JW Johnson",
      country: "United States",
      countryCode: "US",
      ranking: 3,
      imageUrl: "/players/jwjohnson.jpg",
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
    thumbnailUrl: "",
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
      imageUrl: "/players/fritz.jpg",
    },
    player2: {
      name: "Nuno Borges",
      country: "Portugal",
      countryCode: "PT",
      ranking: 31,
      imageUrl: "/players/borges.jpg",
    },
    status: "upcoming",
    startTime: "2026-04-02T20:00:00Z",
    sets: [],
    currentSet: 0,
    isLive: false,
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    thumbnailUrl: "",
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
      imageUrl: "/players/kenin.jpg",
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
    thumbnailUrl: "",
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
      imageUrl: "/players/pegula.jpg",
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
    thumbnailUrl: "",
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
      imageUrl: "/players/badosa.jpg",
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
    thumbnailUrl: "",
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
  ES: "🇪🇸",
  IT: "🇮🇹",
  PL: "🇵🇱",
  US: "🇺🇸",
  DE: "🇩🇪",
  RU: "🇷🇺",
  BY: "🇧🇾",
  KZ: "🇰🇿",
  RS: "🇷🇸",
  BR: "🇧🇷",
  FR: "🇫🇷",
  PT: "🇵🇹",
  AR: "🇦🇷",
};
