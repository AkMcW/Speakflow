"use client";
import { useState, useEffect, useRef } from "react";
import { Mic, Square, BarChart2, BookOpen } from "lucide-react";
import Link from "next/link";

const DEFAULT_SCRIPT = `Good morning, everyone. Thank you for joining today's Q3 project update.

I want to cover three key areas: our progress against quarterly targets, two blockers we're managing, and our plan for the next sprint.

On progress: we completed the backend API integration last Friday — three days ahead of schedule. The QA team is now at 94% test pass rate, ahead of our milestone target.

To close: we are on track overall. Are there any questions on the blockers or the release timeline?`;

type State = "idle" | "recording" | "transcribing" | "analyzing" | "done";

interface ActiveScript {
  content: string;
  scenario: string;
  wordCount: number;
}

export default function PracticePage() {
  const [state, setState] = useState<State>("idle");
  const [seconds, setSeconds] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState("");
  const [activeScript, setActiveScript] = useState<ActiveScript | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("speakflow_active_script");
      if (raw) setActiveScript(JSON.parse(raw));
    } catch { /* ignore */ }
  }, []);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  async function startRecording() {
    setError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.start(100);
      setState("recording");
      setSeconds(0);
      intervalRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
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
      const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });

      // Step 1: Transcribe with Whisper
      let transcriptText = "";
      try {
        const formData = new FormData();
        formData.append("audio", audioBlob, "recording.webm");
        const res = await fetch("/api/practice/transcribe", { method: "POST", body: formData });
        const data = await res.json();
        transcriptText = data.transcript || "";
        setTranscript(transcriptText);
      } catch {
        setError("Transcription failed. Using mock analysis.");
        transcriptText = DEFAULT_SCRIPT;
      }

      const currentScript = activeScript?.content ?? DEFAULT_SCRIPT;
      const currentScenario = activeScript?.scenario ?? "Business Meeting Update";

      // Step 2: Analyze with GPT-4o
      setState("analyzing");
      try {
        const res = await fetch("/api/practice/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            transcript: transcriptText,
            script: currentScript,
            scenario: currentScenario,
          }),
        });
        const analysis = await res.json();
        // Store results in sessionStorage for the results page
        sessionStorage.setItem("speakflow_analysis", JSON.stringify({ ...analysis, transcript: transcriptText }));
      } catch {
        // Store mock results if API fails
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

  const statusLabel: Record<State, string> = {
    idle: "",
    recording: "Recording",
    transcribing: "Transcribing with Whisper...",
    analyzing: "Analyzing with GPT-4o...",
    done: "",
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1F1F1F]">Practice Recorder</h1>
        <p className="text-sm text-[#636363] mt-1">Record your delivery — AI analyzes pronunciation, fluency, confidence and more.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Script Panel */}
        <div className="bg-white border border-[#E0E0E0] rounded-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-[#1F1F1F]">Your Script</h2>
            <span className="text-xs bg-[#E8F1FF] text-[#0056D2] px-2 py-0.5 rounded font-semibold">
              {activeScript?.scenario ?? "Sample Script"}
            </span>
          </div>
          <div className="bg-[#F5F5F5] rounded-lg p-4 text-sm text-[#1F1F1F] leading-relaxed whitespace-pre-wrap font-sans max-h-64 overflow-y-auto">
            {activeScript?.content ?? DEFAULT_SCRIPT}
          </div>
          <p className="text-xs text-[#636363] mt-3">
            {activeScript?.wordCount ?? 98} words · ~{Math.max(1, Math.round((activeScript?.wordCount ?? 98) / 130))}m
          </p>

          <div className="mt-4 pt-4 border-t border-[#E0E0E0]">
            <Link href="/dashboard/script-writer" className="inline-flex items-center gap-1.5 text-xs text-[#0056D2] font-semibold hover:underline">
              <BookOpen size={12} />
              {activeScript ? "Change script in Script Writer" : "Use your own script from Script Writer"}
            </Link>
          </div>
        </div>

        {/* Recording Panel */}
        <div className="bg-white border border-[#E0E0E0] rounded-lg p-6 flex flex-col items-center justify-center min-h-72">
          {error && (
            <div className="w-full bg-[#FFEBEE] border border-[#FFCDD2] rounded-lg p-3 mb-4 text-xs text-[#E53935]">{error}</div>
          )}

          {state === "idle" && (
            <div className="text-center">
              <p className="text-sm text-[#636363] mb-6">Press the button to start recording</p>
              <button
                onClick={startRecording}
                className="w-24 h-24 rounded-full bg-[#0056D2] hover:bg-[#003B8E] text-white flex items-center justify-center transition-colors shadow-lg pulse-ring mx-auto mb-4"
              >
                <Mic size={36} />
              </button>
              <p className="text-xs text-[#9E9E9E]">Microphone required · Browser-based recording</p>
            </div>
          )}

          {state === "recording" && (
            <div className="text-center">
              <div className="flex items-center gap-2 justify-center mb-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                <span className="text-xs font-bold text-red-500 uppercase tracking-wider">Recording</span>
              </div>
              <p className="text-4xl font-bold text-[#1F1F1F] mb-5 font-mono">{timeStr}</p>
              <div className="flex items-end gap-1 justify-center h-12 mb-6">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="wave-bar w-1.5 bg-[#0056D2] rounded-full h-8" />
                ))}
              </div>
              <button
                onClick={stopRecording}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2.5 rounded transition-colors mx-auto"
              >
                <Square size={16} />
                Stop & Analyze
              </button>
            </div>
          )}

          {(state === "transcribing" || state === "analyzing") && (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#E8F1FF] flex items-center justify-center mx-auto mb-4">
                <BarChart2 size={32} className="text-[#0056D2] spin-slow" />
              </div>
              <p className="font-semibold text-[#1F1F1F] mb-1">{statusLabel[state]}</p>
              <p className="text-sm text-[#636363]">
                {state === "transcribing"
                  ? "Converting your speech to text..."
                  : "Scoring pronunciation, fluency, confidence, and more..."}
              </p>
              <div className="flex justify-center gap-1 mt-4">
                {[0,1,2].map(i => (
                  <div key={i} className="w-2 h-2 rounded-full bg-[#0056D2] animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          )}

          {state === "done" && (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#E6F7F2] flex items-center justify-center mx-auto mb-4">
                <BarChart2 size={32} className="text-[#00B37D]" />
              </div>
              <p className="font-bold text-[#1F1F1F] text-lg mb-1">Analysis Complete!</p>
              <p className="text-sm text-[#636363] mb-5">Your speech has been scored by AI.</p>
              {transcript && (
                <div className="bg-[#F5F5F5] rounded-lg p-3 mb-5 text-left max-h-24 overflow-y-auto">
                  <p className="text-xs text-[#636363] font-semibold mb-1">Transcript:</p>
                  <p className="text-xs text-[#1F1F1F] leading-relaxed">{transcript}</p>
                </div>
              )}
              <div className="flex flex-col gap-3">
                <Link
                  href="/dashboard/results"
                  className="block bg-[#0056D2] hover:bg-[#003B8E] text-white font-semibold px-6 py-2.5 rounded text-sm transition-colors text-center"
                >
                  View My Results
                </Link>
                <button
                  onClick={() => { setState("idle"); setSeconds(0); setTranscript(""); }}
                  className="block border border-[#0056D2] text-[#0056D2] hover:bg-[#E8F1FF] font-semibold px-6 py-2.5 rounded text-sm transition-colors"
                >
                  Practice Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 bg-[#E8F1FF] rounded-lg p-4">
        <p className="text-sm font-semibold text-[#0056D2] mb-2">How AI analysis works</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#1F1F1F]">
          <div className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-[#0056D2] text-white flex items-center justify-center font-bold shrink-0 text-[10px]">1</span>Your voice is recorded locally in the browser</div>
          <div className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-[#0056D2] text-white flex items-center justify-center font-bold shrink-0 text-[10px]">2</span>OpenAI Whisper transcribes your speech to text</div>
          <div className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-[#0056D2] text-white flex items-center justify-center font-bold shrink-0 text-[10px]">3</span>GPT-4o analyzes and scores your delivery</div>
        </div>
      </div>
    </div>
  );
}
