import { Navigation } from "@/components/Navigation";
import { TaskGrid } from "@/components/TaskGrid";
import { Contact } from "@/components/Contact";

export default function TaskManager() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <TaskGrid />
      <Contact />
    </div>
  );
}
