"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PROFILE_DATA } from "@/lib/profile";
import { Terminal, ArrowRight } from "lucide-react";

export default function ProjectsPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  const categories = ["All", "ServiceNow Scoped App", "ServiceNow Application", "Full-Stack Web"];

  const filteredProjects = selectedFilter === "All" 
    ? PROFILE_DATA.projects 
    : PROFILE_DATA.projects.filter(p => p.category === selectedFilter);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm mb-2">
              <Terminal size={16} />
              <span>sarovan@portfolio:~$ ls ./projects</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white">Project Universe</h1>
            <p className="text-slate-400 mt-1">
              Explore enterprise ServiceNow scoped apps, workflow automations, and full-stack solutions.
            </p>
          </div>
          <Link 
            href="/"
            className="mt-4 md:mt-0 px-4 py-2 bg-slate-900 border border-slate-700 hover:border-cyan-500 rounded-lg text-sm text-cyan-400 transition"
          >
            ← Back to Core Portal
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                selectedFilter === cat
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50"
                  : "bg-slate-900 text-slate-400 border border-slate-800 hover:bg-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 flex flex-col justify-between hover:border-cyan-500/40 transition group"
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-mono uppercase tracking-wider px-2.5 py-1 bg-cyan-950/60 text-cyan-400 border border-cyan-800/60 rounded">
                    {project.category}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    project.status === "Completed" ? "bg-emerald-950 text-emerald-400" : "bg-amber-950 text-amber-400"
                  }`}>
                    {project.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition mb-1">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-400 font-mono mb-4">{project.subtitle}</p>
                <p className="text-sm text-slate-300 mb-4 line-clamp-3">{project.description}</p>

                <div className="space-y-1 mb-6">
                  {project.highlights.map((h, i) => (
                    <div key={i} className="text-xs text-slate-400 flex items-start gap-1.5">
                      <span className="text-cyan-400 mt-0.5">›</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                      {tech}
                    </span>
                  ))}
                </div>

                {project.id === "icu-net-banking" ? (
                  <Link
                    href="/projects/icu-net-banking"
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-semibold rounded-lg text-sm transition"
                  >
                    <span>Launch Interactive Demo</span>
                    <ArrowRight size={16} />
                  </Link>
                ) : (
                  <button 
                    disabled 
                    className="w-full py-2 bg-slate-800/50 text-slate-500 rounded-lg text-sm cursor-not-allowed"
                  >
                    Standard View
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
