export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Interactive Dashboard",
    description: "Real-time data visualization dashboard with customizable widgets and analytics.",
    image: "https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8",
    link: "http://localhost:5000/dashboard",
    tags: ["React", "D3.js", "TypeScript"]
  },
  {
    id: 2,
    title: "Blog Template",
    description: "Modern blog platform with rich text editing and responsive design.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
    link: "https://blog-template.example.com",
    tags: ["Next.js", "TailwindCSS", "MDX"]
  },
  {
    id: 3,
    title: "3D Product Showcase",
    description: "Interactive 3D product viewer with customizable materials and lighting.",
    image: "https://images.unsplash.com/photo-1739514984003-330f7c1d2007",
    link: "https://3d-showcase.example.com",
    tags: ["Three.js", "WebGL", "React"]
  },
  {
    id: 4,
    title: "Task Management App",
    description: "Collaborative task manager with real-time updates and team features.",
    image: "https://images.unsplash.com/photo-1510759395231-72b17d622279",
    link: "https://tasks.example.com",
    tags: ["React", "Redux", "Socket.io"]
  },
  {
    id: 5,
    title: "Artist Portfolio",
    description: "Minimalist portfolio template for visual artists and photographers.",
    image: "https://images.unsplash.com/photo-1660592868727-858d28c3ba52",
    link: "https://artist-portfolio.example.com",
    tags: ["React", "Framer Motion", "TailwindCSS"]
  }
];
