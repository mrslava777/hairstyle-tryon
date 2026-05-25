import { NextRequest, NextResponse } from "next/server";
import { TONE_MAP, ToneId } from "@/lib/tones";
import { parseReplies } from "@/lib/parseReplies";

export const runtime = "edge";

type Body = {
  message?: string;
  tone?: ToneId;
  platform?: string;
  count?: number;
};

export async function POST(req: NextRequest) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const message = (body.message ?? "").trim();
  const toneId = body.tone ?? "friendly";
  const platform = (body.platform ?? "").trim();
  const count = Math.min(Math.max(body.count ?? 5, 1), 8);

  if (!message) {
    return NextResponse.json(
      { error: "Please paste the message you want to reply to." },
      { status: 400 }
    );
  }

  const tone = TONE_MAP[toneId];
  if (!tone) {
    return NextResponse.json({ error: "Unknown tone" }, { status: 400 });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "Server is missing OPENROUTER_API_KEY. Set it in your environment to enable replies.",
      },
      { status: 500 }
    );
  }

  const platformContext = platform
    ? `The message arrived on ${platform}. Match the natural style of that platform.`
    : "";

  const systemPrompt = `You are AI Reply, an expert at generating short, human, on-tone responses to incoming messages from chat apps, dating apps, and email.

Rules:
- Output ONLY the numbered reply options, nothing else.
- Each reply is on its own line, prefixed with "1.", "2.", etc.
- Do not add any preamble, explanation, headers, quotes, or trailing commentary.
- Replies must sound like a real person, not an AI.
- Keep formatting plain — no markdown, no emojis unless the tone strongly calls for one.`;

  const userPrompt = `Generate ${count} reply options for this incoming message in a ${tone.label} tone.

Tone guidance: ${tone.prompt}
${platformContext}

Incoming message:
"""${message}"""

Return ${count} distinct replies, each on its own line, numbered 1. through ${count}.`;

  try {
    const upstream = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "HTTP-Referer": "https://ai-reply.app",
          "X-Title": "AI Reply",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat-v3-0324:free",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.9,
          max_tokens: 700,
        }),
      }
    );

    if (!upstream.ok) {
      const errText = await upstream.text().catch(() => "");
      return NextResponse.json(
        {
          error: `Upstream model error (${upstream.status}). ${errText.slice(0, 200)}`,
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
        { error: "The model returned no parseable replies. Try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ replies, tone: tone.id });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Network error reaching model: ${msg}` },
      { status: 502 }
    );
  }
}
