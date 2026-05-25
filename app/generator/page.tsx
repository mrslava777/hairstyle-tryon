"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  RotateCw,
  Sparkles,
  Wand2,
} from "lucide-react";

import ToneSelector from "@/components/ToneSelector";
import PlatformSelect from "@/components/PlatformSelect";
import ReplyCard from "@/components/ReplyCard";
import LoadingReplies from "@/components/LoadingReplies";
import RecentReplies, { RecentItem } from "@/components/RecentReplies";
import { TONE_MAP, ToneId } from "@/lib/tones";
import { PlatformId } from "@/lib/platforms";

const STORAGE_KEY = "ai-reply.recent.v1";
const MAX_RECENT = 8;

export default function GeneratorPage() {
  const [message, setMessage] = useState("");
  const [tone, setTone] = useState<ToneId>("friendly");
  const [platform, setPlatform] = useState<PlatformId | "">("");
  const [replies, setReplies] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recent, setRecent] = useState<RecentItem[]>([]);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setRecent(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  const persistRecent = useCallback((items: RecentItem[]) => {
    setRecent(items);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, []);

  const canGenerate = message.trim().length > 0 && !loading;

  const generate = useCallback(
    async (opts?: { silent?: boolean }) => {
      const trimmed = message.trim();
      if (!trimmed || loading) return;

      abortRef.current?.abort();
      const ctrl = new AbortController();
      abortRef.current = ctrl;

      setLoading(true);
      setError(null);
      if (!opts?.silent) setReplies([]);

      try {
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: trimmed,
            tone,
            platform,
            count: 5,
          }),
          signal: ctrl.signal,
        });

        const data = (await res.json()) as {
          replies?: string[];
          error?: string;
        };

        if (!res.ok || !data.replies) {
          throw new Error(data.error ?? "Something went wrong.");
        }

        setReplies(data.replies);

        const item: RecentItem = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          ts: Date.now(),
          tone: TONE_MAP[tone].label,
          message: trimmed,
          replies: data.replies,
        };
        persistRecent([item, ...recent].slice(0, MAX_RECENT));
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        setError((err as Error).message || "Failed to generate replies.");
      } finally {
        setLoading(false);
      }
    },
    [message, tone, platform, loading, recent, persistRecent]
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generate();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      if (canGenerate) generate();
    }
  };

  const onSelectRecent = (item: RecentItem) => {
    setMessage(item.message);
    setReplies(item.replies);
    setError(null);
  };

  const charCount = message.length;
  const tooLong = charCount > 4000;

  const activeTone = useMemo(() => TONE_MAP[tone], [tone]);

  return (
    <main className="relative min-h-screen pb-24">
      <header className="sticky top-0 z-30 border-b border-white/5 bg-ink-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-300 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="font-semibold tracking-tight">AI Reply</span>
          </Link>
          <span className="chip">
            <Sparkles className="h-3 w-3 text-accent-violet" />
            DeepSeek · v3
          </span>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 px-5 py-6 sm:px-8 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-5">
          <form onSubmit={onSubmit} className="glass-strong p-5 sm:p-6">
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Incoming message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Paste the message you want to reply to…"
              rows={6}
              className="w-full resize-y rounded-xl border border-white/10 bg-ink-900/60 p-4 text-[15px] leading-relaxed text-zinc-100 placeholder:text-zinc-500 focus:border-violet-400/40 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
            />
            <div className="mt-1 flex items-center justify-between text-xs">
              <span className="text-zinc-500">⌘/Ctrl + Enter to generate</span>
              <span
                className={tooLong ? "text-rose-300" : "text-zinc-500"}
              >
                {charCount} / 4000
              </span>
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Platform <span className="text-zinc-500">(optional)</span>
              </label>
              <PlatformSelect
                value={platform}
                onChange={setPlatform}
                disabled={loading}
              />
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Tone
              </label>
              <ToneSelector
                value={tone}
                onChange={setTone}
                disabled={loading}
              />
              <p className="mt-2 text-xs text-zinc-500">
                {activeTone.emoji} {activeTone.description}
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={!canGenerate || tooLong}
                className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Wand2 className="h-4 w-4" />
                {loading ? "Generating…" : "Generate Reply"}
              </button>

              {replies.length > 0 && !loading && (
                <button
                  type="button"
                  onClick={() => generate()}
                  className="btn-ghost"
                >
                  <RotateCw className="h-4 w-4" />
                  Regenerate
                </button>
              )}
            </div>
          </form>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="flex items-start gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-200"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <section className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
                Generated replies
              </h2>
              {replies.length > 0 && (
                <span className="text-xs text-zinc-500">
                  {replies.length} options
                </span>
              )}
            </div>

            {loading ? (
              <LoadingReplies count={4} />
            ) : replies.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="flex flex-col gap-3">
                {replies.map((r, i) => (
                  <ReplyCard key={`${i}-${r.slice(0, 10)}`} text={r} index={i} />
                ))}
              </div>
            )}
          </section>
        </div>

        <aside className="flex flex-col gap-5">
          <div className="glass p-5">
            <div className="mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent-violet" />
              <h3 className="text-sm font-semibold">How it works</h3>
            </div>
            <ol className="space-y-1.5 text-sm text-zinc-400">
              <li>1. Paste an incoming message</li>
              <li>2. Choose your platform & tone</li>
              <li>3. Get 5 instant reply options</li>
              <li>4. Tap to copy. Send. Done.</li>
            </ol>
          </div>

          <RecentReplies
            items={recent}
            onClear={() => persistRecent([])}
            onSelect={onSelectRecent}
          />

          <div className="glass p-5 text-xs text-zinc-500">
            Your messages are sent only when you tap generate, and are not stored
            on a server. Recent history lives in your browser.
          </div>
        </aside>
      </div>
    </main>
  );
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass flex flex-col items-center justify-center gap-3 p-10 text-center"
    >
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-pink-500/20 ring-1 ring-white/10">
        <Wand2 className="h-5 w-5 text-accent-violet" />
      </div>
      <h3 className="text-base font-semibold">Ready when you are</h3>
      <p className="max-w-xs text-sm text-zinc-400">
        Paste a message above, pick a tone, and we'll generate 5 reply options
        for you.
      </p>
    </motion.div>
  );
}
