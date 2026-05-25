"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Logo } from "./Logo";

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-40 w-full"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <Logo />
        <nav className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/generator"
            className="hidden text-sm font-medium text-zinc-400 transition-colors hover:text-white sm:inline-flex"
          >
            Generator
          </Link>
          <Link href="/generator" className="btn-ghost text-sm">
            Open app
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}
