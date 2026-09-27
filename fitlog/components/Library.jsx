import WorkoutCard from "./WorkoutCard";

async function getWorkouts() {
  try {
    const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const data = await res.json();

    console.log("Workout API:", data);

    // Handle API returning either an array or { workouts: [...] }
    if (Array.isArray(data)) {
      return data;
    }

    if (Array.isArray(data.workouts)) {
      return data.workouts;
    }

    return [];
  } catch (error) {
    console.error("Failed to fetch workouts:", error);
    return [];
  }
}

export default async function Library() {
  const workouts = await getWorkouts();

  return (
    <section id="library" className="px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-4xl font-black uppercase text-white">
          THE LIBRARY
        </h2>

        <p className="mt-2 text-zinc-400">
          Twelve lifts covering every major muscle group.
        </p>

        {workouts.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {workouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
              />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-zinc-500">
            No workouts available right now.
          </p>
        )}
      </div>
    </section>
  );
}