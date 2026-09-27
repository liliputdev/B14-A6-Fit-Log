export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row lg:px-8">
        
        {/* Logo + Brand */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#000000] rotate-135">
            <img
              src="/logo.png"
              alt="FitLog logo"
              className="h-5 w-5 object-contain"
            />
          </div>

          <span className="text-lg font-bold uppercase tracking-wide text-white">
            FitLog
          </span>
        </div>

        {/* Copyright */}
        <p className="text-center text-sm text-gray-400 sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
}