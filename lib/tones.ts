export type ToneId =
  | "friendly"
  | "flirty"
  | "professional"
  | "cold"
  | "funny"
  | "confident"
  | "short"
  | "ceo";

export type Tone = {
  id: ToneId;
  label: string;
  emoji: string;
  description: string;
  prompt: string;
};

export const TONES: Tone[] = [
  {
    id: "friendly",
    label: "Friendly",
    emoji: "😊",
    description: "Warm, casual, approachable",
    prompt:
      "warm, friendly and casual — like texting a close friend. Use natural language, light enthusiasm, no slang overload.",
  },
  {
    id: "flirty",
    label: "Flirty",
    emoji: "😉",
    description: "Playful, charming, a little teasing",
    prompt:
      "playful and flirty with a hint of teasing. Keep it charming, never cringe, and leave room for the conversation to continue.",
  },
  {
    id: "professional",
    label: "Professional",
    emoji: "💼",
    description: "Polished, respectful, business-ready",
    prompt:
      "professional and polished. Clear, respectful, no slang, suitable for work or business email contexts.",
  },
  {
    id: "cold",
    label: "Cold",
    emoji: "🧊",
    description: "Distant, minimal, neutral",
    prompt:
      "cold and emotionally distant. Polite but minimal. No exclamation marks, no warmth, no over-explaining.",
  },
  {
    id: "funny",
    label: "Funny",
    emoji: "😂",
    description: "Witty, clever, playful jokes",
    prompt:
      "funny and witty. Use clever humor or a light joke. Stay tasteful and self-aware — never forced.",
  },
  {
    id: "confident",
    label: "Confident",
    emoji: "🔥",
    description: "Direct, self-assured, magnetic",
    prompt:
      "confident and self-assured. Direct, magnetic, leads the conversation without arrogance.",
  },
  {
    id: "short",
    label: "Short",
    emoji: "✂️",
    description: "One-line responses, fast",
    prompt:
      "extremely short — one short sentence each, max 12 words. No filler.",
  },
  {
    id: "ceo",
    label: "Smart CEO",
    emoji: "🧠",
    description: "Crisp, strategic, high-signal",
    prompt:
      "in the voice of a smart CEO — crisp, high-signal, strategic. Direct without being curt. Sounds like a founder writing back between meetings.",
  },
];

export const TONE_MAP = Object.fromEntries(TONES.map((t) => [t.id, t])) as Record<
  ToneId,
  Tone
>;
