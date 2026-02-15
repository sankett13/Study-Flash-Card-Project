import Features from "@/components/home/Features";
import HomeHero from "@/components/home/HomeHero";
import ProblemSolution from "@/components/home/ProblemSolution";
import FAQ from "@/components/home/FAQ";
import WantToContribute from "@/components/home/WantToContribute";

export default function LandingPage() {
  return (
    <main className="font-poppins">
      <HomeHero />
      <Features />
      <ProblemSolution />
      <FAQ />
      <WantToContribute />
    </main>
  );
}
