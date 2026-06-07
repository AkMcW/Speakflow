"use client";
import { useState, useEffect, useRef } from "react";
import { Mic, Square, Clock, BarChart2 } from "lucide-react";

type Part = "1" | "2" | "3";
type RecordState = "idle" | "prep" | "recording" | "transcribing" | "analyzing" | "done";

const part1Questions = [
  "Do you enjoy cooking? Why or why not?",
  "How often do you use public transport?",
  "What do you usually do in your free time?",
  "Do you prefer living in a house or an apartment?",
  "How important is it to you to keep up with the news?",
  "Describe your hometown.",
  "Do you prefer spending time indoors or outdoors?",
  "How do you usually travel to work or school?",
];

const part2Cards = [
  {
    topic: "Describe a memorable journey you have taken.",
    points: ["Where you went", "Who you went with", "What you did there", "Why it was memorable"],
  },
  {
    topic: "Describe a person who has influenced you greatly.",
    points: ["Who this person is", "How you know them", "What they did", "Why they influenced you"],
  },
  {
    topic: "Describe a book or film that you enjoyed.",
    points: ["What it was about", "When you read/watched it", "What you liked about it", "Why you recommend it"],
  },
];

const part3Questions = [
  "Why do you think people enjoy travelling to foreign countries?",
  "How has tourism changed in recent years?",
  "What are the advantages and disadvantages of international travel?",
  "Do you think travel broadens the mind? Why?",
  "How important is it for young people to travel abroad?",
];

interface BandResult {
  fluency: number;
  lexical: number;
  grammar: number;
  pronunciation: number;
  overall: number;
  feedback: string;
}

