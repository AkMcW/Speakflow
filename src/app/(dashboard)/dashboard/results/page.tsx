"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import ScoreRing from "@/components/ScoreRing";
import { CheckCircle, Flag, ArrowRight, RotateCcw, Mic } from "lucide-react";

interface Analysis {
  scores: {
    pronunciation: number;
    fluency: number;
    confidence: number;
    structure: number;
    vocabulary: number;
    pace: number;
    overall: number;
  };
  fillerWords: { count: number; words: string[] };
  wpm: number;
  strengths: string[];
  improvements: string[];
  aiFeedback: string;
  bandScore?: number | null;
  transcript?: string;
}

const FALLBACK: Analysis = {
  scores: { pronunciation: 72, fluency: 80, confidence: 68, structure: 75, vocabulary: 71, pace: 83, overall: 75 },
  fillerWords: { count: 3, words: ["um", "uh", "like"] },
  wpm: 128,
  strengths: [
    "Strong sentence structure — your ideas were organized logically with clear transitions.",
    "Good vocabulary range — you used varied professional language without repetition.",
    "Excellent pace — you maintained a clear, listener-friendly speed throughout.",
  ],
  improvements: [
    "Pronunciation of /th/ sounds (e.g. \"the\", \"that\") needs practice.",
    "You used filler sounds like \"um\" and \"uh\" — try pause-and-breathe instead.",
    "Confidence dipped toward the end — practice your closing lines separately.",
  ],
  aiFeedback: "Overall, a solid delivery with good structure and pacing. Focus on reducing filler words and building confidence in your closing. Record yourself regularly to track improvement.",
};

function scoreColor(score: number) {
  if (score >= 80) return "text-[#00B37D]";
  if (score >= 60) return "text-[#F5A623]";
  return "text-red-500";
}

function scoreLabel(score: number) {
  if (score >= 90) return "Excellent";
  if (score >= 80) return "Great";
  if (score >= 70) return "Good";
  if (score >= 60) return "Fair";
  return "Needs Work";
}

