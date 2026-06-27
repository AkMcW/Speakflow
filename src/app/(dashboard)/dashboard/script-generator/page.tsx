"use client";
import { useState, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  SCRIPT_MENU_OPTIONS, SCRIPT_CATEGORIES, SOURCE_TYPE_LABELS, SOURCE_TYPE_COLORS,
  ScriptMenuOption,
} from "@/data/scriptMenuOptions";
import {
  Search, Star, Filter, ChevronDown, Loader2, Copy, Mic, Download,
  Link, FileText, AlertCircle, CheckCircle, Hash, Clapperboard, Lightbulb,
  MessageSquare, Sparkles, X, ArrowLeft,
} from "lucide-react";

type Stage = "menu" | "input" | "generating" | "result";

interface RichOutput {
  title?: string;
  hook?: string;
  script: string;
  deliveryNotes?: string[];
  cta?: string;
  caption?: string;
  hashtags?: string[];
  brollIdeas?: string[];
  thumbnailIdeas?: string[];
}

const DURATION_OPTIONS = [
  { value: "30s", label: "30 sec" },
  { value: "1min", label: "1 min" },
  { value: "2min", label: "2 min" },
  { value: "3min", label: "3 min" },
  { value: "5min", label: "5 min" },
  { value: "10min", label: "10 min" },
];

const TONE_OPTIONS = ["professional", "conversational", "energetic", "formal", "humorous", "inspirational", "empathetic"];
const AUDIENCE_OPTIONS = ["general audience", "professionals", "executives", "students", "beginners", "experts", "investors"];

