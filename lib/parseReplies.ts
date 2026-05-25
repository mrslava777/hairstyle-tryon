export function parseReplies(raw: string): string[] {
  if (!raw) return [];

  const cleaned = raw.replace(/\r/g, "").trim();

  const lines = cleaned
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const stripped = lines
    .map((line) => {
      return line
        .replace(/^\s*(?:\d+[\.\):]|[-*•])\s*/, "")
        .replace(/^["“”']+|["“”']+$/g, "")
        .trim();
    })
    .filter((l) => l.length > 0 && !/^reply\s*\d+\s*:?$/i.test(l));

  if (stripped.length >= 2) return stripped.slice(0, 8);

  return cleaned
    .split(/\n{2,}/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 8);
}
