export type Portal = {
  id: string;
  label: string;
  href: string;
  blurb: string;
  color: string; // glow colour used by the 3D scene and 2D UI
  phase: number; // phase in which the full page is built
};

export const profile = {
  name: "Sarovan Chamgyal",
  title: "ServiceNow Developer",
  statement:
    "Building intelligent applications, automating workflows and creating meaningful digital experiences.",
  internship: { company: "Vyntra Pro Innovations", duration: "Six months" },
  education: "B.Tech in Full Stack Development",
  // Placeholders: fill these in yourself. Nothing here is invented.
  contact: {
    email: null as string | null,
    linkedin: null as string | null,
    github: null as string | null,
    resume: null as string | null,
  },
};

export const portals: Portal[] = [
  { id: "about", label: "About Me", href: "/about", blurb: "Who I am, what I study and how I work.", color: "#38bdf8", phase: 6 },
  { id: "projects", label: "Project Universe", href: "/projects", blurb: "ICU Net Banking and other builds.", color: "#22d3ee", phase: 2 },
  { id: "lab", label: "ServiceNow Lab", href: "/lab", blurb: "An interactive skill tree of what I have practised.", color: "#8b5cf6", phase: 4 },
  { id: "journey", label: "My Journey", href: "/journey", blurb: "Six months at Vyntra Pro Innovations.", color: "#6366f1", phase: 5 },
  { id: "contact", label: "Contact", href: "/contact", blurb: "Resume, links and a message form.", color: "#a78bfa", phase: 6 },
];
