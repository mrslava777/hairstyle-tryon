"use client";

import { PLATFORMS, PlatformId } from "@/lib/tones";

interface Props {
  value: PlatformId;
  onChange: (id: PlatformId) => void;
  disabled?: boolean;
}

export function PlatformSelector({ value, onChange, disabled }: Props) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {PLATFORMS.map((p) => {
        const active = p.id === value;
        return (
          <button
            key={p.id}
            type="button"
            onClick={() => onChange(p.id)}
            disabled={disabled}
            className={[
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all",
              "border",
              active
                ? "border-white/25 bg-white/10 text-white"
                : "border-white/8 bg-white/[0.03] text-zinc-400 hover:border-white/15 hover:text-white",
              disabled ? "cursor-not-allowed opacity-60" : "",
            ].join(" ")}
            aria-pressed={active}
          >
            <span aria-hidden>{p.emoji}</span>
            {p.label}
          </button>
        );
      })}
    </div>
  );
}
