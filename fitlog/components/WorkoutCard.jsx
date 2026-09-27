import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";

export default function WorkoutCard({ workout }) {
  const {
    id,
    name,
    image,
    muscleGroups = [],
    equipment,
    duration,
    caloriesBurned,
    rating,
  } = workout;

  return (
    <Link
      href={`/workout/${id}`}
      className="group block overflow-hidden rounded-2xl border border-white/5 bg-[#111214] transition-colors hover:border-[#ccff00]/40"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {Array.isArray(muscleGroups) &&
            muscleGroups.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#ccff00]/50 bg-black/70 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-[#ccff00] backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-base font-black uppercase leading-snug tracking-wide text-white">
          {name}
        </h3>

        <p className="mt-1 text-sm text-zinc-500">
          {equipment}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-zinc-400">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {duration} min
          </span>

          <span className="flex items-center gap-1">
            <Flame className="h-4 w-4" />
            {caloriesBurned} kcal
          </span>

          <span className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-[#ccff00] text-[#ccff00]" />
            {rating}
          </span>
        </div>
      </div>
    </Link>
  );
}