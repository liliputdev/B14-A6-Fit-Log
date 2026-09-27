import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WorkoutActions from "@/components/WorkoutActions";

async function getWorkout(id) {
  const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function WorkoutDetailPage({ params }) {
  const { id } = await params;
  const workout = await getWorkout(id);

  if (!workout) {
    notFound();
  }

  const {
    name,
    image,
    description,
    muscleGroups = [],
    equipment,
    difficulty,
    sets,
    reps,
    duration,
    caloriesBurned,
    rating,
    instructions = [],
  } = workout;

  const specs = [
    { label: "Equipment", value: equipment },
    { label: "Difficulty", value: difficulty },
    { label: "Sets", value: sets },
    { label: "Reps", value: reps },
    { label: "Duration", value: `${duration} min` },
    { label: "Calories", value: `${caloriesBurned} kcal` },
    { label: "Rating", value: rating },
  ];

  return (
    <main className="min-h-screen bg-[#08090a] text-white flex flex-col">
      <Navbar active="workouts" />

      <div className="flex-1 px-6 py-12 lg:px-8">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Left: image */}
          <div className="aspect-square overflow-hidden rounded-2xl lg:aspect-auto lg:h-full">
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Right: details */}
          <div>
            <h1 className="text-3xl font-black uppercase">{name}</h1>
            <p className="mt-3 max-w-lg text-sm text-zinc-400">
              {description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {muscleGroups.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#ccff00] px-3 py-1 text-xs font-bold uppercase text-black"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Specs panel */}
            <div className="mt-6 divide-y divide-white/5 rounded-xl border border-white/10 bg-[#111214]">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-center justify-between px-5 py-3 text-sm"
                >
                  <span className="text-xs uppercase tracking-wide text-zinc-500">
                    {spec.label}
                  </span>
                  <span className="font-semibold">{spec.value}</span>
                </div>
              ))}
            </div>

            {/* Instructions */}
            <div className="mt-8">
              <h2 className="text-sm font-bold uppercase tracking-wide text-zinc-300">
                Instructions
              </h2>
              <ol className="mt-3 space-y-2">
                {instructions.map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm text-zinc-400">
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <WorkoutActions workout={workout} />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}