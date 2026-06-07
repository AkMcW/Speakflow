"use client";
import { useState } from "react";
import { Wand2, Copy, RotateCcw, Save, CheckCircle, ChevronDown, ChevronUp, Sparkles, Zap } from "lucide-react";

// ─── 46 Scenarios ───────────────────────────────────────────────
const SCENARIOS = [
  // Business
  "Business Meeting Update",
  "Executive Summary Presentation",
  "Board Room Update",
  "Quarterly Business Review",
  "Budget Proposal",
  "Risk & Issues Update",
  "Project Kickoff",
  "Product Launch Announcement",
  "Team Briefing",
  "Performance Review (Self)",
  "Difficult Conversation",
  "Crisis Communication",
  "Customer Complaint Response",
  "Negotiation Opening",
  "Sales Pitch",
  "Cold Call Introduction",
  "Product Demo",
  "Investor Pitch",
  // Presentations & Public Speaking
  "Conference Keynote",
  "Technical Presentation",
  "Training Presentation",
  "TED-style Talk",
  "Wedding Speech",
  "Award Acceptance Speech",
  "Toast / Tribute",
  "Graduation Speech",
  "Fundraising Appeal",
  // Career
  "Job Interview: Tell Me About Yourself",
  "Job Interview: Strengths & Weaknesses",
  "Job Interview: STAR Method Answer",
  "Job Promotion Pitch",
  "MBA Interview",
  "Scholarship Interview",
  "University Admission Interview",
  "LinkedIn Professional Intro",
  // Exam Prep
  "IELTS Speaking Part 1",
  "IELTS Speaking Part 2 (Cue Card)",
  "IELTS Speaking Part 3 (Discussion)",
  "TOEFL Independent Speaking",
  "TOEFL Integrated Speaking",
  "PTE Retell Lecture",
  "TOEIC Picture Description",
  "Cambridge C1 Long Turn",
  // Social
  "Media Interview Response",
  "Podcast Introduction",
];

// ─── 10 Presets ─────────────────────────────────────────────────
const PRESETS = [
  {
    label: "Tell Me About Yourself",
    icon: "🎯",
    form: { scenario: "Job Interview: Tell Me About Yourself", goal: "A compelling 90-second personal introduction covering my background, key strengths, and why I am the right fit for this role.", audience: "Interview Panel", tone: "Professional", duration: "1min", style: "" },
  },
  {
    label: "IELTS Part 2 Cue Card",
    icon: "📚",
    form: { scenario: "IELTS Speaking Part 2 (Cue Card)", goal: "Describe a memorable trip I took. Include where I went, who I went with, what I did, and why it was memorable.", audience: "IELTS Examiner", tone: "Conversational", duration: "2min", style: "" },
  },
  {
    label: "Q3 Project Status Update",
    icon: "📊",
    form: { scenario: "Business Meeting Update", goal: "Give a concise Q3 status update covering: progress against targets, two current blockers, and the plan for the next sprint.", audience: "Senior Management", tone: "Professional", duration: "2min", style: "" },
  },
  {
    label: "Investor Pitch Intro",
    icon: "💡",
    form: { scenario: "Investor Pitch", goal: "Open an investor pitch for a B2B SaaS startup. Cover the problem we solve, our solution, traction, and the ask.", audience: "Investors", tone: "Persuasive", duration: "3min", style: "" },
  },
  {
    label: "Executive Board Update",
    icon: "🏢",
    form: { scenario: "Board Room Update", goal: "Present a strategic update to the board covering key business metrics, risks, and the decision needed from the board today.", audience: "Board of Directors", tone: "Formal", duration: "3min", style: "" },
  },
  {
    label: "Sales Discovery Opening",
    icon: "💼",
    form: { scenario: "Sales Pitch", goal: "Open a discovery call with a new prospect. Build rapport, explain our value proposition, and transition into discovery questions.", audience: "Potential Client", tone: "Conversational", duration: "1min", style: "" },
  },
  {
    label: "TOEFL Independent Task",
    icon: "🌍",
    form: { scenario: "TOEFL Independent Speaking", goal: "Respond to: 'Some people prefer to work in teams. Others prefer to work alone. Which do you prefer and why?' Give a structured 45-second response.", audience: "TOEFL Examiner", tone: "Formal", duration: "30s", style: "" },
  },
  {
    label: "Conference Keynote Opener",
    icon: "🎤",
    form: { scenario: "Conference Keynote", goal: "Open a technology conference keynote. Start with a powerful hook, establish credibility, introduce the theme, and preview the talk.", audience: "Tech Professionals", tone: "Inspirational", duration: "3min", style: "" },
  },
  {
    label: "MBA Interview Why MBA",
    icon: "🎓",
    form: { scenario: "MBA Interview", goal: "Answer 'Why do you want an MBA and why now?' Connect my professional experience, career goals, and what the MBA will unlock for me.", audience: "MBA Admissions Panel", tone: "Professional", duration: "2min", style: "" },
  },
  {
    label: "Wedding Toast",
    icon: "🥂",
    form: { scenario: "Wedding Speech", goal: "Give a heartfelt and funny best man / maid of honor wedding toast. Share a story about the couple, express love, and raise a toast.", audience: "Wedding Guests", tone: "Warm & Humorous", duration: "2min", style: "" },
  },
];

