import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Github, Linkedin } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-24 relative">
      <div 
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1563089145-599997674d42)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.05
        }}
      />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-12 text-center">Get In Touch</h2>

          <Card className="max-w-xl mx-auto">
            <CardContent className="p-6">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <Input placeholder="Your Name" />
                </div>
                <div>
                  <Input type="email" placeholder="Your Email" />
                </div>
                <div>
                  <Textarea placeholder="Your Message" rows={5} />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>

              <div className="mt-8 pt-8 border-t flex justify-center gap-6">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="h-6 w-6" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Github className="h-6 w-6" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
