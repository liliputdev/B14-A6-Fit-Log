"use client";
import { useState } from "react";
import { Plus, Bookmark } from "lucide-react";
import { usePlan } from "@/context/PlanContext";

export default function WorkoutActions({ workout }) {
  const { addToPlan, addToSaved, isPlanFull, plan, saved } = usePlan();
  const [toast, setToast] = useState(null);

  const alreadyInPlan = plan.some((w) => w.id === workout.id);
  const alreadySaved = saved.some((w) => w.id === workout.id);

  function showToast(message) {
    setToast(message);
    setTimeout(() => setToast(null), 2200);
  }

  function handleAddToPlan() {
    if (alreadyInPlan) return;
    const added = addToPlan(workout);
    showToast(added ? "Added to today's plan" : "Plan is full (5 lifts max)");
  }

  function handleSave() {
    if (alreadySaved) return;
    addToSaved(workout);
    showToast("Saved for later");
  }

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <button
        onClick={handleAddToPlan}
        disabled={alreadyInPlan || isPlanFull}
        className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold uppercase transition-colors ${
          alreadyInPlan || isPlanFull
            ? "cursor-not-allowed bg-white/10 text-zinc-500"
            : "bg-[#ccff00] text-black hover:brightness-95"
        }`}
      >
        <Plus className="h-4 w-4" />
        {alreadyInPlan ? "In Today's Plan" : "Add to today's plan"}
      </button>

      <button
        onClick={handleSave}
        disabled={alreadySaved}
        className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-bold uppercase transition-colors ${
          alreadySaved
            ? "cursor-not-allowed border-white/10 text-zinc-500"
            : "border-white/20 text-white hover:border-white/40"
        }`}
      >
        <Bookmark className="h-4 w-4" />
        {alreadySaved ? "Saved" : "Save for later"}
      </button>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}