export default function ScriptGeneratorPage() {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>("menu");
  const [selected, setSelected] = useState<ScriptMenuOption | null>(null);

  // Filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sourceFilter, setSourceFilter] = useState("All");
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    if (typeof window === "undefined") return new Set();
    try { const s = localStorage.getItem("sf_fav_generators"); return s ? new Set(JSON.parse(s)) : new Set(); }
    catch { return new Set(); }
  });
  const [showFavs, setShowFavs] = useState(false);

  // Input state
  const [inputUrl, setInputUrl] = useState("");
  const [inputText, setInputText] = useState("");
  const [extractedContent, setExtractedContent] = useState("");
  const [extractedTitle, setExtractedTitle] = useState("");
  const [extracting, setExtracting] = useState(false);
  const [extractError, setExtractError] = useState("");
  const [duration, setDuration] = useState("2min");
  const [tone, setTone] = useState("professional");
  const [audience, setAudience] = useState("general audience");

  // Result state
  const [result, setResult] = useState<RichOutput | null>(null);
  const [generating, setGenerating] = useState(false);
  const [genError, setGenError] = useState("");
  const [copied, setCopied] = useState(false);

  const scriptRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    let list = SCRIPT_MENU_OPTIONS;
    if (showFavs) list = list.filter(o => favorites.has(o.id));
    if (category !== "All") list = list.filter(o => o.category === category);
    if (sourceFilter !== "All") list = list.filter(o => o.sourceType === sourceFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(o =>
        o.title.toLowerCase().includes(q) ||
        o.description.toLowerCase().includes(q) ||
        o.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    return list;
  }, [search, category, sourceFilter, showFavs, favorites]);

  function toggleFav(id: string) {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      try { localStorage.setItem("sf_fav_generators", JSON.stringify([...next])); } catch {}
      return next;
    });
  }

  function selectOption(opt: ScriptMenuOption) {
    setSelected(opt);
    setInputUrl("");
    setInputText("");
    setExtractedContent("");
    setExtractedTitle("");
    setExtractError("");
    setResult(null);
    setGenError("");
    setStage("input");
  }

  async function handleExtract() {
    const url = inputUrl.trim();
    if (!url) return;
    setExtracting(true);
    setExtractError("");
    setExtractedContent("");
    setExtractedTitle("");
    try {
      const res = await fetch("/api/scripts/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Extraction failed");
      setExtractedContent(data.content || "");
      setExtractedTitle(data.title || "");
    } catch (err: unknown) {
      setExtractError(err instanceof Error ? err.message : "Failed to extract content");
    } finally {
      setExtracting(false);
    }
  }

  async function handleGenerate() {
    if (!selected) return;
    const sourceContent = selected.sourceType === "paste" ? inputText :
      selected.sourceType === "topic" ? inputText :
      extractedContent;

    if (!sourceContent.trim()) {
      setGenError("Please provide content to generate from.");
      return;
    }

    setGenerating(true);
    setGenError("");
    setStage("generating");

    try {
      const res = await fetch("/api/scripts/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceContent,
          promptTemplate: selected.promptTemplate,
          tone,
          duration,
          audience,
          platform: selected.platformDefault || "general",
          scriptStructure: selected.structureDefault || [],
          outputMode: selected.outputType,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");

      if (data.rich) {
        setResult(data.rich);
      } else {
        setResult({ script: data.script || "" });
      }
      setStage("result");
    } catch (err: unknown) {
      setGenError(err instanceof Error ? err.message : "Generation failed");
      setStage("input");
    } finally {
      setGenerating(false);
    }
  }

  function copyScript() {
    if (!result) return;
    navigator.clipboard.writeText(result.script).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function practiceScript() {
    if (!result) return;
    sessionStorage.setItem("sf_practice_script", result.script);
    sessionStorage.setItem("sf_practice_scenario", result.title || selected?.title || "Script Generator");
    router.push("/dashboard/practice");
  }

  function downloadScript() {
    if (!result) return;
    const text = [
      result.title ? `# ${result.title}\n` : "",
      result.hook ? `HOOK: ${result.hook}\n\n` : "",
      result.script,
      result.cta ? `\n\nCTA: ${result.cta}` : "",
      result.caption ? `\n\nCaption: ${result.caption}` : "",
      result.hashtags?.length ? `\n\nHashtags: ${result.hashtags.join(" ")}` : "",
    ].join("");
    const blob = new Blob([text], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${(result.title || "script").replace(/[^a-z0-9]/gi, "_")}.txt`;
    a.click();
  }

  // ── Menu Stage ─────────────────────────────────────────────────────────────
  if (stage === "menu") {
    return (
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem 1rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
            Script Generator
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            Turn any content — YouTube videos, articles, ideas — into polished speaking scripts.
          </p>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1.5rem", alignItems: "center" }}>
          <div style={{ position: "relative", flex: "1 1 200px", minWidth: 160 }}>
            <Search size={15} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-secondary)" }} />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search generators..."
              style={{ width: "100%", padding: "0.55rem 0.75rem 0.55rem 2rem", background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-primary)", fontSize: "0.875rem" }}
            />
          </div>

          <div style={{ position: "relative" }}>
            <select value={category} onChange={e => setCategory(e.target.value)}
              style={{ padding: "0.55rem 2rem 0.55rem 0.75rem", background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-primary)", fontSize: "0.875rem", appearance: "none" }}>
              {SCRIPT_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <ChevronDown size={13} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--text-secondary)" }} />
          </div>

          <div style={{ position: "relative" }}>
            <select value={sourceFilter} onChange={e => setSourceFilter(e.target.value)}
              style={{ padding: "0.55rem 2rem 0.55rem 0.75rem", background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-primary)", fontSize: "0.875rem", appearance: "none" }}>
              <option value="All">All Sources</option>
              <option value="youtube">YouTube</option>
              <option value="url">Any URL</option>
              <option value="paste">Paste Text</option>
              <option value="topic">Topic</option>
            </select>
            <ChevronDown size={13} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--text-secondary)" }} />
          </div>

          <button
            onClick={() => setShowFavs(f => !f)}
            style={{
              display: "flex", alignItems: "center", gap: 6, padding: "0.55rem 0.9rem", borderRadius: 8,
              background: showFavs ? "var(--accent)" : "var(--card-bg)",
              border: `1px solid ${showFavs ? "var(--accent)" : "var(--border)"}`,
              color: showFavs ? "#fff" : "var(--text-primary)", fontSize: "0.875rem", cursor: "pointer",
            }}
          >
            <Star size={14} fill={showFavs ? "#fff" : "none"} /> Favorites
          </button>

          <span style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginLeft: "auto" }}>
            {filtered.length} option{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--text-secondary)" }}>
            <Filter size={40} style={{ opacity: 0.3, marginBottom: "1rem" }} />
            <p>No options match your filters.</p>
            <button onClick={() => { setSearch(""); setCategory("All"); setSourceFilter("All"); setShowFavs(false); }}
              style={{ marginTop: "0.75rem", color: "var(--accent)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
              Clear filters
            </button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: "1rem" }}>
            {filtered.map(opt => {
              const sourceColor = SOURCE_TYPE_COLORS[opt.sourceType];
              return (
                <div
                  key={opt.id}
                  onClick={() => selectOption(opt)}
                  style={{
                    background: "var(--card-bg)", border: "1px solid var(--border)",
                    borderRadius: 12, padding: "1.25rem", cursor: "pointer",
                    transition: "border-color 0.15s, box-shadow 0.15s",
                    display: "flex", flexDirection: "column", gap: "0.5rem",
                    position: "relative",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(99,102,241,0.1)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                >
                  <button
                    onClick={e => { e.stopPropagation(); toggleFav(opt.id); }}
                    style={{ position: "absolute", top: 12, right: 12, background: "none", border: "none", cursor: "pointer", color: favorites.has(opt.id) ? "#f59e0b" : "var(--text-secondary)", padding: 4 }}
                  >
                    <Star size={15} fill={favorites.has(opt.id) ? "#f59e0b" : "none"} />
                  </button>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", paddingRight: 24 }}>
                    <span style={{ fontSize: "1.5rem" }}>{opt.icon}</span>
                    <h3 style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.3 }}>{opt.title}</h3>
                  </div>

                  <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.4 }}>{opt.description}</p>

                  <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginTop: "auto" }}>
                    <span style={{ fontSize: "0.7rem", padding: "2px 8px", borderRadius: 99, background: `${sourceColor}20`, color: sourceColor, fontWeight: 600 }}>
                      {SOURCE_TYPE_LABELS[opt.sourceType]}
                    </span>
                    {opt.outputType === "rich" && (
                      <span style={{ fontSize: "0.7rem", padding: "2px 8px", borderRadius: 99, background: "#f59e0b20", color: "#f59e0b", fontWeight: 600 }}>
                        Rich Output
                      </span>
                    )}
                    <span style={{ fontSize: "0.7rem", padding: "2px 8px", borderRadius: 99, background: "var(--bg)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}>
                      {opt.category}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // ── Input Stage ─────────────────────────────────────────────────────────────
  if (stage === "input" && selected) {
    const needsUrl = selected.sourceType === "youtube" || selected.sourceType === "url";
    const needsPaste = selected.sourceType === "paste" || selected.sourceType === "topic";
    const sourceColor = SOURCE_TYPE_COLORS[selected.sourceType];
    const hasContent = needsUrl ? !!extractedContent : !!inputText.trim();

    return (
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1rem" }}>
        <button
          onClick={() => setStage("menu")}
          style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer", fontSize: "0.85rem", marginBottom: "1.5rem", padding: 0 }}
        >
          <ArrowLeft size={15} /> Back to menu
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
          <span style={{ fontSize: "2rem" }}>{selected.icon}</span>
          <div>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text-primary)" }}>{selected.title}</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>{selected.description}</p>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* Source Input */}
          <div style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 12, padding: "1.25rem" }}>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ color: sourceColor }}>
                {needsUrl ? <Link size={15} /> : <FileText size={15} />}
              </span>
              {needsUrl ? "Enter URL" : selected.sourceType === "topic" ? "Describe Your Topic" : "Paste Your Content"}
            </h3>

            {needsUrl && (
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: extractedContent ? "0.75rem" : 0 }}>
                <input
                  value={inputUrl} onChange={e => setInputUrl(e.target.value)}
                  placeholder={selected.sourceType === "youtube" ? "https://www.youtube.com/watch?v=..." : "https://example.com/article"}
                  onKeyDown={e => { if (e.key === "Enter") handleExtract(); }}
                  style={{ flex: 1, padding: "0.6rem 0.75rem", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-primary)", fontSize: "0.875rem" }}
                />
                <button
                  onClick={handleExtract}
                  disabled={extracting || !inputUrl.trim()}
                  style={{
                    padding: "0.6rem 1rem", borderRadius: 8, background: "var(--accent)", color: "#fff",
                    border: "none", cursor: extracting || !inputUrl.trim() ? "not-allowed" : "pointer",
                    opacity: extracting || !inputUrl.trim() ? 0.6 : 1, fontSize: "0.875rem", fontWeight: 600,
                    display: "flex", alignItems: "center", gap: 6,
                  }}
                >
                  {extracting ? <><Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} /> Extracting...</> : "Extract"}
                </button>
              </div>
            )}

            {extractError && (
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "0.75rem", background: "#ef444420", borderRadius: 8, color: "#ef4444", fontSize: "0.85rem", marginTop: "0.5rem" }}>
                <AlertCircle size={15} style={{ flexShrink: 0, marginTop: 1 }} /> {extractError}
              </div>
            )}

            {extractedContent && (
              <div style={{ marginTop: "0.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: "0.5rem" }}>
                  <CheckCircle size={14} style={{ color: "#10b981" }} />
                  <span style={{ fontSize: "0.8rem", color: "#10b981", fontWeight: 600 }}>
                    Content extracted{extractedTitle ? ` — ${extractedTitle}` : ""}
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginLeft: "auto" }}>
                    ~{extractedContent.split(/\s+/).length} words
                  </span>
                </div>
                <textarea
                  value={extractedContent} onChange={e => setExtractedContent(e.target.value)}
                  rows={6}
                  style={{ width: "100%", padding: "0.75rem", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-primary)", fontSize: "0.8rem", lineHeight: 1.5, resize: "vertical", fontFamily: "inherit" }}
                />
              </div>
            )}

            {needsPaste && (
              <textarea
                value={inputText} onChange={e => setInputText(e.target.value)}
                rows={8}
                placeholder={selected.sourceType === "topic" ? "Describe your topic, key points you want to cover, any specific examples or data..." : "Paste your content here — article, blog post, email, notes, thread..."}
                style={{ width: "100%", padding: "0.75rem", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-primary)", fontSize: "0.875rem", lineHeight: 1.6, resize: "vertical", fontFamily: "inherit" }}
              />
            )}
          </div>

          {/* Settings */}
          <div style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 12, padding: "1.25rem" }}>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "1rem" }}>Script Settings</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem" }}>
              <div>
                <label style={{ fontSize: "0.78rem", color: "var(--text-secondary)", display: "block", marginBottom: 4 }}>Duration</label>
                <div style={{ position: "relative" }}>
                  <select value={duration} onChange={e => setDuration(e.target.value)}
                    style={{ width: "100%", padding: "0.5rem 2rem 0.5rem 0.65rem", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-primary)", fontSize: "0.85rem", appearance: "none" }}>
                    {DURATION_OPTIONS.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
                  </select>
                  <ChevronDown size={12} style={{ position: "absolute", right: 7, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--text-secondary)" }} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: "0.78rem", color: "var(--text-secondary)", display: "block", marginBottom: 4 }}>Tone</label>
                <div style={{ position: "relative" }}>
                  <select value={tone} onChange={e => setTone(e.target.value)}
                    style={{ width: "100%", padding: "0.5rem 2rem 0.5rem 0.65rem", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-primary)", fontSize: "0.85rem", appearance: "none" }}>
                    {TONE_OPTIONS.map(t => <option key={t} value={t} style={{ textTransform: "capitalize" }}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                  </select>
                  <ChevronDown size={12} style={{ position: "absolute", right: 7, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--text-secondary)" }} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: "0.78rem", color: "var(--text-secondary)", display: "block", marginBottom: 4 }}>Audience</label>
                <div style={{ position: "relative" }}>
                  <select value={audience} onChange={e => setAudience(e.target.value)}
                    style={{ width: "100%", padding: "0.5rem 2rem 0.5rem 0.65rem", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-primary)", fontSize: "0.85rem", appearance: "none" }}>
                    {AUDIENCE_OPTIONS.map(a => <option key={a} value={a} style={{ textTransform: "capitalize" }}>{a.charAt(0).toUpperCase() + a.slice(1)}</option>)}
                  </select>
                  <ChevronDown size={12} style={{ position: "absolute", right: 7, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--text-secondary)" }} />
                </div>
              </div>
            </div>
          </div>

          {genError && (
            <div style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "0.75rem", background: "#ef444420", borderRadius: 8, color: "#ef4444", fontSize: "0.85rem" }}>
              <AlertCircle size={15} style={{ flexShrink: 0, marginTop: 1 }} /> {genError}
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={!hasContent}
            style={{
              width: "100%", padding: "0.875rem", borderRadius: 10,
              background: hasContent ? "var(--accent)" : "var(--border)",
              color: hasContent ? "#fff" : "var(--text-secondary)",
              border: "none", cursor: hasContent ? "pointer" : "not-allowed",
              fontSize: "1rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}
          >
            <Sparkles size={18} /> Generate Script
          </button>
        </div>
      </div>
    );
  }

  // ── Generating Stage ─────────────────────────────────────────────────────────
  if (stage === "generating") {
    return (
      <div style={{ maxWidth: 600, margin: "6rem auto", textAlign: "center", padding: "2rem 1rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <Loader2 size={48} style={{ color: "var(--accent)", animation: "spin 1s linear infinite", margin: "0 auto 1rem" }} />
          <h2 style={{ fontSize: "1.3rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.5rem" }}>Generating your script...</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
            AI is crafting your {selected?.title?.toLowerCase()} with speaking notation.
          </p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // ── Result Stage ─────────────────────────────────────────────────────────────
  if (stage === "result" && result && selected) {
    const isRich = selected.outputType === "rich";

    return (
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "2rem 1rem" }}>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: "0.75rem" }}>
          <div>
            <button onClick={() => setStage("input")}
              style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer", fontSize: "0.85rem", padding: 0, marginBottom: "0.4rem" }}>
              <ArrowLeft size={15} /> Edit settings
            </button>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text-primary)" }}>
              {result.title || selected.title}
            </h2>
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button onClick={copyScript} style={{ display: "flex", alignItems: "center", gap: 6, padding: "0.6rem 0.9rem", borderRadius: 8, background: "var(--card-bg)", border: "1px solid var(--border)", color: "var(--text-primary)", cursor: "pointer", fontSize: "0.85rem" }}>
              {copied ? <CheckCircle size={14} style={{ color: "#10b981" }} /> : <Copy size={14} />}
              {copied ? "Copied!" : "Copy"}
            </button>
            <button onClick={downloadScript} style={{ display: "flex", alignItems: "center", gap: 6, padding: "0.6rem 0.9rem", borderRadius: 8, background: "var(--card-bg)", border: "1px solid var(--border)", color: "var(--text-primary)", cursor: "pointer", fontSize: "0.85rem" }}>
              <Download size={14} /> Download
            </button>
            <button onClick={practiceScript} style={{ display: "flex", alignItems: "center", gap: 6, padding: "0.6rem 1rem", borderRadius: 8, background: "var(--accent)", color: "#fff", border: "none", cursor: "pointer", fontSize: "0.85rem", fontWeight: 600 }}>
              <Mic size={14} /> Practice
            </button>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }} ref={scriptRef}>
          {/* Hook */}
          {isRich && result.hook && (
            <div style={{ background: "var(--accent)15", border: "1px solid var(--accent)40", borderRadius: 12, padding: "1rem 1.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: "0.5rem" }}>
                <Sparkles size={14} style={{ color: "var(--accent)" }} />
                <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Opening Hook</span>
              </div>
              <p style={{ fontSize: "0.95rem", color: "var(--text-primary)", lineHeight: 1.6, fontStyle: "italic" }}>{result.hook}</p>
            </div>
          )}

          {/* Script */}
          <div style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 12, padding: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: "1rem" }}>
              <FileText size={15} style={{ color: "var(--accent)" }} />
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Script</span>
            </div>
            <div style={{ fontSize: "0.95rem", lineHeight: 1.9, color: "var(--text-primary)", whiteSpace: "pre-wrap", fontFamily: "inherit" }}>
              {result.script}
            </div>
          </div>

          {/* Delivery Notes */}
          {isRich && result.deliveryNotes?.length ? (
            <div style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 12, padding: "1.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: "0.75rem" }}>
                <Lightbulb size={14} style={{ color: "#f59e0b" }} />
                <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Delivery Tips</span>
              </div>
              <ul style={{ margin: 0, padding: "0 0 0 1.25rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                {result.deliveryNotes.map((note, i) => (
                  <li key={i} style={{ fontSize: "0.875rem", color: "var(--text-primary)", lineHeight: 1.5 }}>{note}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {/* CTA */}
          {isRich && result.cta && (
            <div style={{ background: "#10b98115", border: "1px solid #10b98140", borderRadius: 12, padding: "1rem 1.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: "0.5rem" }}>
                <MessageSquare size={14} style={{ color: "#10b981" }} />
                <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#10b981", textTransform: "uppercase", letterSpacing: "0.05em" }}>Call to Action</span>
              </div>
              <p style={{ fontSize: "0.95rem", color: "var(--text-primary)", lineHeight: 1.6, fontWeight: 500 }}>{result.cta}</p>
            </div>
          )}

          {/* Caption */}
          {isRich && result.caption && (
            <div style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 12, padding: "1.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: "0.5rem" }}>
                <FileText size={14} style={{ color: "var(--text-secondary)" }} />
                <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Suggested Caption</span>
              </div>
              <p style={{ fontSize: "0.875rem", color: "var(--text-primary)", lineHeight: 1.6 }}>{result.caption}</p>
            </div>
          )}

          {/* Hashtags + B-roll + Thumbnails */}
          {isRich && (result.hashtags?.length || result.brollIdeas?.length || result.thumbnailIdeas?.length) ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
              {result.hashtags?.length ? (
                <div style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 12, padding: "1.25rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: "0.75rem" }}>
                    <Hash size={14} style={{ color: "var(--accent)" }} />
                    <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Hashtags</span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {result.hashtags.map((h, i) => (
                      <span key={i} style={{ fontSize: "0.8rem", padding: "3px 8px", borderRadius: 99, background: "var(--accent)15", color: "var(--accent)", fontWeight: 500 }}>
                        {h.startsWith("#") ? h : `#${h}`}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              {result.brollIdeas?.length ? (
                <div style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 12, padding: "1.25rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: "0.75rem" }}>
                    <Clapperboard size={14} style={{ color: "#8b5cf6" }} />
                    <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>B-Roll Ideas</span>
                  </div>
                  <ul style={{ margin: 0, padding: "0 0 0 1.1rem", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                    {result.brollIdeas.map((idea, i) => (
                      <li key={i} style={{ fontSize: "0.82rem", color: "var(--text-primary)", lineHeight: 1.4 }}>{idea}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {result.thumbnailIdeas?.length ? (
                <div style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 12, padding: "1.25rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: "0.75rem" }}>
                    <Lightbulb size={14} style={{ color: "#f59e0b" }} />
                    <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Thumbnail Ideas</span>
                  </div>
                  <ul style={{ margin: 0, padding: "0 0 0 1.1rem", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                    {result.thumbnailIdeas.map((idea, i) => (
                      <li key={i} style={{ fontSize: "0.82rem", color: "var(--text-primary)", lineHeight: 1.4 }}>{idea}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        {/* Generate Another */}
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <button
            onClick={() => { setStage("menu"); setResult(null); }}
            style={{ padding: "0.75rem 1.5rem", borderRadius: 10, background: "var(--card-bg)", border: "1px solid var(--border)", color: "var(--text-primary)", cursor: "pointer", fontSize: "0.9rem", fontWeight: 600 }}
          >
            Generate Another Script
          </button>
        </div>
      </div>
    );
  }

  return null;
}
