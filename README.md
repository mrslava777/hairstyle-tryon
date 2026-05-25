# AI Reply

Generate perfect replies instantly for Telegram, WhatsApp, Instagram, Tinder,
email, and dating apps. Pick a tone — AI nails the voice.

Built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.
AI inference via **DeepSeek** (`deepseek/deepseek-chat-v3-0324:free`) through
**OpenRouter**.

## Features

- 8 distinct tones: Friendly, Flirty, Professional, Cold, Funny, Confident,
  Short, Smart CEO.
- Platform-aware prompting (Telegram / WhatsApp / Instagram / Tinder / Email /
  Dating).
- Beautiful dark glassmorphism UI, mobile-first, with smooth Framer Motion
  animations.
- One-tap copy on every reply.
- Regenerate to get a fresh batch.
- Local recent-history (lives in your browser, never on a server).

## Getting started

```bash
cp .env.example .env.local
# add your OpenRouter API key
echo "OPENROUTER_API_KEY=sk-or-..." >> .env.local

npm install
npm run dev
```

Then visit [http://localhost:3000](http://localhost:3000).

## Environment

| Variable             | Required | Description                            |
| -------------------- | -------- | -------------------------------------- |
| `OPENROUTER_API_KEY` | yes      | Your OpenRouter API key (server-only). |

## Project layout

```
app/
  page.tsx              # Landing page
  generator/page.tsx    # Main AI generator
  api/generate/route.ts # Server route → OpenRouter
components/             # ToneSelector, ReplyCard, LoadingReplies, ...
lib/                    # tones, platforms, parsing helpers
```

## License

MIT
