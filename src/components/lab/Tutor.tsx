"use client";

import { useState } from "react";
import { Bot, Send, X } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

export function Tutor() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [demo, setDemo] = useState(false);

  async function send() {
    const q = text.trim();
    if (!q || busy) return;
    const next: Msg[] = [...msgs, { role: "user", content: q }];
    setMsgs(next); setText(""); setBusy(true);
    try {
      const r = await fetch("/api/tutor", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ messages: next }) });
      if (r.status === 503) { setDemo(true); setMsgs([...next, { role: "assistant", content: "AI tutor is in demo mode: no AI backend is connected yet, so I cannot answer questions. The site owner can enable it by adding ANTHROPIC_API_KEY in the hosting settings." }]); }
      else if (!r.ok) setMsgs([...next, { role: "assistant", content: "The tutor could not answer right now. Please try again." }]);
      else setMsgs([...next, { role: "assistant", content: (await r.json()).text }]);
    } catch {
      setMsgs([...next, { role: "assistant", content: "Network error. Please try again." }]);
    }
    setBusy(false);
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} aria-label="Open AI tutor" className="focus-ring fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-electric px-4 py-3 font-medium text-void shadow-[0_0_30px_rgb(56_189_248/0.45)]">
        <Bot size={18} aria-hidden /> AI Tutor
      </button>
      {open && (
        <section aria-label="AI tutor" className="glass fixed inset-x-3 bottom-3 z-50 flex max-h-[75dvh] flex-col rounded-3xl p-4 sm:inset-x-auto sm:right-5 sm:w-96">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-white">AI Tutor {demo && <span className="ml-2 rounded-full bg-amber-400/20 px-2 py-0.5 text-xs text-amber-300">DEMO MODE</span>}</h2>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close tutor" className="focus-ring rounded-full p-1 text-mist"><X size={18} /></button>
          </div>
          <div className="mt-3 flex-1 space-y-3 overflow-y-auto text-sm">
            {msgs.length === 0 && <p className="text-mist/60">Ask anything, e.g. &ldquo;Explain GlideRecord step by step&rdquo;.</p>}
            {msgs.map((m, i) => (
              <p key={i} className={`whitespace-pre-wrap rounded-2xl px-3 py-2 ${m.role === "user" ? "ml-8 bg-electric/20 text-white" : "mr-8 bg-white/5 text-mist"}`}>{m.content}</p>
            ))}
            {busy && <p className="text-mist/60">Thinking…</p>}
          </div>
          <div className="mt-3 flex gap-2">
            <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Ask about ServiceNow" className="focus-ring min-w-0 flex-1 rounded-full bg-white/5 px-4 py-2 text-white placeholder:text-mist/40" />
            <button type="button" onClick={send} aria-label="Send" className="focus-ring rounded-full bg-electric p-2 text-void"><Send size={18} /></button>
          </div>
        </section>
      )}
    </>
  );
}
