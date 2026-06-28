"use client";
import { useState, useRef } from "react";
import {
  Mic, Square, Loader2, GraduationCap, ArrowLeft, RotateCcw, Sparkles,
  CheckCircle, AlertCircle, TrendingUp, BookOpen, Volume2, Music, Zap,
  MessageSquare, Target, Repeat, Lightbulb, Printer,
} from "lucide-react";

// ─── Scenarios ────────────────────────────────────────────────────────────────
interface Scenario {
  id: string;
  label: string;
  emoji: string;
  desc: string;
  prompts: string[];
}

const SCENARIOS: Scenario[] = [
  { id: "executive", label: "Executive Meeting", emoji: "👔", desc: "Speak with authority to leadership",
    prompts: ["Summarize this quarter's performance and your top priority for next quarter.", "Convince the leadership team to invest in a new initiative.", "Explain a setback and your recovery plan."] },
  { id: "investor", label: "Investor Pitch", emoji: "💰", desc: "Persuade investors with clarity",
    prompts: ["Pitch your company in 90 seconds.", "Explain why now is the right time for your product.", "Answer: 'What stops a big competitor from copying you?'"] },
  { id: "interview", label: "Job Interview", emoji: "💼", desc: "Sound sharp and confident",
    prompts: ["Tell me about yourself.", "Describe a time you led through ambiguity.", "Why should we hire you over other strong candidates?"] },
  { id: "academic", label: "Academic Discussion", emoji: "🎓", desc: "Discuss complex ideas precisely",
    prompts: ["Explain a concept from your field to a smart non-expert.", "Defend a position on a debated topic in your discipline.", "Critique a common assumption in your field."] },
  { id: "debate", label: "Debate", emoji: "⚖️", desc: "Argue under pressure",
    prompts: ["Argue that remote work harms innovation.", "Defend strict AI regulation.", "Argue both sides of: social media does more harm than good."] },
  { id: "sales", label: "Sales Presentation", emoji: "🤝", desc: "Win the customer",
    prompts: ["Present your product's value to a skeptical buyer.", "Handle the objection: 'It's too expensive.'", "Explain your differentiator in one minute."] },
  { id: "conference", label: "Conference Talk", emoji: "🎤", desc: "Engage a large audience",
    prompts: ["Open a talk with a hook about your topic.", "Explain your big idea worth spreading.", "Close your talk with a memorable call to action."] },
  { id: "difficult", label: "Difficult Conversation", emoji: "🌡️", desc: "Stay calm and tactful",
    prompts: ["Give critical feedback to an underperforming colleague.", "Decline a request from your manager diplomatically.", "Address a conflict between two team members."] },
  { id: "networking", label: "Networking", emoji: "🥂", desc: "Connect naturally",
    prompts: ["Introduce yourself and what you do at an event.", "Explain what makes your work interesting.", "Follow up after meeting someone you'd like to work with."] },
  { id: "podcast", label: "Podcast Guest", emoji: "🎙️", desc: "Speak naturally and engagingly",
    prompts: ["Answer: 'What's a belief you've changed your mind about?'", "Tell a story that shaped your career.", "Give your hot take on a trend in your industry."] },
  { id: "c2-exam", label: "C2 Exam-Style", emoji: "📝", desc: "Exam-style long turn",
    prompts: ["Speak for 2 minutes on: does technology bring people together or push them apart?", "Discuss the advantages and disadvantages of globalization.", "To what extent should governments fund the arts?"] },
];

// ─── Score config ─────────────────────────────────────────────────────────────
const SCORE_META: { key: string; label: string; color: string }[] = [
  { key: "fluency", label: "Fluency", color: "#0056D2" },
  { key: "precision", label: "Precision", color: "#7B61FF" },
  { key: "complexity", label: "Complexity", color: "#0056D2" },
  { key: "naturalness", label: "Naturalness", color: "#00B37D" },
  { key: "pronunciationClarity", label: "Pronunciation Clarity", color: "#0056D2" },
  { key: "intonation", label: "Intonation", color: "#F5A623" },
  { key: "rhythm", label: "Rhythm", color: "#F5A623" },
  { key: "vocabularyRange", label: "Vocabulary Range", color: "#7B61FF" },
  { key: "idiomaticControl", label: "Idiomatic Control", color: "#E53935" },
  { key: "discourseControl", label: "Discourse Control", color: "#00B37D" },
  { key: "confidence", label: "Confidence", color: "#00B37D" },
  { key: "culturalAppropriateness", label: "Cultural Appropriateness", color: "#7B61FF" },
];

