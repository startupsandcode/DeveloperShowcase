import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { ProjectGrid } from "@/components/ProjectGrid";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <ProjectGrid />
      <Contact />
    </div>
  );
}
