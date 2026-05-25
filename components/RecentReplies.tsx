"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { History, Trash2 } from "lucide-react";
import { TONE_MAP, ToneId } from "@/lib/tones";

export interface RecentItem {
  id: string;
  message: string;
  tone: ToneId;
  replies: string[];
  createdAt: number;
}

const KEY = "aireply.recent.v1";
const MAX_ITEMS = 8;

export function loadRecent(): RecentItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw) as RecentItem[];
    return Array.isArray(arr) ? arr.slice(0, MAX_ITEMS) : [];
  } catch {
    return [];
  }
}

export function saveRecent(item: RecentItem) {
  if (typeof window === "undefined") return;
  const current = loadRecent();
  const next = [item, ...current.filter((x) => x.id !== item.id)].slice(
    0,
    MAX_ITEMS
  );
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // ignore quota / private mode
  }
}

export function clearRecent() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}

interface Props {
  onPick: (item: RecentItem) => void;
  refreshKey: number;
}

function timeAgo(ts: number): string {
  const s = Math.max(1, Math.floor((Date.now() - ts) / 1000));
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

export function RecentReplies({ onPick, refreshKey }: Props) {
  const [items, setItems] = useState<RecentItem[]>([]);

  useEffect(() => {
    setItems(loadRecent());
  }, [refreshKey]);

  if (items.length === 0) {
    return (
      <div className="glass rounded-2xl p-5 text-sm text-zinc-400">
        <div className="mb-1 flex items-center gap-2 text-zinc-300">
          <History size={15} />
          <span className="font-medium">Recent</span>
        </div>
        Your last generations will appear here. Stored locally, never sent
        anywhere.
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-zinc-200">
          <History size={15} />
          <span className="text-sm font-medium">Recent</span>
        </div>
        <button
          onClick={() => {
            clearRecent();
            setItems([]);
          }}
          className="inline-flex items-center gap-1 text-xs text-zinc-500 transition-colors hover:text-zinc-200"
        >
          <Trash2 size={12} />
          Clear
        </button>
      </div>
      <ul className="space-y-2">
        <AnimatePresence initial={false}>
          {items.map((it) => {
            const tone = TONE_MAP[it.tone];
            return (
              <motion.li
                key={it.id}
                layout
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
              >
                <button
                  onClick={() => onPick(it)}
                  className="group w-full rounded-xl border border-white/5 bg-white/[0.02] p-3 text-left transition-all hover:border-white/10 hover:bg-white/[0.05]"
                >
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <span className="chip">
                      <span aria-hidden>{tone?.emoji}</span>
                      {tone?.label ?? it.tone}
                    </span>
                    <span className="text-[11px] text-zinc-500">
                      {timeAgo(it.createdAt)}
                    </span>
                  </div>
                  <p className="line-clamp-2 text-sm text-zinc-300 group-hover:text-zinc-100">
                    {it.message}
                  </p>
                </button>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </div>
  );
}
