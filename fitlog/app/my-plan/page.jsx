"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Clock, Flame, Star, ChevronDown, Check, X } from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SORT_OPTIONS = ["Duration", "Calories", "Rating"];

export default function MyPlanPage() {
  const { plan, saved, hydrated, removeFromPlan, removeFromSaved, markDone } =
    usePlan();
  const [activeTab, setActiveTab] = useState("today");
  const [sortBy, setSortBy] = useState("Duration");
  const [sortOpen, setSortOpen] = useState(false);
  const [toast, setToast] = useState(null);

  function showToast(message) {
    setToast(message);
    setTimeout(() => setToast(null), 2200);
  }

  const list = activeTab === "today" ? plan : saved;

  const sortedList = useMemo(() => {
    const copy = [...list];
    if (sortBy === "Duration") copy.sort((a, b) => a.duration - b.duration);
    if (sortBy === "Calories")
      copy.sort((a, b) => a.caloriesBurned - b.caloriesBurned);
    if (sortBy === "Rating") copy.sort((a, b) => b.rating - a.rating);
    return copy;
  }, [list, sortBy]);

  const totals = useMemo(
    () =>
      plan.reduce(
        (acc, w) => ({
          exercises: acc.exercises + 1,
          minutes: acc.minutes + w.duration,
          calories: acc.calories + w.caloriesBurned,
        }),
        { exercises: 0, minutes: 0, calories: 0 }
      ),
    [plan]
  );

  function handleRemove(id) {
    if (activeTab === "today") removeFromPlan(id);
    else removeFromSaved(id);
    showToast("Removed");
  }

  function handleMarkDone(id) {
    markDone(id);
    showToast("Marked as done");
  }

  return (
    <main className="min-h-screen bg-[#08090a] text-white flex flex-col">
      <Navbar active="my-plan" />

      <div className="flex-1 px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-3xl font-black uppercase">My Plan</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Cap of five lifts for today. Finish them, then load more.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4">
            <MetricCard label="Exercises" value={totals.exercises} />
            <MetricCard label="Minutes" value={totals.minutes} />
            <MetricCard label="Calories" value={totals.calories} />
          </div>

          <div className="mt-8 flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex gap-2">
              <TabButton
                label="Today's Plan"
                active={activeTab === "today"}
                onClick={() => setActiveTab("today")}
              />
              <TabButton
                label="Saved"
                active={activeTab === "saved"}
                onClick={() => setActiveTab("saved")}
              />
            </div>

            <div className="relative">
              <button
                onClick={() => setSortOpen((o) => !o)}
                className="flex items-center gap-1 text-sm text-zinc-400 hover:text-white"
              >
                Sort By <span className="text-white">{sortBy}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {sortOpen && (
                <div className="absolute right-0 z-10 mt-2 w-36 rounded-lg border border-white/10 bg-[#16171a] shadow-lg">
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setSortBy(opt);
                        setSortOpen(false);
                      }}
                      className="block w-full px-4 py-2 text-left text-sm text-zinc-300 hover:bg-white/5"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-6">
            {!hydrated ? (
              <p className="py-16 text-center text-zinc-500">
                Loading workouts…
              </p>
            ) : sortedList.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="space-y-3">
                {sortedList.map((workout) => (
                  <PlanRow
                    key={workout.id}
                    workout={workout}
                    isToday={activeTab === "today"}
                    onRemove={() => handleRemove(workout.id)}
                    onMarkDone={() => handleMarkDone(workout.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black shadow-lg">
          {toast}
        </div>
      )}
    </main>
  );
}

function MetricCard({ label, value }) {
  return (
    <div className="rounded-xl border border-white/5 bg-[#111214] px-5 py-4">
      <p className="text-xs uppercase tracking-wide text-zinc-500">{label}</p>
      <p className="mt-1 text-2xl font-black">{value}</p>
    </div>
  );
}

function TabButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
        active ? "bg-[#ccff00] text-black" : "text-zinc-400 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-white/5 bg-[#111214] py-20 text-center">
      <h3 className="text-lg font-black uppercase tracking-wide">
        Nothing Here Yet
      </h3>
      <p className="mt-2 max-w-xs text-sm text-zinc-500">
        Browse the library and add a lift to get today moving.
      </p>
      <Link
        href="/#library"
        className="mt-5 rounded-full bg-[#ccff00] px-5 py-2 text-sm font-bold uppercase text-black"
      >
        Go to workouts
      </Link>
    </div>
  );
}

function PlanRow({ workout, isToday, onRemove, onMarkDone }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-white/5 bg-[#111214] p-3">
      <img
        src={workout.image}
        alt={workout.name}
        className="h-16 w-16 flex-shrink-0 rounded-lg object-cover"
      />

      <div className="min-w-0 flex-1">
        <h4 className="truncate text-sm font-bold uppercase">
          {workout.name}
        </h4>
        <p className="text-xs text-zinc-500">{workout.equipment}</p>
        <div className="mt-1 flex items-center gap-3 text-xs text-zinc-400">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame className="h-3.5 w-3.5" /> {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-[#ccff00] text-[#ccff00]" />
            {workout.rating}
          </span>
        </div>
      </div>

      <div className="flex flex-shrink-0 items-center gap-2">
        <Link
          href={`/workout/${workout.id}`}
          className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:border-white/40"
        >
          View Details
        </Link>

        {isToday && (
          <button
            onClick={onMarkDone}
            className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold ${
              workout.done
                ? "bg-white/10 text-zinc-400"
                : "bg-[#ccff00] text-black"
            }`}
          >
            <Check className="h-3.5 w-3.5" />
            {workout.done ? "Done" : "Mark as Done"}
          </button>
        )}

        <button
          onClick={onRemove}
          aria-label="Remove"
          className="rounded-full p-1.5 text-zinc-500 hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}