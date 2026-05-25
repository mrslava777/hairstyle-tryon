export type PlatformId =
  | "telegram"
  | "whatsapp"
  | "instagram"
  | "tinder"
  | "email"
  | "dating";

export const PLATFORMS: { id: PlatformId; label: string; emoji: string }[] = [
  { id: "telegram", label: "Telegram", emoji: "✈️" },
  { id: "whatsapp", label: "WhatsApp", emoji: "💬" },
  { id: "instagram", label: "Instagram", emoji: "📸" },
  { id: "tinder", label: "Tinder", emoji: "🔥" },
  { id: "email", label: "Email", emoji: "📧" },
  { id: "dating", label: "Dating App", emoji: "💘" },
];
