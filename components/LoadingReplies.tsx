"use client";

import { motion } from "framer-motion";

export default function LoadingReplies({ count = 3 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.08 }}
          className="glass relative overflow-hidden p-4"
        >
          <div className="space-y-2">
            <div className="shimmer-bg animate-shimmer h-3 w-[88%] rounded" />
            <div className="shimmer-bg animate-shimmer h-3 w-[72%] rounded" />
            <div className="shimmer-bg animate-shimmer h-3 w-[40%] rounded" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
