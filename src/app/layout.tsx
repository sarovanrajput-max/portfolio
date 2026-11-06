import type { Metadata, Viewport } from "next";
import { Geist_Mono, Outfit, Syne } from "next/font/google";
import { SiteNav } from "@/components/nav/SiteNav";
import { UniverseProvider } from "@/context/UniverseProvider";
import { profile } from "@/lib/profile";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: {
    default: "Sarovan Chamgyal — ServiceNow Developer",
    template: "%s · Sarovan Chamgyal",
  },
  description: `${profile.name} is a ${profile.title}. ${profile.statement}`,
};

export const viewport: Viewport = {
  themeColor: "#03060f",
  colorScheme: "dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  description: `${profile.statement} Six-month internship at ${profile.internship.company}. ${profile.education}.`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${outfit.variable} ${syne.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-dvh bg-void font-sans text-mist antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
        <a
          href="#content"
          className="sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-mist focus:px-4 focus:py-2 focus:text-sm focus:text-void focus:not-sr-only"
        >
          Skip to content
        </a>
        <div className="grain" aria-hidden />
        <UniverseProvider>
          <SiteNav />
          {children}
        </UniverseProvider>
      </body>
    </html>
  );
}
