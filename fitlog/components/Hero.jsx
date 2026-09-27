import Link from "next/link";

export default function Hero() {
  return (
    <section className="px-6 pt-8 lg:px-8">
      <div className="mx-auto flex max-w-7xl min-h-[448px] items-center overflow-hidden rounded-2xl border border-zinc-800 bg-[#15171c]">

        {/* Left Content */}
        <div className="w-full px-8 py-12 sm:px-12 lg:w-1/2 lg:px-14">

          {/* Eyebrow */}
          <p className="mb-6 text-sm font-bold tracking-wider text-[#ccff00]">
            WORKOUT LIBRARY
          </p>

          {/* Heading */}
          <h1 className="max-w-2xl text-5xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-[64px]">
            TRAIN WITH INTENT. LOG EVERY SET.
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today's plan, and watch the week's work add up.
          </p>

          {/* CTA */}
          <Link
            href="#library"
            className="mt-7 inline-flex items-center justify-center rounded-md bg-[#ccff00] px-6 py-3 text-sm font-bold uppercase text-black transition hover:bg-[#b8e600]"
          >
            Browse Workouts
          </Link>

        </div>

        {/* Right Image */}
<div className="hidden h-full w-1/2 items-center justify-center lg:flex">
  <img
    src="/banner.png"
    alt="Workout illustration"
    className="max-h-[390px] w-auto object-contain"
  />
</div>

      </div>
    </section>
  );
}