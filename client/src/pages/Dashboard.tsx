import { Navigation } from "@/components/Navigation";
import { DashboardGrid } from "@/components/DashboardGrid";
import { Contact } from "@/components/Contact";

export default function Dashboard() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <DashboardGrid />
      <Contact />
    </div>
  );
}
