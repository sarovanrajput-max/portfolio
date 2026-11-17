"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Bookmark, Check, Search } from "lucide-react";
import { LEVELS, type Level, type Topic } from "@/lib/lab-data";
import { useUniverse } from "@/context/UniverseProvider";
import { CoreFallback } from "@/components/home/CoreFallback";
import { Tutor } from "./Tutor";

const LabCore = dynamic(() => import("./LabCore"), { ssr: false, loading: () => <CoreFallback /> });

type View = { k: "intro" } | { k: "dash" } | { k: "level"; lid: number } | { k: "topic"; key: string };
type Item = { key: string; level: Level; topic: Topic };

const flat: Item[] = LEVELS.flatMap((level) => level.topics.map((topic) => ({ key: `${level.id}.${topic.id}`, level, topic })));
const KEY = "snlab:v1";

export function LabExperience() {
  const { use3D, ready } = useUniverse();
  const [view, setView] = useState<View>({ k: "intro" });
  const [done, setDone] = useState<string[]>([]);
  const [marks, setMarks] = useState<string[]>([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem(KEY) ?? "{}");
      if (Array.isArray(s.done)) setDone(s.done);
      if (Array.isArray(s.marks)) setMarks(s.marks);
    } catch {}
  }, []);
  const save = (d: string[], m: string[]) => { try { localStorage.setItem(KEY, JSON.stringify({ done: d, marks: m })); } catch {} };
  const toggle = (list: string[], k: string) => (list.includes(k) ? list.filter((x) => x !== k) : [...list, k]);
  const toggleDone = (k: string) => { const d = toggle(done, k); setDone(d); save(d, marks); };
  const toggleMark = (k: string) => { const m = toggle(marks, k); setMarks(m); save(done, m); };

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s ? flat.filter((i) => `${i.topic.name} ${i.topic.what}`.toLowerCase().includes(s)) : [];
  }, [q]);

  const btn = "focus-ring inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm";

  return (
    <main id="content" className="relative min-h-dvh">
      <AnimatePresence mode="wait">
        {view.k === "intro" && (
          <motion.section key="intro" exit={{ opacity: 0, scale: 1.05 }} className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 text-center">
            <div className="absolute inset-0">{ready && use3D ? <LabCore /> : <CoreFallback />}</div>
            <div className="relative z-10 mt-40">
              <h1 className="font-display text-5xl font-bold tracking-tight text-white drop-shadow-[0_0_24px_rgb(34_211_238/0.6)] sm:text-7xl">SERVICENOW LAB</h1>
              <p className="mt-4 text-mist/80">From Zero to ServiceNow Developer – Explore, Learn, Build.</p>
              <button type="button" onClick={() => setView({ k: "dash" })} className={`${btn} mt-8 bg-electric px-8 py-3 font-medium text-void shadow-[0_0_30px_rgb(56_189_248/0.45)]`}>ENTER LAB</button>
            </div>
          </motion.section>
        )}

        {view.k === "dash" && (
          <motion.section key="dash" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mx-auto max-w-6xl px-6 pb-28 pt-28">
            <h1 className="font-display text-3xl text-white sm:text-4xl">Learning Dashboard</h1>
            <p className="mt-2 text-mist/70">{done.length} of {flat.length} available topics completed.</p>
            <label className="glass mt-6 flex items-center gap-2 rounded-full px-4 py-2">
              <Search size={16} aria-hidden className="text-mist/60" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search topics" aria-label="Search topics" className="w-full bg-transparent text-white outline-none placeholder:text-mist/40" />
            </label>
            {q ? (
              <ul className="mt-4 space-y-2">
                {results.length === 0 && <li className="text-mist/60">No topics match yet.</li>}
                {results.map((i) => (
                  <li key={i.key}><button type="button" onClick={() => setView({ k: "topic", key: i.key })} className="glass focus-ring w-full rounded-2xl px-4 py-3 text-left text-white">{i.topic.name} <span className="text-sm text-mist/60">· Level {i.level.id}</span></button></li>
                ))}
              </ul>
            ) : (
              <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {LEVELS.map((l, i) => {
                  const n = l.topics.filter((t) => done.includes(`${l.id}.${t.id}`)).length;
                  return (
                    <motion.li key={l.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                      <button type="button" onClick={() => setView({ k: "level", lid: l.id })} className="glass focus-ring h-full w-full rounded-2xl p-5 text-left transition hover:-translate-y-1">
                        <span className="font-mono text-xs text-glow-cyan">LEVEL {String(l.id).padStart(2, "0")}</span>
                        <span className="mt-1 block font-display text-lg text-white">{l.title}</span>
                        <span className="mt-1 block text-sm text-mist/70">{l.summary}</span>
                        <span className="mt-3 block text-xs text-mist/60">{l.topics.length ? `${n}/${l.topics.length} topics done` : "Topics coming soon"}</span>
                      </button>
                    </motion.li>
                  );
                })}
              </ul>
            )}
          </motion.section>
        )}

        {view.k === "level" && (() => {
          const l = LEVELS.find((x) => x.id === view.lid)!;
          return (
            <motion.section key={`l${l.id}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mx-auto max-w-3xl px-6 pb-28 pt-28">
              <button type="button" onClick={() => setView({ k: "dash" })} className={`${btn} text-cyan-300`}><ArrowLeft size={16} aria-hidden /> Dashboard</button>
              <h1 className="mt-4 font-display text-3xl text-white">Level {l.id} – {l.title}</h1>
              <ul className="mt-6 space-y-3">
                {l.topics.length === 0 && <li className="glass rounded-2xl p-5 text-mist/70">Topics for this level are being added.</li>}
                {l.topics.map((t) => {
                  const k = `${l.id}.${t.id}`;
                  return (
                    <li key={k}><button type="button" onClick={() => setView({ k: "topic", key: k })} className="glass focus-ring flex w-full items-center justify-between rounded-2xl px-5 py-4 text-left text-white">
                      {t.name}{done.includes(k) && <Check size={18} className="text-glow-cyan" aria-label="Completed" />}
                    </button></li>
                  );
                })}
              </ul>
            </motion.section>
          );
        })()}

        {view.k === "topic" && (() => {
          const idx = flat.findIndex((i) => i.key === view.key);
          const { level, topic: t, key } = flat[idx];
          const parts: [string, string][] = [["What is it?", t.what], ["Why do we need it?", t.why], ["Real-world example", t.example], ["In ServiceNow", t.inSN]];
          return (
            <motion.article key={key} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mx-auto max-w-3xl px-6 pb-28 pt-28">
              <button type="button" onClick={() => setView({ k: "dash" })} className={`${btn} text-cyan-300`}><ArrowLeft size={16} aria-hidden /> Dashboard</button>
              <p className="mt-4 font-mono text-xs text-glow-cyan">LEVEL {level.id} · {level.title.toUpperCase()}</p>
              <h1 className="mt-1 font-display text-3xl text-white sm:text-4xl">{t.name}</h1>
              <div className="mt-4 flex gap-2">
                <button type="button" onClick={() => toggleDone(key)} className={`${btn} glass text-white`}><Check size={16} aria-hidden /> {done.includes(key) ? "Completed" : "Mark complete"}</button>
                <button type="button" onClick={() => toggleMark(key)} aria-pressed={marks.includes(key)} className={`${btn} glass text-white`}><Bookmark size={16} aria-hidden fill={marks.includes(key) ? "currentColor" : "none"} /> Bookmark</button>
              </div>
              {parts.map(([h, body]) => (
                <section key={h} className="glass mt-5 rounded-2xl p-5"><h2 className="font-display text-lg text-white">{h}</h2><p className="mt-2 text-mist/85">{body}</p></section>
              ))}
              {t.code && <pre className="mt-5 overflow-x-auto rounded-2xl bg-black/50 p-4 font-mono text-sm text-cyan-100"><code>{t.code}</code></pre>}
              {([["Common mistakes", t.mistakes], ["Interview questions", t.interview]] as [string, string[]][]).map(([h, list]) => (
                <section key={h} className="glass mt-5 rounded-2xl p-5"><h2 className="font-display text-lg text-white">{h}</h2><ul className="mt-2 list-disc space-y-1 pl-5 text-mist/85">{list.map((x) => <li key={x}>{x}</li>)}</ul></section>
              ))}
              <p className="mt-5 text-sm text-mist/60">Related: {t.related.join(" · ")}</p>
              <div className="mt-8 flex justify-between">
                <button type="button" disabled={idx === 0} onClick={() => setView({ k: "topic", key: flat[idx - 1].key })} className={`${btn} glass text-white disabled:opacity-30`}><ArrowLeft size={16} aria-hidden /> Previous</button>
                <button type="button" disabled={idx === flat.length - 1} onClick={() => setView({ k: "topic", key: flat[idx + 1].key })} className={`${btn} glass text-white disabled:opacity-30`}>Next <ArrowRight size={16} aria-hidden /></button>
              </div>
            </motion.article>
          );
        })()}
      </AnimatePresence>
      {view.k !== "intro" && <Tutor />}
    </main>
  );
}
