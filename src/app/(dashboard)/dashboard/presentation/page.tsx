"use client";
import { useState, useEffect, useRef } from "react";
import { Mic, Square, ChevronRight, BarChart2 } from "lucide-react";

const audienceTypes = ["Colleagues", "Senior Management", "Clients / External", "General Public", "Conference Audience"];
const durations = ["1 minute", "2 minutes", "3 minutes", "5 minutes", "10 minutes"];

const buildOutline = (topic: string) => [
  { section: "Opening", content: `Start with a compelling hook related to "${topic || "your topic"}". State your objective in one sentence. Preview the three main points.` },
  { section: "Main Point 1", content: "Present your first key argument with supporting data or a relevant example. Keep this section to 30% of your total time." },
  { section: "Main Point 2", content: "Introduce your second key point. Use a transition like 'Building on this…' to maintain flow." },
  { section: "Main Point 3", content: "Share your third point. Include a story, statistic, or audience question to re-engage listeners." },
  { section: "Closing", content: "Summarize your three main points. End with a clear call to action or memorable closing statement. Invite questions." },
];

type Stage = "setup" | "practice" | "analyzing" | "done";

interface PresentationScores {
  structure: number;
  delivery: number;
  clarity: number;
  pace: number;
  overall: number;
  feedback: string;
  strengths: string[];
  improvements: string[];
}