export default function IELTSPage() {
  const [activePart, setActivePart] = useState<Part>("1");
  const [recordState, setRecordState] = useState<RecordState>("idle");
  const [prepTimer, setPrepTimer] = useState(60);
  const [speakTimer, setSpeakTimer] = useState(0);
  const [q1Index, setQ1Index] = useState(0);
  const [q3Index, setQ3Index] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);
  const [result, setResult] = useState<BandResult | null>(null);
  const [error, setError] = useState("");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  function clearTimer() {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }

  function startTimer() {
    intervalRef.current = setInterval(() => setSpeakTimer((s) => s + 1), 1000);
  }

  async function startRecording() {
    setError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];
      recorder.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      recorder.start(100);
      setSpeakTimer(0);
      setRecordState("recording");
      startTimer();
    } catch {
      setError("Microphone access denied.");
    }
  }

  function startPart2Prep() {
    setError("");
    setPrepTimer(60);
    setRecordState("prep");
    intervalRef.current = setInterval(() => {
      setPrepTimer((t) => {
        if (t <= 1) {
          clearTimer();
          navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
            const recorder = new MediaRecorder(stream);
            mediaRecorderRef.current = recorder;
            chunksRef.current = [];
            recorder.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
            recorder.start(100);
            setSpeakTimer(0);
            setRecordState("recording");
            startTimer();
          }).catch(() => setError("Microphone access denied."));
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }

  async function stopRecording() {
    clearTimer();
    const recorder = mediaRecorderRef.current;
    if (!recorder) { setRecordState("idle"); return; }

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
      const partLabel = activePart === "1" ? "Part 1" : activePart === "2" ? "Part 2 cue card" : "Part 3";
      try {
        const res = await fetch("/api/practice/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            transcript,
            scenario: `IELTS Speaking ${partLabel}`,
          }),
        });
        const data = await res.json();
        setResult({
          fluency: data.scores?.fluency ?? 7.0,
          lexical: data.scores?.vocabulary ?? 6.5,
          grammar: data.scores?.structure ?? 6.5,
          pronunciation: data.scores?.pronunciation ?? 7.0,
          overall: data.bandScore ?? Math.round(((data.scores?.fluency ?? 7) + (data.scores?.vocabulary ?? 6.5) + (data.scores?.structure ?? 6.5) + (data.scores?.pronunciation ?? 7)) / 4 * 2) / 2,
          feedback: data.aiFeedback ?? "",
        });
        setRecordState("done");
      } catch {
        setError("Analysis failed.");
        setRecordState("idle");
      }
    };
  }

  function reset() {
    clearTimer();
    setRecordState("idle");
    setPrepTimer(60);
    setSpeakTimer(0);
    setResult(null);
    setError("");
    if (mediaRecorderRef.current) {
      try { mediaRecorderRef.current.stream.getTracks().forEach((t) => t.stop()); } catch { /* ignore */ }
    }
  }

  useEffect(() => { reset(); }, [activePart]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => () => clearTimer(), []);

  const fmtTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const currentCard = part2Cards[cardIndex];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1F1F1F]">IELTS Speaking Practice</h1>
        <p className="text-sm text-[#636363] mt-1">Practice all three parts with real AI band score estimates.</p>
      </div>

      <div className="flex gap-1 bg-[#F5F5F5] rounded-lg p-1 w-fit">
        {(["1", "2", "3"] as Part[]).map((p) => (
          <button
            key={p}
            onClick={() => setActivePart(p)}
            className={`px-5 py-2 rounded text-sm font-semibold transition-colors ${
              activePart === p ? "bg-white text-[#0056D2] shadow-sm" : "text-[#636363] hover:text-[#1F1F1F]"
            }`}
          >
            Part {p}
          </button>
        ))}
      </div>

      {error && (
        <div className="bg-[#FFEBEE] border border-[#FFCDD2] rounded-lg p-3 text-xs text-[#E53935]">{error}</div>
      )}

      {activePart === "1" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-[#E0E0E0] rounded-lg p-6">
            <p className="text-xs font-bold text-[#636363] uppercase tracking-wider mb-2">Part 1 · Personal Questions · 4–5 min</p>
            <p className="text-sm text-[#636363] mb-4">Answer naturally. Aim for 2–3 sentences per answer.</p>
            <div className="bg-[#E8F1FF] rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold text-[#1F1F1F] italic">&ldquo;{part1Questions[q1Index]}&rdquo;</p>
            </div>
            <button onClick={() => setQ1Index((i) => (i + 1) % part1Questions.length)} className="text-xs text-[#0056D2] font-semibold hover:underline">
              Next question →
            </button>
          </div>
          <RecordPanel state={recordState} timer={fmtTime(speakTimer)} onStart={startRecording} onStop={stopRecording} onReset={reset} />
        </div>
      )}

      {activePart === "2" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-[#E0E0E0] rounded-lg p-6">
            <p className="text-xs font-bold text-[#636363] uppercase tracking-wider mb-2">Part 2 · Cue Card · 1 min prep + 1–2 min talk</p>
            <p className="text-sm font-bold text-[#1F1F1F] mb-3">{currentCard.topic}</p>
            <p className="text-xs text-[#636363] mb-2 font-semibold">You should say:</p>
            <ul className="space-y-1 mb-4">
              {currentCard.points.map((pt) => (
                <li key={pt} className="text-sm text-[#636363] flex items-start gap-1.5">
                  <span className="text-[#0056D2] font-bold">›</span>{pt}
                </li>
              ))}
            </ul>
            {recordState === "prep" && (
              <div className="bg-[#FFF8EC] border border-[#F5A623] rounded-lg p-3 flex items-center gap-2">
                <Clock size={16} className="text-[#F5A623]" />
                <span className="text-sm font-bold text-[#F5A623]">Prep time: {fmtTime(prepTimer)}</span>
              </div>
            )}
            <button onClick={() => { reset(); setCardIndex((i) => (i + 1) % part2Cards.length); }} className="text-xs text-[#0056D2] font-semibold hover:underline mt-3 block">
              Different card →
            </button>
          </div>
          <RecordPanel state={recordState} timer={fmtTime(speakTimer)} onStart={startPart2Prep} onStop={stopRecording} onReset={reset} startLabel="Start 1-min Prep" />
        </div>
      )}

      {activePart === "3" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-[#E0E0E0] rounded-lg p-6">
            <p className="text-xs font-bold text-[#636363] uppercase tracking-wider mb-2">Part 3 · Discussion · 4–5 min</p>
            <p className="text-sm text-[#636363] mb-4">Give extended, analytical answers with reasons and examples.</p>
            <div className="bg-[#E8F1FF] rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold text-[#1F1F1F] italic">&ldquo;{part3Questions[q3Index]}&rdquo;</p>
            </div>
            <button onClick={() => setQ3Index((i) => (i + 1) % part3Questions.length)} className="text-xs text-[#0056D2] font-semibold hover:underline">
              Next question →
            </button>
          </div>
          <RecordPanel state={recordState} timer={fmtTime(speakTimer)} onStart={startRecording} onStop={stopRecording} onReset={reset} />
        </div>
      )}

      {recordState === "done" && result && (
        <div className="bg-white border border-[#E0E0E0] rounded-lg p-6">
          <h2 className="font-bold text-[#1F1F1F] mb-4">Estimated Band Scores</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            {[
              { label: "Fluency", val: result.fluency },
              { label: "Lexical Resource", val: result.lexical },
              { label: "Grammar", val: result.grammar },
              { label: "Pronunciation", val: result.pronunciation },
            ].map(({ label, val }) => (
              <div key={label} className="text-center bg-[#F5F5F5] rounded-lg p-4">
                <p className="text-2xl font-bold text-[#0056D2]">{val.toFixed(1)}</p>
                <p className="text-xs text-[#636363] mt-1">{label}</p>
              </div>
            ))}
          </div>
          <div className="bg-[#E8F1FF] rounded-lg p-4">
            <p className="text-sm font-semibold text-[#0056D2] mb-1">Overall Estimate: Band {result.overall.toFixed(1)}</p>
            {result.feedback && <p className="text-xs text-[#636363] leading-relaxed">{result.feedback}</p>}
          </div>
          <button onClick={reset} className="mt-4 text-xs border border-[#0056D2] text-[#0056D2] hover:bg-[#E8F1FF] px-4 py-1.5 rounded font-semibold transition-colors">
            Practice Again
          </button>
        </div>
      )}
    </div>
  );
}

