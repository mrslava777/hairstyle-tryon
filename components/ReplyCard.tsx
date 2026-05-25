"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";

interface Props {
  reply: string;
  index: number;
}

export function ReplyCard({ reply, index }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(reply);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard might be blocked on some browsers — silently ignore.
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: "easeOut" }}
      className="glass group relative overflow-hidden rounded-2xl p-4 sm:p-5"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(120deg, rgba(139,92,246,0.18), rgba(236,72,153,0.18))",
          mask: "linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)",
          WebkitMask:
            "linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: 1,
        }}
      />
      <div className="flex items-start gap-3">
        <span
          className="mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full text-[11px] font-semibold text-white"
          style={{
            background:
              "linear-gradient(135deg, rgba(139,92,246,0.9), rgba(236,72,153,0.9))",
          }}
        >
          {index + 1}
        </span>
        <p className="flex-1 whitespace-pre-wrap text-[15px] leading-relaxed text-zinc-100">
          {reply}
        </p>
        <button
          onClick={handleCopy}
          className={[
            "ml-1 inline-flex flex-none items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all",
            copied
              ? "bg-emerald-500/15 text-emerald-300"
              : "bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white",
          ].join(" ")}
          aria-label="Copy reply"
        >
          {copied ? (
            <>
              <Check size={14} /> Copied
            </>
          ) : (
            <>
              <Copy size={14} /> Copy
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
