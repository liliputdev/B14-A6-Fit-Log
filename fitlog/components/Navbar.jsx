"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isWorkoutActive = pathname === "/";
  const isPlanActive = pathname === "/my-plan";

  return (
    <header className="border-b border-zinc-800 bg-[#08090a]">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gpa-4">
          <img
            src="/logo.png"
            alt="FitLog"
            className="h-9 w-auto object-contain"
          />
            <span className="text-xl font-bold tracking-tight text-white">
    FITLOG
  </span>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/"
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              isWorkoutActive
                ? "bg-[#182400] text-[#ccff00]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              isPlanActive
                ? "bg-[#182400] text-[#ccff00]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </div>

        {/* Counters */}
        <div className="flex items-center gap-4">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-sm text-zinc-300"
          >
            <span>Plan</span>

            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#ccff00] px-2 text-xs font-bold text-black">
              0
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-sm text-zinc-300"
          >
            <span>Saved</span>

            <span className="flex h-6 min-w-6 items-center justify-center rounded-full border border-zinc-700 px-2 text-xs font-medium text-zinc-300">
              0
            </span>
          </Link>
        </div>

      </nav>
    </header>
  );
}