"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  MessageCircle,
  Zap,
  Wand2,
  Copy,
  Heart,
  Briefcase,
} from "lucide-react";
import { TONES } from "@/lib/tones";

const EXAMPLES = [
  {
    platform: "Tinder",
    emoji: "🔥",
    incoming: "Hey, what are you doing tonight?",
    reply: "About to find out apparently — what did you have in mind? 😉",
    tone: "Flirty",
    color: "from-pink-500/30 to-fuchsia-500/20",
  },
  {
    platform: "Email",
    emoji: "📧",
    incoming: "Following up on the proposal — any update?",
    reply:
      "Thanks for the nudge. Final version landing in your inbox by EOD.",
    tone: "Professional",
    color: "from-indigo-500/30 to-violet-500/20",
  },
  {
    platform: "WhatsApp",
    emoji: "💬",
    incoming: "You free this weekend?",
    reply: "Free-ish. Pitch me something good.",
    tone: "Confident",
    color: "from-cyan-500/30 to-sky-500/20",
  },
];

const FEATURES = [
  {
    icon: Wand2,
    title: "8 distinct tones",
    desc: "From flirty to CEO. Pick the vibe — AI nails the voice.",
  },
  {
    icon: Zap,
    title: "Instant generation",
    desc: "Multiple reply options in seconds. Streamed to you.",
  },
  {
    icon: Copy,
    title: "One-tap copy",
    desc: "Tap. Paste. Done. Your reply game just got 10× faster.",
  },
];

export default function LandingPage() {
  return (
    <main className="relative overflow-hidden">
      <BgGlow />

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2">
          <LogoMark />
          <span className="text-base font-semibold tracking-tight">
            AI Reply
          </span>
        </Link>
        <Link
          href="/generator"
          className="btn-ghost text-sm"
        >
          Open app
          <ArrowRight className="h-4 w-4" />
        </Link>
      </header>

      <section className="relative z-10 mx-auto max-w-6xl px-5 pb-16 pt-12 sm:px-8 sm:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center text-center"
        >
          <span className="chip mb-6">
            <Sparkles className="h-3.5 w-3.5 text-accent-violet" />
            Powered by DeepSeek via OpenRouter
          </span>

          <h1 className="text-balance text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            Reply smarter <br className="hidden sm:block" />
            with <span className="gradient-text">AI</span>
          </h1>

          <p className="mt-5 max-w-xl text-balance text-base text-zinc-400 sm:text-lg">
            Generate perfect replies instantly. Paste any message from
            Telegram, WhatsApp, Tinder or email — pick a tone — get replies
            that actually sound like you.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <Link href="/generator" className="btn-primary group">
              Try Free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a href="#examples" className="btn-ghost">
              See examples
            </a>
          </div>

          <p className="mt-4 text-xs text-zinc-500">
            No signup • Free forever tier • Your messages never leave the request
          </p>
        </motion.div>

        <PlatformBar />
      </section>

      <section
        id="examples"
        className="relative z-10 mx-auto max-w-6xl px-5 pb-16 sm:px-8 sm:pb-24"
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Real messages. <span className="gradient-text">Better replies.</span>
          </h2>
          <p className="mt-2 max-w-md text-sm text-zinc-400">
            A peek at what AI Reply produces. Try your own in the app.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {EXAMPLES.map((ex, i) => (
            <motion.div
              key={ex.platform}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass relative overflow-hidden p-5"
            >
              <div
                className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br ${ex.color} opacity-60`}
              />
              <div className="flex items-center justify-between">
                <span className="chip">
                  <span>{ex.emoji}</span>
                  {ex.platform}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-zinc-400">
                  {ex.tone}
                </span>
              </div>

              <div className="mt-4 flex flex-col gap-3">
                <Bubble side="left">{ex.incoming}</Bubble>
                <Bubble side="right">{ex.reply}</Bubble>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-5 pb-20 sm:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="glass p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20"
            >
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/30 to-pink-500/20 ring-1 ring-white/10">
                <f.icon className="h-5 w-5 text-accent-violet" />
              </div>
              <h3 className="text-base font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-zinc-400">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-5 pb-20 sm:px-8">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Eight tones. <span className="gradient-text">One tap.</span>
          </h2>
        </div>
        <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-2">
          {TONES.map((t, i) => (
            <motion.span
              key={t.id}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              className="chip transition-all hover:border-white/25 hover:bg-white/[0.07]"
            >
              <span>{t.emoji}</span>
              {t.label}
            </motion.span>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-4xl px-5 pb-24 sm:px-8">
        <div className="glass-strong relative overflow-hidden p-8 text-center sm:p-12">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-hero-gradient opacity-[0.08]" />
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Never stare at the chat box again.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-zinc-400">
            Paste the message. Pick the vibe. Send the reply. That's it.
          </p>
          <Link
            href="/generator"
            className="btn-primary group mt-6"
          >
            Start generating
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>

      <footer className="relative z-10 mx-auto max-w-6xl px-5 pb-10 text-center text-xs text-zinc-500 sm:px-8">
        © {new Date().getFullYear()} AI Reply · Built with Next.js & DeepSeek
      </footer>
    </main>
  );
}

function BgGlow() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(167,139,250,0.55), transparent)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 right-0 -z-10 h-[480px] w-[600px] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(244,114,182,0.45), transparent)",
        }}
      />
    </>
  );
}

function LogoMark() {
  return (
    <div className="relative h-8 w-8">
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-violet-500 to-pink-500 shadow-glow" />
      <div className="absolute inset-[2px] rounded-[7px] bg-ink-950" />
      <MessageCircle className="absolute inset-0 m-auto h-4 w-4 text-white" />
    </div>
  );
}

function Bubble({
  children,
  side,
}: {
  children: React.ReactNode;
  side: "left" | "right";
}) {
  const right = side === "right";
  return (
    <div className={`flex ${right ? "justify-end" : "justify-start"}`}>
      <div
        className={[
          "max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed",
          right
            ? "bg-gradient-to-br from-violet-500/80 to-pink-500/80 text-white shadow-[0_8px_24px_-12px_rgba(167,139,250,0.6)]"
            : "border border-white/10 bg-white/[0.04] text-zinc-200",
        ].join(" ")}
      >
        {children}
      </div>
    </div>
  );
}

function PlatformBar() {
  const items = [
    { label: "Telegram", emoji: "✈️" },
    { label: "WhatsApp", emoji: "💬" },
    { label: "Instagram", emoji: "📸" },
    { label: "Tinder", emoji: "🔥" },
    { label: "Email", emoji: "📧" },
    { label: "Hinge", emoji: "💘" },
  ];
  return (
    <div className="mt-14 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      <span className="text-xs uppercase tracking-widest text-zinc-500">
        Works on
      </span>
      {items.map((p) => (
        <span key={p.label} className="chip">
          <span>{p.emoji}</span>
          {p.label}
        </span>
      ))}
    </div>
  );
}
