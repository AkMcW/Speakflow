"use client";
import { useState, useRef, useEffect } from "react";
import { EXAM_TRACKS, ExamTrack, ExamTask } from "@/data/examTracks";
import {
  Mic, Square, Loader2, ClipboardCheck, ArrowLeft, RotateCcw, Clock,
  CheckCircle, AlertCircle, Lightbulb, Printer, Sparkles, BookOpen, Pause, Play,
} from "lucide-react";

type Flow = "exam" | "task" | "ready" | "prep" | "recording" | "transcribing" | "analyzing" | "report";

interface ExamResult {
  nativeScore: string;
  scoreOutOf100: number;
  verdict: string;
  criteria: { name: string; score: number; comment: string }[];
  strengths: string[];
  improvements: string[];
  modelAnswer: string;
  examinerTip: string;
}

function fmt(s: number) {
  const m = Math.floor(s / 60);
  return `${m}:${(s % 60).toString().padStart(2, "0")}`;
}
function scoreColor(v: number) {
  if (v >= 80) return "#00B37D";
  if (v >= 60) return "#0056D2";
  if (v >= 45) return "#F5A623";
  return "#E53935";
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl p-5 ${className}`} style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
      {children}
    </div>
  );
}

function ListenButton({ text }: { text: string }) {
  const [state, setState] = useState<"idle" | "loading" | "playing">("idle");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const cacheRef = useRef<string | null>(null);
  async function play() {
    if (state === "playing") { audioRef.current?.pause(); setState("idle"); return; }
    try {
      let b64 = cacheRef.current;
      if (!b64) {
        setState("loading");
        const res = await fetch("/api/tts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text }) });
        const data = await res.json();
        if (!res.ok || !data.audio) throw new Error();
        b64 = data.audio as string; cacheRef.current = b64;
      }
      const audio = new Audio(`data:audio/mpeg;base64,${b64}`);
      audioRef.current = audio;
      audio.onended = () => setState("idle");
      audio.onerror = () => setState("idle");
      setState("playing");
      await audio.play().catch(() => setState("idle"));
    } catch { setState("idle"); }
  }
  return (
    <button onClick={play} disabled={state === "loading"}
      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
      style={{ background: "var(--bg-card)", color: "var(--accent)", border: "1px solid var(--accent)" }}>
      {state === "loading" ? <Loader2 size={13} className="animate-spin" /> : state === "playing" ? <Pause size={13} /> : <Play size={13} />}
      {state === "loading" ? "Loading…" : state === "playing" ? "Stop" : "Listen"}
    </button>
  );
}

export default function ExamSpeakingPage() {
  const [flow, setFlow] = useState<Flow>("exam");
  const [track, setTrack] = useState<ExamTrack | null>(null);
  const [task, setTask] = useState<ExamTask | null>(null);
  const [prompt, setPrompt] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [prepLeft, setPrepLeft] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [result, setResult] = useState<ExamResult | null>(null);
  const [error, setError] = useState("");

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prepRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (prepRef.current) clearInterval(prepRef.current);
  }, []);

  function pickTask(t: ExamTask) {
    setTask(t);
    setPrompt(t.prompts[0]);
    setResult(null);
    setTranscript("");
    setError("");
    setFlow("ready");
  }

  function beginTask() {
    if (!task) return;
    if (task.prepSeconds > 0) {
      setPrepLeft(task.prepSeconds);
      setFlow("prep");
      prepRef.current = setInterval(() => {
        setPrepLeft((p) => {
          if (p <= 1) {
            if (prepRef.current) clearInterval(prepRef.current);
            startRecording();
            return 0;
          }
          return p - 1;
        });
      }, 1000);
    } else {
      startRecording();
    }
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
      const limit = task?.responseSeconds ?? 120;
      intervalRef.current = setInterval(() => {
        setSeconds((s) => {
          if (s + 1 >= limit) { stopRecording(); }
          return s + 1;
        });
      }, 1000);
      setFlow("recording");
    } catch {
      setError("Microphone access denied. Please allow microphone access and try again.");
      setFlow("ready");
    }
  }

  async function stopRecording() {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
    const mr = mediaRecorderRef.current;
    if (!mr || mr.state === "inactive") return;
    mr.stop();
    mr.stream.getTracks().forEach((t) => t.stop());
    setFlow("transcribing");

    await new Promise<void>((res) => { mr.onstop = () => res(); });
    const mimeType = mr.mimeType || "audio/webm";
    const blob = new Blob(chunksRef.current, { type: mimeType });
    const fd = new FormData();
    fd.append("audio", blob, "exam.webm");

    try {
      const txRes = await fetch("/api/practice/transcribe", { method: "POST", body: fd });
      const txData = await txRes.json();
      if (!txRes.ok || !txData.transcript?.trim()) throw new Error(txData.error ?? "Transcription failed");
      setTranscript(txData.transcript);
      setFlow("analyzing");
      const res = await fetch("/api/exam/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transcript: txData.transcript,
          examId: track?.id, examName: track?.name,
          taskName: task?.name, taskType: task?.type, prompt,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Analysis failed");
      setResult(data);
      setFlow("report");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setFlow("ready");
    }
  }

  function skipPrep() {
    if (prepRef.current) clearInterval(prepRef.current);
    startRecording();
  }

  // ── Exam selection ──
  if (flow === "exam") {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
            <ClipboardCheck size={24} style={{ color: "var(--accent)" }} /> Exam Speaking Mode
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
            Practice real speaking tasks from the world's top English exams — with timed prep, recording, and scoring in each exam's native scale.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {EXAM_TRACKS.map((t) => (
            <button key={t.id} onClick={() => { setTrack(t); setFlow("task"); }}
              className="text-left rounded-xl p-4 transition-all hover:shadow-md"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = t.color; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">{t.emoji}</span>
                <span className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{t.name}</span>
              </div>
              <p className="text-xs mb-2" style={{ color: "var(--text-secondary)" }}>{t.blurb}</p>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ background: `${t.color}20`, color: t.color }}>{t.scoreSystem}</span>
                <span className="text-[10px]" style={{ color: "var(--text-secondary)" }}>{t.useCase}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ── Task selection ──
  if (flow === "task" && track) {
    return (
      <div className="max-w-2xl mx-auto space-y-5">
        <button onClick={() => setFlow("exam")} className="flex items-center gap-1.5 text-sm" style={{ color: "var(--text-secondary)" }}>
          <ArrowLeft size={15} /> All exams
        </button>
        <div className="flex items-center gap-3">
          <span className="text-3xl">{track.emoji}</span>
          <div>
            <h1 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>{track.name}</h1>
            <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{track.scoreSystem} · {track.scoreHint}</p>
          </div>
        </div>
        <div className="space-y-3">
          {track.tasks.map((t) => (
            <button key={t.id} onClick={() => pickTask(t)}
              className="w-full text-left rounded-xl p-4 transition-all hover:shadow-md"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = track.color; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{t.name}</span>
                <span className="text-[10px] flex items-center gap-1" style={{ color: "var(--text-secondary)" }}>
                  <Clock size={11} /> {t.prepSeconds > 0 ? `${t.prepSeconds}s prep · ` : ""}{t.responseSeconds}s
                </span>
              </div>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{t.instruction}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ── Ready / prep / recording / processing ──
  if (track && task && (flow === "ready" || flow === "prep" || flow === "recording" || flow === "transcribing" || flow === "analyzing")) {
    return (
      <div className="max-w-2xl mx-auto space-y-5">
        <button onClick={() => setFlow("task")} className="flex items-center gap-1.5 text-sm" style={{ color: "var(--text-secondary)" }}>
          <ArrowLeft size={15} /> Change task
        </button>
        <div className="flex items-center gap-3">
          <span className="text-2xl">{track.emoji}</span>
          <div>
            <h1 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>{track.name} — {task.name}</h1>
            <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{task.instruction}</p>
          </div>
        </div>

        {/* Prompt selection (only before starting) */}
        {flow === "ready" && task.prompts.length > 1 && (
          <Card>
            <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: "var(--text-secondary)" }}>Choose a prompt</p>
            <div className="space-y-2">
              {task.prompts.map((p) => (
                <button key={p} onClick={() => setPrompt(p)}
                  className="w-full text-left text-sm rounded-lg px-3 py-2 transition-colors"
                  style={prompt === p
                    ? { background: "var(--accent-bg)", border: "1px solid var(--accent)", color: "var(--accent)" }
                    : { background: "var(--bg-secondary)", border: "1px solid var(--border)", color: "var(--text-primary)" }}>
                  {p}
                </button>
              ))}
            </div>
          </Card>
        )}

        {/* The prompt / text being worked on */}
        <Card>
          <div className="flex items-center justify-between gap-2 mb-2">
            <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
              {task.type === "read-aloud" ? "Read this aloud" : "Your prompt"}
            </p>
            {task.type === "read-aloud" && <ListenButton text={prompt} />}
          </div>
          <p className={task.type === "read-aloud" ? "text-base leading-relaxed" : "text-base font-medium"} style={{ color: "var(--text-primary)" }}>{prompt}</p>
        </Card>

        {error && (
          <div className="flex items-center gap-2 p-3 rounded-lg text-sm" style={{ background: "#FFF0F0", border: "1px solid #FFCDD2", color: "#E53935" }}>
            <AlertCircle size={15} className="shrink-0" /> {error}
          </div>
        )}

        <Card className="flex flex-col items-center gap-3 text-center">
          {flow === "ready" && (
            <>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                {task.prepSeconds > 0 ? `${task.prepSeconds}s preparation, then ${task.responseSeconds}s to respond.` : `Speak for up to ${task.responseSeconds}s.`}
              </p>
              <button onClick={beginTask}
                className="w-20 h-20 rounded-full text-white flex items-center justify-center shadow-lg pulse-ring transition-colors"
                style={{ background: track.color }}>
                <Mic size={34} />
              </button>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{task.prepSeconds > 0 ? "Start preparation" : "Start recording"}</p>
            </>
          )}
          {flow === "prep" && (
            <>
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "#F5A623" }}>Preparation time</p>
              <p className="text-4xl font-bold" style={{ color: "var(--text-primary)" }}>{fmt(prepLeft)}</p>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>Recording starts automatically when prep ends.</p>
              <button onClick={skipPrep}
                className="text-sm font-semibold px-5 py-2 rounded-full text-white transition-colors" style={{ background: track.color }}>
                Skip — start now
              </button>
            </>
          )}
          {flow === "recording" && (
            <>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-bold text-red-500 uppercase tracking-wider">Recording — {fmt(seconds)} / {fmt(task.responseSeconds)}</span>
              </div>
              <div className="w-full max-w-xs h-1.5 rounded-full" style={{ background: "var(--border)" }}>
                <div className="h-1.5 rounded-full transition-all duration-1000" style={{ width: `${Math.min(100, (seconds / task.responseSeconds) * 100)}%`, background: track.color }} />
              </div>
              <button onClick={stopRecording}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-full transition-colors">
                <Square size={18} /> Stop & Score
              </button>
            </>
          )}
          {(flow === "transcribing" || flow === "analyzing") && (
            <div className="flex flex-col items-center gap-3 py-4">
              <Loader2 size={34} className="animate-spin" style={{ color: track.color }} />
              <p className="font-semibold" style={{ color: "var(--text-primary)" }}>
                {flow === "transcribing" ? "Transcribing your response…" : `Scoring against ${track.name} criteria…`}
              </p>
            </div>
          )}
        </Card>
      </div>
    );
  }

  // ── Report ──
  if (flow === "report" && result && track && task) {
    const r = result;
    return (
      <div className="max-w-2xl mx-auto space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{track.emoji}</span>
            <div>
              <h1 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>{track.name} Result</h1>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{task.name}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => window.print()} className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded border" style={{ color: "var(--text-secondary)", borderColor: "var(--border)" }}>
              <Printer size={13} /> Print
            </button>
            <button onClick={() => setFlow("ready")} className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded text-white" style={{ background: track.color }}>
              <RotateCcw size={13} /> Retry
            </button>
          </div>
        </div>

        {/* Score */}
        <Card>
          <div className="flex items-center gap-5">
            <div className="relative shrink-0" style={{ width: 110, height: 110 }}>
              <svg width="110" height="110" viewBox="0 0 110 110" className="-rotate-90">
                <circle cx="55" cy="55" r="48" fill="none" stroke="var(--border)" strokeWidth="9" />
                <circle cx="55" cy="55" r="48" fill="none" stroke={scoreColor(r.scoreOutOf100)} strokeWidth="9" strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 48} strokeDashoffset={(2 * Math.PI * 48) * (1 - (r.scoreOutOf100 || 0) / 100)}
                  style={{ transition: "stroke-dashoffset 1s ease-out" }} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-2">
                <span className="text-lg font-bold leading-tight" style={{ color: "var(--text-primary)" }}>{r.nativeScore}</span>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: "var(--text-secondary)" }}>{track.scoreSystem}</p>
              <p className="text-sm" style={{ color: "var(--text-primary)" }}>{r.verdict}</p>
            </div>
          </div>
        </Card>

        {/* Criteria */}
        {r.criteria?.length > 0 && (
          <Card>
            <h2 className="font-bold mb-4" style={{ color: "var(--text-primary)" }}>Examiner Criteria</h2>
            <div className="space-y-4">
              {r.criteria.map((c, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{c.name}</span>
                    <span className="text-xs font-bold" style={{ color: scoreColor(c.score) }}>{c.score}</span>
                  </div>
                  <div className="h-2 rounded-full mb-1" style={{ background: "var(--border)" }}>
                    <div className="h-2 rounded-full transition-all duration-700" style={{ width: `${c.score}%`, background: scoreColor(c.score) }} />
                  </div>
                  <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{c.comment}</p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Strengths / improvements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {r.strengths?.length > 0 && (
            <Card>
              <h2 className="font-bold mb-3 flex items-center gap-2" style={{ color: "var(--text-primary)" }}><CheckCircle size={16} style={{ color: "#00B37D" }} /> Strengths</h2>
              <ul className="space-y-2">
                {r.strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <CheckCircle size={13} className="mt-0.5 shrink-0" style={{ color: "#00B37D" }} /> {s}
                  </li>
                ))}
              </ul>
            </Card>
          )}
          {r.improvements?.length > 0 && (
            <Card>
              <h2 className="font-bold mb-3 flex items-center gap-2" style={{ color: "var(--text-primary)" }}><AlertCircle size={16} style={{ color: "#F5A623" }} /> To Improve</h2>
              <ul className="space-y-2">
                {r.improvements.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <AlertCircle size={13} className="mt-0.5 shrink-0" style={{ color: "#F5A623" }} /> {s}
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>

        {/* Model answer */}
        {r.modelAnswer && (
          <Card>
            <div className="flex items-center justify-between gap-2 mb-2">
              <h2 className="font-bold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                <Sparkles size={16} style={{ color: track.color }} /> {task.type === "read-aloud" ? "Delivery Tips" : "Model Answer"}
              </h2>
              {task.type !== "read-aloud" && <ListenButton text={r.modelAnswer} />}
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-primary)" }}>{r.modelAnswer}</p>
          </Card>
        )}

        {/* Examiner tip */}
        {r.examinerTip && (
          <Card className="!p-0 overflow-hidden">
            <div className="p-4 flex items-start gap-3" style={{ background: "var(--accent-bg)" }}>
              <Lightbulb size={16} className="shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider mb-0.5" style={{ color: "var(--accent)" }}>Examiner Tip</p>
                <p className="text-sm" style={{ color: "var(--text-primary)" }}>{r.examinerTip}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Transcript */}
        {transcript && (
          <Card>
            <h2 className="font-bold mb-2 flex items-center gap-2" style={{ color: "var(--text-primary)" }}><BookOpen size={16} style={{ color: "var(--accent)" }} /> Your Response</h2>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{transcript}</p>
          </Card>
        )}

        <div className="flex justify-center gap-3 pb-4">
          <button onClick={() => setFlow("task")} className="text-sm font-semibold px-5 py-2.5 rounded-lg border" style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}>
            Another task
          </button>
          <button onClick={() => setFlow("ready")} className="flex items-center gap-2 text-white font-semibold px-5 py-2.5 rounded-lg" style={{ background: track.color }}>
            <RotateCcw size={15} /> Retry this task
          </button>
        </div>
      </div>
    );
  }

  return null;
}
