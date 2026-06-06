import Link from "next/link";
import { Users, Smile, Briefcase, Frown, Building, UserCheck, BookOpen, Lock } from "lucide-react";

const audienceModes = [
  {
    icon: Smile,
    name: "Friendly Audience",
    description: "A supportive, encouraging crowd. Ideal for building basic confidence and overcoming stage fright.",
  },
  {
    icon: Users,
    name: "Professional Audience",
    description: "A neutral, attentive group of colleagues or peers. Standard workplace presentation simulation.",
  },
  {
    icon: Frown,
    name: "Difficult Audience",
    description: "Skeptical, distracted, or challenging listeners. Tests your ability to maintain composure under pressure.",
  },
  {
    icon: Building,
    name: "Executive Boardroom",
    description: "High-stakes simulation with a senior leadership audience. Emphasis on conciseness, data, and executive presence.",
  },
  {
    icon: UserCheck,
    name: "Interview Panel",
    description: "Multi-person formal interview panel. Simulates pressure of being evaluated by multiple interviewers simultaneously.",
  },
  {
    icon: BookOpen,
    name: "IELTS Exam Room",
    description: "Timed IELTS Speaking test environment with examiner-style interaction and official test format.",
  },
];

export default function AudiencePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1F1F1F]">Virtual Audience Simulation</h1>
        <p className="text-sm text-[#636363] mt-1">Practice speaking in front of realistic AI audience simulations.</p>
      </div>

      {/* Upgrade Banner */}
      <div className="bg-[#FFF8EC] border border-[#F5A623] rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <Lock size={18} className="text-[#F5A623] mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-[#1F1F1F] text-sm">Upgrade to Pro+ to unlock Virtual Audience Simulation</p>
            <p className="text-xs text-[#636363] mt-0.5">
              All 6 audience modes are included in Pro+ Simulation at $39/month.
            </p>
          </div>
        </div>
        <Link
          href="/pricing"
          className="inline-block bg-[#0056D2] hover:bg-[#003B8E] text-white font-semibold px-5 py-2 rounded text-sm transition-colors shrink-0"
        >
          Upgrade to Pro+
        </Link>
      </div>

      {/* Audience Mode Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {audienceModes.map(({ icon: Icon, name, description }) => (
          <div
            key={name}
            className="bg-white border border-[#E0E0E0] rounded-lg p-5 opacity-60 relative"
          >
            {/* Coming Soon Badge */}
            <div className="absolute top-3 right-3">
              <span className="bg-[#F5A623] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                Coming Soon
              </span>
            </div>

            <div className="w-10 h-10 bg-[#F5F5F5] rounded-lg flex items-center justify-center mb-3">
              <Icon size={20} className="text-[#9E9E9E]" />
            </div>

            <h3 className="font-semibold text-[#636363] mb-1">{name}</h3>
            <p className="text-xs text-[#9E9E9E] leading-relaxed">{description}</p>

            <div className="mt-3">
              <button
                disabled
                className="w-full text-center text-xs font-semibold text-[#9E9E9E] border border-[#E0E0E0] py-2 rounded cursor-not-allowed"
              >
                <Lock size={11} className="inline mr-1" />
                Locked — Pro+ required
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Why upgrade */}
      <div className="bg-[#E8F1FF] rounded-lg p-6">
        <h2 className="font-bold text-[#1F1F1F] mb-3">Why Virtual Audience Simulation?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: "Real pressure, zero risk", desc: "Experience high-stakes speaking scenarios before the real thing." },
            { title: "6 audience modes", desc: "From friendly to hostile — every professional scenario covered." },
            { title: "Confidence that transfers", desc: "Research shows simulated practice dramatically reduces real anxiety." },
          ].map(({ title, desc }) => (
            <div key={title}>
              <p className="font-semibold text-[#0056D2] text-sm mb-1">{title}</p>
              <p className="text-xs text-[#636363] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Link
            href="/pricing"
            className="inline-block bg-[#0056D2] hover:bg-[#003B8E] text-white font-semibold px-6 py-2.5 rounded text-sm transition-colors"
          >
            View Pro+ Plan
          </Link>
        </div>
      </div>
    </div>
  );
}
