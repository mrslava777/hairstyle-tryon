import Link from "next/link";

export function Logo({ size = 28 }: { size?: number }) {
  return (
    <Link
      href="/"
      className="group flex items-center gap-2.5"
      aria-label="AI Reply home"
    >
      <span
        className="relative inline-flex items-center justify-center rounded-xl shadow-glow transition-transform group-hover:scale-105"
        style={{
          width: size,
          height: size,
          background:
            "linear-gradient(135deg, #8b5cf6 0%, #d946ef 50%, #ec4899 100%)",
        }}
      >
        <svg
          width={size * 0.62}
          height={size * 0.62}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 12C4 7.58 7.58 4 12 4s8 3.58 8 8-3.58 8-8 8c-1.04 0-2.04-.2-2.95-.56L4 20l1.04-3.39A7.95 7.95 0 0 1 4 12Z"
            stroke="white"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M8.5 11.5h7M8.5 14h4.5"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="text-[15px] font-semibold tracking-tight">
        AI <span className="gradient-text">Reply</span>
      </span>
    </Link>
  );
}
