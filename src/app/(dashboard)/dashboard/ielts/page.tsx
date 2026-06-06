"use client";
import { useState, useEffect, useRef } from "react";
import { Mic, Square, Clock } from "lucide-react";

type Part = "1" | "2" | "3";
type RecordState = "idle" | "prep" | "recording" | "done";

const part1Questions = [
  "Do you enjoy cooking? Why or why not?",
  "How often do you use public transport?",
  "What do you usually do in your free time?",
  "Do you prefer living in a house or an apartment?",
  "How important is it to you to keep up with the news?",
];

const part2Card = {
  topic: "Describe a memorable journey you have taken.",
  points: [
    "Where you went",
    "Who you went with",
    "What you did there",
    "Why it was memorable",
  ],
};

const part3Questions = [
  "Why do you think people enjoy travelling to foreign countries?",
  "How has tourism changed in recent years?",
  "What are the advantages and disadvantages of international travel?",
  "Do you think travel broadens the mind? Why?",
];

const mockBandScores = {
  fluency: 7.0,
  lexical: 6.5,
  grammar: 6.5,
  pronunciation: 7.0,
};

export default function IELTSPage() {
  const [activePart, setActivePart] = useState<Part>("1");
  const [recordState, setRecordState] = useState<RecordState>("idle");
  const [prepTimer, setPrepTimer] = useState(60);
  const [speakTimer, setSpeakTimer] = useState(0);
  const [q1Index] = useState(0);
  const [q3Index] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function clearTimer() {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }

  function startPart1() {
    setRecordState("recording");
    setSpeakTimer(0);
    intervalRef.current = setInterval(() => setSpeakTimer((s) => s + 1), 1000);
  }

  function startPart2Prep() {
    setRecordState("prep");
    setPrepTimer(60);
    intervalRef.current = setInterval(() => {
      setPrepTimer((t) => {
        if (t <= 1) {
          clearTimer();
          setRecordState("recording");
          setSpeakTimer(0);
          intervalRef.current = setInterval(() => setSpeakTimer((s) => s + 1), 1000);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }

  function stopRecording() {
    clearTimer();
    setRecordState("done");
  }

  function reset() {
    clearTimer();
    setRecordState("idle");
    setPrepTimer(60);
    setSpeakTimer(0);
  }

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePart]);

  useEffect(() => () => clearTimer(), []);

  const fmtTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1F1F1F]">IELTS Speaking Practice</h1>
        <p className="text-sm text-[#636363] mt-1">Practice all three parts with band score estimates.</p>
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-1 bg-[#F5F5F5] rounded-lg p-1 w-fit">
        {(["1", "2", "3"] as Part[]).map((p) => (
          <button
            key={p}
            onClick={() => setActivePart(p)}
            className={`px-5 py-2 rounded text-sm font-semibold transition-colors ${
              activePart === p
                ? "bg-white text-[#0056D2] shadow-sm"
                : "text-[#636363] hover:text-[#1F1F1F]"
            }`}
          >
            Part {p}
          </button>
        ))}
      </div>

      {/* Part 1 */}
      {activePart === "1" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-[#E0E0E0] rounded-lg p-6">
            <p className="text-xs font-bold text-[#636363] uppercase tracking-wider mb-2">Part 1 · Personal Questions · 4–5 min</p>
            <p className="text-sm text-[#636363] mb-4 leading-relaxed">Answer naturally as if speaking to an examiner. Aim for 2–3 sentences per answer.</p>
            <div className="bg-[#E8F1FF] rounded-lg p-4">
              <p className="text-sm font-semibold text-[#1F1F1F] italic">&ldquo;{part1Questions[q1Index]}&rdquo;</p>
            </div>
          </div>
          <RecordPanel
            state={recordState}
            timer={fmtTime(speakTimer)}
            onStart={startPart1}
            onStop={stopRecording}
            onReset={reset}
          />
        </div>
      )}

      {/* Part 2 */}
      {activePart === "2" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-[#E0E0E0] rounded-lg p-6">
            <p className="text-xs font-bold text-[#636363] uppercase tracking-wider mb-2">Part 2 · Cue Card · 1 min prep + 1–2 min talk</p>
            <p className="text-sm font-bold text-[#1F1F1F] mb-3">{part2Card.topic}</p>
            <p className="text-xs text-[#636363] mb-2 font-semibold">You should say:</p>
            <ul className="space-y-1 mb-4">
              {part2Card.points.map((pt) => (
                <li key={pt} className="text-sm text-[#636363] flex items-start gap-1.5">
                  <span className="text-[#0056D2] font-bold">›</span>
                  {pt}
                </li>
              ))}
            </ul>
            {recordState === "prep" && (
              <div className="bg-[#FFF8EC] border border-[#F5A623] rounded-lg p-3 flex items-center gap-2">
                <Clock size={16} className="text-[#F5A623]" />
                <span className="text-sm font-bold text-[#F5A623]">Prep time: {fmtTime(prepTimer)}</span>
              </div>
            )}
          </div>
          <RecordPanel
            state={recordState}
            timer={fmtTime(speakTimer)}
            onStart={startPart2Prep}
            onStop={stopRecording}
            onReset={reset}
            part2StartLabel="Start 1-min Prep"
          />
        </div>
      )}

      {/* Part 3 */}
      {activePart === "3" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-[#E0E0E0] rounded-lg p-6">
            <p className="text-xs font-bold text-[#636363] uppercase tracking-wider mb-2">Part 3 · Discussion · 4–5 min</p>
            <p className="text-sm text-[#636363] mb-4 leading-relaxed">Give extended, analytical answers. Support your views with reasons and examples.</p>
            <div className="bg-[#E8F1FF] rounded-lg p-4">
              <p className="text-sm font-semibold text-[#1F1F1F] italic">&ldquo;{part3Questions[q3Index]}&rdquo;</p>
            </div>
          </div>
          <RecordPanel
            state={recordState}
            timer={fmtTime(speakTimer)}
            onStart={startPart1}
            onStop={stopRecording}
            onReset={reset}
          />
        </div>
      )}

      {/* Band Score Result */}
      {recordState === "done" && (
        <div className="bg-white border border-[#E0E0E0] rounded-lg p-6">
          <h2 className="font-bold text-[#1F1F1F] mb-4">Estimated Band Scores</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Object.entries(mockBandScores).map(([key, val]) => (
              <div key={key} className="text-center bg-[#F5F5F5] rounded-lg p-4">
                <p className="text-2xl font-bold text-[#0056D2]">{val.toFixed(1)}</p>
                <p className="text-xs text-[#636363] capitalize mt-1">{key === "lexical" ? "Lexical Resource" : key === "grammar" ? "Grammatical Range" : key.charAt(0).toUpperCase() + key.slice(1)}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-[#E8F1FF] rounded-lg">
            <p className="text-sm font-semibold text-[#0056D2] mb-1">Overall Estimate: Band 6.5</p>
            <p className="text-xs text-[#636363]">Good performance. Focus on extending your answers with more complex sentence structures to reach Band 7.</p>
          </div>
        </div>
      )}
    </div>
  );
}

function RecordPanel({
  state,
  timer,
  onStart,
  onStop,
  onReset,
  part2StartLabel,
}: {
  state: RecordState;
  timer: string;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  part2StartLabel?: string;
}) {
  return (
    <div className="bg-white border border-[#E0E0E0] rounded-lg p-6 flex flex-col items-center justify-center min-h-52">
      {state === "idle" && (
        <div className="text-center">
          <button
            onClick={onStart}
            className="w-20 h-20 rounded-full bg-[#0056D2] hover:bg-[#003B8E] text-white flex items-center justify-center mx-auto mb-4 transition-colors pulse-ring"
          >
            <Mic size={30} />
          </button>
          <p className="text-sm text-[#636363]">{part2StartLabel ?? "Start Recording"}</p>
        </div>
      )}
      {state === "prep" && (
        <div className="text-center">
          <Clock size={40} className="text-[#F5A623] mx-auto mb-2" />
          <p className="text-sm font-semibold text-[#1F1F1F]">Preparation time</p>
          <p className="text-xs text-[#636363]">Speaking will start automatically</p>
        </div>
      )}
      {state === "recording" && (
        <div className="text-center">
          <div className="flex items-center gap-1.5 justify-center mb-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span className="text-xs font-bold text-red-500 uppercase">Recording</span>
          </div>
          <p className="text-3xl font-bold text-[#1F1F1F] mb-4 font-mono">{timer}</p>
          <div className="flex items-end gap-1 justify-center h-10 mb-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="wave-bar w-1.5 bg-[#0056D2] rounded-full" style={{ height: "24px" }} />
            ))}
          </div>
          <button
            onClick={onStop}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded transition-colors"
          >
            <Square size={14} />
            Stop
          </button>
        </div>
      )}
      {state === "done" && (
        <div className="text-center">
          <p className="font-bold text-[#00B37D] mb-2">Recorded!</p>
          <p className="text-xs text-[#636363] mb-4">Scroll down to see your estimated band scores.</p>
          <button
            onClick={onReset}
            className="text-xs border border-[#0056D2] text-[#0056D2] hover:bg-[#E8F1FF] px-4 py-1.5 rounded transition-colors font-semibold"
          >
            Practice Again
          </button>
        </div>
      )}
    </div>
  );
}
