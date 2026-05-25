"use client";

import { motion } from "framer-motion";
import { TONES, ToneId } from "@/lib/tones";

interface Props {
  value: ToneId;
  onChange: (id: ToneId) => void;
  disabled?: boolean;
}

export function ToneSelector({ value, onChange, disabled }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {TONES.map((tone) => {
        const active = tone.id === value;
        return (
          <motion.button
            key={tone.id}
            type="button"
            onClick={() => onChange(tone.id)}
            disabled={disabled}
            whileTap={{ scale: 0.96 }}
            whileHover={{ y: -1 }}
            className={[
              "group relative overflow-hidden rounded-full px-4 py-2 text-sm font-medium transition-all",
              "border",
              active
                ? "border-white/20 text-white"
                : "border-white/8 text-zinc-300 hover:border-white/15 hover:text-white",
              disabled ? "cursor-not-allowed opacity-60" : "",
            ].join(" ")}
            style={
              active
                ? {
                    backgroundImage:
                      "linear-gradient(135deg, rgba(139,92,246,0.35), rgba(217,70,239,0.25), rgba(236,72,153,0.25))",
                    boxShadow:
                      "0 8px 28px -10px rgba(217,70,239,0.55), inset 0 1px 0 rgba(255,255,255,0.18)",
                  }
                : {
                    background: "rgba(255,255,255,0.04)",
                  }
            }
            aria-pressed={active}
          >
            <span className="mr-1.5" aria-hidden>
              {tone.emoji}
            </span>
            {tone.label}
          </motion.button>
        );
      })}
    </div>
  );
}
