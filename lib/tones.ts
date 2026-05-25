export type ToneId =
  | "friendly"
  | "flirty"
  | "professional"
  | "cold"
  | "funny"
  | "confident"
  | "short"
  | "ceo";

export interface Tone {
  id: ToneId;
  label: string;
  emoji: string;
  description: string;
  prompt: string;
  gradient: string;
}

export const TONES: Tone[] = [
  {
    id: "friendly",
    label: "Friendly",
    emoji: "🤝",
    description: "Warm, kind, and approachable",
    gradient: "from-emerald-400 to-teal-500",
    prompt:
      "Warm, kind, casual and approachable. Sounds like a good friend texting back.",
  },
  {
    id: "flirty",
    label: "Flirty",
    emoji: "💋",
    description: "Playful and charming",
    gradient: "from-pink-500 to-rose-500",
    prompt:
      "Playful, charming, and a little teasing. Confident flirting without being creepy or cringe.",
  },
  {
    id: "professional",
    label: "Professional",
    emoji: "💼",
    description: "Polished and business-ready",
    gradient: "from-blue-500 to-indigo-500",
    prompt:
      "Polished, articulate, business-appropriate. Clear and respectful.",
  },
  {
    id: "cold",
    label: "Cold",
    emoji: "🧊",
    description: "Distant and minimal",
    gradient: "from-slate-400 to-zinc-500",
    prompt:
      "Distant, dry, minimal effort. Short, clipped sentences with zero warmth.",
  },
  {
    id: "funny",
    label: "Funny",
    emoji: "😂",
    description: "Witty and entertaining",
    gradient: "from-yellow-400 to-orange-500",
    prompt:
      "Witty, clever, and genuinely funny. Lean into wordplay, irony, or a surprising punchline.",
  },
  {
    id: "confident",
    label: "Confident",
    emoji: "🔥",
    description: "Bold and self-assured",
    gradient: "from-fuchsia-500 to-purple-600",
    prompt:
      "Bold, self-assured, magnetic. Speaks with calm authority — no hedging or apologies.",
  },
  {
    id: "short",
    label: "Short",
    emoji: "⚡",
    description: "Punchy one-liners",
    gradient: "from-cyan-400 to-sky-500",
    prompt:
      "Ultra-short. One sentence max, ideally under 10 words. Punchy and direct.",
  },
  {
    id: "ceo",
    label: "Smart CEO",
    emoji: "🧠",
    description: "Strategic and decisive",
    gradient: "from-amber-400 to-pink-500",
    prompt:
      "Strategic, decisive, high-signal. Sounds like a thoughtful founder or executive — calm, clear, and outcome-oriented.",
  },
];

export const TONE_MAP = Object.fromEntries(
  TONES.map((t) => [t.id, t])
) as Record<ToneId, Tone>;

export type PlatformId =
  | "telegram"
  | "whatsapp"
  | "instagram"
  | "tinder"
  | "email"
  | "dating"
  | "other";

export interface Platform {
  id: PlatformId;
  label: string;
  emoji: string;
}

export const PLATFORMS: Platform[] = [
  { id: "telegram", label: "Telegram", emoji: "✈️" },
  { id: "whatsapp", label: "WhatsApp", emoji: "💬" },
  { id: "instagram", label: "Instagram", emoji: "📸" },
  { id: "tinder", label: "Tinder", emoji: "🔥" },
  { id: "dating", label: "Dating app", emoji: "💘" },
  { id: "email", label: "Email", emoji: "📧" },
  { id: "other", label: "Other", emoji: "💭" },
];
