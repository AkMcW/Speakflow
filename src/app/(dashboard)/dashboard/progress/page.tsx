"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Flame, Clock, Mic } from "lucide-react";

const weeklyData = [
  { week: "Wk 1", Pronunciation: 58, Fluency: 62, Confidence: 55 },
  { week: "Wk 2", Pronunciation: 61, Fluency: 65, Confidence: 58 },
  { week: "Wk 3", Pronunciation: 64, Fluency: 67, Confidence: 60 },
  { week: "Wk 4", Pronunciation: 66, Fluency: 70, Confidence: 63 },
  { week: "Wk 5", Pronunciation: 68, Fluency: 73, Confidence: 65 },
  { week: "Wk 6", Pronunciation: 70, Fluency: 76, Confidence: 67 },
  { week: "Wk 7", Pronunciation: 71, Fluency: 78, Confidence: 67 },
  { week: "Wk 8", Pronunciation: 72, Fluency: 80, Confidence: 68 },
];

const sessions = [
  { id: 1, type: "Business Meeting", script: "Q3 Project Update", score: 78, duration: "2m 14s", date: "Jun 6, 2026" },
  { id: 2, type: "IELTS Part 2", script: "Describe a memorable journey", score: 72, duration: "1m 58s", date: "Jun 5, 2026" },
  { id: 3, type: "Interview", script: "Tell me about yourself", score: 81, duration: "1m 33s", date: "Jun 4, 2026" },
  { id: 4, type: "Presentation", script: "Q3 Sales Strategy", score: 74, duration: "3m 42s", date: "Jun 3, 2026" },
  { id: 5, type: "IELTS Part 1", script: "Cooking & Free Time", score: 69, duration: "1m 12s", date: "Jun 2, 2026" },
];

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 80
      ? "bg-[#E6F7F2] text-[#00B37D]"
      : score >= 65
      ? "bg-[#FFF8EC] text-[#F5A623]"
      : "bg-red-50 text-red-600";
  return <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${color}`}>{score}</span>;
}

export default function ProgressPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1F1F1F]">Progress</h1>
        <p className="text-sm text-[#636363] mt-1">Track your improvement across all sessions.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border border-[#E0E0E0] rounded-lg p-5 text-center">
          <Flame size={20} className="text-[#F5A623] mx-auto mb-2" />
          <p className="text-3xl font-bold text-[#1F1F1F]">5</p>
          <p className="text-xs text-[#636363] mt-1">Day Streak</p>
        </div>
        <div className="bg-white border border-[#E0E0E0] rounded-lg p-5 text-center">
          <Mic size={20} className="text-[#0056D2] mx-auto mb-2" />
          <p className="text-3xl font-bold text-[#1F1F1F]">32</p>
          <p className="text-xs text-[#636363] mt-1">Total Sessions</p>
        </div>
        <div className="bg-white border border-[#E0E0E0] rounded-lg p-5 text-center">
          <Clock size={20} className="text-[#00B37D] mx-auto mb-2" />
          <p className="text-3xl font-bold text-[#1F1F1F]">74</p>
          <p className="text-xs text-[#636363] mt-1">Speaking Minutes</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white border border-[#E0E0E0] rounded-lg p-6">
        <h2 className="font-bold text-[#1F1F1F] mb-4">8-Week Score Trend</h2>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={weeklyData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
            <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#636363" }} />
            <YAxis domain={[50, 90]} tick={{ fontSize: 11, fill: "#636363" }} />
            <Tooltip
              contentStyle={{ border: "1px solid #E0E0E0", borderRadius: "8px", fontSize: "12px" }}
            />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
            <Line type="monotone" dataKey="Pronunciation" stroke="#0056D2" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="Fluency" stroke="#00B37D" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="Confidence" stroke="#F5A623" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Session History */}
      <div className="bg-white border border-[#E0E0E0] rounded-lg overflow-hidden">
        <div className="px-5 py-4 border-b border-[#E0E0E0]">
          <h2 className="font-bold text-[#1F1F1F]">Session History</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-[#F5F5F5] border-b border-[#E0E0E0]">
              <th className="text-left px-4 py-3 text-xs font-bold text-[#636363] uppercase tracking-wider">Type</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-[#636363] uppercase tracking-wider">Script</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-[#636363] uppercase tracking-wider hidden sm:table-cell">Duration</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-[#636363] uppercase tracking-wider">Score</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-[#636363] uppercase tracking-wider hidden md:table-cell">Date</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((s, i) => (
              <tr key={s.id} className={i < sessions.length - 1 ? "border-b border-[#E0E0E0]" : ""}>
                <td className="px-4 py-3 text-xs">
                  <span className="bg-[#E8F1FF] text-[#0056D2] px-2 py-0.5 rounded font-semibold">{s.type}</span>
                </td>
                <td className="px-4 py-3 text-sm text-[#1F1F1F] font-medium">{s.script}</td>
                <td className="px-4 py-3 text-xs text-[#636363] hidden sm:table-cell">{s.duration}</td>
                <td className="px-4 py-3"><ScoreBadge score={s.score} /></td>
                <td className="px-4 py-3 text-xs text-[#636363] hidden md:table-cell">{s.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