export default function ResultsPage() {
  const [data, setData] = useState<Analysis | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("speakflow_analysis");
      if (raw) {
        const parsed = JSON.parse(raw);
        // Ensure all score fields are numbers, defaulting to 0 if missing
        const scores = parsed.scores ?? {};
        parsed.scores = {
          pronunciation: Number(scores.pronunciation) || 0,
          fluency: Number(scores.fluency) || 0,
          confidence: Number(scores.confidence) || 0,
          structure: Number(scores.structure) || 0,
          vocabulary: Number(scores.vocabulary) || 0,
          pace: Number(scores.pace) || 0,
          overall: Number(scores.overall) || 0,
        };
        parsed.fillerWords = parsed.fillerWords ?? { count: 0, words: [] };
        parsed.strengths = Array.isArray(parsed.strengths) ? parsed.strengths : [];
        parsed.improvements = Array.isArray(parsed.improvements) ? parsed.improvements : [];
        parsed.wpm = Number(parsed.wpm) || 0;
        setData(parsed);
      }
    } catch {
      // ignore
    }
  }, []);

  const analysis = data ?? FALLBACK;
  const isFallback = !data;

  const scoreRows = [
    { label: "Pronunciation", score: analysis.scores.pronunciation },
    { label: "Fluency", score: analysis.scores.fluency },
    { label: "Confidence", score: analysis.scores.confidence },
    { label: "Structure", score: analysis.scores.structure },
    { label: "Vocabulary", score: analysis.scores.vocabulary },
    { label: "Pace", score: analysis.scores.pace },
  ];

  const today = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1F1F1F]">Session Results</h1>
          <p className="text-sm text-[#636363] mt-1">{today}</p>
        </div>
        {analysis.wpm > 0 && (
          <span className="text-xs bg-[#E8F1FF] text-[#0056D2] px-3 py-1 rounded-full font-semibold">
            {analysis.wpm} wpm
          </span>
        )}
      </div>

      {isFallback && (
        <div className="bg-[#FFF8E6] border border-[#F5A623] rounded-lg p-3 text-sm text-[#7A5500] flex items-center gap-2">
          <Mic size={14} className="shrink-0" />
          No recent session found — showing sample results. Complete a practice session to see your real scores.
        </div>
      )}

      {/* Overall Score */}
      <div className="bg-white border border-[#E0E0E0] rounded-lg p-6 text-center">
        <p className="text-sm font-semibold text-[#636363] mb-4 uppercase tracking-wider">Overall Score</p>
        <div className="flex items-center justify-center gap-4 mb-2">
          <span className="text-6xl font-bold text-[#1F1F1F]">{analysis.scores.overall}</span>
          <span className="text-2xl text-[#636363] font-light">/100</span>
        </div>
        <p className={`text-sm font-semibold ${scoreColor(analysis.scores.overall)}`}>
          {scoreLabel(analysis.scores.overall)}
        </p>
        {analysis.fillerWords.count > 0 && (
          <p className="text-xs text-[#636363] mt-2">
            {analysis.fillerWords.count} filler word{analysis.fillerWords.count !== 1 ? "s" : ""} detected
            {analysis.fillerWords.words.length > 0 && (
              <> ({analysis.fillerWords.words.map(w => `"${w}"`).join(", ")})</>
            )}
          </p>
        )}
        {analysis.bandScore != null && (
          <p className="text-xs text-[#636363] mt-1">Estimated IELTS Band: <strong>{analysis.bandScore}</strong></p>
        )}
      </div>

      {/* Score Rings */}
      <div className="bg-white border border-[#E0E0E0] rounded-lg p-6">
        <h2 className="font-bold text-[#1F1F1F] mb-5">Score Breakdown</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 justify-items-center">
          {scoreRows.map(({ label, score }) => (
            <ScoreRing key={label} score={score} label={label} size={80} strokeWidth={7} />
          ))}
        </div>
      </div>

      {/* Transcript */}
      {analysis.transcript && (
        <div className="bg-white border border-[#E0E0E0] rounded-lg p-5">
          <h2 className="font-bold text-[#1F1F1F] mb-3 flex items-center gap-2">
            <Mic size={16} className="text-[#0056D2]" />
            Your Transcript
          </h2>
          <p className="text-sm text-[#636363] leading-relaxed">{analysis.transcript}</p>
        </div>
      )}

      {/* Feedback */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-[#E0E0E0] rounded-lg p-5">
          <h2 className="font-bold text-[#1F1F1F] mb-4 flex items-center gap-2">
            <CheckCircle size={16} className="text-[#00B37D]" />
            Strengths
          </h2>
          <ul className="space-y-3">
            {analysis.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[#636363] leading-relaxed">
                <CheckCircle size={14} className="text-[#00B37D] mt-0.5 shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white border border-[#E0E0E0] rounded-lg p-5">
          <h2 className="font-bold text-[#1F1F1F] mb-4 flex items-center gap-2">
            <Flag size={16} className="text-[#F5A623]" />
            Improvement Areas
          </h2>
          <ul className="space-y-3">
            {analysis.improvements.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[#636363] leading-relaxed">
                <Flag size={14} className="text-[#F5A623] mt-0.5 shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* AI Feedback */}
      <div className="bg-white border border-[#E0E0E0] rounded-lg p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 bg-[#0056D2] rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">AI</span>
          </div>
          <h2 className="font-bold text-[#1F1F1F]">AI Coach Feedback</h2>
        </div>
        <p className="text-sm text-[#636363] leading-relaxed whitespace-pre-line">{analysis.aiFeedback}</p>
      </div>

      {/* Next Steps */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/dashboard/practice"
          className="flex items-center justify-center gap-2 bg-[#0056D2] hover:bg-[#003B8E] text-white font-semibold px-6 py-2.5 rounded transition-colors text-sm"
        >
          <RotateCcw size={14} />
          Practice Again
        </Link>
        <Link
          href="/dashboard/script-writer"
          className="flex items-center justify-center gap-2 border border-[#0056D2] text-[#0056D2] hover:bg-[#E8F1FF] font-semibold px-6 py-2.5 rounded transition-colors text-sm"
        >
          Try Different Script <ArrowRight size={14} />
        </Link>
        <Link
          href="/dashboard/progress"
          className="flex items-center justify-center gap-2 border border-[#E0E0E0] text-[#636363] hover:bg-[#F5F5F5] font-semibold px-6 py-2.5 rounded transition-colors text-sm"
        >
          View Progress
        </Link>
      </div>
    </div>
  );
}
