"use client";
import { useState, useEffect, useRef } from "react";
import { Mic, Square, BarChart2 } from "lucide-react";

type Scenario = "Job Interview" | "MBA Interview" | "Leadership Q&A";
type RecordState = "idle" | "recording" | "transcribing" | "analyzing" | "done";

const questions: Record<Scenario, string[]> = {
  "Job Interview": [
    "Tell me about yourself.",
    "Why do you want to work here?",
    "Describe a time you resolved a conflict at work.",
    "What is your greatest professional achievement?",
    "Where do you see yourself in 5 years?",
    "What are your biggest strengths and weaknesses?",
    "Tell me about a challenge you overcame.",
  ],
  "MBA Interview": [
    "Why do you want an MBA, and why now?",
    "Walk me through your career progression.",
    "Describe a leadership challenge you faced.",
    "Why this school specifically?",
    "How will you contribute to the class community?",
    "What is your short-term and long-term goal?",
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
  Situation: ["Set the scene in 1–2 sentences", "Be specific about time and context", "Don't over-explain"],
  Task: ["State your role clearly", "Focus on your responsibility", "Mention constraints if relevant"],
  Action: ["Use 'I', not 'we'", "Describe specific steps you took", "Show initiative and decision-making"],
  Result: ["Quantify whenever possible", "Include what you learned", "End positively"],
};

interface Feedback {
  score: number;
  structure: string;
  delivery: string;
  vocab: string;
  suggestion: string;
}

export default function InterviewPage() {
  const [scenario, setScenario] = useState<Scenario>("Job Interview");
  const [qIndex, setQIndex] = useState(0);
  const [recordState, setRecordState] = useState<RecordState>("idle");
  const [seconds, setSeconds] = useState(0);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [error, setError] = useState("");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  async function startRecording() {
    setError("");
    setFeedback(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];
      recorder.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      recorder.start(100);
      setSeconds(0);
      setRecordState("recording");
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
    setRecordState("transcribing");

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
        setRecordState("idle");
        return;
      }

      setRecordState("analyzing");
      try {
        const res = await fetch("/api/practice/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            transcript,
            scenario: `${scenario} — Question: "${questions[scenario][qIndex]}"`,
          }),
        });
        const data = await res.json();
        setFeedback({
          score: data.scores?.overall ?? 75,
          structure: data.strengths?.[0] ?? "Good answer structure.",
          delivery: `${data.fillerWords?.count ? `${data.fillerWords.count} filler word(s) detected. ` : ""}${data.aiFeedback?.split(".")[0] ?? "Good delivery."}`,
          vocab: data.strengths?.[2] ?? "Appropriate vocabulary used.",
          suggestion: data.improvements?.[0] ?? "Continue practising with more specific examples.",
        });
        setRecordState("done");
      } catch {
        setError("Analysis failed.");
        setRecordState("idle");
      }
    };
  }

  function nextQuestion() {
    setQIndex((i) => (i + 1) % questions[scenario].length);
    setRecordState("idle");
    setFeedback(null);
    setSeconds(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }

  useEffect(() => {
    setQIndex(0);
    setRecordState("idle");
    setFeedback(null);
    setSeconds(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, [scenario]);

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  const fmtTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1F1F1F]">Interview Practice</h1>
        <p className="text-sm text-[#636363] mt-1">Practice with STAR method guidance and real AI feedback.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {(["Job Interview", "MBA Interview", "Leadership Q&A"] as Scenario[]).map((s) => (
          <button
            key={s}
            onClick={() => setScenario(s)}
            className={`px-4 py-2 rounded font-semibold text-sm transition-colors ${
              scenario === s ? "bg-[#0056D2] text-white" : "border border-[#E0E0E0] text-[#636363] hover:border-[#0056D2] hover:text-[#0056D2]"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {error && (
        <div className="bg-[#FFEBEE] border border-[#FFCDD2] rounded-lg p-3 text-xs text-[#E53935]">{error}</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-[#E0E0E0] rounded-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#636363] uppercase tracking-wider">
                Question {qIndex + 1} of {questions[scenario].length}
              </span>
              <button onClick={nextQuestion} className="text-xs text-[#0056D2] font-semibold hover:underline">
                Next question →
              </button>
            </div>
            <p className="text-lg font-semibold text-[#1F1F1F]">&ldquo;{questions[scenario][qIndex]}&rdquo;</p>
          </div>

          <div className="bg-white border border-[#E0E0E0] rounded-lg p-6 flex flex-col items-center">
            {recordState === "idle" && (
              <div className="text-center">
                <button onClick={startRecording} className="w-20 h-20 rounded-full bg-[#0056D2] hover:bg-[#003B8E] text-white flex items-center justify-center mx-auto mb-3 transition-colors pulse-ring">
                  <Mic size={30} />
                </button>
                <p className="text-sm text-[#636363]">Press to record your answer</p>
              </div>
            )}
            {recordState === "recording" && (
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
                <button onClick={stopRecording} className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded transition-colors">
                  <Square size={14} /> Stop & Analyze
                </button>
              </div>
            )}
            {(recordState === "transcribing" || recordState === "analyzing") && (
              <div className="text-center">
                <BarChart2 size={36} className="text-[#0056D2] mx-auto mb-3 spin-slow" />
                <p className="text-sm font-semibold text-[#1F1F1F] mb-1">
                  {recordState === "transcribing" ? "Transcribing..." : "Analyzing with AI..."}
                </p>
                <div className="flex justify-center gap-1 mt-2">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-[#0056D2] animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            )}
            {recordState === "done" && feedback && (
              <div className="w-full">
                <div className="flex items-center justify-between mb-4">
                  <p className="font-bold text-[#1F1F1F]">AI Feedback</p>
                  <span className="text-2xl font-bold text-[#0056D2]">{feedback.score}/100</span>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Structure", text: feedback.structure },
                    { label: "Delivery", text: feedback.delivery },
                    { label: "Vocabulary", text: feedback.vocab },
                    { label: "Suggestion", text: feedback.suggestion },
                  ].map((item) => (
                    <div key={item.label}>
                      <span className="text-xs font-bold text-[#0056D2] uppercase tracking-wider">{item.label}</span>
                      <p className="text-sm text-[#636363] mt-0.5 leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 mt-4">
                  <button onClick={startRecording} className="flex items-center gap-1 bg-[#0056D2] hover:bg-[#003B8E] text-white font-semibold px-4 py-2 rounded text-sm transition-colors">
                    <Mic size={13} /> Try Again
                  </button>
                  <button onClick={nextQuestion} className="border border-[#0056D2] text-[#0056D2] hover:bg-[#E8F1FF] font-semibold px-4 py-2 rounded text-sm transition-colors">
                    Next Question
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-bold text-[#1F1F1F]">STAR Method Tips</p>
          {Object.entries(starTips).map(([letter, tips]) => (
            <div key={letter} className="bg-white border border-[#E0E0E0] rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 bg-[#0056D2] text-white rounded flex items-center justify-center text-sm font-bold">{letter[0]}</div>
                <span className="font-semibold text-[#1F1F1F] text-sm">{letter}</span>
              </div>
              <ul className="space-y-1">
                {tips.map((t) => (
                  <li key={t} className="text-xs text-[#636363] flex items-start gap-1">
                    <span className="text-[#0056D2] font-bold mt-0.5">›</span>{t}
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
