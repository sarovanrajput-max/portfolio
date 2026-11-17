import type { Metadata } from "next";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { profile } from "@/lib/profile";

export const metadata: Metadata = { title: "Contact" };

const links = [
  { label: "Phone", value: profile.phone, href: "tel:+918287041413", icon: Phone },
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
  { label: "LinkedIn", value: "Sarovan Chambyal", href: "https://www.linkedin.com/in/sarovan-chambyal-997644365", icon: ArrowUpRight },
  { label: "GitHub", value: "sarovanrajput-max", href: "https://github.com/sarovanrajput-max", icon: ArrowUpRight },
  { label: "GitHub (second account)", value: "Omen-boop", href: "https://github.com/Omen-boop", icon: ArrowUpRight },
];

export default function ContactPage() {
  return (
    <main id="content" className="mx-auto max-w-3xl px-6 pb-28 pt-32">
      <h1 className="font-display text-4xl text-white sm:text-5xl">Contact</h1>
      <p className="mt-3 text-mist/75">{profile.name} · {profile.title} · {profile.location}</p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {links.map(({ label, value, href, icon: Icon }) => {
          const external = href.startsWith("http");
          return (
            <li key={label}>
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="glass focus-ring flex h-full items-center justify-between gap-3 rounded-2xl p-5 transition hover:-translate-y-1"
              >
                <span className="min-w-0">
                  <span className="block font-mono text-xs text-glow-cyan">{label.toUpperCase()}</span>
                  <span className="mt-1 block truncate text-white">{value}</span>
                </span>
                <Icon size={18} aria-hidden className="shrink-0 text-mist/70" />
              </a>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
