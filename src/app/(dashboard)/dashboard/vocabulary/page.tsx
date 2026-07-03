"use client";
import { useState, useMemo } from "react";
import { VOCAB_CATEGORIES } from "@/data/vocabulary";
import { BookMarked, Search, Copy, CheckCircle } from "lucide-react";

export default function VocabularyPage() {
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("all");
  const [copied, setCopied] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return VOCAB_CATEGORIES
      .filter((c) => activeCat === "all" || c.id === activeCat)
      .map((c) => ({
        ...c,
        items: q
          ? c.items.filter((i) => i.phrase.toLowerCase().includes(q) || i.note.toLowerCase().includes(q))
          : c.items,
      }))
      .filter((c) => c.items.length > 0);
  }, [search, activeCat]);

  function copy(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(text);
      setTimeout(() => setCopied(null), 1500);
    });
  }

  const total = VOCAB_CATEGORIES.reduce((n, c) => n + c.items.length, 0);

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
          <BookMarked size={24} style={{ color: "var(--accent)" }} /> Useful Vocabulary
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          {total} high-value phrases and words to make your speaking more fluent, natural, and confident. Tap any phrase to copy it.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-secondary)" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search phrases…"
            className="w-full pl-9 pr-3 py-2 rounded-lg text-sm"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
          />
        </div>
      </div>

      {/* Category chips */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setActiveCat("all")}
          className="text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors"
          style={activeCat === "all"
            ? { background: "var(--accent)", color: "#fff", borderColor: "var(--accent)" }
            : { background: "var(--bg-card)", color: "var(--text-secondary)", borderColor: "var(--border)" }}>
          All
        </button>
        {VOCAB_CATEGORIES.map((c) => (
          <button key={c.id} onClick={() => setActiveCat(c.id)}
            className="text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors flex items-center gap-1.5"
            style={activeCat === c.id
              ? { background: "var(--accent)", color: "#fff", borderColor: "var(--accent)" }
              : { background: "var(--bg-card)", color: "var(--text-secondary)", borderColor: "var(--border)" }}>
            <span>{c.emoji}</span> {c.title}
          </button>
        ))}
      </div>

      {/* Lists */}
      {filtered.length === 0 ? (
        <p className="text-sm text-center py-12" style={{ color: "var(--text-secondary)" }}>No phrases match your search.</p>
      ) : (
        filtered.map((cat) => (
          <div key={cat.id} className="rounded-xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <div className="mb-3">
              <h2 className="font-bold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                <span className="text-lg">{cat.emoji}</span> {cat.title}
              </h2>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>{cat.blurb}</p>
            </div>
            <div className="divide-y" style={{ borderColor: "var(--border)" }}>
              {cat.items.map((item) => (
                <button
                  key={item.phrase}
                  onClick={() => copy(item.phrase)}
                  className="w-full flex items-start justify-between gap-3 py-2.5 text-left group transition-colors"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{item.phrase}</p>
                    <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{item.note}</p>
                  </div>
                  <span className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity mt-0.5" style={{ color: copied === item.phrase ? "#00B37D" : "var(--accent)" }}>
                    {copied === item.phrase ? <CheckCircle size={15} /> : <Copy size={15} />}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