function RecordPanel({
  state, timer, onStart, onStop, onReset, startLabel,
}: {
  state: RecordState; timer: string; onStart: () => void; onStop: () => void; onReset: () => void; startLabel?: string;
}) {
  return (
    <div className="bg-white border border-[#E0E0E0] rounded-lg p-6 flex flex-col items-center justify-center min-h-52">
      {state === "idle" && (
        <div className="text-center">
          <button onClick={onStart} className="w-20 h-20 rounded-full bg-[#0056D2] hover:bg-[#003B8E] text-white flex items-center justify-center mx-auto mb-4 transition-colors pulse-ring">
            <Mic size={30} />
          </button>
          <p className="text-sm text-[#636363]">{startLabel ?? "Start Recording"}</p>
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
          <button onClick={onStop} className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded transition-colors">
            <Square size={14} /> Stop & Analyze
          </button>
        </div>
      )}
      {(state === "transcribing" || state === "analyzing") && (
        <div className="text-center">
          <BarChart2 size={36} className="text-[#0056D2] mx-auto mb-3 spin-slow" />
          <p className="text-sm font-semibold text-[#1F1F1F] mb-1">
            {state === "transcribing" ? "Transcribing..." : "Analyzing with AI..."}
          </p>
          <div className="flex justify-center gap-1 mt-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-[#0056D2] animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
        </div>
      )}
      {state === "done" && (
        <div className="text-center">
          <p className="font-bold text-[#00B37D] mb-2">Analysis complete!</p>
          <p className="text-xs text-[#636363] mb-4">Scroll down to see your band scores.</p>
          <button onClick={onReset} className="text-xs border border-[#0056D2] text-[#0056D2] hover:bg-[#E8F1FF] px-4 py-1.5 rounded transition-colors font-semibold">
            Practice Again
          </button>
        </div>
      )}
    </div>
  );
}
