"use client";

import { motion } from "framer-motion";
import { TONES, ToneId } from "@/lib/tones";

type Props = {
  value: ToneId;
  onChange: (id: ToneId) => void;
  disabled?: boolean;
};

export default function ToneSelector({ value, onChange, disabled }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {TONES.map((tone) => {
        const active = tone.id === value;
        return (
          <motion.button
            key={tone.id}
            type="button"
            disabled={disabled}
            onClick={() => onChange(tone.id)}
            whileTap={{ scale: 0.96 }}
            className={[
              "group inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-sm transition-all duration-200",
              active
                ? "border-transparent bg-gradient-to-r from-violet-500/90 to-pink-500/90 text-white shadow-[0_8px_24px_-12px_rgba(167,139,250,0.7)]"
                : "border-white/10 bg-white/[0.04] text-zinc-300 hover:border-white/20 hover:bg-white/[0.07]",
              disabled ? "cursor-not-allowed opacity-60" : "",
            ].join(" ")}
            title={tone.description}
          >
            <span className="text-base leading-none">{tone.emoji}</span>
            <span className="font-medium">{tone.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
