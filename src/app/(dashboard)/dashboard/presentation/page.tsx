"use client";
import { useState, useEffect, useRef } from "react";
import { Mic, Square, ChevronRight } from "lucide-react";

const audienceTypes = ["Colleagues", "Senior Management", "Clients / External", "General Public", "Conference Audience"];
const durations = ["1 minute", "2 minutes", "3 minutes", "5 minutes", "10 minutes"];

const mockOutline = (topic: string) => [
  { section: "Opening", content: `Start with a compelling hook related to "${topic || "your topic"}". State your main objective in one sentence. Preview the three main points you'll cover.` },
  { section: "Main Point 1", content: "Present your first key argument with supporting data, a relevant example, or a brief case study. Keep this section to 30% of your total time." },
  { section: "Main Point 2", content: "Introduce your second key point. Use a transition phrase like 'Building on this...' or 'Another critical factor is...' to maintain flow." },
  { section: "Main Point 3", content: "Share your third point. This is a good place to include a personal story, statistic, or audience question to re-engage listeners." },
  { section: "Closing", content: "Summarize your three main points in 2–3 sentences. End with a clear call to action or memorable closing statement. Invite questions." },
];

type Stage = "setup" | "practice" | "done";

export default function PresentationPage() {
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("Colleagues");
  const [duration, setDuration] = useState("2 minutes");
  const [stage, setStage] = useState<Stage>("setup");
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function startRecording() {
    setRecording(true);
    setSeconds(0);
    intervalRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
  }

  function stopRecording() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setRecording(false);
    setStage("done");
  }

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  const fmtTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  const outline = mockOutline(topic);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1F1F1F]">Presentation Practice</h1>
        <p className="text-sm text-[#636363] mt-1">Structure your presentation, then practice with AI feedback.</p>
      </div>

      {stage === "setup" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Setup Form */}
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
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-sm text-[#1F1F1F] focus:outline-none focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2]"
              >
                {audienceTypes.map((a) => <option key={a}>{a}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1F1F1F] mb-1.5">Target duration</label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-sm text-[#1F1F1F] focus:outline-none focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2]"
              >
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

          {/* Preview */}
          <div className="bg-[#F5F5F5] border border-[#E0E0E0] rounded-lg p-6">
            <p className="text-sm font-bold text-[#636363] mb-4 uppercase tracking-wider">Structure Preview</p>
            <div className="space-y-3">
              {outline.map(({ section }, i) => (
                <div key={section} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#E0E0E0] text-[#636363] flex items-center justify-center text-xs font-bold shrink-0">
                    {i + 1}
                  </div>
                  <span className="text-sm text-[#636363]">{section}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {stage === "practice" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Outline */}
            <div className="lg:col-span-2 space-y-3">
              <h2 className="font-bold text-[#1F1F1F]">Structure Outline</h2>
              {outline.map(({ section, content }, i) => (
                <div key={section} className="bg-white border border-[#E0E0E0] rounded-lg p-4 flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#0056D2] text-white flex items-center justify-center text-sm font-bold shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-[#1F1F1F] text-sm mb-1">{section}</p>
                    <p className="text-xs text-[#636363] leading-relaxed">{content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Record */}
            <div className="bg-white border border-[#E0E0E0] rounded-lg p-6 flex flex-col items-center justify-center">
              <p className="text-xs font-bold text-[#636363] uppercase tracking-wider mb-4">Recording</p>
              {!recording ? (
                <div className="text-center">
                  <button
                    onClick={startRecording}
                    className="w-20 h-20 rounded-full bg-[#0056D2] hover:bg-[#003B8E] text-white flex items-center justify-center mx-auto mb-3 transition-colors pulse-ring"
                  >
                    <Mic size={30} />
                  </button>
                  <p className="text-sm text-[#636363]">Target: {duration}</p>
                  <p className="text-xs text-[#636363]">Audience: {audience}</p>
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
                  <button
                    onClick={stopRecording}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded transition-colors"
                  >
                    <Square size={14} />
                    Stop
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {stage === "done" && (
        <div className="space-y-4">
          <div className="bg-white border border-[#E0E0E0] rounded-lg p-6">
            <h2 className="font-bold text-[#1F1F1F] mb-4">Presentation Scores</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {[
                { label: "Structure", score: 80 },
                { label: "Delivery", score: 74 },
                { label: "Clarity", score: 78 },
                { label: "Pace", score: 82 },
              ].map(({ label, score }) => (
                <div key={label} className="text-center bg-[#F5F5F5] rounded-lg p-4">
                  <p className="text-2xl font-bold text-[#0056D2]">{score}</p>
                  <p className="text-xs text-[#636363] mt-1">{label}</p>
                </div>
              ))}
            </div>
            <div className="bg-[#E8F1FF] rounded-lg p-4">
              <p className="text-sm font-semibold text-[#0056D2] mb-1">AI Feedback</p>
              <p className="text-xs text-[#636363] leading-relaxed">
                Good overall structure. Your opening was clear and your main points were logically ordered. Work on reducing pace in the closing section — you rushed the final 20 seconds. Try pausing briefly after each main point to give your audience time to absorb the information.
              </p>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => { setStage("practice"); }}
                className="bg-[#0056D2] hover:bg-[#003B8E] text-white font-semibold px-5 py-2 rounded text-sm transition-colors"
              >
                Practice Again
              </button>
              <button
                onClick={() => setStage("setup")}
                className="border border-[#E0E0E0] text-[#636363] hover:bg-[#F5F5F5] font-semibold px-5 py-2 rounded text-sm transition-colors"
              >
                New Presentation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
