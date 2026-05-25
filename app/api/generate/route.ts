import { NextRequest, NextResponse } from "next/server";
import { buildSystemPrompt, buildUserPrompt, parseReplies } from "@/lib/prompts";
import { TONE_MAP, ToneId, PlatformId } from "@/lib/tones";

export const runtime = "edge";

interface GenerateBody {
  message?: string;
  tone?: ToneId;
  platform?: PlatformId;
}

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "deepseek/deepseek-chat-v3-0324:free";

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Server is missing OPENROUTER_API_KEY." },
      { status: 500 }
    );
  }

  let body: GenerateBody;
  try {
    body = (await req.json()) as GenerateBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const message = (body.message ?? "").trim();
  const tone = body.tone ?? "friendly";
  const platform = body.platform ?? "other";

  if (!message) {
    return NextResponse.json(
      { error: "Please paste a message to reply to." },
      { status: 400 }
    );
  }
  if (message.length > 4000) {
    return NextResponse.json(
      { error: "Message is too long (4000 characters max)." },
      { status: 400 }
    );
  }
  if (!TONE_MAP[tone]) {
    return NextResponse.json({ error: "Unknown tone." }, { status: 400 });
  }

  const payload = {
    model: MODEL,
    messages: [
      { role: "system", content: buildSystemPrompt() },
      { role: "user", content: buildUserPrompt({ message, tone, platform }) },
    ],
    temperature: 0.9,
    top_p: 0.95,
  };

  try {
    const upstream = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer":
          process.env.OPENROUTER_SITE_URL ?? "http://localhost:3000",
        "X-Title": process.env.OPENROUTER_SITE_NAME ?? "AI Reply",
      },
      body: JSON.stringify(payload),
    });

    if (!upstream.ok) {
      const errText = await upstream.text();
      return NextResponse.json(
        {
          error: "OpenRouter request failed.",
          status: upstream.status,
          detail: errText.slice(0, 500),
        },
        { status: 502 }
      );
    }

    const data = (await upstream.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = data.choices?.[0]?.message?.content ?? "";
    const replies = parseReplies(content);

    if (replies.length === 0) {
      return NextResponse.json(
        { error: "The model returned no replies. Try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ replies });
  } catch (err) {
    const detail = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: "Network error reaching OpenRouter.", detail },
      { status: 502 }
    );
  }
}
