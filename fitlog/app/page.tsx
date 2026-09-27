import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#08090a] text-white">
      <Hero />

      <section id="library" className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-4xl font-black uppercase">
            THE LIBRARY
          </h2>

          <p className="mt-2 text-zinc-400">
            Twelve lifts covering every major muscle group.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}