// ─── Famous Speaking Styles ─────────────────────────────────────
const STYLES = [
  { label: "No specific style", value: "" },
  { label: "Steve Jobs", value: "Steve Jobs — simple, storytelling, dramatic pauses, 'one more thing' suspense, minimalist language", emoji: "🍎" },
  { label: "Barack Obama", value: "Barack Obama — measured cadence, inclusive 'we' language, inspirational, hopeful, oratorical rhythm", emoji: "🇺🇸" },
  { label: "Simon Sinek", value: "Simon Sinek — Start With Why framework, conceptual, repeating core ideas, simple powerful language", emoji: "💡" },
  { label: "Brené Brown", value: "Brené Brown — vulnerable, story-driven, academic research woven with personal anecdotes, warm and authentic", emoji: "❤️" },
  { label: "Elon Musk", value: "Elon Musk — direct, data-driven, bold vision, matter-of-fact delivery, future-focused, blunt honesty", emoji: "🚀" },
  { label: "Oprah Winfrey", value: "Oprah Winfrey — warm, empowering, emotional connection, personal stories, uplifting and energizing", emoji: "✨" },
  { label: "Winston Churchill", value: "Winston Churchill — powerful rhetorical questions, tricolon (rule of three), dramatic pauses, historic gravitas", emoji: "🎖️" },
  { label: "Martin Luther King Jr.", value: "Martin Luther King Jr. — repetition (anaphora), vivid imagery, moral urgency, rhythmic and poetic cadence", emoji: "🕊️" },
  { label: "Tony Robbins", value: "Tony Robbins — high energy, pattern interrupts, direct commands, empowering questions, bold certainty", emoji: "🔥" },
  { label: "Sheryl Sandberg", value: "Sheryl Sandberg — data-backed, authentic personal stories, leadership-focused, empowering professional tone", emoji: "👩‍💼" },
  { label: "Richard Feynman", value: "Richard Feynman — explain complex ideas simply, curious and playful, analogies, step-by-step reasoning", emoji: "🔬" },
];

const AUDIENCES = [
  "Colleagues", "Senior Management", "Board of Directors", "Clients", "Investors",
  "Interview Panel", "MBA Admissions Panel", "IELTS Examiner", "TOEFL Examiner",
  "General Public", "Tech Professionals", "Students", "Media / Press", "Wedding Guests",
];

const TONES = [
  "Professional", "Conversational", "Formal", "Persuasive", "Inspirational",
  "Warm & Humorous", "Confident", "Academic", "Executive", "Empathetic",
];

const DURATIONS = ["30s", "1min", "2min", "3min", "5min", "10min"];

const OPTIMIZE_OPTIONS = [
  { label: "More Professional", instruction: "Make this script more professional and executive-level" },
  { label: "Simplify", instruction: "Simplify the language so it's easier to understand and more conversational" },
  { label: "More Persuasive", instruction: "Make this script more persuasive and compelling" },
  { label: "Add Storytelling", instruction: "Add a brief personal story or analogy to make this more engaging" },
  { label: "Add Q&A Section", instruction: "Add 3 likely questions the audience might ask, with strong answers" },
  { label: "Stronger Opening", instruction: "Rewrite the opening to be more powerful and attention-grabbing" },
  { label: "Stronger Closing", instruction: "Rewrite the closing to be more memorable and impactful" },
  { label: "Make Shorter", instruction: "Make this script shorter and more concise without losing the key messages" },
  { label: "Make Longer", instruction: "Expand this script with more detail, examples, and supporting points" },
  { label: "Add Transitions", instruction: "Add smooth transitional phrases between sections" },
  { label: "More Confident Tone", instruction: "Rewrite with a more confident, assertive tone" },
  { label: "Bullet Points", instruction: "Convert this to speaker notes in bullet point format" },
];

interface FormState {
  scenario: string;
  goal: string;
  audience: string;
  tone: string;
  duration: string;
  style: string;
}

