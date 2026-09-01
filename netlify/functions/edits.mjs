// Team editing backend for case study pages.
// Storage: Netlify Blobs, store "case-study-edits".
// Writes require the TEAM_EDIT_CODE environment variable to be set in the
// Netlify site settings and the matching code to be sent with each save.
// Remove or change that variable to turn team editing off or rotate the code.
import { getStore } from "@netlify/blobs";

const MAX_SECTION_BYTES = 4_000_000;

export default async (req) => {
  const store = getStore("case-study-edits");
  const url = new URL(req.url);
  const editing = Boolean(process.env.TEAM_EDIT_CODE);

  if (req.method === "GET") {
    const op = url.searchParams.get("op") || "all";
    if (op === "config") {
      return Response.json({ editing });
    }
    if (op === "all") {
      const sections = {};
      const { blobs } = await store.list({ prefix: "section:" });
      for (const b of blobs) {
        const v = await store.get(b.key, { type: "json" });
        if (v) sections[b.key.slice("section:".length)] = v;
      }
      return Response.json({ editing, sections });
    }
    if (op === "history") {
      const { blobs } = await store.list({ prefix: "history:" });
      return Response.json({ keys: blobs.map((b) => b.key).sort() });
    }
    return new Response("unknown op", { status: 400 });
  }

  if (req.method === "POST") {
    if (!editing) {
      return Response.json({ ok: false, error: "editing_off" }, { status: 403 });
    }
    let body;
    try {
      body = await req.json();
    } catch {
      return new Response("bad json", { status: 400 });
    }
    if (!body || typeof body.code !== "string" || body.code !== process.env.TEAM_EDIT_CODE) {
      return Response.json({ ok: false, error: "bad_code" }, { status: 403 });
    }
    const id = String(body.section || "").replace(/[^a-z0-9_-]/gi, "").slice(0, 60);
    const html = typeof body.html === "string" ? body.html : null;
    if (!id || html === null) {
      return new Response("bad section", { status: 400 });
    }
    if (html.length > MAX_SECTION_BYTES) {
      return Response.json({ ok: false, error: "too_large" }, { status: 413 });
    }
    const rec = { html, by: String(body.by || "").slice(0, 80), at: Date.now() };
    await store.setJSON("section:" + id, rec);
    await store.setJSON("history:" + rec.at + ":" + id, rec);
    return Response.json({ ok: true });
  }

  return new Response("method not allowed", { status: 405 });
};

export const config = { path: "/api/edits" };
