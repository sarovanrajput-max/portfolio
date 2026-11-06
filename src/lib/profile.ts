export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  techStack: string[];
  metrics?: string[];
  status: "Completed" | "In Development" | "Planned";
  highlights: string[];
}

export const PROFILE_DATA = {
  name: "sarovan chambyal",
  title: "ServiceNow Developer",
  location: "New Delhi, India",
  email: "sarovanrajput@gmail.com",
  phone: "+91 8287041413",
  education: {
    degree: "B.Tech in Computer Science & Engineering",
    university: "The NorthCap University, Gurugram",
    graduation: "2026",
    cgpa: "6.5"
  },
  experience: {
    company: "Vyntra Pro Innovations",
    role: "ServiceNow Development Intern",
    duration: "May 2026 – October 2026",
    location: "Remote / On-site",
    responsibilities: [
      "Administered and supported ServiceNow instances, including configuration, incident lifecycle tracking, and Update Set releases.",
      "Automated business logic, field validation, and record creation using JavaScript Client Scripts and server-side Business Rules.",
      "Worked extensively with g_form, g_user, GlideRecord, and gs.eventQueue.",
      "Integrated ServiceNow with external services through REST APIs, exchanging JSON using REST Messages and server-side JavaScript.",
      "Built branded Service Portals using Record Producers and AngularJS-based catalog widgets.",
      "Configured Agent Workspaces for streamlined agent support workflows.",
      "Implemented role-based security using Access Control Lists (ACLs) and script conditions to protect records and fields.",
      "Configured SLAs, event triggers, and automated email notifications.",
      "Developed custom scoped applications in ServiceNow Personal Developer Instances.",
      "Migrated data through Excel Import Sets, Transform Maps, and Coalesce keys."
    ]
  },
  projects: [
    {
      id: "icu-net-banking",
      title: "ICU Net Banking — ServiceNow Scoped Application",
      subtitle: "Enterprise Banking Scope (`x_1330921_icu_p1_0`)",
      category: "ServiceNow Scoped App",
      description: "A secure custom banking application featuring custom tables (Account, Card, Transaction, Loan), role-based security, workflow automation, and simulated integrations.",
      techStack: ["ServiceNow", "JavaScript", "GlideRecord", "Business Rules", "Client Scripts", "REST APIs", "Service Portal"],
      status: "In Development",
      highlights: [
        "Custom scoped application with isolated table schemas and scoped API safety.",
        "Simulated PAN Registry table with database-based Business Rule validation (/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/).",
        "Automated branch IFSC assignment and state-rollback prevention.",
        "Operations Workspace dashboard and customer Service Portal integration."
      ]
    },
    {
      id: "campus-asset-loaner",
      title: "Campus Asset Loaner Application",
      subtitle: "Extended Task Management System",
      category: "ServiceNow Application",
      description: "Custom ServiceNow application extending the Task table for managing equipment checkout, automated approvals, and return due-date tracking.",
      techStack: ["ServiceNow", "Task Extension", "Workflow", "UI Policies", "Access Controls"],
      status: "Completed",
      highlights: [
        "Extended base Task table for specialized hardware asset tracking.",
        "Double-booking prevention logic via custom server-side validation.",
        "Role-based ACLs restricting checkout approvals to IT staff."
      ]
    },
    {
      id: "fitness-tracking-app",
      title: "Fitness Tracking Web Application",
      subtitle: "Full-Stack Academic Project",
      category: "Full-Stack Web",
      description: "A comprehensive fitness and workout analytics tracker built with Java, HTML, and CSS, incorporating CRUD operations and daily metric logging.",
      techStack: ["Java", "HTML", "CSS", "CRUD", "Step Analytics"],
      status: "Completed",
      highlights: [
        "Built responsive user interfaces with HTML and CSS for workout logging.",
        "Implemented robust backend data persistence and CRUD routines in Java.",
        "Designed daily step tracking and workout history analytics views."
      ]
    }
  ] as Project[]
};