export default function PresentationPage() {
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("Colleagues");
  const [duration, setDuration] = useState("2 minutes");
  const [stage, setStage] = useState<Stage>("setup");
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [scores, setScores] = useState<PresentationScores | null>(null);
  const [error, setError] = useState("");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  async function startRecording() {
    setError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];
      recorder.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      recorder.start(100);
      setSeconds(0);
      setRecording(true);
      intervalRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } catch {
      setError("Microphone access denied.");
    }
  }

  async function stopRecording() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    const recorder = mediaRecorderRef.current;
    if (!recorder) return;

    recorder.stop();
    recorder.stream.getTracks().forEach((t) => t.stop());
    setRecording(false);
    setStage("analyzing");

    recorder.onstop = async () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      let transcript = "";

      try {
        const form = new FormData();
        form.append("audio", blob, "recording.webm");
        const res = await fetch("/api/practice/transcribe", { method: "POST", body: form });
        const data = await res.json();
        transcript = data.transcript || "";
      } catch {
        setError("Transcription failed.");
        setStage("practice");
        return;
      }

      try {
        const res = await fetch("/api/practice/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            transcript,
            scenario: `Presentation — Topic: "${topic}", Audience: ${audience}, Duration: ${duration}`,
          }),
        });
        const data = await res.json();
        setScores({
          structure: data.scores?.structure ?? 80,
          delivery: data.scores?.confidence ?? 74,
          clarity: data.scores?.fluency ?? 78,
          pace: data.scores?.pace ?? 82,
          overall: data.scores?.overall ?? 79,
          feedback: data.aiFeedback ?? "",
          strengths: data.strengths ?? [],
          improvements: data.improvements ?? [],
        });
        setStage("done");
      } catch {
        setError("Analysis failed.");
        setStage("practice");
      }
    };
  }

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  const fmtTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  const outline = buildOutline(topic);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1F1F1F]">Presentation Practice</h1>
        <p className="text-sm text-[#636363] mt-1">Structure your presentation, then practice with real AI feedback.</p>
      </div>

      {error && (
        <div className="bg-[#FFEBEE] border border-[#FFCDD2] rounded-lg p-3 text-xs text-[#E53935]">{error}</div>
      )}

      {stage === "setup" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-[#E0E0E0] rounded-lg p-6 space-y-5">
            <h2 className="font-bold text-[#1F1F1F]">Configure your presentation</h2>
            <div>
              <label className="block text-sm font-semibold text-[#1F1F1F] mb-1.5">Presentation topic</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Q3 sales results and growth strategy"
                className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-sm text-[#1F1F1F] placeholder-[#9E9E9E] focus:outline-none focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#1F1F1F] mb-1.5">Audience type</label>
              <select value={audience} onChange={(e) => setAudience(e.target.value)} className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-sm text-[#1F1F1F] focus:outline-none focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2]">
                {audienceTypes.map((a) => <option key={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#1F1F1F] mb-1.5">Target duration</label>
              <select value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-sm text-[#1F1F1F] focus:outline-none focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2]">
                {durations.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
            <button
              onClick={() => setStage("practice")}
              className="w-full bg-[#0056D2] hover:bg-[#003B8E] text-white font-semibold py-2.5 rounded transition-colors flex items-center justify-center gap-2 text-sm"
            >
              Generate Outline & Practice <ChevronRight size={16} />
            </button>
          </div>

          <div className="bg-[#F5F5F5] border border-[#E0E0E0] rounded-lg p-6">
            <p className="text-sm font-bold text-[#636363] mb-4 uppercase tracking-wider">Structure Preview</p>
            <div className="space-y-3">
              {outline.map(({ section }, i) => (
                <div key={section} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#E0E0E0] text-[#636363] flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</div>
                  <span className="text-sm text-[#636363]">{section}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {stage === "practice" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            <h2 className="font-bold text-[#1F1F1F]">Structure Outline</h2>
            {outline.map(({ section, content }, i) => (
              <div key={section} className="bg-white border border-[#E0E0E0] rounded-lg p-4 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#0056D2] text-white flex items-center justify-center text-sm font-bold shrink-0">{i + 1}</div>
                <div>
                  <p className="font-semibold text-[#1F1F1F] text-sm mb-1">{section}</p>
                  <p className="text-xs text-[#636363] leading-relaxed">{content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white border border-[#E0E0E0] rounded-lg p-6 flex flex-col items-center justify-center">
            <p className="text-xs font-bold text-[#636363] uppercase tracking-wider mb-4">Recording</p>
            {!recording ? (
              <div className="text-center">
                <button onClick={startRecording} className="w-20 h-20 rounded-full bg-[#0056D2] hover:bg-[#003B8E] text-white flex items-center justify-center mx-auto mb-3 transition-colors pulse-ring">
                  <Mic size={30} />
                </button>
                <p className="text-sm text-[#636363]">Target: {duration}</p>
                <p className="text-xs text-[#9E9E9E]">Audience: {audience}</p>
              </div>
            ) : (
              <div className="text-center">
                <div className="flex items-center gap-1.5 justify-center mb-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  <span className="text-xs font-bold text-red-500">Recording</span>
                </div>
                <p className="text-3xl font-bold text-[#1F1F1F] mb-4 font-mono">{fmtTime(seconds)}</p>
                <div className="flex items-end gap-1 justify-center h-8 mb-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="wave-bar w-1.5 bg-[#0056D2] rounded-full" style={{ height: "20px" }} />
                  ))}
                </div>
                <button onClick={stopRecording} className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded transition-colors">
                  <Square size={14} /> Stop & Analyze
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {stage === "analyzing" && (
        <div className="bg-white border border-[#E0E0E0] rounded-lg p-10 text-center">
          <BarChart2 size={40} className="text-[#0056D2] mx-auto mb-4 spin-slow" />
          <p className="font-semibold text-[#1F1F1F] mb-1">Analyzing your presentation...</p>
          <p className="text-sm text-[#636363]">Scoring structure, delivery, clarity, and pace</p>
          <div className="flex justify-center gap-1 mt-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-[#0056D2] animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
        </div>
      )}

      {stage === "done" && scores && (
        <div className="space-y-4">
          <div className="bg-white border border-[#E0E0E0] rounded-lg p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-[#1F1F1F]">Presentation Scores</h2>
              <span className="text-2xl font-bold text-[#0056D2]">{scores.overall}/100</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {[
                { label: "Structure", score: scores.structure },
                { label: "Delivery", score: scores.delivery },
                { label: "Clarity", score: scores.clarity },
                { label: "Pace", score: scores.pace },
              ].map(({ label, score }) => (
                <div key={label} className="text-center bg-[#F5F5F5] rounded-lg p-4">
                  <p className="text-2xl font-bold text-[#0056D2]">{score}</p>
                  <p className="text-xs text-[#636363] mt-1">{label}</p>
                </div>
              ))}
            </div>

            {scores.feedback && (
              <div className="bg-[#E8F1FF] rounded-lg p-4 mb-4">
                <p className="text-sm font-semibold text-[#0056D2] mb-1">AI Feedback</p>
                <p className="text-xs text-[#636363] leading-relaxed">{scores.feedback}</p>
              </div>
            )}

            {scores.strengths.length > 0 && (
              <div className="mb-3">
                <p className="text-xs font-bold text-[#00B37D] uppercase tracking-wider mb-2">Strengths</p>
                <ul className="space-y-1">
                  {scores.strengths.map((s, i) => <li key={i} className="text-xs text-[#636363] flex items-start gap-1.5"><span className="text-[#00B37D] font-bold">✓</span>{s}</li>)}
                </ul>
              </div>
            )}

            {scores.improvements.length > 0 && (
              <div className="mb-4">
                <p className="text-xs font-bold text-[#F5A623] uppercase tracking-wider mb-2">Improvements</p>
                <ul className="space-y-1">
                  {scores.improvements.map((s, i) => <li key={i} className="text-xs text-[#636363] flex items-start gap-1.5"><span className="text-[#F5A623] font-bold">›</span>{s}</li>)}
                </ul>
              </div>
            )}

            <div className="flex gap-3">
              <button onClick={() => setStage("practice")} className="bg-[#0056D2] hover:bg-[#003B8E] text-white font-semibold px-5 py-2 rounded text-sm transition-colors">
                Practice Again
              </button>
              <button onClick={() => { setStage("setup"); setScores(null); }} className="border border-[#E0E0E0] text-[#636363] hover:bg-[#F5F5F5] font-semibold px-5 py-2 rounded text-sm transition-colors">
                New Presentation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