export default function ScriptWriterPage() {
  const [generated, setGenerated] = useState(false);
  const [script, setScript] = useState("");
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [optimizing, setOptimizing] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [showPresets, setShowPresets] = useState(true);
  const [wordCount, setWordCount] = useState(0);

  const [form, setForm] = useState<FormState>({
    scenario: "Business Meeting Update",
    goal: "",
    audience: "Colleagues",
    tone: "Professional",
    duration: "2min",
    style: "",
  });

  function applyPreset(preset: typeof PRESETS[0]) {
    setForm(preset.form);
    setShowPresets(false);
  }

  async function handleGenerate() {
    setLoading(true);
    setError("");
    setGenerated(false);
    setSaved(false);
    try {
      const res = await fetch("/api/scripts/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setScript(data.script);
      setWordCount(data.script.split(/\s+/).filter(Boolean).length);
      setGenerated(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate script.");
    } finally {
      setLoading(false);
    }
  }

  async function handleOptimize(opt: typeof OPTIMIZE_OPTIONS[0]) {
    setOptimizing(opt.label);
    try {
      const res = await fetch("/api/scripts/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ script, instruction: opt.instruction }),
      });
      const data = await res.json();
      if (data.script) {
        setScript(data.script);
        setWordCount(data.script.split(/\s+/).filter(Boolean).length);
        setSaved(false);
      }
    } catch {
      // silent fail on optimize
    } finally {
      setOptimizing(null);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(script).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleSave() {
    const saved_scripts = JSON.parse(localStorage.getItem("speakflow_scripts") || "[]");
    saved_scripts.unshift({
      id: Date.now(),
      title: form.goal?.slice(0, 60) || form.scenario,
      scenario: form.scenario,
      content: script,
      wordCount,
      duration: form.duration,
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem("speakflow_scripts", JSON.stringify(saved_scripts.slice(0, 50)));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const estimatedDuration = Math.round(wordCount / 130);

  return (
    <div className="max-w-6xl mx-auto space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-[#1F1F1F]">AI Script Writer</h1>
        <p className="text-sm text-[#636363] mt-1">Generate a polished speaking script powered by GPT-4o.</p>
      </div>

      {/* Presets */}
      <div className="bg-white border border-[#E0E0E0] rounded-lg overflow-hidden">
        <button
          onClick={() => setShowPresets(!showPresets)}
          className="w-full flex items-center justify-between px-5 py-3 hover:bg-[#F5F5F5] transition-colors"
        >
          <span className="flex items-center gap-2 text-sm font-bold text-[#1F1F1F]">
            <Zap size={15} className="text-[#F5A623]" />
            Quick Presets — start from a template
          </span>
          {showPresets ? <ChevronUp size={16} className="text-[#636363]" /> : <ChevronDown size={16} className="text-[#636363]" />}
        </button>
        {showPresets && (
          <div className="px-5 pb-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 border-t border-[#E0E0E0] pt-4">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => applyPreset(p)}
                className="flex flex-col items-start gap-1 p-3 border border-[#E0E0E0] rounded-lg hover:border-[#0056D2] hover:bg-[#E8F1FF] transition-all text-left"
              >
                <span className="text-lg">{p.icon}</span>
                <span className="text-xs font-semibold text-[#1F1F1F] leading-tight">{p.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left: Form */}
        <div className="bg-white border border-[#E0E0E0] rounded-lg p-6 space-y-4">
          <h2 className="font-bold text-[#1F1F1F]">Configure your script</h2>

          {/* Scenario */}
          <div>
            <label className="block text-sm font-semibold text-[#1F1F1F] mb-1.5">Scenario <span className="text-[#636363] font-normal">({SCENARIOS.length} options)</span></label>
            <select
              value={form.scenario}
              onChange={(e) => setForm({ ...form, scenario: e.target.value })}
              className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-sm text-[#1F1F1F] focus:outline-none focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2] bg-white"
            >
              {SCENARIOS.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>

          {/* Goal */}
          <div>
            <label className="block text-sm font-semibold text-[#1F1F1F] mb-1.5">Speaking goal <span className="text-[#636363] font-normal">(optional — describe what you want to say)</span></label>
            <textarea
              value={form.goal}
              onChange={(e) => setForm({ ...form, goal: e.target.value })}
              placeholder="e.g. Give a Q3 project status update covering progress, blockers, and next steps for my engineering team."
              rows={3}
              className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-sm text-[#1F1F1F] placeholder-[#9E9E9E] focus:outline-none focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2] resize-none"
            />
          </div>

          {/* Audience & Tone */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-[#1F1F1F] mb-1.5">Audience</label>
              <select
                value={form.audience}
                onChange={(e) => setForm({ ...form, audience: e.target.value })}
                className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-sm text-[#1F1F1F] focus:outline-none focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2] bg-white"
              >
                {AUDIENCES.map((a) => <option key={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#1F1F1F] mb-1.5">Tone</label>
              <select
                value={form.tone}
                onChange={(e) => setForm({ ...form, tone: e.target.value })}
                className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-sm text-[#1F1F1F] focus:outline-none focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2] bg-white"
              >
                {TONES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-semibold text-[#1F1F1F] mb-1.5">Duration</label>
            <div className="flex gap-2 flex-wrap">
              {DURATIONS.map((d) => (
                <button
                  key={d}
                  onClick={() => setForm({ ...form, duration: d })}
                  className={`px-3 py-1.5 rounded text-xs font-semibold border transition-colors ${
                    form.duration === d
                      ? "bg-[#0056D2] text-white border-[#0056D2]"
                      : "border-[#E0E0E0] text-[#636363] hover:border-[#0056D2] hover:text-[#0056D2]"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Speaking Style */}
          <div>
            <label className="block text-sm font-semibold text-[#1F1F1F] mb-1.5">
              <Sparkles size={13} className="inline mr-1 text-[#F5A623]" />
              Speaking style
            </label>
            <select
              value={form.style}
              onChange={(e) => setForm({ ...form, style: e.target.value })}
              className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-sm text-[#1F1F1F] focus:outline-none focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2] bg-white"
            >
              {STYLES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.emoji ? `${s.emoji} ${s.label}` : s.label}
                </option>
              ))}
            </select>
            {form.style && (
              <p className="text-xs text-[#0056D2] mt-1 font-medium">
                AI will write in the style of {STYLES.find(s => s.value === form.style)?.label}
              </p>
            )}
          </div>

          {error && (
            <div className="bg-[#FFEBEE] border border-[#FFCDD2] rounded-lg p-3">
              <p className="text-xs text-[#E53935] font-medium">{error}</p>
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-[#0056D2] hover:bg-[#003B8E] disabled:opacity-60 text-white font-semibold py-3 rounded transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <Wand2 size={16} />
            {loading ? "Generating with GPT-4o..." : "Generate Script"}
          </button>
        </div>

        {/* Right: Output */}
        <div className="bg-white border border-[#E0E0E0] rounded-lg p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-[#1F1F1F]">Generated Script</h2>
              {generated && (
                <p className="text-xs text-[#636363] mt-0.5">
                  {wordCount} words · ~{estimatedDuration} min read
                </p>
              )}
            </div>
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
                  onClick={handleSave}
                  disabled={saved}
                  className={`flex items-center gap-1 text-xs px-2.5 py-1.5 rounded transition-colors font-semibold ${
                    saved
                      ? "bg-[#E6F7F2] text-[#00B37D] border border-[#00B37D]"
                      : "bg-[#0056D2] hover:bg-[#003B8E] text-white"
                  }`}
                >
                  {saved ? <CheckCircle size={12} /> : <Save size={12} />}
                  {saved ? "Saved!" : "Save Script"}
                </button>
                <button
                  onClick={() => { setScript(""); setGenerated(false); setSaved(false); }}
                  className="flex items-center gap-1 text-xs border border-[#E0E0E0] text-[#636363] hover:bg-[#F5F5F5] px-2.5 py-1.5 rounded transition-colors"
                >
                  <RotateCcw size={12} />
                  Reset
                </button>
              </div>
            )}
          </div>

          {!generated ? (
            <div className="flex-1 flex items-center justify-center text-center py-16 border-2 border-dashed border-[#E0E0E0] rounded-lg">
              <div>
                <Wand2 size={40} className="text-[#E0E0E0] mx-auto mb-3" />
                <p className="text-sm text-[#636363] max-w-xs">
                  {loading
                    ? "GPT-4o is writing your script..."
                    : "Configure your script settings and click Generate Script."}
                </p>
                {loading && (
                  <div className="flex justify-center gap-1 mt-4">
                    {[0,1,2].map(i => (
                      <div key={i} className="w-2 h-2 rounded-full bg-[#0056D2] animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 bg-[#F5F5F5] rounded-lg p-4 mb-4 overflow-y-auto max-h-96">
                <pre className="text-sm text-[#1F1F1F] leading-relaxed whitespace-pre-wrap font-sans">{script}</pre>
              </div>

              {/* Optimize Buttons */}
              <div>
                <p className="text-xs font-bold text-[#636363] uppercase tracking-wider mb-2">Optimize with AI</p>
                <div className="flex flex-wrap gap-2">
                  {OPTIMIZE_OPTIONS.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => handleOptimize(opt)}
                      disabled={!!optimizing}
                      className={`text-xs border border-[#0056D2] text-[#0056D2] hover:bg-[#E8F1FF] px-3 py-1.5 rounded transition-colors font-medium disabled:opacity-50 ${
                        optimizing === opt.label ? "bg-[#E8F1FF]" : ""
                      }`}
                    >
                      {optimizing === opt.label ? "..." : opt.label}
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
