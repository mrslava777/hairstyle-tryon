export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 text-xs text-zinc-500 md:flex-row md:px-8">
        <p>© {new Date().getFullYear()} AI Reply. Replies that sound like you.</p>
        <p className="flex items-center gap-1.5">
          Built with
          <span className="gradient-text font-semibold">DeepSeek</span>
          via OpenRouter.
        </p>
      </div>
    </footer>
  );
}
