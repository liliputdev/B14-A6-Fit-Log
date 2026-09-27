"use client";

import { createContext, useContext, useEffect, useState } from "react";

const PlanContext = createContext(null);

const PLAN_CAP = 5;

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  // Load saved data
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("fitlog-plan");
      const storedSaved = localStorage.getItem("fitlog-saved");

      if (storedPlan) {
        setPlan(JSON.parse(storedPlan));
      }

      if (storedSaved) {
        setSaved(JSON.parse(storedSaved));
      }
    } catch (error) {
      console.error("Failed to load FitLog data:", error);
    }

    setHydrated(true);
  }, []);

  // Save plan
  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }, [plan, hydrated]);

  // Save saved workouts
  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [saved, hydrated]);

  function addToPlan(workout) {
    if (!hydrated) return false;

    if (plan.some((item) => item.id === workout.id)) {
      return false;
    }

    if (plan.length >= PLAN_CAP) {
      return false;
    }

    setPlan((prev) => [
      ...prev,
      {
        ...workout,
        done: false,
      },
    ]);

    return true;
  }

  function addToSaved(workout) {
    if (!hydrated) return false;

    if (saved.some((item) => item.id === workout.id)) {
      return false;
    }

    setSaved((prev) => [...prev, workout]);

    return true;
  }

  function removeFromPlan(id) {
    setPlan((prev) => prev.filter((workout) => workout.id !== id));
  }

  function removeFromSaved(id) {
    setSaved((prev) => prev.filter((workout) => workout.id !== id));
  }

  function markDone(id) {
    setPlan((prev) =>
      prev.map((workout) =>
        workout.id === id
          ? {
              ...workout,
              done: !workout.done,
            }
          : workout
      )
    );
  }

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        hydrated,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        markDone,
        isPlanFull: plan.length >= PLAN_CAP,
        PLAN_CAP,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error("usePlan must be used inside <PlanProvider>");
  }

  return context;
}