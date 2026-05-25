import { TONE_MAP, ToneId, PlatformId } from "./tones";

const PLATFORM_HINT: Record<PlatformId, string> = {
  telegram: "Telegram chat — casual, emoji ok.",
  whatsapp: "WhatsApp chat — casual, short messages, emoji ok.",
  instagram: "Instagram DM — casual, modern, emoji ok.",
  tinder: "Tinder match — first impression matters, don't be generic.",
  dating: "Dating app conversation — charming and authentic.",
  email: "Email reply — full sentences, no slang, no emoji unless tone calls for it.",
  other: "General message reply.",
};

export function buildSystemPrompt(): string {
  return [
    "You are AI Reply, an expert at crafting human-like message replies.",
    "Rules:",
    "- Generate exactly 5 distinct reply options.",
    "- Each reply must stand on its own — do not number them or add labels.",
    "- Match the requested tone precisely.",
    "- Sound like a real person, not a chatbot. No filler like 'Sure!' or 'Of course!'.",
    "- Do not include explanations, headings, intros, outros, or quote marks around replies.",
    "- Return ONLY a JSON array of 5 strings. Example: [\"reply one\", \"reply two\", ...]",
  ].join("\n");
}

export function buildUserPrompt(opts: {
  message: string;
  tone: ToneId;
  platform: PlatformId;
}): string {
  const tone = TONE_MAP[opts.tone];
  const platformHint = PLATFORM_HINT[opts.platform];

  return [
    `Platform: ${platformHint}`,
    `Tone: ${tone.label} — ${tone.prompt}`,
    "",
    "Incoming message to reply to:",
    `"""${opts.message.trim()}"""`,
    "",
    "Return a JSON array of exactly 5 reply options in the requested tone. No extra text.",
  ].join("\n");
}

export function parseReplies(content: string): string[] {
  const cleaned = content
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();

  try {
    const parsed = JSON.parse(cleaned);
    if (Array.isArray(parsed)) {
      return parsed
        .map((x) => (typeof x === "string" ? x : String(x ?? "")))
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, 5);
    }
  } catch {
    // fall through
  }

  // Fallback: split by lines, strip numbering and bullets
  const lines = cleaned
    .split(/\r?\n/)
    .map((l) => l.replace(/^\s*[-*•]\s+/, "").replace(/^\s*\d+[.)]\s+/, "").trim())
    .map((l) => l.replace(/^["']|["']$/g, "").trim())
    .filter(Boolean);

  return lines.slice(0, 5);
}
