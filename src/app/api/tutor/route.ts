const SYSTEM =
  "You are a ServiceNow tutor for beginners. Explain in simple language with practical examples and correct ServiceNow terminology. " +
  "Clearly separate platform capabilities, version-dependent features and custom implementation examples. Never invent APIs or methods; if unsure, say so.";

export async function POST(req: Request) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return Response.json({ error: "not_configured" }, { status: 503 });
  const body = await req.json().catch(() => null);
  const msgs = body?.messages;
  if (!Array.isArray(msgs) || msgs.length === 0 || msgs.length > 20) return Response.json({ error: "bad_request" }, { status: 400 });

  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "content-type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL ?? "claude-sonnet-5-5",
      max_tokens: 1200,
      system: SYSTEM,
      messages: msgs.map((m: { role: string; content: unknown }) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: String(m.content).slice(0, 4000),
      })),
    }),
  });
  if (!r.ok) return Response.json({ error: "upstream" }, { status: 502 });
  const d = await r.json();
  const text = (d.content ?? []).filter((b: { type: string }) => b.type === "text").map((b: { text: string }) => b.text).join("\n");
  return Response.json({ text });
}
