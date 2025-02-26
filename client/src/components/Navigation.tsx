import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";

export function Navigation() {
  const [location] = useLocation();

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <a className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Portfolio
          </a>
        </Link>
        
        <div className="flex gap-8">
          <Link href="/#projects">
            <a className="text-muted-foreground hover:text-primary transition-colors">
              Projects
            </a>
          </Link>
          <Link href="/#contact">
            <a className="text-muted-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
