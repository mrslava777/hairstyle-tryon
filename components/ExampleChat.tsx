"use client";

import { motion } from "framer-motion";

interface Bubble {
  from: "them" | "you";
  text: string;
  tone?: string;
}

interface Props {
  title: string;
  platform: string;
  emoji: string;
  bubbles: Bubble[];
  delay?: number;
}

export function ExampleChat({ title, platform, emoji, bubbles, delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      whileHover={{ y: -4 }}
      className="glass relative overflow-hidden rounded-3xl p-5 transition-shadow hover:shadow-glow"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-base"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
            aria-hidden
          >
            {emoji}
          </span>
          <div>
            <p className="text-sm font-semibold text-white">{title}</p>
            <p className="text-[11px] text-zinc-400">{platform}</p>
          </div>
        </div>
        <span className="chip">live demo</span>
      </div>

      <div className="space-y-2.5">
        {bubbles.map((b, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: b.from === "you" ? 12 : -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: delay + 0.2 + i * 0.15, duration: 0.4 }}
            className={`flex ${b.from === "you" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={[
                "relative max-w-[82%] rounded-2xl px-3.5 py-2 text-[13.5px] leading-snug",
                b.from === "you"
                  ? "rounded-br-md text-white"
                  : "rounded-bl-md bg-white/[0.06] text-zinc-200",
              ].join(" ")}
              style={
                b.from === "you"
                  ? {
                      backgroundImage:
                        "linear-gradient(135deg, #8b5cf6, #d946ef)",
                      boxShadow: "0 8px 22px -10px rgba(217,70,239,0.55)",
                    }
                  : undefined
              }
            >
              {b.text}
              {b.from === "you" && b.tone && (
                <span className="absolute -bottom-2 right-2 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white/80 backdrop-blur">
                  {b.tone}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
