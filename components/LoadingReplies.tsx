export function LoadingReplies() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="glass rounded-2xl p-4 sm:p-5"
          style={{ animationDelay: `${i * 120}ms` }}
        >
          <div className="flex items-start gap-3">
            <div className="h-6 w-6 flex-none rounded-full shimmer-bar" />
            <div className="flex-1 space-y-2">
              <div className="h-3.5 w-[90%] rounded shimmer-bar" />
              <div className="h-3.5 w-[72%] rounded shimmer-bar" />
              <div className="h-3.5 w-[55%] rounded shimmer-bar" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
