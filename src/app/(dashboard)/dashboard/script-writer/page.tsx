"use client";
import { useState } from "react";
import { Wand2, Copy, RotateCcw } from "lucide-react";

const mockScript = `Good morning, everyone. Thank you for joining today's Q3 project update.

I want to cover three key areas: our progress against quarterly targets, two blockers we're managing, and our plan for the next sprint.

On progress: we completed the backend API integration last Friday — three days ahead of schedule. The QA team has started regression testing, and we're currently sitting at 94% test pass rate. This is ahead of our 90% milestone target for this stage.

On blockers: we have two items that need attention. First, the vendor hasn't delivered the final UI design assets, which is pushing back the frontend build by approximately 4 days. I've escalated this to our account manager and expect resolution by Wednesday. Second, we still need a decision on the mobile-first versus desktop-first rollout approach. This is blocking the release plan finalization.

For the next two weeks: we'll complete QA by June 12th, run user acceptance testing with the client team the following week, and target a soft launch on June 20th, assuming the vendor assets arrive on time.

To close: we are on track overall. The team has done excellent work under a compressed timeline. I'll send a written update by end of day.

Are there any questions on the blockers or the release timeline?`;

const optimizeOptions = [
  "Make More Professional",
  "Simplify Language",
  "Add Q&A Section",
  "Make Shorter",
  "Make Longer",
  "Add Transitions",
];

export default function ScriptWriterPage() {
  const [generated, setGenerated] = useState(false);
  const [script, setScript] = useState(mockScript);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    scenario: "Business Meeting",
    goal: "",
    audience: "Colleagues",
    tone: "Professional",
    duration: "2min",
  });

  function handleGenerate() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setGenerated(true);
    }, 1200);
  }

  function handleOptimize(option: string) {
    setScript((prev) => `[Optimized: ${option}]\n\n` + prev);
  }

  function handleCopy() {
    navigator.clipboard.writeText(script).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1F1F1F]">Script Writer</h1>
        <p className="text-sm text-[#636363] mt-1">Generate a polished speaking script for any scenario.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Form */}
        <div className="bg-white border border-[#E0E0E0] rounded-lg p-6 space-y-5">
          <h2 className="font-bold text-[#1F1F1F]">Configure your script</h2>

          <div>
            <label className="block text-sm font-semibold text-[#1F1F1F] mb-1.5">Scenario type</label>
            <select
              value={form.scenario}
              onChange={(e) => setForm({ ...form, scenario: e.target.value })}
              className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-sm text-[#1F1F1F] focus:outline-none focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2]"
            >
              {["Business Meeting", "Presentation", "Interview", "IELTS Part 1", "IELTS Part 2", "Public Speaking"].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1F1F1F] mb-1.5">Speaking goal</label>
            <textarea
              value={form.goal}
              onChange={(e) => setForm({ ...form, goal: e.target.value })}
              placeholder="e.g. Give a Q3 project status update covering progress, blockers, and next steps."
              rows={3}
              className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-sm text-[#1F1F1F] placeholder-[#9E9E9E] focus:outline-none focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2] resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1F1F1F] mb-1.5">Audience type</label>
            <select
              value={form.audience}
              onChange={(e) => setForm({ ...form, audience: e.target.value })}
              className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-sm text-[#1F1F1F] focus:outline-none focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2]"
            >
              {["Colleagues", "Senior Management", "Clients", "General Public", "IELTS Examiner", "Interview Panel"].map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#1F1F1F] mb-1.5">Tone</label>
              <select
                value={form.tone}
                onChange={(e) => setForm({ ...form, tone: e.target.value })}
                className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-sm text-[#1F1F1F] focus:outline-none focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2]"
              >
                {["Professional", "Conversational", "Formal", "Persuasive"].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#1F1F1F] mb-1.5">Duration</label>
              <select
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-sm text-[#1F1F1F] focus:outline-none focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2]"
              >
                {["30s", "1min", "2min", "3min", "5min"].map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-[#0056D2] hover:bg-[#003B8E] disabled:opacity-60 text-white font-semibold py-2.5 rounded transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <Wand2 size={16} />
            {loading ? "Generating..." : "Generate Script"}
          </button>
        </div>

        {/* Right: Output */}
        <div className="bg-white border border-[#E0E0E0] rounded-lg p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-[#1F1F1F]">Generated Script</h2>
            {generated && (
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-xs border border-[#E0E0E0] text-[#636363] hover:bg-[#F5F5F5] px-2.5 py-1.5 rounded transition-colors"
                >
                  <Copy size={12} />
                  {copied ? "Copied!" : "Copy"}
                </button>
                <button
                  onClick={() => setScript(mockScript)}
                  className="flex items-center gap-1 text-xs border border-[#E0E0E0] text-[#636363] hover:bg-[#F5F5F5] px-2.5 py-1.5 rounded transition-colors"
                >
                  <RotateCcw size={12} />
                  Reset
                </button>
              </div>
            )}
          </div>

          {!generated ? (
            <div className="flex-1 flex items-center justify-center text-center py-16">
              <div>
                <Wand2 size={40} className="text-[#E0E0E0] mx-auto mb-3" />
                <p className="text-sm text-[#636363]">Configure your script settings and click &ldquo;Generate Script&rdquo; to get started.</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 bg-[#F5F5F5] rounded-lg p-4 mb-4 overflow-y-auto">
                <pre className="text-sm text-[#1F1F1F] leading-relaxed whitespace-pre-wrap font-sans">{script}</pre>
              </div>

              {/* Optimize Buttons */}
              <div>
                <p className="text-xs font-bold text-[#636363] uppercase tracking-wider mb-2">Optimize</p>
                <div className="flex flex-wrap gap-2">
                  {optimizeOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleOptimize(opt)}
                      className="text-xs border border-[#0056D2] text-[#0056D2] hover:bg-[#E8F1FF] px-3 py-1.5 rounded transition-colors font-medium"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
