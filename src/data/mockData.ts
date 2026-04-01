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
  category: "atp" | "wta" | "grand-slam" | "fast-channel";
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
  {
    id: "m1",
    tournament: "Roland Garros",
    round: "Quarterfinal",
    court: "Court Philippe-Chatrier",
    player1: {
      name: "Carlos Alcaraz",
      country: "Spain",
      countryCode: "ES",
      seed: 1,
      ranking: 1,
      imageUrl: "/players/alcaraz.jpg",
    },
    player2: {
      name: "Jannik Sinner",
      country: "Italy",
      countryCode: "IT",
      seed: 2,
      ranking: 2,
      imageUrl: "/players/sinner.jpg",
    },
    status: "live",
    startTime: "2026-04-01T14:00:00Z",
    sets: [
      { player1: 6, player2: 4 },
      { player1: 3, player2: 6 },
      { player1: 5, player2: 4 },
    ],
    currentSet: 3,
    isLive: true,
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    thumbnailUrl: "",
    category: "grand-slam",
    entitlement: "subscription",
  },
  {
    id: "m2",
    tournament: "Roland Garros",
    round: "Quarterfinal",
    court: "Court Suzanne-Lenglen",
    player1: {
      name: "Iga Swiatek",
      country: "Poland",
      countryCode: "PL",
      seed: 1,
      ranking: 1,
      imageUrl: "/players/swiatek.jpg",
    },
    player2: {
      name: "Coco Gauff",
      country: "United States",
      countryCode: "US",
      seed: 3,
      ranking: 3,
      imageUrl: "/players/gauff.jpg",
    },
    status: "live",
    startTime: "2026-04-01T15:00:00Z",
    sets: [
      { player1: 7, player2: 6, tiebreak: { player1: 7, player2: 5 } },
      { player1: 2, player2: 3 },
    ],
    currentSet: 2,
    isLive: true,
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    thumbnailUrl: "",
    category: "grand-slam",
    entitlement: "subscription",
  },
  {
    id: "m3",
    tournament: "Roland Garros",
    round: "Quarterfinal",
    court: "Court Simonne-Mathieu",
    player1: {
      name: "Alexander Zverev",
      country: "Germany",
      countryCode: "DE",
      seed: 3,
      ranking: 4,
      imageUrl: "/players/zverev.jpg",
    },
    player2: {
      name: "Daniil Medvedev",
      country: "Russia",
      countryCode: "RU",
      seed: 5,
      ranking: 5,
      imageUrl: "/players/medvedev.jpg",
    },
    status: "live",
    startTime: "2026-04-01T13:30:00Z",
    sets: [
      { player1: 4, player2: 6 },
      { player1: 6, player2: 3 },
      { player1: 6, player2: 4 },
      { player1: 1, player2: 2 },
    ],
    currentSet: 4,
    isLive: true,
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    thumbnailUrl: "",
    category: "grand-slam",
    entitlement: "cable",
  },
  {
    id: "m4",
    tournament: "Roland Garros",
    round: "Quarterfinal",
    court: "Court 14",
    player1: {
      name: "Aryna Sabalenka",
      country: "Belarus",
      countryCode: "BY",
      seed: 2,
      ranking: 2,
      imageUrl: "/players/sabalenka.jpg",
    },
    player2: {
      name: "Elena Rybakina",
      country: "Kazakhstan",
      countryCode: "KZ",
      seed: 4,
      ranking: 4,
      imageUrl: "/players/rybakina.jpg",
    },
    status: "live",
    startTime: "2026-04-01T16:00:00Z",
    sets: [{ player1: 3, player2: 2 }],
    currentSet: 1,
    isLive: true,
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    thumbnailUrl: "",
    category: "grand-slam",
    entitlement: "free",
  },
  {
    id: "m5",
    tournament: "ATP Masters 1000 - Rome",
    round: "Round of 16",
    court: "Centre Court",
    player1: {
      name: "Novak Djokovic",
      country: "Serbia",
      countryCode: "RS",
      seed: 4,
      ranking: 3,
      imageUrl: "/players/djokovic.jpg",
    },
    player2: {
      name: "Taylor Fritz",
      country: "United States",
      countryCode: "US",
      seed: 7,
      ranking: 7,
      imageUrl: "/players/fritz.jpg",
    },
    status: "upcoming",
    startTime: "2026-04-01T18:00:00Z",
    sets: [],
    currentSet: 0,
    isLive: false,
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    thumbnailUrl: "",
    category: "atp",
    entitlement: "subscription",
  },
  {
    id: "m6",
    tournament: "Tennis Channel Live",
    round: "Studio Show",
    court: "TC Studio",
    player1: {
      name: "TC Linear",
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
    startTime: "2026-04-01T12:00:00Z",
    sets: [],
    currentSet: 0,
    isLive: true,
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    thumbnailUrl: "",
    category: "fast-channel",
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
  ES: "\ud83c\uddea\ud83c\uddf8",
  IT: "\ud83c\uddee\ud83c\uddf9",
  PL: "\ud83c\uddf5\ud83c\uddf1",
  US: "\ud83c\uddfa\ud83c\uddf8",
  DE: "\ud83c\udde9\ud83c\uddea",
  RU: "\ud83c\uddf7\ud83c\uddfa",
  BY: "\ud83c\udde7\ud83c\uddfe",
  KZ: "\ud83c\uddf0\ud83c\uddff",
  RS: "\ud83c\uddf7\ud83c\uddf8",
};
