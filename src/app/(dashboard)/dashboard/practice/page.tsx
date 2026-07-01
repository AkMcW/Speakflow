"use client";
import { useState, useEffect, useRef } from "react";
import { Mic, Square, BarChart2, BookOpen, Type, ToggleLeft, ToggleRight, Video, VideoOff, Languages, Printer, Maximize2, X, Play, Pause, RotateCcw, ScrollText, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { saveRecording } from "@/lib/recordings";
import PracticeListenShadow from "@/components/PracticeListenShadow";

const DEFAULT_SCRIPT = `Good morning, everyone. Thank you for joining today's Q3 project update.

I want to cover three key areas: our progress against quarterly targets, / two blockers we're managing, /// and our plan for the next sprint.

On progress: we completed the backend API integration last Friday — three days ahead of schedule. // The QA team is now at **94% test pass rate**, ahead of our milestone target. [SMILE]

To close: [SLOW] we are on track overall. /// Are there any questions on the blockers or the release timeline? [LOOK LEFT] [LOOK RIGHT]`;

type State = "idle" | "recording" | "transcribing" | "analyzing" | "done";

function saveAnalysisForCompare() {
  try {
    const cur = sessionStorage.getItem("speakflow_analysis");
    if (cur) sessionStorage.setItem("speakflow_analysis_prev", cur);
  } catch { /* ignore */ }
}

interface ActiveScript {
  content: string;
  scenario: string;
  wordCount: number;
}

type FontSize = "sm" | "base" | "lg" | "xl";

const fontSizeClass: Record<FontSize, string> = {
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

const fontSizeLabel: Record<FontSize, string> = { sm: "S", base: "M", lg: "L", xl: "XL" };

// Notation tokens
const DIRECTIVES = ["SLOW","FAST","SMILE","QUIET","STRONG","STEP FORWARD","LOOK LEFT","LOOK RIGHT"];
const DIRECTIVE_COLORS: Record<string, string> = {
  SLOW: "bg-blue-100 text-blue-700",
  FAST: "bg-orange-100 text-orange-700",
  SMILE: "bg-yellow-100 text-yellow-700",
  QUIET: "bg-purple-100 text-purple-700",
  STRONG: "bg-red-100 text-red-700",
  "STEP FORWARD": "bg-green-100 text-green-700",
  "LOOK LEFT": "bg-teal-100 text-teal-700",
  "LOOK RIGHT": "bg-teal-100 text-teal-700",
};

// Common words with IPA pronunciation hints
const PHONETIC_MAP: Record<string, string> = {
  "the": "ðə", "this": "ðɪs", "that": "ðæt", "those": "ðoʊz", "these": "ðiːz", "them": "ðɛm", "there": "ðɛr", "then": "ðɛn", "though": "ðoʊ", "through": "θruː",
  "think": "θɪŋk", "thank": "θæŋk", "three": "θriː", "things": "θɪŋz", "third": "θɜːrd",
  "very": "ˈvɛri", "voice": "vɔɪs", "view": "vjuː", "value": "ˈvæljuː",
  "world": "wɜːrld", "work": "wɜːrk", "word": "wɜːrd", "would": "wʊd", "will": "wɪl",
  "right": "raɪt", "really": "ˈriːli", "ready": "ˈrɛdi", "result": "rɪˈzʌlt",
  "question": "ˈkwɛstʃən", "quarter": "ˈkwɔːrtər", "quality": "ˈkwɒlɪti",
  "schedule": "ˈʃɛdjuːl", "should": "ʃʊd", "share": "ʃɛr",
  "just": "dʒʌst", "join": "dʒɔɪn", "judge": "dʒʌdʒ",
  "measure": "ˈmɛʒər", "vision": "ˈvɪʒən",
  "update": "ˈʌpdɛɪt", "overall": "ˌoʊvərˈɔːl", "ahead": "əˈhɛd",
  "everyone": "ˈɛvriwʌn", "important": "ɪmˈpɔːrtənt",
};

function addPhonetics(text: string): React.ReactNode[] {
  const words = text.split(/(\s+|[,\.!?;:—–])/);
  return words.map((token, i) => {
    const clean = token.toLowerCase().replace(/[^a-z]/g, "");
    const ipa = PHONETIC_MAP[clean];
    if (ipa) {
      return (
        <span key={i} className="relative inline-block group cursor-help">
          <span className="border-b border-dotted border-[#0056D2]">{token}</span>
          <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#1F1F1F] text-white text-[10px] font-mono px-1.5 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
            /{ipa}/
          </span>
        </span>
      );
    }
    return <span key={i}>{token}</span>;
  });
}

function stripNotation(text: string): string {
  return text
    .replace(/\[(?:SLOW|FAST|SMILE|QUIET|STRONG|STEP FORWARD|LOOK LEFT|LOOK RIGHT)\]/g, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\/{1,3}/g, "")
    .replace(/  +/g, " ")
    .replace(/ ([,.])/g, "$1")
    .trim();
}

function renderNotation(text: string, fontSize: FontSize) {
  // Split into lines then process tokens within each line
  const lines = text.split("\n");
  return lines.map((line, li) => {
    // Tokenize: split by pause markers, emphasis, and directives
    const tokens: React.ReactNode[] = [];
    let i = 0;
    const chars = line;

    // We'll process char by char using a simple state machine
    let buf = "";
    while (i < chars.length) {
      // Check for directive [...]
      if (chars[i] === "[") {
        const end = chars.indexOf("]", i);
        if (end !== -1) {
          const tag = chars.slice(i + 1, end);
          if (DIRECTIVES.includes(tag)) {
            if (buf) { tokens.push(<span key={`b-${i}`}>{buf}</span>); buf = ""; }
            const color = DIRECTIVE_COLORS[tag] ?? "bg-gray-100 text-gray-600";
            tokens.push(
              <span key={`d-${i}`} className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold mx-0.5 ${color}`}>
                {tag}
              </span>
            );
            i = end + 1;
            continue;
          }
        }
      }

      // Check for emphasis **word**
      if (chars[i] === "*" && chars[i + 1] === "*") {
        const end = chars.indexOf("**", i + 2);
        if (end !== -1) {
          if (buf) { tokens.push(<span key={`b-${i}`}>{buf}</span>); buf = ""; }
          const word = chars.slice(i + 2, end);
          tokens.push(
            <span key={`em-${i}`} className="font-bold text-[#0056D2] underline decoration-dotted">{word}</span>
          );
          i = end + 2;
          continue;
        }
      }

      // Check for pause /// // /
      if (chars[i] === "/") {
        let count = 0;
        while (i + count < chars.length && chars[i + count] === "/") count++;
        if (buf) { tokens.push(<span key={`b-${i}`}>{buf}</span>); buf = ""; }
        if (count >= 3) {
          tokens.push(
            <span key={`p3-${i}`} className="inline-flex items-center gap-0.5 mx-1 text-[#F5A623]" title="Long pause">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] inline-block" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] inline-block" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] inline-block" />
            </span>
          );
        } else if (count === 2) {
          tokens.push(
            <span key={`p2-${i}`} className="inline-flex items-center gap-0.5 mx-1 text-[#F5A623]" title="Medium pause">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] inline-block" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] inline-block" />
            </span>
          );
        } else {
          tokens.push(
            <span key={`p1-${i}`} className="inline-flex items-center mx-1 text-[#F5A623]" title="Short pause">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] inline-block" />
            </span>
          );
        }
        i += count;
        continue;
      }

      buf += chars[i];
      i++;
    }
    if (buf) tokens.push(<span key="tail">{buf}</span>);

    return (
      <p key={li} className={li < lines.length - 1 ? "mb-3" : ""}>
        {tokens.length > 0 ? tokens : <br />}
      </p>
    );
  });
}

export default function PracticePage() {
  const [state, setState] = useState<State>("idle");
  const [seconds, setSeconds] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState("");
  const [activeScript, setActiveScript] = useState<ActiveScript | null>(null);
  const [fontSize, setFontSize] = useState<FontSize>("base");
  const [notationOn, setNotationOn] = useState(true);
  const [phoneticOn, setPhoneticOn] = useState(false);
  const [webcamOn, setWebcamOn] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [telePlaying, setTelePlaying] = useState(false);
  const [teleSpeed, setTeleSpeed] = useState(1.4); // pixels per frame
  const [teleMirror, setTeleMirror] = useState(false);
  const teleScrollRef = useRef<HTMLDivElement | null>(null);
  const teleRafRef = useRef<number | null>(null);
  const secondsRef = useRef(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoStreamRef = useRef<MediaStream | null>(null);

  // Teleprompter auto-scroll loop
  useEffect(() => {
    if (!fullscreen || !telePlaying) return;
    const step = () => {
      const el = teleScrollRef.current;
      if (el) {
        el.scrollTop += teleSpeed;
        if (el.scrollTop + el.clientHeight >= el.scrollHeight - 1) {
          setTelePlaying(false);
          return;
        }
      }
      teleRafRef.current = requestAnimationFrame(step);
    };
    teleRafRef.current = requestAnimationFrame(step);
    return () => { if (teleRafRef.current) cancelAnimationFrame(teleRafRef.current); };
  }, [fullscreen, telePlaying, teleSpeed]);

  function openTeleprompter() {
    setFullscreen(true);
    setTelePlaying(false);
    requestAnimationFrame(() => { if (teleScrollRef.current) teleScrollRef.current.scrollTop = 0; });
  }

  function restartTeleprompter() {
    if (teleScrollRef.current) teleScrollRef.current.scrollTop = 0;
    setTelePlaying(true);
  }

  useEffect(() => {
    try {
      // Check sessionStorage for script passed from Script Library / Generator
      const ssScript = sessionStorage.getItem("sf_practice_script");
      const ssScenario = sessionStorage.getItem("sf_practice_scenario");
      if (ssScript) {
        sessionStorage.removeItem("sf_practice_script");
        sessionStorage.removeItem("sf_practice_scenario");
        setActiveScript({ content: ssScript, scenario: ssScenario || "Practice Session", wordCount: ssScript.split(/\s+/).length });
        return;
      }
      const raw = localStorage.getItem("speakflow_active_script");
      if (raw) setActiveScript(JSON.parse(raw));
    } catch { /* ignore */ }
  }, []);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  async function toggleWebcam() {
    if (webcamOn) {
      videoStreamRef.current?.getTracks().forEach((t) => t.stop());
      videoStreamRef.current = null;
      if (videoRef.current) videoRef.current.srcObject = null;
      setWebcamOn(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
        });
        videoStreamRef.current = stream;
        setWebcamOn(true);
        // srcObject is set in the effect below after the video element mounts
      } catch {
        setError("Camera access denied. Please allow camera access and try again.");
      }
    }
  }

  // Attach stream after <video> element renders (webcamOn flips to true first)
  useEffect(() => {
    if (webcamOn && videoRef.current && videoStreamRef.current) {
      videoRef.current.srcObject = videoStreamRef.current;
    }
  }, [webcamOn]);

  useEffect(() => {
    return () => { videoStreamRef.current?.getTracks().forEach((t) => t.stop()); };
  }, []);

  async function startRecording() {
    setError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = ["audio/webm", "audio/mp4", "audio/ogg", "audio/wav"]
        .find((m) => MediaRecorder.isTypeSupported(m)) ?? "";
      const mediaRecorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.start(100);
      setState("recording");
      setSeconds(0);
      secondsRef.current = 0;
      intervalRef.current = setInterval(() => { secondsRef.current += 1; setSeconds((s) => s + 1); }, 1000);
    } catch {
      setError("Microphone access denied. Please allow microphone access and try again.");
    }
  }

  async function stopRecording() {
    if (intervalRef.current) clearInterval(intervalRef.current);

    const mediaRecorder = mediaRecorderRef.current;
    if (!mediaRecorder) return;

    mediaRecorder.stop();
    mediaRecorder.stream.getTracks().forEach((t) => t.stop());

    setState("transcribing");

    mediaRecorder.onstop = async () => {
      const mimeType = mediaRecorder.mimeType || "audio/webm";
      const audioBlob = new Blob(chunksRef.current, { type: mimeType });

      let transcriptText = "";
      try {
        const formData = new FormData();
        formData.append("audio", audioBlob, "recording.webm");
        const res = await fetch("/api/practice/transcribe", { method: "POST", body: formData });
        const data = await res.json();
        if (!res.ok || data.error) throw new Error(data.error ?? "Transcription failed");
        transcriptText = data.transcript || "";
        if (!transcriptText.trim()) throw new Error("No speech detected — please check your microphone and speak clearly");
        setTranscript(transcriptText);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Transcription failed";
        setError(msg);
        setState("idle");
        return;
      }

      const currentScript = activeScript?.content ?? DEFAULT_SCRIPT;
      const currentScenario = activeScript?.scenario ?? "Business Meeting Update";

      setState("analyzing");
      try {
        const res = await fetch("/api/practice/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ transcript: transcriptText, script: currentScript, scenario: currentScenario }),
        });
        const analysis = await res.json();
        if (!res.ok || analysis.error || !analysis.scores) throw new Error(analysis.error ?? "No scores returned");
        saveAnalysisForCompare();
        sessionStorage.setItem("speakflow_analysis", JSON.stringify({ ...analysis, transcript: transcriptText }));
        sessionStorage.setItem("speakflow_analysis_scenario", currentScenario);
        // Persist to database (non-critical — fire and forget)
        fetch("/api/practice/sessions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            scenario: currentScenario,
            transcript: transcriptText,
            scores: analysis.scores,
            fillerWords: analysis.fillerWords,
            wpm: analysis.wpm ?? 0,
            durationSeconds: secondsRef.current,
            strengths: analysis.strengths ?? [],
            improvements: analysis.improvements ?? [],
            aiFeedback: analysis.aiFeedback ?? "",
            analysis: {
              wordErrors: analysis.wordErrors ?? [],
              pronunciationNotes: analysis.pronunciationNotes ?? [],
              scriptComparison: analysis.scriptComparison ?? null,
              nativeTip: analysis.nativeTip ?? "",
              bandScore: analysis.bandScore ?? null,
            },
          }),
        }).catch(() => {});
        try {
          await saveRecording({
            scenario: currentScenario,
            transcript: transcriptText,
            duration: secondsRef.current,
            wpm: analysis.wpm ?? 0,
            overallScore: analysis.scores?.overall ?? 0,
            audioBlob,
            mimeType,
            createdAt: new Date().toISOString(),
          });
        } catch { /* non-critical */ }
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Analysis failed";
        console.error("Analysis error:", msg);
        setError(`AI analysis failed: ${msg}. Showing sample scores.`);
        sessionStorage.setItem("speakflow_analysis", JSON.stringify({
          scores: { pronunciation: 74, fluency: 81, confidence: 68, structure: 77, vocabulary: 72, pace: 83, overall: 76 },
          fillerWords: { count: 3, words: ["um", "uh", "like"] },
          wpm: 128,
          strengths: ["Clear structure with distinct sections", "Strong opening that establishes context", "Professional vocabulary throughout"],
          improvements: ["Reduce filler words like 'um' and 'uh'", "Slow down slightly — pace was slightly fast", "Add a stronger call-to-action in the closing"],
          aiFeedback: "Your delivery showed good structure and professional tone. Focus on reducing filler words and adding more vocal variety to keep your audience engaged.",
          transcript: transcriptText,
        }));
      }

      setState("done");
    };
  }

  useEffect(() => {
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const timeStr = `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

  const scriptContent = activeScript?.content ?? DEFAULT_SCRIPT;
  const wordCount = activeScript?.wordCount ?? 98;

  return (
    <div className="max-w-6xl mx-auto space-y-5">
      {/* Full-screen reading / teleprompter overlay */}
      {fullscreen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col">
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-b border-[#E0E0E0] shrink-0">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm font-bold text-[#1F1F1F]">{activeScript?.scenario ?? "Your Script"}</span>
              <div className="flex items-center gap-1 border border-[#E0E0E0] rounded overflow-hidden">
                <span className="px-2 text-xs text-[#636363]"><Type size={12} /></span>
                {(["sm","base","lg","xl"] as FontSize[]).map((s) => (
                  <button key={s} onClick={() => setFontSize(s)}
                    className={`px-2 py-1 text-xs font-semibold transition-colors ${fontSize === s ? "bg-[#0056D2] text-white" : "text-[#636363] hover:bg-[#F5F5F5]"}`}>
                    {fontSizeLabel[s]}
                  </button>
                ))}
              </div>
            </div>

            {/* Teleprompter controls */}
            <div className="flex items-center gap-2 flex-wrap">
              <button onClick={() => setTelePlaying((v) => !v)}
                className="flex items-center gap-1.5 text-xs font-semibold bg-[#0056D2] hover:bg-[#003B8E] text-white px-3 py-1.5 rounded transition-colors"
                title={telePlaying ? "Pause auto-scroll" : "Start auto-scroll"}>
                {telePlaying ? <Pause size={14} /> : <Play size={14} />}
                {telePlaying ? "Pause" : "Auto-scroll"}
              </button>
              <button onClick={restartTeleprompter} title="Restart from top"
                className="p-1.5 rounded border border-[#E0E0E0] text-[#636363] hover:bg-[#F5F5F5] transition-colors">
                <RotateCcw size={14} />
              </button>
              <div className="flex items-center gap-1 border border-[#E0E0E0] rounded">
                <button onClick={() => setTeleSpeed((s) => Math.max(0.4, Math.round((s - 0.3) * 10) / 10))} className="px-1.5 py-1 text-[#636363] hover:bg-[#F5F5F5]" title="Slower"><Minus size={13} /></button>
                <span className="text-[11px] font-semibold text-[#1F1F1F] w-12 text-center tabular-nums">{teleSpeed.toFixed(1)}×</span>
                <button onClick={() => setTeleSpeed((s) => Math.min(6, Math.round((s + 0.3) * 10) / 10))} className="px-1.5 py-1 text-[#636363] hover:bg-[#F5F5F5]" title="Faster"><Plus size={13} /></button>
              </div>
              <button onClick={() => setTeleMirror((v) => !v)}
                className={`text-xs font-semibold px-2.5 py-1.5 rounded border transition-colors ${teleMirror ? "border-[#0056D2] text-[#0056D2] bg-[#E8F1FF]" : "border-[#E0E0E0] text-[#636363] hover:bg-[#F5F5F5]"}`}
                title="Mirror horizontally (for beam-splitter rigs)">
                Mirror
              </button>
              <button onClick={() => { setFullscreen(false); setTelePlaying(false); }}
                className="flex items-center gap-1.5 text-sm font-semibold text-[#636363] hover:text-[#E53935] transition-colors ml-1">
                <X size={18} /> Exit
              </button>
            </div>
          </div>

          <div ref={teleScrollRef} className={`flex-1 overflow-y-auto px-6 sm:px-12 py-8 leading-loose ${fontSizeClass[fontSize]}`}
            style={teleMirror ? { transform: "scaleX(-1)" } : undefined}>
            <div className="max-w-3xl mx-auto">
              {notationOn
                ? phoneticOn
                  ? <div className="whitespace-pre-wrap leading-loose">{addPhonetics(stripNotation(scriptContent))}</div>
                  : renderNotation(scriptContent, fontSize)
                : phoneticOn
                  ? <div className="whitespace-pre-wrap text-[#1F1F1F] leading-loose">{addPhonetics(stripNotation(scriptContent))}</div>
                  : <p className="whitespace-pre-wrap text-[#1F1F1F]">{stripNotation(scriptContent)}</p>
              }
              {/* Tail space so the last lines can scroll into reading position */}
              <div style={{ height: "40vh" }} />
            </div>
          </div>

          {/* Reading guide line */}
          <div className="pointer-events-none absolute left-0 right-0 top-1/3 h-px bg-[#0056D2]/20" />
        </div>
      )}

      <div>
        <h1 className="text-2xl font-bold text-[#1F1F1F]">Practice Recorder</h1>
        <p className="text-sm text-[#636363] mt-1">Record your delivery — AI analyzes pronunciation, fluency, confidence and more.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
        {/* ─── Left / main pane (script) ─── */}
        <div className="order-2 lg:order-1 lg:col-span-2 space-y-5">

      {/* Script Panel — full width, enlarged */}
      <div className="bg-white border border-[#E0E0E0] rounded-lg p-6">
        {/* Header row */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <h2 className="font-bold text-[#1F1F1F] flex-1">Your Script</h2>
          <span className="text-xs bg-[#E8F1FF] text-[#0056D2] px-2 py-0.5 rounded font-semibold">
            {activeScript?.scenario ?? "Sample Script"}
          </span>

          {/* Font size selector */}
          <div className="flex items-center gap-1 border border-[#E0E0E0] rounded overflow-hidden">
            <span className="px-2 text-xs text-[#636363]"><Type size={12} /></span>
            {(["sm","base","lg","xl"] as FontSize[]).map((s) => (
              <button
                key={s}
                onClick={() => setFontSize(s)}
                className={`px-2 py-1 text-xs font-semibold transition-colors ${fontSize === s ? "bg-[#0056D2] text-white" : "text-[#636363] hover:bg-[#F5F5F5]"}`}
              >
                {fontSizeLabel[s]}
              </button>
            ))}
          </div>

          {/* Notation toggle */}
          <button
            onClick={() => setNotationOn((v) => !v)}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#636363] hover:text-[#0056D2] transition-colors"
            title="Toggle speaking notation"
          >
            {notationOn
              ? <ToggleRight size={18} className="text-[#0056D2]" />
              : <ToggleLeft size={18} />}
            <span className={notationOn ? "text-[#0056D2]" : ""}>Notation</span>
          </button>

          {/* Phonetic toggle */}
          <button
            onClick={() => setPhoneticOn((v) => !v)}
            className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${phoneticOn ? "text-[#0056D2]" : "text-[#636363] hover:text-[#0056D2]"}`}
            title="Show IPA phonetic hints on hover"
          >
            <Languages size={15} className={phoneticOn ? "text-[#0056D2]" : ""} />
            <span>IPA</span>
          </button>

          {/* Webcam toggle */}
          <button
            onClick={toggleWebcam}
            className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${webcamOn ? "text-[#0056D2]" : "text-[#636363] hover:text-[#0056D2]"}`}
            title="Toggle webcam"
          >
            {webcamOn ? <Video size={15} className="text-[#0056D2]" /> : <VideoOff size={15} />}
            <span>Webcam</span>
          </button>

          {/* Fullscreen toggle */}
          <button
            onClick={() => setFullscreen(true)}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#636363] hover:text-[#0056D2] transition-colors"
            title="Full screen reading view"
          >
            <Maximize2 size={15} />
            <span>Full screen</span>
          </button>

          {/* Teleprompter */}
          <button
            onClick={openTeleprompter}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#636363] hover:text-[#0056D2] transition-colors"
            title="Teleprompter — auto-scrolling full-screen reader"
          >
            <ScrollText size={15} />
            <span>Teleprompter</span>
          </button>
        </div>

        {/* Script body — fits to content length */}
        <div className={`bg-[#F9FAFB] border border-[#E0E0E0] rounded-lg p-5 leading-relaxed ${fontSizeClass[fontSize]}`}>
          {notationOn
            ? phoneticOn
              ? <div className="whitespace-pre-wrap leading-relaxed">{addPhonetics(stripNotation(scriptContent).replace(/\n/g, "\n"))}</div>
              : renderNotation(scriptContent, fontSize)
            : phoneticOn
              ? <div className="whitespace-pre-wrap text-[#1F1F1F] leading-relaxed">{addPhonetics(stripNotation(scriptContent))}</div>
              : <p className="whitespace-pre-wrap text-[#1F1F1F]">{stripNotation(scriptContent)}</p>
          }
        </div>

        {/* Footer row */}
        <div className="flex flex-wrap items-center justify-between mt-3 gap-2">
          <div className="flex items-center gap-4">
            <p className="text-xs text-[#636363]">{wordCount} words · ~{Math.max(1, Math.round(wordCount / 130))}m</p>
            <Link href="/dashboard/script-writer" className="inline-flex items-center gap-1 text-xs text-[#0056D2] font-semibold hover:underline">
              <BookOpen size={11} />
              {activeScript ? "Change script" : "Use your own script"}
            </Link>
          </div>
          {phoneticOn && (
            <p className="text-[10px] text-[#0056D2] font-medium">
              IPA hints on — hover underlined words to see pronunciation
            </p>
          )}
          {notationOn && !phoneticOn && (
            <div className="flex flex-wrap items-center gap-2 text-[10px] text-[#9E9E9E]">
              <span className="inline-flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] inline-block" /> short pause</span>
              <span className="inline-flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] inline-block" /><span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] inline-block" /> medium</span>
              <span className="inline-flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] inline-block" /><span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] inline-block" /><span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] inline-block" /> long</span>
              <span className="font-bold text-[#0056D2] underline decoration-dotted">emphasis</span>
              <span className="px-1.5 py-0.5 rounded bg-green-100 text-green-700 font-bold">DIRECTIVE</span>
            </div>
          )}
        </div>
      </div>

      {/* Listen & Shadow — AI text-to-speech + sentence-by-sentence shadowing */}
      <PracticeListenShadow text={stripNotation(scriptContent)} />

        </div>{/* ─── end left pane ─── */}

        {/* ─── Right pane — camera preview + record controls, anchored at top ─── */}
        <aside className="order-1 lg:order-2 lg:col-span-1 space-y-5 lg:sticky lg:top-4">

      {/* Webcam preview */}
      {webcamOn && (
        <div className="bg-white border border-[#E0E0E0] rounded-lg p-4 flex flex-col items-center gap-3">
          <div className="flex items-center justify-between w-full">
            <p className="text-sm font-semibold text-[#1F1F1F] flex items-center gap-1.5"><Video size={14} className="text-[#0056D2]" /> Camera Preview</p>
            <button onClick={toggleWebcam} className="text-xs text-[#636363] hover:text-red-500 transition-colors">Turn off</button>
          </div>
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="rounded-lg w-full aspect-video bg-black object-cover"
          />
          <p className="text-xs text-[#9E9E9E] text-center">Practice eye contact and expressions while reading your script</p>
        </div>
      )}

      {/* Recording Panel — "Ready to record" frame */}
      <div className="bg-white border border-[#E0E0E0] rounded-lg p-6">
        {error && (
          <div className="bg-[#FFEBEE] border border-[#FFCDD2] rounded-lg p-3 mb-5 text-xs text-[#E53935]">{error}</div>
        )}

        {state === "idle" && (
          <div className="flex flex-col items-center text-center gap-4">
            <button
              onClick={startRecording}
              className="w-20 h-20 rounded-full bg-[#0056D2] hover:bg-[#003B8E] text-white flex items-center justify-center transition-colors shadow-lg pulse-ring shrink-0"
            >
              <Mic size={34} />
            </button>
          </div>
        )}

        {state === "recording" && (
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <button
              onClick={stopRecording}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-full transition-colors shrink-0 shadow"
            >
              <Square size={18} />
              Stop & Analyze
            </button>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                <span className="text-xs font-bold text-red-500 uppercase tracking-wider">Recording</span>
                <span className="text-2xl font-bold text-[#1F1F1F] font-mono ml-2">{timeStr}</span>
              </div>
              <div className="flex items-end gap-0.5 h-10">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div key={i} className="wave-bar w-1 bg-[#0056D2] rounded-full flex-1" style={{ height: "28px" }} />
                ))}
              </div>
            </div>
          </div>
        )}

        {(state === "transcribing" || state === "analyzing") && (
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-[#E8F1FF] flex items-center justify-center shrink-0">
              <BarChart2 size={28} className="text-[#0056D2] spin-slow" />
            </div>
            <div>
              <p className="font-semibold text-[#1F1F1F] mb-1">
                {state === "transcribing" ? "Transcribing with Whisper..." : "Analyzing with GPT-4o..."}
              </p>
              <p className="text-sm text-[#636363]">
                {state === "transcribing" ? "Converting your speech to text..." : "Scoring pronunciation, fluency, confidence, and more..."}
              </p>
              <div className="flex gap-1 mt-3">
                {[0,1,2].map(i => (
                  <div key={i} className="w-2 h-2 rounded-full bg-[#0056D2] animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          </div>
        )}

        {state === "done" && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-14 h-14 rounded-full bg-[#E6F7F2] flex items-center justify-center shrink-0">
              <BarChart2 size={28} className="text-[#00B37D]" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-[#1F1F1F] text-lg mb-1">Analysis Complete!</p>
              <p className="text-sm text-[#636363] mb-3">Your speech has been scored by AI.</p>
              {transcript && (
                <div className="bg-[#F5F5F5] rounded-lg p-3 mb-4 overflow-y-auto resize-y"
                  style={{ height: "160px", minHeight: "60px" }}>
                  <p className="text-xs text-[#636363] font-semibold mb-1">Transcript:</p>
                  <p className="text-xs text-[#1F1F1F] leading-relaxed">{transcript}</p>
                </div>
              )}
              <div className="flex flex-wrap gap-3">
                <Link href="/dashboard/results" className="bg-[#0056D2] hover:bg-[#003B8E] text-white font-semibold px-5 py-2 rounded text-sm transition-colors">
                  View My Results
                </Link>
                <button
                  onClick={() => { setState("idle"); setSeconds(0); setTranscript(""); }}
                  className="border border-[#0056D2] text-[#0056D2] hover:bg-[#E8F1FF] font-semibold px-5 py-2 rounded text-sm transition-colors"
                >
                  Practice Again
                </button>
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 border border-[#E0E0E0] text-[#636363] hover:bg-[#F5F5F5] font-semibold px-4 py-2 rounded text-sm transition-colors"
                >
                  <Printer size={14} /> Print
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

        </aside>{/* ─── end right pane ─── */}
      </div>{/* ─── end grid ─── */}
    </div>
  );
}
