"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import { portals, profile } from "@/lib/profile";
import { useUniverse } from "@/context/UniverseProvider";
import { CoreFallback } from "./CoreFallback";

const CoreScene = dynamic(() => import("./CoreScene"), { ssr: false, loading: () => <CoreFallback /> });

export function HomeExperience() {
  const { use3D, ready, setHoveredPortal } = useUniverse();

  return (
    <main id="content">
      {/* Hero: scene behind, text in front */}
      <section className="relative flex min-h-dvh items-end justify-center overflow-hidden px-6 pb-16 pt-28 sm:items-center sm:pb-0">
        <div className="absolute inset-0">{ready && use3D ? <CoreScene /> : <CoreFallback />}</div>

        <div className="relative z-10 mx-auto mt-[38vh] max-w-2xl text-center sm:mt-[44vh]">
          <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-6xl">{profile.name}</h1>
          <p className="mt-2 text-lg text-glow-cyan sm:text-xl">{profile.title}</p>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-mist/75">&ldquo;{profile.statement}&rdquo;</p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#portals"
              className="focus-ring inline-flex items-center gap-2 rounded-full bg-electric px-6 py-3 font-medium text-void shadow-[0_0_30px_rgb(56_189_248/0.45)] transition hover:bg-white"
            >
              <Compass size={18} aria-hidden /> Enter my world
            </a>
            <Link
              href="/projects"
              className="glass focus-ring inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium text-white transition hover:bg-white/10"
            >
              Explore my projects <ArrowRight size={18} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* Portals as real links: keyboard, screen-reader and mobile friendly */}
      <section id="portals" aria-labelledby="portals-heading" className="mx-auto max-w-6xl scroll-mt-24 px-6 pb-28 pt-10">
        <h2 id="portals-heading" className="font-display text-2xl text-white sm:text-3xl">
          Choose a portal
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {portals.map((p) => (
            <li key={p.id}>
              <Link
                href={p.href}
                onMouseEnter={() => setHoveredPortal(p.id)}
                onMouseLeave={() => setHoveredPortal(null)}
                onFocus={() => setHoveredPortal(p.id)}
                onBlur={() => setHoveredPortal(null)}
                className="glass focus-ring group relative flex h-full flex-col gap-2 rounded-2xl p-5 transition hover:-translate-y-1"
                style={{ ["--portal" as string]: p.color }}
              >
                <span
                  aria-hidden
                  className="size-2.5 rounded-full"
                  style={{ background: p.color, boxShadow: `0 0 14px ${p.color}` }}
                />
                <span className="font-display text-lg text-white">{p.label}</span>
                <span className="text-sm text-mist/70">{p.blurb}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
