"use client";
import { useState, useEffect, useRef } from "react";
import { Mic, Square, BarChart2 } from "lucide-react";
import Link from "next/link";

const mockScript = `Good morning, everyone. Thank you for joining today's Q3 project update.

I want to cover three key areas: our progress against quarterly targets, two blockers we're managing, and our plan for the next sprint.

On progress: we completed the backend API integration last Friday — three days ahead of schedule. The QA team is now at 94% test pass rate, ahead of our milestone target.

To close: we are on track overall. Are there any questions on the blockers or the release timeline?`;

type State = "idle" | "recording" | "analyzing" | "done";

export default function PracticePage() {
  const [state, setState] = useState<State>("idle");
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function startRecording() {
    setState("recording");
    setSeconds(0);
    intervalRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
  }

  function stopRecording() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setState("analyzing");
    setTimeout(() => setState("done"), 2500);
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const timeStr = `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1F1F1F]">Practice</h1>
        <p className="text-sm text-[#636363] mt-1">Record your script delivery and get instant AI feedback.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Script Panel */}
        <div className="bg-white border border-[#E0E0E0] rounded-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-[#1F1F1F]">Your Script</h2>
            <span className="text-xs bg-[#E8F1FF] text-[#0056D2] px-2 py-0.5 rounded font-semibold">Business Meeting</span>
          </div>
          <div className="bg-[#F5F5F5] rounded-lg p-4 text-sm text-[#1F1F1F] leading-relaxed whitespace-pre-wrap font-sans max-h-64 overflow-y-auto">
            {mockScript}
          </div>
          <p className="text-xs text-[#636363] mt-3">Word count: 98 words · Est. duration: ~1m 20s</p>
        </div>

        {/* Recording Panel */}
        <div className="bg-white border border-[#E0E0E0] rounded-lg p-6 flex flex-col items-center justify-center min-h-64">
          {state === "idle" && (
            <div className="text-center">
              <p className="text-sm text-[#636363] mb-6">Press the button to start recording your script</p>
              <button
                onClick={startRecording}
                className="w-24 h-24 rounded-full bg-[#0056D2] hover:bg-[#003B8E] text-white flex items-center justify-center transition-colors shadow-lg pulse-ring mx-auto mb-6"
              >
                <Mic size={36} />
              </button>
              <p className="text-xs text-[#636363]">Recording will start immediately</p>
            </div>
          )}

          {state === "recording" && (
            <div className="text-center">
              <div className="flex items-center gap-2 justify-center mb-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                <span className="text-xs font-bold text-red-500 uppercase tracking-wider">Recording</span>
              </div>
              <p className="text-3xl font-bold text-[#1F1F1F] mb-6 font-mono">{timeStr}</p>

              {/* Waveform */}
              <div className="flex items-end gap-1 justify-center h-12 mb-6">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="wave-bar w-1.5 bg-[#0056D2] rounded-full"
                    style={{ height: `${20 + Math.random() * 30}px` }}
                  />
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

          {state === "analyzing" && (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#E8F1FF] flex items-center justify-center mx-auto mb-4">
                <BarChart2 size={32} className="text-[#0056D2] spin-slow" />
              </div>
              <p className="font-semibold text-[#1F1F1F] mb-1">Analyzing your speech...</p>
              <p className="text-sm text-[#636363]">Checking pronunciation, fluency, pace, and confidence.</p>
            </div>
          )}

          {state === "done" && (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#E6F7F2] flex items-center justify-center mx-auto mb-4">
                <BarChart2 size={32} className="text-[#00B37D]" />
              </div>
              <p className="font-bold text-[#1F1F1F] text-lg mb-1">Analysis Complete!</p>
              <p className="text-sm text-[#636363] mb-6">Your session has been scored and saved.</p>
              <div className="flex flex-col gap-3">
                <Link
                  href="/dashboard/results"
                  className="block bg-[#0056D2] hover:bg-[#003B8E] text-white font-semibold px-6 py-2.5 rounded text-sm transition-colors text-center"
                >
                  View My Results
                </Link>
                <button
                  onClick={() => { setState("idle"); setSeconds(0); }}
                  className="block border border-[#0056D2] text-[#0056D2] hover:bg-[#E8F1FF] font-semibold px-6 py-2.5 rounded text-sm transition-colors"
                >
                  Practice Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tips */}
      <div className="mt-6 bg-[#E8F1FF] rounded-lg p-4">
        <p className="text-sm font-semibold text-[#0056D2] mb-2">Recording tips</p>
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {[
            "Speak at a natural pace — not too fast, not too slow.",
            "Use a quiet room with minimal background noise.",
            "Look up from the script occasionally to build confidence.",
          ].map((tip) => (
            <li key={tip} className="text-xs text-[#1F1F1F] flex items-start gap-1.5">
              <span className="text-[#0056D2] font-bold mt-0.5">›</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