// ─── Types ────────────────────────────────────────────────────────────────────
interface C2Result {
  currentLevel: string;
  targetLevel: string;
  c2Readiness: number;
  scores: Record<string, number>;
  fillerWords: { count: number; words: string[] };
  wpm: number;
  nativeRewrite: { original: string; c2Version: string; whyBetter: string[] };
  vocabularyUpgrades: { basic: string; upgrade: string; note: string }[];
  collocationFixes: { instead: string; use: string; note: string }[];
  fluencyGaps: string[];
  intonationCoaching: string;
  pronunciationFeedback: string;
  didWell: string[];
  keepsBelowC2: string[];
  practiceAssignment: string;
  shadowingSentence: string;
}

type Flow = "scenario" | "ready" | "recording" | "transcribing" | "analyzing" | "report";

function fmt(s: number) {
  const m = Math.floor(s / 60);
  return `${m}:${(s % 60).toString().padStart(2, "0")}`;
}
function readinessColor(v: number) {
  if (v >= 85) return "#00B37D";
  if (v >= 70) return "#0056D2";
  if (v >= 55) return "#F5A623";
  return "#E53935";
}

function ScoreBar({ label, score, color }: { label: string; score: number; color: string }) {
  const v = Math.max(0, Math.min(100, score || 0));
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>{label}</span>
        <span className="text-xs font-bold" style={{ color }}>{v}</span>
      </div>
      <div className="h-2 rounded-full" style={{ background: "var(--border)" }}>
        <div className="h-2 rounded-full transition-all duration-700" style={{ width: `${v}%`, background: color }} />
      </div>
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl p-5 ${className}`} style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
      {children}
    </div>
  );
}

export default function C2FluencyLabPage() {
  const [flow, setFlow] = useState<Flow>("scenario");
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [prompt, setPrompt] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [result, setResult] = useState<C2Result | null>(null);
  const [error, setError] = useState("");

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  function pickScenario(s: Scenario) {
    setScenario(s);
    setPrompt(s.prompts[0]);
    setError("");
    setResult(null);
    setTranscript("");
    setFlow("ready");
  }

  async function startRecording() {
    setError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = ["audio/webm", "audio/mp4", "audio/ogg"].find((m) => MediaRecorder.isTypeSupported(m)) ?? "";
      const mr = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
      chunksRef.current = [];
      mr.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      mr.start(250);
      mediaRecorderRef.current = mr;
      setSeconds(0);
      intervalRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
      setFlow("recording");
    } catch {
      setError("Microphone access denied. Please allow microphone access and try again.");
    }
  }

  async function stopRecording() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    const mr = mediaRecorderRef.current;
    if (!mr) return;
    mr.stop();
    mr.stream.getTracks().forEach((t) => t.stop());
    setFlow("transcribing");

    await new Promise<void>((res) => { mr.onstop = () => res(); });
    const mimeType = mr.mimeType || "audio/webm";
    const blob = new Blob(chunksRef.current, { type: mimeType });
    const fd = new FormData();
    fd.append("audio", blob, "c2.webm");

    try {
      const txRes = await fetch("/api/practice/transcribe", { method: "POST", body: fd });
      const txData = await txRes.json();
      if (!txRes.ok || !txData.transcript?.trim()) throw new Error(txData.error ?? "Transcription failed");
      setTranscript(txData.transcript);
      setFlow("analyzing");
      await analyze(txData.transcript);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setFlow("ready");
    }
  }

  async function analyze(tx: string) {
    try {
      const res = await fetch("/api/c2/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript: tx, scenario: scenario?.label, prompt }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Analysis failed");
      setResult(data);
      setFlow("report");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Analysis failed");
      setFlow("ready");
    }
  }

  function reset() {
    setFlow("ready");
    setResult(null);
    setTranscript("");
    setSeconds(0);
    setError("");
  }

  // ── Scenario selection ──
  if (flow === "scenario") {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
            <GraduationCap size={24} style={{ color: "var(--accent)" }} /> C2 Fluency Lab
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
            Move from “good English” to C2-level confident, natural, precise speaking. Your accent stays — your clarity, rhythm, and impact level up.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>Choose a speaking scenario</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {SCENARIOS.map((s) => (
              <button key={s.id} onClick={() => pickScenario(s)}
                className="text-left rounded-xl p-4 transition-all hover:shadow-md"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{s.emoji}</span>
                  <span className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{s.label}</span>
                </div>
                <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{s.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Ready / recording ──
  if (flow === "ready" || flow === "recording" || flow === "transcribing" || flow === "analyzing") {
    return (
      <div className="max-w-2xl mx-auto space-y-5">
        <button onClick={() => setFlow("scenario")} className="flex items-center gap-1.5 text-sm" style={{ color: "var(--text-secondary)" }}>
          <ArrowLeft size={15} /> Change scenario
        </button>

        <div className="flex items-center gap-3">
          <span className="text-2xl">{scenario?.emoji}</span>
          <div>
            <h1 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>{scenario?.label}</h1>
            <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{scenario?.desc}</p>
          </div>
        </div>

        {/* Prompt picker */}
        <Card>
          <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "var(--text-secondary)" }}>Speaking prompt</p>
          <div className="space-y-2 mb-3">
            {scenario?.prompts.map((p) => (
              <button key={p} onClick={() => setPrompt(p)}
                className="w-full text-left text-sm rounded-lg px-3 py-2 transition-colors"
                style={prompt === p
                  ? { background: "var(--accent-bg)", border: "1px solid var(--accent)", color: "var(--accent)" }
                  : { background: "var(--bg-secondary)", border: "1px solid var(--border)", color: "var(--text-primary)" }}>
                {p}
              </button>
            ))}
          </div>
          <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={2}
            placeholder="Or write your own prompt…"
            className="w-full rounded-lg px-3 py-2 text-sm"
            style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", color: "var(--text-primary)" }} />
        </Card>

        {error && (
          <div className="flex items-center gap-2 p-3 rounded-lg text-sm" style={{ background: "#FFF0F0", border: "1px solid #FFCDD2", color: "#E53935" }}>
            <AlertCircle size={15} className="shrink-0" /> {error}
          </div>
        )}

        {/* Recorder */}
        <Card className="flex flex-col items-center gap-4 text-center">
          {flow === "ready" && (
            <>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Speak for 1–5 minutes. Aim for natural, structured, precise delivery.</p>
              <button onClick={startRecording}
                className="w-20 h-20 rounded-full text-white flex items-center justify-center shadow-lg pulse-ring transition-colors"
                style={{ background: "var(--accent)" }}>
                <Mic size={34} />
              </button>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>Tap to start recording</p>
            </>
          )}
          {flow === "recording" && (
            <>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-bold text-red-500 uppercase tracking-wider">Recording — {fmt(seconds)}</span>
              </div>
              <div className="flex items-end gap-0.5 h-10">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div key={i} className="wave-bar w-1 rounded-full" style={{ height: "28px", background: "var(--accent)" }} />
                ))}
              </div>
              <button onClick={stopRecording}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-full transition-colors">
                <Square size={18} /> Stop & Analyze
              </button>
            </>
          )}
          {(flow === "transcribing" || flow === "analyzing") && (
            <div className="flex flex-col items-center gap-3 py-4">
              <Loader2 size={36} className="animate-spin" style={{ color: "var(--accent)" }} />
              <p className="font-semibold" style={{ color: "var(--text-primary)" }}>
                {flow === "transcribing" ? "Transcribing your speech…" : "Running C2-level analysis…"}
              </p>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                {flow === "transcribing" ? "Converting audio to text" : "Scoring fluency, naturalness, rhythm, and more"}
              </p>
            </div>
          )}
        </Card>
      </div>
    );
  }

  // ── Report ──
  if (flow === "report" && result) {
    const r = result;
    return (
      <div className="max-w-3xl mx-auto space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{scenario?.emoji}</span>
            <div>
              <h1 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>C2 Fluency Report</h1>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{scenario?.label}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => window.print()}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded border transition-colors"
              style={{ color: "var(--text-secondary)", borderColor: "var(--border)" }}>
              <Printer size={13} /> Print
            </button>
            <button onClick={reset}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded text-white transition-colors"
              style={{ background: "var(--accent)" }}>
              <RotateCcw size={13} /> Try Again
            </button>
          </div>
        </div>

        {/* Readiness + levels */}
        <Card>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative shrink-0" style={{ width: 130, height: 130 }}>
              <svg width="130" height="130" viewBox="0 0 130 130" className="-rotate-90">
                <circle cx="65" cy="65" r="58" fill="none" stroke="var(--border)" strokeWidth="10" />
                <circle cx="65" cy="65" r="58" fill="none" stroke={readinessColor(r.c2Readiness)} strokeWidth="10"
                  strokeLinecap="round" strokeDasharray={2 * Math.PI * 58}
                  strokeDashoffset={(2 * Math.PI * 58) * (1 - (r.c2Readiness || 0) / 100)}
                  style={{ transition: "stroke-dashoffset 1s ease-out" }} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>{r.c2Readiness}</span>
                <span className="text-[10px]" style={{ color: "var(--text-secondary)" }}>C2 Readiness</span>
              </div>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-3 mb-2">
                <div>
                  <p className="text-xs" style={{ color: "var(--text-secondary)" }}>Current level</p>
                  <p className="text-2xl font-bold" style={{ color: "var(--accent)" }}>{r.currentLevel}</p>
                </div>
                <TrendingUp size={20} style={{ color: "var(--text-secondary)" }} />
                <div>
                  <p className="text-xs" style={{ color: "var(--text-secondary)" }}>Target</p>
                  <p className="text-2xl font-bold" style={{ color: "#00B37D" }}>{r.targetLevel}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 justify-center sm:justify-start text-xs" style={{ color: "var(--text-secondary)" }}>
                {r.wpm > 0 && <span>{r.wpm} wpm</span>}
                {r.fillerWords?.count > 0 && (
                  <span>{r.fillerWords.count} filler{r.fillerWords.count !== 1 ? "s" : ""}{r.fillerWords.words?.length ? ` — ${r.fillerWords.words.map((w) => `"${w}"`).join(", ")}` : ""}</span>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Scores */}
        <Card>
          <h2 className="font-bold mb-4 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
            <Target size={16} style={{ color: "var(--accent)" }} /> C2 Score Breakdown
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            {SCORE_META.map((m) => (
              <ScoreBar key={m.key} label={m.label} score={r.scores?.[m.key] ?? 0} color={m.color} />
            ))}
          </div>
        </Card>

        {/* Native-like rewrite */}
        {r.nativeRewrite && (
          <Card>
            <h2 className="font-bold mb-3 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
              <Sparkles size={16} style={{ color: "var(--accent)" }} /> Native-Like Rewrite
            </h2>
            <div className="space-y-3">
              <div className="rounded-lg p-3" style={{ background: "var(--bg-secondary)" }}>
                <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: "var(--text-secondary)" }}>You said</p>
                <p className="text-sm italic" style={{ color: "var(--text-secondary)" }}>“{r.nativeRewrite.original}”</p>
              </div>
              <div className="rounded-lg p-3" style={{ background: "#E6F7F2", border: "1px solid #00B37D" }}>
                <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: "#00875A" }}>C2-level version</p>
                <p className="text-sm font-medium" style={{ color: "#0A5C42" }}>“{r.nativeRewrite.c2Version}”</p>
              </div>
              {r.nativeRewrite.whyBetter?.length > 0 && (
                <ul className="space-y-1">
                  {r.nativeRewrite.whyBetter.map((w, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs" style={{ color: "var(--text-secondary)" }}>
                      <CheckCircle size={13} className="mt-0.5 shrink-0" style={{ color: "#00B37D" }} /> {w}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Card>
        )}

        {/* Vocabulary upgrades */}
        {r.vocabularyUpgrades?.length > 0 && (
          <Card>
            <h2 className="font-bold mb-3 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
              <BookOpen size={16} style={{ color: "#7B61FF" }} /> C2 Vocabulary Upgrade
            </h2>
            <div className="space-y-2">
              {r.vocabularyUpgrades.map((v, i) => (
                <div key={i} className="rounded-lg p-3" style={{ background: "var(--bg-secondary)" }}>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-sm line-through" style={{ color: "var(--text-secondary)" }}>{v.basic}</span>
                    <ArrowLeft size={12} className="rotate-180" style={{ color: "#7B61FF" }} />
                    <span className="text-sm font-bold" style={{ color: "#7B61FF" }}>{v.upgrade}</span>
                  </div>
                  {v.note && <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{v.note}</p>}
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Collocation coach */}
        {r.collocationFixes?.length > 0 && (
          <Card>
            <h2 className="font-bold mb-3 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
              <MessageSquare size={16} style={{ color: "var(--accent)" }} /> Collocation Coach
            </h2>
            <div className="space-y-2">
              {r.collocationFixes.map((c, i) => (
                <div key={i} className="text-sm flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 rounded" style={{ background: "#FFF0F0", color: "#E53935" }}>{c.instead}</span>
                  <span style={{ color: "var(--text-secondary)" }}>→</span>
                  <span className="px-2 py-0.5 rounded font-semibold" style={{ background: "#E6F7F2", color: "#00875A" }}>{c.use}</span>
                  {c.note && <span className="text-xs" style={{ color: "var(--text-secondary)" }}>· {c.note}</span>}
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Fluency gaps */}
        {r.fluencyGaps?.length > 0 && (
          <Card>
            <h2 className="font-bold mb-3 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
              <Zap size={16} style={{ color: "#F5A623" }} /> Fluency Gap Detector
            </h2>
            <ul className="space-y-2">
              {r.fluencyGaps.map((g, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#F5A623" }} /> {g}
                </li>
              ))}
            </ul>
          </Card>
        )}

        {/* Intonation + pronunciation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {r.intonationCoaching && (
            <Card>
              <h2 className="font-bold mb-2 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                <Music size={16} style={{ color: "#F5A623" }} /> Intonation & Rhythm
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{r.intonationCoaching}</p>
            </Card>
          )}
          {r.pronunciationFeedback && (
            <Card>
              <h2 className="font-bold mb-2 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                <Volume2 size={16} style={{ color: "var(--accent)" }} /> Pronunciation Clarity
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{r.pronunciationFeedback}</p>
            </Card>
          )}
        </div>

        {/* Did well / keeps below C2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {r.didWell?.length > 0 && (
            <Card>
              <h2 className="font-bold mb-3 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                <CheckCircle size={16} style={{ color: "#00B37D" }} /> What You Did Well
              </h2>
              <ul className="space-y-2">
                {r.didWell.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <CheckCircle size={13} className="mt-0.5 shrink-0" style={{ color: "#00B37D" }} /> {s}
                  </li>
                ))}
              </ul>
            </Card>
          )}
          {r.keepsBelowC2?.length > 0 && (
            <Card>
              <h2 className="font-bold mb-3 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                <AlertCircle size={16} style={{ color: "#F5A623" }} /> What Keeps You Below C2
              </h2>
              <ul className="space-y-2">
                {r.keepsBelowC2.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <AlertCircle size={13} className="mt-0.5 shrink-0" style={{ color: "#F5A623" }} /> {s}
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>

        {/* Shadowing sentence */}
        {r.shadowingSentence && (
          <Card className="!p-0 overflow-hidden">
            <div className="p-5" style={{ background: "var(--accent-bg)" }}>
              <h2 className="font-bold mb-2 flex items-center gap-2" style={{ color: "var(--accent)" }}>
                <Repeat size={16} /> Shadow This Sentence
              </h2>
              <p className="text-base font-medium mb-1" style={{ color: "var(--text-primary)" }}>“{r.shadowingSentence}”</p>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>Listen in your head, then repeat it 3× — match the rhythm and stress, not the accent.</p>
            </div>
          </Card>
        )}

        {/* Practice assignment */}
        {r.practiceAssignment && (
          <Card>
            <h2 className="font-bold mb-2 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
              <Lightbulb size={16} style={{ color: "#F5A623" }} /> Practice Assignment
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{r.practiceAssignment}</p>
          </Card>
        )}

        {/* Transcript */}
        {transcript && (
          <Card>
            <h2 className="font-bold mb-2 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
              <Mic size={16} style={{ color: "var(--accent)" }} /> Your Transcript
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{transcript}</p>
          </Card>
        )}

        <div className="flex justify-center pb-4">
          <button onClick={reset}
            className="flex items-center gap-2 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors"
            style={{ background: "var(--accent)" }}>
            <RotateCcw size={15} /> Practice Again
          </button>
        </div>
      </div>
    );
  }

  return null;
}
