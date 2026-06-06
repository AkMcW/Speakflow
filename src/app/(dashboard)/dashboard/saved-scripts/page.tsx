"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, FileText, Edit, Mic, Trash2 } from "lucide-react";

const initialScripts = [
  {
    id: 1,
    title: "Q3 Project Status Update",
    type: "Business Meeting",
    date: "Jun 6, 2026",
    wordCount: 215,
    typeColor: "bg-[#E8F1FF] text-[#0056D2]",
  },
  {
    id: 2,
    title: "Describe a memorable journey — IELTS Part 2",
    type: "IELTS Part 2",
    date: "Jun 4, 2026",
    wordCount: 187,
    typeColor: "bg-[#FFF8EC] text-[#F5A623]",
  },
  {
    id: 3,
    title: "Tell me about yourself — Job Interview",
    type: "Interview",
    date: "Jun 2, 2026",
    wordCount: 142,
    typeColor: "bg-[#E6F7F2] text-[#00B37D]",
  },
  {
    id: 4,
    title: "Q3 Sales Strategy Presentation",
    type: "Presentation",
    date: "May 30, 2026",
    wordCount: 340,
    typeColor: "bg-[#F5F5F5] text-[#636363]",
  },
];

export default function SavedScriptsPage() {
  const [scripts, setScripts] = useState(initialScripts);
  const [search, setSearch] = useState("");

  const filtered = scripts.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.type.toLowerCase().includes(search.toLowerCase())
  );

  function deleteScript(id: number) {
    setScripts((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1F1F1F]">Saved Scripts</h1>
          <p className="text-sm text-[#636363] mt-1">{scripts.length} scripts saved</p>
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
          placeholder="Search scripts by title or type..."
          className="w-full pl-9 pr-4 py-2.5 border border-[#E0E0E0] rounded text-sm text-[#1F1F1F] placeholder-[#9E9E9E] focus:outline-none focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2] bg-white"
        />
      </div>

      {/* Script Cards */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-[#E0E0E0] rounded-lg p-10 text-center">
          <FileText size={36} className="text-[#E0E0E0] mx-auto mb-3" />
          <p className="text-sm text-[#636363]">No scripts found. Try a different search or create a new script.</p>
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
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="font-semibold text-[#1F1F1F] text-sm truncate">{script.title}</h3>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className={`font-semibold px-2 py-0.5 rounded ${script.typeColor}`}>
                    {script.type}
                  </span>
                  <span className="text-[#9E9E9E]">{script.wordCount} words</span>
                  <span className="text-[#9E9E9E]">{script.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href="/dashboard/script-writer"
                  className="flex items-center gap-1 text-xs border border-[#E0E0E0] text-[#636363] hover:border-[#0056D2] hover:text-[#0056D2] px-3 py-1.5 rounded transition-colors font-medium"
                >
                  <Edit size={12} />
                  Edit
                </Link>
                <Link
                  href="/dashboard/practice"
                  className="flex items-center gap-1 text-xs bg-[#0056D2] hover:bg-[#003B8E] text-white px-3 py-1.5 rounded transition-colors font-medium"
                >
                  <Mic size={12} />
                  Practice
                </Link>
                <button
                  onClick={() => deleteScript(script.id)}
                  className="flex items-center gap-1 text-xs border border-[#E0E0E0] text-[#636363] hover:border-red-400 hover:text-red-500 px-3 py-1.5 rounded transition-colors font-medium"
                >
                  <Trash2 size={12} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
