import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Briefcase, CalendarDays, GraduationCap, MapPin, School, Sparkles } from "lucide-react";
import { profile } from "@/lib/profile";

export const metadata: Metadata = {
  title: "My Identity",
  description: `${profile.name} — ${profile.title}, specialising in ${profile.specialization}. ${profile.education.degree} at ${profile.education.university}.`,
};

const facts = [
  { label: "Name", value: profile.name, icon: Sparkles },
  { label: "Date of birth", value: profile.dob, icon: CalendarDays },
  { label: "Age", value: profile.age, icon: CalendarDays },
  { label: "Currently living in", value: profile.location, icon: MapPin },
  { label: "Profession", value: profile.title, icon: Briefcase },
  { label: "Specialization", value: profile.specialization, icon: Sparkles },
];

export default function AboutPage() {
  const { education, schooling, internship } = profile;

  return (
    <main id="content" className="mx-auto max-w-6xl px-6 pb-28 pt-32">
      <Link
        href="/"
        className="focus-ring inline-flex w-fit items-center gap-2 rounded-full px-3 py-2 text-sm text-glow-cyan transition hover:text-white"
      >
        <ArrowLeft size={16} aria-hidden /> Back to the core
      </Link>

      {/* Intro: photo + headline facts */}
      <section aria-labelledby="identity-heading" className="mt-6 grid items-start gap-10 lg:grid-cols-[minmax(0,22rem)_1fr]">
        <div className="glass relative mx-auto w-full max-w-sm overflow-hidden rounded-3xl p-2 lg:mx-0">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem]">
            <Image
              src="/sarovan.png"
              alt={`Portrait of ${profile.name}`}
              fill
              priority
              sizes="(min-width: 1024px) 22rem, 90vw"
              className="object-cover"
              style={{ objectPosition: "50% 22%" }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-linear-to-t from-void/70 via-transparent to-transparent"
            />
          </div>
        </div>

        <div>
          <p className="font-mono text-sm text-glow-cyan">MY IDENTITY</p>
          <h1 id="identity-heading" className="mt-2 font-display text-4xl font-bold tracking-tight text-white sm:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-2 text-lg text-glow-cyan sm:text-xl">
            {profile.title} · {profile.specialization}
          </p>
          <p className="mt-4 max-w-xl text-pretty text-mist/75">&ldquo;{profile.statement}&rdquo;</p>

          <dl className="mt-8 grid gap-3 sm:grid-cols-2">
            {facts.map(({ label, value, icon: Icon }) => (
              <div key={label} className="glass flex items-start gap-3 rounded-2xl p-4">
                <Icon size={18} aria-hidden className="mt-0.5 shrink-0 text-electric" />
                <div>
                  <dt className="text-xs uppercase tracking-wider text-mist/60">{label}</dt>
                  <dd className="mt-0.5 font-medium text-white">{value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Education */}
      <section aria-labelledby="education-heading" className="mt-20">
        <h2 id="education-heading" className="flex items-center gap-3 font-display text-2xl text-white sm:text-3xl">
          <GraduationCap aria-hidden className="text-glow-cyan" /> Education
        </h2>

        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {schooling.map((s) => (
            <li key={s.level} className="glass flex flex-col gap-2 rounded-2xl p-5">
              <School size={18} aria-hidden className="text-glow-violet" />
              <span className="text-xs uppercase tracking-wider text-mist/60">{s.level}</span>
              <span className="font-display text-3xl text-white">{s.score}</span>
              <span className="text-sm text-mist/75">{s.school}</span>
            </li>
          ))}

          <li className="glass flex flex-col gap-2 rounded-2xl p-5">
            <GraduationCap size={18} aria-hidden className="text-glow-cyan" />
            <span className="text-xs uppercase tracking-wider text-mist/60">College</span>
            <span className="font-display text-3xl text-white">CGPA {education.cgpa}</span>
            <span className="text-sm text-mist/75">{education.degree}</span>
            <span className="text-sm text-mist/75">
              {education.university} · Class of {education.graduation}
            </span>
          </li>
        </ol>
      </section>

      {/* Experience */}
      <section aria-labelledby="experience-heading" className="mt-20">
        <h2 id="experience-heading" className="flex items-center gap-3 font-display text-2xl text-white sm:text-3xl">
          <Briefcase aria-hidden className="text-glow-cyan" /> Internship
        </h2>

        <div className="glass mt-6 rounded-2xl p-6">
          <h3 className="font-display text-xl text-white">{internship.role}</h3>
          <p className="mt-1 text-glow-cyan">{internship.company}</p>
          <p className="mt-1 text-sm text-mist/60">{internship.duration}</p>
          <p className="mt-4 text-mist/80">
            Six months of hands-on ServiceNow development: scripting, integrations, Service Portal, security and
            data migration.
          </p>
        </div>
      </section>
    </main>
  );
}
