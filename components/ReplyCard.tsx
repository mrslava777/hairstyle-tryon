"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";

type Props = {
  text: string;
  index: number;
};

export default function ReplyCard({ text, index }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // ignore
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="glass group relative overflow-hidden p-4 transition-all duration-300 hover:border-white/20"
    >
      <div className="pointer-events-none absolute -inset-px -z-10 rounded-2xl bg-gradient-to-br from-violet-500/10 via-transparent to-pink-500/10 opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 whitespace-pre-wrap text-[15px] leading-relaxed text-zinc-100">
          {text}
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className={[
            "shrink-0 rounded-lg border border-white/10 bg-white/[0.04] p-2 transition-all duration-200",
            "hover:border-white/25 hover:bg-white/[0.08] active:scale-95",
            copied ? "text-emerald-300" : "text-zinc-300",
          ].join(" ")}
          aria-label="Copy reply"
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px] uppercase tracking-wider text-zinc-500">
        <span>Option {index + 1}</span>
        <span>{text.length} chars</span>
      </div>
    </motion.div>
  );
}
