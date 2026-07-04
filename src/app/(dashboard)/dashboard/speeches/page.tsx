"use client";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { SPEECHES, Speech } from "@/data/speeches";
import {
  Landmark, Search, ArrowLeft, ExternalLink, Mic2, Copy, CheckCircle,
  Lightbulb, Quote, Lock, Calendar, MapPin,
} from "lucide-react";

export default function SpeechesPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<Speech | null>(null);
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState(false);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return SPEECHES;
    return SPEECHES.filter((s) =>
      s.speaker.toLowerCase().includes(q) ||
      s.title.toLowerCase().includes(q) ||
      s.topic.toLowerCase().includes(q)
    );
  }, [search]);

  function practice(s: Speech) {
    if (!s.fullText) return;
    sessionStorage.setItem("sf_practice_script", s.fullText);
    sessionStorage.setItem("sf_practice_scenario", `${s.speaker} — ${s.title}`);
    router.push("/dashboard/practice");
  }

  function copyText(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  // ── Detail view ──
  if (selected) {
    const s = selected;
    return (
      <div className="max-w-3xl mx-auto space-y-5">
        <button onClick={() => setSelected(null)} className="flex items-center gap-1.5 text-sm" style={{ color: "var(--text-secondary)" }}>
          <ArrowLeft size={15} /> All speeches
        </button>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "var(--accent-bg)", color: "var(--accent)" }}>#{s.num}</span>
            {s.publicDomain
              ? <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "#E6F7F2", color: "#00875A" }}>Public domain</span>
              : <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1" style={{ background: "#FFF8E7", color: "#B7791F" }}><Lock size={9} /> In copyright</span>}
          </div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>{s.title}</h1>
          <p className="text-sm font-semibold mt-0.5" style={{ color: "var(--accent)" }}>{s.speaker}</p>
          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs" style={{ color: "var(--text-secondary)" }}>
            <span className="flex items-center gap-1"><Calendar size={12} /> {s.date}</span>
            <span className="flex items-center gap-1"><MapPin size={12} /> {s.place}</span>
            <span>{s.topic}</span>
          </div>
        </div>

        {/* Why it stands out */}
        <div className="rounded-xl p-5" style={{ background: "var(--accent-bg)", border: "1px solid var(--accent)" }}>
          <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: "var(--accent)" }}>Why it stands out</p>
          <p className="text-sm" style={{ color: "var(--text-primary)" }}>{s.whyItStands}</p>
        </div>

        {/* What to learn */}
        <div className="rounded-xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <h2 className="font-bold mb-3 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
            <Lightbulb size={16} style={{ color: "#F5A623" }} /> What you can learn from it
          </h2>
          <ul className="space-y-2">
            {s.learn.map((l, i) => (
              <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--accent)" }} /> {l}
              </li>
            ))}
          </ul>
        </div>

        {/* Iconic line */}
        {s.excerpt && (
          <div className="rounded-xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <div className="flex items-start gap-3">
              <Quote size={18} className="shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
              <p className="text-base italic leading-relaxed" style={{ color: "var(--text-primary)" }}>{s.excerpt}</p>
            </div>
          </div>
        )}

        {/* Full text (public domain only) */}
        {s.fullText ? (
          <div className="rounded-xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
              <h2 className="font-bold" style={{ color: "var(--text-primary)" }}>Full transcript</h2>
              <div className="flex gap-2">
                <button onClick={() => copyText(s.fullText!)}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded border transition-colors"
                  style={{ color: "var(--text-secondary)", borderColor: "var(--border)" }}>
                  {copied ? <CheckCircle size={13} style={{ color: "#00B37D" }} /> : <Copy size={13} />} {copied ? "Copied" : "Copy"}
                </button>
                <button onClick={() => practice(s)}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded text-white transition-colors"
                  style={{ background: "var(--accent)" }}>
                  <Mic2 size={13} /> Practice this
                </button>
              </div>
            </div>
            <p className="text-sm leading-loose whitespace-pre-wrap" style={{ color: "var(--text-primary)" }}>{s.fullText}</p>
          </div>
        ) : (
          <div className="rounded-xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>
              This speech is still under copyright, so the full transcript isn&apos;t reproduced here. Read the official transcript at the source below, then use the takeaways above to shape your own practice.
            </p>
          </div>
        )}

        {/* Source */}
        <a href={s.sourceUrl} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: "var(--accent)" }}>
          <ExternalLink size={14} /> Read the full transcript — {s.sourceLabel}
        </a>
      </div>
    );
  }

  // ── List view ──
  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
          <Landmark size={24} style={{ color: "var(--accent)" }} /> Outstanding Speeches
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          Study the greatest speeches ever delivered — structure, rhythm, and rhetoric. Public-domain speeches include the full transcript you can practice directly.
        </p>
      </div>

      <div className="relative max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-secondary)" }} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search speaker, title, or topic…"
          className="w-full pl-9 pr-3 py-2 rounded-lg text-sm"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
        />
      </div>

      <div className="space-y-3">
        {filtered.map((s) => (
          <button key={s.num} onClick={() => setSelected(s)}
            className="w-full text-left rounded-xl p-4 transition-all hover:shadow-md"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}>
            <div className="flex items-start gap-3">
              <span className="text-xs font-bold px-2 py-1 rounded-lg shrink-0" style={{ background: "var(--accent-bg)", color: "var(--accent)" }}>#{s.num}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-bold" style={{ color: "var(--text-primary)" }}>{s.title}</h2>
                  {s.publicDomain
                    ? <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full" style={{ background: "#E6F7F2", color: "#00875A" }}>Full text</span>
                    : <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full flex items-center gap-0.5" style={{ background: "#FFF8E7", color: "#B7791F" }}><Lock size={8} /> Link</span>}
                </div>
                <p className="text-sm font-semibold" style={{ color: "var(--accent)" }}>{s.speaker}</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>{s.date} · {s.place} · {s.topic}</p>
                <p className="text-xs mt-1.5" style={{ color: "var(--text-secondary)" }}>{s.whyItStands}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
