import Link from "next/link";
import { FileText, Mic, BookOpen, ArrowRight, TrendingUp, Clock, Flame } from "lucide-react";

const stats = [
  { label: "Sessions this week", value: "7", icon: Mic, delta: "+2 from last week" },
  { label: "Avg Score", value: "76", icon: TrendingUp, delta: "+4 pts this month" },
  { label: "Scripts saved", value: "12", icon: FileText, delta: "3 this week" },
  { label: "Day Streak", value: "5", icon: Flame, delta: "Keep it up!" },
];

const quickStart = [
  {
    title: "Write a Script",
    desc: "Generate an AI-powered script for your next speaking scenario.",
    href: "/dashboard/script-writer",
    icon: FileText,
    color: "bg-[#E8F1FF]",
    iconColor: "text-[#0056D2]",
  },
  {
    title: "Start Practice",
    desc: "Record yourself and get instant AI feedback on your delivery.",
    href: "/dashboard/practice",
    icon: Mic,
    color: "bg-[#E6F7F2]",
    iconColor: "text-[#00B37D]",
  },
  {
    title: "Try IELTS",
    desc: "Practice Part 1, 2, or 3 with band score estimates.",
    href: "/dashboard/ielts",
    icon: BookOpen,
    color: "bg-[#FFF8EC]",
    iconColor: "text-[#F5A623]",
  },
];

const recentSessions = [
  { id: 1, type: "Business Meeting", script: "Q3 Project Update", score: 78, date: "Today, 2:15 PM", duration: "2m 14s" },
  { id: 2, type: "IELTS Part 2", script: "Describe a memorable journey", score: 72, date: "Yesterday, 9:40 AM", duration: "1m 58s" },
  { id: 3, type: "Interview", script: "Tell me about yourself", score: 81, date: "Jun 4, 2026", duration: "1m 33s" },
];

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 80 ? "bg-[#E6F7F2] text-[#00B37D]" : score >= 65 ? "bg-[#FFF8EC] text-[#F5A623]" : "bg-red-50 text-red-600";
  return <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${color}`}>{score}</span>;
}

export default function DashboardPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Welcome Banner */}
      <div className="bg-[#0056D2] rounded-xl p-6 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold mb-1">Good morning, Alex! 👋</h1>
          <p className="text-blue-100 text-sm">You have a 5-day streak. Keep practicing to reach 7 days!</p>
        </div>
        <Link
          href="/dashboard/practice"
          className="inline-flex items-center gap-2 bg-white text-[#0056D2] hover:bg-[#E8F1FF] font-semibold px-5 py-2 rounded text-sm transition-colors shrink-0"
        >
          Practice Now <ArrowRight size={14} />
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, delta }) => (
          <div key={label} className="bg-white border border-[#E0E0E0] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-[#636363] font-medium">{label}</p>
              <Icon size={16} className="text-[#0056D2]" />
            </div>
            <p className="text-2xl font-bold text-[#1F1F1F] mb-0.5">{value}</p>
            <p className="text-xs text-[#00B37D]">{delta}</p>
          </div>
        ))}
      </div>

      {/* Quick Start */}
      <div>
        <h2 className="text-base font-bold text-[#1F1F1F] mb-3">Quick Start</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {quickStart.map(({ title, desc, href, icon: Icon, color, iconColor }) => (
            <Link
              key={title}
              href={href}
              className="bg-white border border-[#E0E0E0] rounded-lg p-5 hover:shadow-md transition-shadow group"
            >
              <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center mb-3`}>
                <Icon size={20} className={iconColor} />
              </div>
              <h3 className="font-semibold text-[#1F1F1F] mb-1 group-hover:text-[#0056D2] transition-colors">{title}</h3>
              <p className="text-xs text-[#636363] leading-relaxed">{desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Sessions */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-[#1F1F1F]">Recent Sessions</h2>
          <Link href="/dashboard/progress" className="text-xs text-[#0056D2] font-semibold hover:underline">View all →</Link>
        </div>
        <div className="bg-white border border-[#E0E0E0] rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E0E0E0] bg-[#F5F5F5]">
                <th className="text-left px-4 py-3 text-xs font-bold text-[#636363] uppercase tracking-wider">Type</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-[#636363] uppercase tracking-wider">Script</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-[#636363] uppercase tracking-wider hidden sm:table-cell">Duration</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-[#636363] uppercase tracking-wider">Score</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-[#636363] uppercase tracking-wider hidden md:table-cell">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentSessions.map((s, i) => (
                <tr key={s.id} className={i < recentSessions.length - 1 ? "border-b border-[#E0E0E0]" : ""}>
                  <td className="px-4 py-3 text-xs">
                    <span className="bg-[#E8F1FF] text-[#0056D2] px-2 py-0.5 rounded font-semibold">{s.type}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#1F1F1F] font-medium">{s.script}</td>
                  <td className="px-4 py-3 text-xs text-[#636363] hidden sm:table-cell">
                    <div className="flex items-center gap-1">
                      <Clock size={11} />
                      {s.duration}
                    </div>
                  </td>
                  <td className="px-4 py-3"><ScoreBadge score={s.score} /></td>
                  <td className="px-4 py-3 text-xs text-[#636363] hidden md:table-cell">{s.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Progress Summary */}
      <div className="bg-white border border-[#E0E0E0] rounded-lg p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-[#1F1F1F]">This Week&apos;s Progress</h2>
          <Link href="/dashboard/progress" className="text-xs text-[#0056D2] font-semibold hover:underline">Full report →</Link>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Pronunciation", score: 72, prev: 68 },
            { label: "Fluency", score: 80, prev: 75 },
            { label: "Confidence", score: 68, prev: 64 },
          ].map(({ label, score, prev }) => (
            <div key={label} className="text-center">
              <p className="text-2xl font-bold text-[#1F1F1F]">{score}</p>
              <p className="text-xs text-[#636363] mb-1">{label}</p>
              <span className="text-xs text-[#00B37D] font-semibold">+{score - prev} pts</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
