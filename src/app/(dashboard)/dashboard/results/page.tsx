import Link from "next/link";
import ScoreRing from "@/components/ScoreRing";
import { CheckCircle, Flag, ArrowRight, RotateCcw } from "lucide-react";

const scores = [
  { label: "Pronunciation", score: 72 },
  { label: "Fluency", score: 80 },
  { label: "Confidence", score: 68 },
  { label: "Structure", score: 75 },
  { label: "Vocabulary", score: 71 },
  { label: "Pace", score: 83 },
];

const overallScore = Math.round(scores.reduce((sum, s) => sum + s.score, 0) / scores.length);

const strengths = [
  "Strong sentence structure — your ideas were organized logically with clear transitions.",
  "Good vocabulary range — you used varied professional language without repetition.",
  "Excellent pace — you maintained a clear, listener-friendly speed throughout.",
];

const improvements = [
  "Pronunciation of /th/ sounds (e.g. \"the\", \"that\", \"therefore\") needs practice.",
  "You paused mid-sentence 3 times with filler sounds (\"um\", \"uh\"). Try pause-and-breathe instead.",
  "Confidence dipped in the final 30 seconds — practice your closing lines separately.",
];

const aiFeedback = `Overall, this was a solid business presentation delivery. You demonstrated strong structure and pacing, which are critical for executive communication.

Your main area to focus on is pronunciation clarity — specifically the /th/ phoneme which appeared 12 times and was consistently replaced with /d/ or /f/. This is a very common pattern for speakers of Indian, East Asian, and Brazilian English backgrounds, and can be corrected with targeted drilling.

For your next practice session, try recording just your opening and closing sections independently before doing the full script. This will help build automatic confidence in the moments that matter most.`;

export default function ResultsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1F1F1F]">Session Results</h1>
          <p className="text-sm text-[#636363] mt-1">Business Meeting · Q3 Project Update · Jun 6, 2026</p>
        </div>
        <span className="text-xs bg-[#E8F1FF] text-[#0056D2] px-3 py-1 rounded-full font-semibold">Session #7</span>
      </div>

      {/* Overall Score */}
      <div className="bg-white border border-[#E0E0E0] rounded-lg p-6 text-center">
        <p className="text-sm font-semibold text-[#636363] mb-4 uppercase tracking-wider">Overall Score</p>
        <div className="flex items-center justify-center gap-4 mb-2">
          <span className="text-6xl font-bold text-[#1F1F1F]">{overallScore}</span>
          <span className="text-2xl text-[#636363] font-light">/100</span>
        </div>
        <p className="text-sm text-[#00B37D] font-semibold">Good · +4 pts from last session</p>
      </div>

      {/* Score Rings */}
      <div className="bg-white border border-[#E0E0E0] rounded-lg p-6">
        <h2 className="font-bold text-[#1F1F1F] mb-5">Score Breakdown</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 justify-items-center">
          {scores.map(({ label, score }) => (
            <ScoreRing key={label} score={score} label={label} size={80} strokeWidth={7} />
          ))}
        </div>
      </div>

      {/* Feedback */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="bg-white border border-[#E0E0E0] rounded-lg p-5">
          <h2 className="font-bold text-[#1F1F1F] mb-4 flex items-center gap-2">
            <CheckCircle size={16} className="text-[#00B37D]" />
            Strengths
          </h2>
          <ul className="space-y-3">
            {strengths.map((s) => (
              <li key={s} className="flex items-start gap-2 text-sm text-[#636363] leading-relaxed">
                <CheckCircle size={14} className="text-[#00B37D] mt-0.5 shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Improvements */}
        <div className="bg-white border border-[#E0E0E0] rounded-lg p-5">
          <h2 className="font-bold text-[#1F1F1F] mb-4 flex items-center gap-2">
            <Flag size={16} className="text-[#F5A623]" />
            Improvement Areas
          </h2>
          <ul className="space-y-3">
            {improvements.map((s) => (
              <li key={s} className="flex items-start gap-2 text-sm text-[#636363] leading-relaxed">
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
        <p className="text-sm text-[#636363] leading-relaxed whitespace-pre-line">{aiFeedback}</p>
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
