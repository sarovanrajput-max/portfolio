import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function PortalPlaceholder({
  title,
  phase,
  planned,
}: {
  title: string;
  phase: number;
  planned: string[];
}) {
  return (
    <main id="content" className="mx-auto flex min-h-dvh max-w-3xl flex-col justify-center px-6 py-32">
      <h1 className="font-display text-4xl text-white sm:text-5xl">{title}</h1>
      <p className="mt-4 text-lg text-mist/70">This portal opens in Phase {phase}. It will include:</p>
      <ul className="glass mt-6 space-y-2 rounded-2xl p-6 text-mist/90">
        {planned.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <Link href="/" className="focus-ring mt-10 inline-flex w-fit items-center gap-2 rounded-full px-3 py-2 text-cyan-300 hover:text-white">
        <ArrowLeft size={16} aria-hidden /> Back to the core
      </Link>
    </main>
  );
}
