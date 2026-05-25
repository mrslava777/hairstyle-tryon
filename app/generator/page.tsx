"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RefreshCw, Sparkles, Send, AlertCircle, X } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ToneSelector } from "@/components/ToneSelector";
import { PlatformSelector } from "@/components/PlatformSelector";
import { ReplyCard } from "@/components/ReplyCard";
import { LoadingReplies } from "@/components/LoadingReplies";
import {
  RecentReplies,
  RecentItem,
  saveRecent,
} from "@/components/RecentReplies";
import { TONE_MAP, ToneId, PlatformId } from "@/lib/tones";

const MAX_LEN = 2000;

export default function GeneratorPage() {
  const [message, setMessage] = useState("");
  const [tone, setTone] = useState<ToneId>("friendly");
  const [platform, setPlatform] = useState<PlatformId>("other");
  const [replies, setReplies] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recentKey, setRecentKey] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const charsLeft = MAX_LEN - message.length;
  const overLimit = charsLeft < 0;
  const canGenerate =
    !loading && message.trim().length > 0 && !overLimit;

  const activeTone = useMemo(() => TONE_MAP[tone], [tone]);

  // Autosize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 320) + "px";
  }, [message]);

  async function generate() {
    if (!canGenerate) return;
    setLoading(true);
    setError(null);
    setReplies([]);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: message.trim(),
          tone,
          platform,
        }),
      });

      const data = (await res.json()) as {
        replies?: string[];
        error?: string;
      };

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      const list = data.replies ?? [];
      setReplies(list);

      if (list.length > 0) {
        saveRecent({
          id: `${Date.now()}`,
          message: message.trim(),
          tone,
          replies: list,
          createdAt: Date.now(),
        });
        setRecentKey((k) => k + 1);
      }
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Network error. Check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      void generate();
    }
  }

  function handlePickRecent(item: RecentItem) {
    setMessage(item.message);
    setTone(item.tone);
    setReplies(item.replies);
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="relative min-h-screen">
      <Navbar />

      <section className="mx-auto grid max-w-6xl gap-6 px-5 pb-16 pt-8 md:grid-cols-[1fr_320px] md:px-8 md:pt-12">
        {/* Left column: input + replies */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="glass-strong relative rounded-3xl p-5 sm:p-6"
          >
            <div className="mb-4 flex items-center justify-between gap-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Step 1 · Their message
                </p>
                <h1 className="mt-1 text-xl font-semibold text-white sm:text-2xl">
                  Paste what they sent you
                </h1>
              </div>
              {message && (
                <button
                  onClick={() => {
                    setMessage("");
                    setReplies([]);
                    setError(null);
                  }}
                  className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1 text-xs text-zinc-400 hover:bg-white/10 hover:text-white"
                >
                  <X size={12} />
                  Clear
                </button>
              )}
            </div>

            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, MAX_LEN + 1))}
              onKeyDown={handleKeyDown}
              placeholder="e.g. Hey, what are you doing tonight?"
              className="block w-full resize-none rounded-2xl border border-white/8 bg-black/30 px-4 py-3.5 text-[15px] leading-relaxed text-zinc-100 placeholder:text-zinc-500 focus:border-fuchsia-400/40 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/20"
              rows={4}
              maxLength={MAX_LEN + 1}
              aria-label="Incoming message to reply to"
            />

            <div className="mt-2 flex items-center justify-between text-[11px] text-zinc-500">
              <span>⌘/Ctrl + Enter to generate</span>
              <span className={overLimit ? "text-rose-400" : ""}>
                {Math.max(0, charsLeft)} chars left
              </span>
            </div>

            <div className="mt-6">
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
                Step 2 · Pick a tone
              </p>
              <ToneSelector value={tone} onChange={setTone} disabled={loading} />
            </div>

            <div className="mt-5">
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
                Platform <span className="text-zinc-600">(optional)</span>
              </p>
              <PlatformSelector
                value={platform}
                onChange={setPlatform}
                disabled={loading}
              />
            </div>

            <div className="mt-7 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-zinc-500">
                Tone:{" "}
                <span className="font-medium text-zinc-300">
                  {activeTone.emoji} {activeTone.label}
                </span>{" "}
                · {activeTone.description}
              </p>
              <button
                onClick={generate}
                disabled={!canGenerate}
                className="btn-primary group"
              >
                {loading ? (
                  <>
                    <RefreshCw size={18} className="animate-spin" />
                    Generating…
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Generate Reply
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex items-start gap-3 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-200"
                role="alert"
              >
                <AlertCircle size={18} className="mt-0.5 flex-none" />
                <div className="flex-1">{error}</div>
                <button
                  onClick={() => setError(null)}
                  className="text-rose-300/70 hover:text-white"
                  aria-label="Dismiss"
                >
                  <X size={16} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Replies */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-sm font-medium text-zinc-300">
                <Sparkles size={15} className="text-fuchsia-300" />
                {loading
                  ? "Cooking up replies…"
                  : replies.length > 0
                    ? `${replies.length} options`
                    : "Your replies"}
              </h2>
              {replies.length > 0 && !loading && (
                <button
                  onClick={generate}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:bg-white/10 hover:text-white"
                >
                  <RefreshCw size={13} />
                  Regenerate
                </button>
              )}
            </div>

            {loading && <LoadingReplies />}

            {!loading && replies.length === 0 && !error && (
              <div className="glass rounded-2xl p-6 text-center text-sm text-zinc-400">
                <p className="mx-auto max-w-xs">
                  Paste a message above, pick a tone, and we'll write five
                  replies that sound like a real person.
                </p>
              </div>
            )}

            {!loading && replies.length > 0 && (
              <div className="space-y-3">
                {replies.map((r, i) => (
                  <ReplyCard key={`${recentKey}-${i}`} reply={r} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right column: recent */}
        <aside className="space-y-4 md:sticky md:top-20 md:self-start">
          <RecentReplies onPick={handlePickRecent} refreshKey={recentKey} />
        </aside>
      </section>

      <Footer />
    </main>
  );
}
