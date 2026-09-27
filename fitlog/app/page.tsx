import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Library from "@/components/Library";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#08090a] text-white">
      <Navbar />
      <Hero />
      <Library />
      <Footer />
    </main>
  );
}