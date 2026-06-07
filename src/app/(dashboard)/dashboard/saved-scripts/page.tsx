"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, FileText, Mic, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface SavedScript {
  id: number;
  title: string;
  scenario: string;
  content: string;
  wordCount: number;
  duration: string;
  createdAt: string;
}

export default function SavedScriptsPage() {
  const router = useRouter();
  const [scripts, setScripts] = useState<SavedScript[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("speakflow_scripts");
      if (raw) setScripts(JSON.parse(raw));
    } catch { /* ignore */ }
  }, []);

  function deleteScript(id: number) {
    const updated = scripts.filter((s) => s.id !== id);
    setScripts(updated);
    localStorage.setItem("speakflow_scripts", JSON.stringify(updated));
  }

  function sendToPractice(script: SavedScript) {
    localStorage.setItem("speakflow_active_script", JSON.stringify({
      content: script.content,
      scenario: script.scenario,
      wordCount: script.wordCount,
    }));
    router.push("/dashboard/practice");
  }

  const filtered = scripts.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.scenario.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    } catch { return iso; }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1F1F1F]">Saved Scripts</h1>
          <p className="text-sm text-[#636363] mt-1">{scripts.length} script{scripts.length !== 1 ? "s" : ""} saved</p>
        </div>
        <Link
          href="/dashboard/script-writer"
          className="inline-flex items-center gap-2 bg-[#0056D2] hover:bg-[#003B8E] text-white font-semibold px-4 py-2 rounded text-sm transition-colors"
        >
          <FileText size={14} />
          New Script
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9E9E9E]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search scripts by title or scenario..."
          className="w-full pl-9 pr-4 py-2.5 border border-[#E0E0E0] rounded text-sm text-[#1F1F1F] placeholder-[#9E9E9E] focus:outline-none focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2] bg-white"
        />
      </div>

      {scripts.length === 0 ? (
        <div className="bg-white border border-[#E0E0E0] rounded-lg p-10 text-center">
          <FileText size={36} className="text-[#E0E0E0] mx-auto mb-3" />
          <p className="font-semibold text-[#1F1F1F] mb-1">No saved scripts yet</p>
          <p className="text-sm text-[#636363] mb-4">Generate a script in Script Writer and click &ldquo;Save Script&rdquo; to see it here.</p>
          <Link
            href="/dashboard/script-writer"
            className="inline-flex items-center gap-2 bg-[#0056D2] hover:bg-[#003B8E] text-white font-semibold px-4 py-2 rounded text-sm transition-colors"
          >
            Go to Script Writer
          </Link>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-[#E0E0E0] rounded-lg p-10 text-center">
          <p className="text-sm text-[#636363]">No scripts match your search.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((script) => (
            <div
              key={script.id}
              className="bg-white border border-[#E0E0E0] rounded-lg p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <div className="w-10 h-10 bg-[#E8F1FF] rounded-lg flex items-center justify-center shrink-0">
                <FileText size={18} className="text-[#0056D2]" />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-[#1F1F1F] text-sm truncate mb-1">{script.title}</h3>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-semibold px-2 py-0.5 rounded bg-[#E8F1FF] text-[#0056D2]">
                    {script.scenario}
                  </span>
                  <span className="text-[#9E9E9E]">{script.wordCount} words</span>
                  <span className="text-[#9E9E9E]">{formatDate(script.createdAt)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href="/dashboard/script-writer"
                  onClick={() => localStorage.setItem("speakflow_edit_script", JSON.stringify(script))}
                  className="flex items-center gap-1 text-xs border border-[#E0E0E0] text-[#636363] hover:border-[#0056D2] hover:text-[#0056D2] px-3 py-1.5 rounded transition-colors font-medium"
                >
                  Edit
                </Link>
                <button
                  onClick={() => sendToPractice(script)}
                  className="flex items-center gap-1 text-xs bg-[#0056D2] hover:bg-[#003B8E] text-white px-3 py-1.5 rounded transition-colors font-medium"
                >
                  <Mic size={12} />
                  Practice
                </button>
                <button
                  onClick={() => deleteScript(script.id)}
                  className="flex items-center gap-1 text-xs border border-[#E0E0E0] text-[#636363] hover:border-red-400 hover:text-red-500 px-3 py-1.5 rounded transition-colors font-medium"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
