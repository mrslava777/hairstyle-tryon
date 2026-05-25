# AI Reply

Generate perfect replies instantly — for Telegram, WhatsApp, Instagram, Tinder, email and dating apps. Paste the incoming message, pick a tone, and get 5 human-sounding options in seconds.

Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, and DeepSeek v3 via OpenRouter.

## Features

- 8 tones: Friendly, Flirty, Professional, Cold, Funny, Confident, Short, Smart CEO
- 5 distinct reply options per generation
- Platform-aware prompts (Telegram, WhatsApp, Instagram, Tinder, dating, email)
- Copy-to-clipboard, regenerate, locally-stored history
- Mobile-first responsive dark UI with glassmorphism
- Server-side API key — never exposed to the client

## Setup

```bash
npm install
cp .env.example .env.local      # then add your OpenRouter key
npm run dev
```

Visit http://localhost:3000.

## Environment variables

| Variable | Description |
| --- | --- |
| `OPENROUTER_API_KEY` | **Required.** Get a free key at [openrouter.ai/keys](https://openrouter.ai/keys). |
| `OPENROUTER_SITE_URL` | Optional. Sent as `HTTP-Referer` to OpenRouter for ranking. |
| `OPENROUTER_SITE_NAME` | Optional. Sent as `X-Title` to OpenRouter. |

## Model

`deepseek/deepseek-chat-v3-0324:free` via OpenRouter's chat completions endpoint. Swap the model in `app/api/generate/route.ts` to upgrade.

## Project structure

```
app/
  page.tsx              Landing page
  generator/page.tsx    Main generator
  api/generate/route.ts OpenRouter proxy
components/             UI building blocks
lib/
  tones.ts              Tone & platform catalog
  prompts.ts            System/user prompt builders + parser
```

## License

MIT.
