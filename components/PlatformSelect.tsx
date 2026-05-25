"use client";

import { PLATFORMS, PlatformId } from "@/lib/platforms";

type Props = {
  value: PlatformId | "";
  onChange: (id: PlatformId | "") => void;
  disabled?: boolean;
};

export default function PlatformSelect({ value, onChange, disabled }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange("")}
        className={[
          "rounded-full border px-3 py-1 text-xs transition-all",
          value === ""
            ? "border-white/25 bg-white/[0.08] text-white"
            : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/20",
        ].join(" ")}
      >
        Any
      </button>
      {PLATFORMS.map((p) => (
        <button
          key={p.id}
          type="button"
          disabled={disabled}
          onClick={() => onChange(p.id)}
          className={[
            "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs transition-all",
            value === p.id
              ? "border-white/25 bg-white/[0.08] text-white"
              : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/20",
          ].join(" ")}
        >
          <span>{p.emoji}</span>
          {p.label}
        </button>
      ))}
    </div>
  );
}
