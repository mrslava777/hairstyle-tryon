"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Clock, Trash2 } from "lucide-react";

export type RecentItem = {
  id: string;
  ts: number;
  tone: string;
  message: string;
  replies: string[];
};

type Props = {
  items: RecentItem[];
  onClear: () => void;
  onSelect: (item: RecentItem) => void;
};

export default function RecentReplies({ items, onClear, onSelect }: Props) {
  if (items.length === 0) return null;

  return (
    <div className="glass p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-zinc-300">
          <Clock className="h-4 w-4 text-accent-violet" />
          Recent
        </div>
        <button
          onClick={onClear}
          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-zinc-400 transition-colors hover:bg-white/[0.05] hover:text-zinc-200"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Clear
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <AnimatePresence initial={false}>
          {items.map((item) => (
            <motion.button
              key={item.id}
              layout
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              onClick={() => onSelect(item)}
              className="group flex flex-col items-start rounded-lg border border-white/5 bg-white/[0.02] p-2.5 text-left transition-colors hover:border-white/15 hover:bg-white/[0.05]"
            >
              <div className="flex w-full items-center justify-between">
                <span className="chip">{item.tone}</span>
                <span className="text-[10px] text-zinc-500">
                  {timeAgo(item.ts)}
                </span>
              </div>
              <p className="mt-1.5 line-clamp-2 text-xs text-zinc-400">
                {item.message}
              </p>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function timeAgo(ts: number) {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}
