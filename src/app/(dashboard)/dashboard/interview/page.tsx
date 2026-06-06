"use client";
import { useState, useEffect, useRef } from "react";
import { Mic, Square } from "lucide-react";

type Scenario = "Job Interview" | "MBA Interview" | "Leadership Q&A";

const questions: Record<Scenario, string[]> = {
  "Job Interview": [
    "Tell me about yourself.",
    "Why do you want to work here?",
    "Describe a time you resolved a conflict at work.",
    "What is your greatest professional achievement?",
    "Where do you see yourself in 5 years?",
  ],
  "MBA Interview": [
    "Why do you want an MBA, and why now?",
    "Walk me through your career progression.",
    "Describe a leadership challenge you faced.",
    "Why this school specifically?",
    "How will you contribute to the class community?",
  ],
  "Leadership Q&A": [
    "How do you motivate a team through a difficult project?",
    "Tell me about a strategic decision you made with incomplete information.",
    "How do you handle underperforming team members?",
    "Describe your approach to change management.",
    "What is your leadership philosophy?",
  ],
};

const starTips: Record<string, string[]> = {
  Situation: ["Set the scene in 1–2 sentences", "Be specific about time and context", "Don't over-explain — stay concise"],
  Task: ["State your role clearly", "Focus on your responsibility, not the team's", "Mention constraints if relevant"],
  Action: ["Use 'I', not 'we'", "Describe specific steps you took", "Show initiative and decision-making"],
  Result: ["Quantify whenever possible", "Include what you learned", "End positively"],
};

const mockFeedback = {
  score: 79,
  structure: "Strong STAR structure — clearly identified the situation and your role.",
  delivery: "Good pace and tone. Minor filler words detected: 'um' (×3), 'basically' (×2).",
  vocab: "Professional vocabulary used well. Try replacing 'things' with more specific terms.",
  suggestion: "Your result section was strong but could include a specific metric or outcome to make it more compelling.",
};

export default function InterviewPage() {
  const [scenario, setScenario] = useState<Scenario>("Job Interview");
  const [qIndex, setQIndex] = useState(0);
  const [recording, setRecording] = useState(false);
  const [done, setDone] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function startRecording() {
    setRecording(true);
    setDone(false);
    setSeconds(0);
    intervalRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
  }

  function stopRecording() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setRecording(false);
    setDone(true);
  }

  function nextQuestion() {
    setQIndex((i) => (i + 1) % questions[scenario].length);
    setDone(false);
    setSeconds(0);
  }

  useEffect(() => {
    setQIndex(0);
    setDone(false);
    setRecording(false);
    setSeconds(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, [scenario]);

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  const fmtTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1F1F1F]">Interview Practice</h1>
        <p className="text-sm text-[#636363] mt-1">Practice with STAR method guidance and AI feedback.</p>
      </div>

      {/* Scenario Selector */}
      <div className="flex flex-wrap gap-2">
        {(["Job Interview", "MBA Interview", "Leadership Q&A"] as Scenario[]).map((s) => (
          <button
            key={s}
            onClick={() => setScenario(s)}
            className={`px-4 py-2 rounded font-semibold text-sm transition-colors ${
              scenario === s
                ? "bg-[#0056D2] text-white"
                : "border border-[#E0E0E0] text-[#636363] hover:border-[#0056D2] hover:text-[#0056D2]"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Question + Record */}
        <div className="lg:col-span-2 space-y-4">
          {/* Question */}
          <div className="bg-white border border-[#E0E0E0] rounded-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#636363] uppercase tracking-wider">
                Question {qIndex + 1} of {questions[scenario].length}
              </span>
              <button
                onClick={nextQuestion}
                className="text-xs text-[#0056D2] font-semibold hover:underline"
              >
                Next question →
              </button>
            </div>
            <p className="text-lg font-semibold text-[#1F1F1F]">&ldquo;{questions[scenario][qIndex]}&rdquo;</p>
          </div>

          {/* Record */}
          <div className="bg-white border border-[#E0E0E0] rounded-lg p-6 flex flex-col items-center">
            {!recording && !done && (
              <div className="text-center">
                <button
                  onClick={startRecording}
                  className="w-20 h-20 rounded-full bg-[#0056D2] hover:bg-[#003B8E] text-white flex items-center justify-center mx-auto mb-3 transition-colors pulse-ring"
                >
                  <Mic size={30} />
                </button>
                <p className="text-sm text-[#636363]">Press to record your answer</p>
              </div>
            )}
            {recording && (
              <div className="text-center">
                <div className="flex items-center gap-1.5 justify-center mb-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  <span className="text-xs font-bold text-red-500 uppercase">Recording</span>
                </div>
                <p className="text-3xl font-bold text-[#1F1F1F] mb-4 font-mono">{fmtTime(seconds)}</p>
                <div className="flex items-end gap-1 justify-center h-10 mb-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="wave-bar w-1.5 bg-[#0056D2] rounded-full" style={{ height: "24px" }} />
                  ))}
                </div>
                <button
                  onClick={stopRecording}
                  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded transition-colors"
                >
                  <Square size={14} />
                  Stop & Analyze
                </button>
              </div>
            )}
            {done && (
              <div className="w-full">
                <div className="flex items-center justify-between mb-4">
                  <p className="font-bold text-[#1F1F1F]">AI Feedback</p>
                  <span className="text-2xl font-bold text-[#0056D2]">{mockFeedback.score}/100</span>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Structure", text: mockFeedback.structure },
                    { label: "Delivery", text: mockFeedback.delivery },
                    { label: "Vocabulary", text: mockFeedback.vocab },
                    { label: "Suggestion", text: mockFeedback.suggestion },
                  ].map((item) => (
                    <div key={item.label}>
                      <span className="text-xs font-bold text-[#0056D2] uppercase tracking-wider">{item.label}</span>
                      <p className="text-sm text-[#636363] mt-0.5 leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={startRecording}
                    className="flex items-center gap-1 bg-[#0056D2] hover:bg-[#003B8E] text-white font-semibold px-4 py-2 rounded text-sm transition-colors"
                  >
                    <Mic size={13} /> Try Again
                  </button>
                  <button
                    onClick={nextQuestion}
                    className="border border-[#0056D2] text-[#0056D2] hover:bg-[#E8F1FF] font-semibold px-4 py-2 rounded text-sm transition-colors"
                  >
                    Next Question
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* STAR Tips */}
        <div className="space-y-3">
          <p className="text-sm font-bold text-[#1F1F1F]">STAR Method Tips</p>
          {Object.entries(starTips).map(([letter, tips]) => (
            <div key={letter} className="bg-white border border-[#E0E0E0] rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 bg-[#0056D2] text-white rounded flex items-center justify-center text-sm font-bold">
                  {letter[0]}
                </div>
                <span className="font-semibold text-[#1F1F1F] text-sm">{letter}</span>
              </div>
              <ul className="space-y-1">
                {tips.map((t) => (
                  <li key={t} className="text-xs text-[#636363] flex items-start gap-1">
                    <span className="text-[#0056D2] font-bold mt-0.5">›</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
