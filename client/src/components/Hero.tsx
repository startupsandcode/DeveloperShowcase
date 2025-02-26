import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

export function Hero() {
  return (
    <section className="min-h-screen relative flex items-center">
      <div 
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1620121692029-d088224ddc74)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.1
        }}
      />
      
      <div className="container mx-auto px-4">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-32 h-32 rounded-full overflow-hidden mb-8">
              <img 
                src="https://images.unsplash.com/photo-1531497151418-0519708d443e"
                alt="Developer profile"
                className="w-full h-full object-cover"
              />
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Full Stack Developer
              <span className="block text-primary">Building Modern Web Experiences</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8">
              Specialized in creating responsive, user-centric applications 
              with cutting-edge web technologies.
            </p>

            <Button 
              size="lg" 
              onClick={() => {
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View Projects
              <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
